package com.sadetec.util;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.lang3.math.NumberUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import com.sadetec.model.ManualProductMap;
import com.sadetec.model.Product;
import com.sadetec.model.QuotationHistory;
import com.sadetec.repository.ManualProductMapRepository;
import com.sadetec.repository.QuotationHistoryRepository;

/**
 * 采用异步方式完成报价单处理 1. 进行完全匹配查询，查询到结果，则直接获取对应的产品型号，如果没有则进行第二步 2. 获取产品前面所有字符编码(\w*)，进行模糊查询 2.1
 * 查询到的所有结果, 对其产品编码进行匹配([\u2460-\u246F]+),如产品编码包含所有的项,则确认产品编码属于该类型 2.2 将匹配到的产品编码进行转换
 * @author gtqin
 *
 */
@Component("quotationProcessor")
public class QuotationProcessor {

	private final Logger log = LoggerFactory.getLogger(QuotationProcessor.class);

	private final String regularExpression = "[\\u2460-\\u246F]+";

	// 在线程间共享的变量,每个用户拥有自己的key,由此进行隔离
	private Map<String, Object> threadMap = new HashMap<String, Object>();

	@Autowired
	private ManualProductMapRepository manualProductMapRepository;

	@Autowired
	private QuotationHistoryRepository quotationHistoryRepository;

	@Autowired
	private PricePageProcessor pricePageProcessor;

	@Async
	public void executeAsyncTask(String curLoginName, List<QuotationHistory> myHistory) {

		for (QuotationHistory quotationHistory : myHistory) {
			String productCode = quotationHistory.getProductCode();
			List<ManualProductMap> mapResults = manualProductMapRepository.findByMiProductCodeOrId(productCode, productCode);

			if (mapResults.size() > 0) {
				ManualProductMap fullMatch = mapResults.get(0);
				BeanUtils.copyProperties(fullMatch, quotationHistory, "id");

				quotationHistory.setAtProductCode(fullMatch.getId());

				// 如果已有报价,则不再查询报价
				if (null == quotationHistory.getMiProductQuote() || 0 == quotationHistory.getMiProductQuote().intValue()) {
					quotationHistory.setProcFlag(false);
				}
				else {
					quotationHistory.setProcFlag(true);
					this.increaseFinishedPrice(curLoginName);
				}
			}
			else {
				getMatchedMap(quotationHistory);
			}

			log.info("待保存的报价信息{}", quotationHistory);

			quotationHistoryRepository.saveAndFlush(quotationHistory);

			this.increaseFinishedMap(curLoginName);
			

		}

		if (this.getNeedPrice(curLoginName)) {

			List<QuotationHistory> needPrices = quotationHistoryRepository.findByLoginNameAndProcFlag(curLoginName, false);
			try {
				pricePageProcessor.login(this.getMiUserId(curLoginName), this.getMiPassword(curLoginName));
			}
			catch (Exception e) {
				log.error("登录Mi失败:{}", e.getCause());
			}

			for (QuotationHistory quotationHistory : needPrices) {

				Product product = new Product();
				product.setId(quotationHistory.getMiProductCode());
				product.setBrdCode("");
				try {
					quotationHistory.setMiProductQuote(pricePageProcessor.process(product, 1));
				}
				catch (Exception e) {
					log.error("获取Mi报价失败:{}", e.getCause());
				}
				quotationHistory.setProcFlag(true);
				quotationHistoryRepository.saveAndFlush(quotationHistory);

				ManualProductMap productMap = manualProductMapRepository.findById(quotationHistory.getAtProductCode());
				if (null != productMap) {
					productMap.setMiProductQuote(quotationHistory.getMiProductQuote());
					manualProductMapRepository.saveAndFlush(productMap);
				}

				this.increaseFinishedPrice(curLoginName);
			}

		}
	}

	public void initThreadMap(String curLoginName, int size) {
		this.threadMap.put(curLoginName + ".total", size);
		this.threadMap.put(curLoginName + ".finishedMap", 0);
		this.threadMap.put(curLoginName + ".finishedPrice", 0);

	}

	public void initMiUser(String curLoginName, String userid, String password, Boolean needPrice) {
		this.threadMap.put(curLoginName + ".miUserid", userid);
		this.threadMap.put(curLoginName + ".miPassword", password);
		this.threadMap.put(curLoginName + ".miNeedPrice", needPrice);

	}

	public void increaseFinishedPrice(String curLoginName) {
		this.threadMap.put(curLoginName + ".finishedPrice", this.getFinishedPrice(curLoginName) + 1);
	}

	public void increaseFinishedMap(String curLoginName) {
		this.threadMap.put(curLoginName + ".finishedMap", this.getFinishedMap(curLoginName) + 1);
	}

	private Boolean getNeedPrice(String curLoginName) {
		Object needPrice = this.threadMap.get(curLoginName + ".miNeedPrice");
		return needPrice == null ? false : (Boolean) needPrice;
	}

	private String getMiUserId(String curLoginName) {
		Object miUserid = this.threadMap.get(curLoginName + ".miUserid");
		return miUserid == null ? "" : (String) miUserid;
	}

	private String getMiPassword(String curLoginName) {
		Object miPassword = this.threadMap.get(curLoginName + ".miPassword");
		return miPassword == null ? "" : (String) miPassword;
	}

	public Integer getTotal(String curLoginName) {
		Object total = this.threadMap.get(curLoginName + ".total");
		return total == null ? 0 : (Integer) total;
	}

	public Integer getFinishedMap(String curLoginName) {
		log.info("当前threadMap内容:{}", threadMap);
		Object finishedMap = this.threadMap.get(curLoginName + ".finishedMap");
		return finishedMap == null ? 0 : (Integer) finishedMap;
	}

	public Integer getFinishedPrice(String curLoginName) {
		Object finishedPrice = this.threadMap.get(curLoginName + ".finishedPrice");
		return finishedPrice == null ? 0 : (Integer) finishedPrice;
	}

	public ManualProductMap hasMatchedRecord(String productCode) {
		String beginStr = extractBeginChar(productCode);
		log.info("尝试根据代码起始字符串:{}进行匹配.", beginStr);
		List<ManualProductMap> mapLikeResults = manualProductMapRepository.findByIdOrMiProductCodeStartWith(beginStr, beginStr);
		log.info("根据代码起始字符串:{},匹配到记录数量：{}.", beginStr, mapLikeResults.size());
		
		// 判断查询到的结果是否完全符合产品型号
		for (ManualProductMap manualProductMap : mapLikeResults) {

			Boolean fullyMatchAT = isFullyMatch(manualProductMap.getId(), productCode);

			log.info("匹配到记录：{}, 检查后AT代码符合度为: {}", manualProductMap, fullyMatchAT);

			// 如果匹配到AT的产品代码,则设置对应的Mi产品代码,跳出匹配循环
			if (fullyMatchAT) {
				log.info("匹配到AT产品:{}，转换为Mi产品:{}", manualProductMap.getId(), manualProductMap.getMiProductCode());
				return manualProductMap;
			}

		}
		
		return null;

	}
	
	/**
	 * @param productCode
	 * @param mapLikeResults
	 */
	private void getMatchedMap(QuotationHistory quotationHistory) {
		String productCode = quotationHistory.getProductCode();
		String beginStr = extractBeginChar(productCode);
		log.info("未查询到完全一样的产品代码，尝试根据代码起始字符串:{}进行匹配.", beginStr);
		List<ManualProductMap> mapLikeResults = manualProductMapRepository.findByIdOrMiProductCodeStartWith(beginStr, beginStr);
		log.info("根据代码起始字符串:{},匹配到记录数量：{}.", beginStr, mapLikeResults.size());

		// 判断查询到的结果是否完全符合产品型号
		for (ManualProductMap manualProductMap : mapLikeResults) {

			Boolean fullyMatchAT = isFullyMatch(manualProductMap.getId(), productCode);
			Boolean fullyMatchMI = isFullyMatch(manualProductMap.getMiProductCode(), productCode);

			log.info("匹配到记录：{}, 检查后AT代码符合度为: {},Mi代码符合度为: {}", manualProductMap, fullyMatchAT, fullyMatchMI);

			// 如果匹配到AT的产品代码,则设置对应的Mi产品代码,跳出匹配循环
			if (fullyMatchAT) {
				BeanUtils.copyProperties(manualProductMap, quotationHistory);
				quotationHistory.setAtProductCode(productCode);
				quotationHistory.setMiProductCode(mapProductCode(productCode, manualProductMap.getId(), manualProductMap.getMiProductCode()));
				log.info("匹配到AT产品:{}，转换为Mi产品:{}", productCode, quotationHistory.getMiProductCode());
				quotationHistory.setProcFlag(false);
				return;
			}

			if (fullyMatchMI) {
				// 匹配到Mi的产品代码,则设置对应的AT产品代码
				BeanUtils.copyProperties(manualProductMap, quotationHistory);
				quotationHistory.setAtProductCode(mapProductCode(productCode, manualProductMap.getMiProductCode(), manualProductMap.getId()));
				quotationHistory.setMiProductCode(productCode);
				log.info("匹配到Mi产品:{}，转换为AT产品:{}", productCode, quotationHistory.getAtProductCode());
				quotationHistory.setProcFlag(false);
				return;
			}
		}

		quotationHistory.setAtProductCode("配置库未找到代码为:" + productCode + "的产品");
		quotationHistory.setMiProductCode("以代码:" + beginStr + "为开始的产品");
		quotationHistory.setProcFlag(true);
		this.increaseFinishedPrice(quotationHistory.getLoginName());
		return;
	}

	/**
	 * 判断templateCode是否与实际产品代码匹配 例如：ASRKR-①-g6-②-F③-S④-KA⑤-A⑥-KB⑦-B⑧-KC⑨-C⑩-B 匹配
	 * ASRKR-10-g6-50-F10-S10-KA3-A6-KB3-B6-KC3-C6-B
	 * @param productCode
	 * @param templateCode
	 * @return
	 */
	private Boolean isFullyMatch(String templateCode, String productCode) {

		if (StringUtils.isEmpty(templateCode) || StringUtils.isEmpty(productCode)) {
			return false;
		}

		if (templateCode.length() > productCode.length()) {
			return false;
		}

		Pattern codePattern = Pattern.compile(regularExpression);
		Boolean fullyMatchAT = true;
		// 将型号描述模版提出占位符，转换为ASRKR-,-g6-...类型数组
		String[] atChars = codePattern.split(templateCode);
		String upperProductCode = productCode.toUpperCase();

		for (String atChar : atChars) {
			boolean isContain = org.apache.commons.lang3.StringUtils.containsIgnoreCase(productCode, atChar);

			fullyMatchAT = fullyMatchAT && isContain;
			// 移除productCode已匹配的部分，避免重复匹配
			if (isContain) {
				int curIdx = productCode.toUpperCase().indexOf(atChar.toUpperCase());
				productCode = productCode.substring(curIdx + atChar.length());
			}
		}

		if (!fullyMatchAT) {
			return fullyMatchAT;
		}

		// 拆分结果不能包含字母
		String upperTemplateCode = templateCode.toUpperCase();
		Matcher matcher = codePattern.matcher(upperTemplateCode);
		String[] upperChars = codePattern.split(upperTemplateCode);
		int splitIdx = 0;
		int beginIdx = 0;
		while (matcher.find()) {
			String key = matcher.group();
			log.debug("{}. 当前匹配:{}, 起始位置{}", splitIdx, key, upperChars[splitIdx]);

			beginIdx = upperProductCode.indexOf(upperChars[splitIdx],beginIdx) + upperChars[splitIdx].length();
			
			log.debug("起始位置{}", beginIdx);
			
			String value = "";
			if (splitIdx + 1 < upperChars.length) {
				int endIdx = upperProductCode.indexOf(upperChars[splitIdx + 1], beginIdx);
				log.debug("截取字符串位置:{} - {}", beginIdx, endIdx);
				value = upperProductCode.substring(beginIdx, endIdx);
			}
			else {
				value = upperProductCode.substring(beginIdx);
			}

			log.debug("{}. 匹配结果:{}", splitIdx, value);
			fullyMatchAT = fullyMatchAT && NumberUtils.isNumber(value);
			splitIdx++;
		}

		return fullyMatchAT;
	}

	/**
	 * 实现根据产品代码的类型进行产品代码转换, TODO://如果字符串中间存在重复的匹配项?
	 * 
	 * @param oriCode 原始报价单产品代码，如：ASRKR-10-g6-50-F10-S10-KA3-A6-KB3-B6-KC3-C6-B
	 * @param selfType 原始产品类型代码，如：ASRKR-①-g6-②-F③-S④-KA⑤-A⑥-KB⑦-B⑧-KC⑨-C⑩-B
	 * @param targetType 目标产品类型代码： 如：PSFGKRRA①-②-F③-S④-KA⑤-A⑥-KB⑦-B⑧-KC⑨-C⑩
	 * @return 转换后的结果 PSFGKRRA10-50-F10-S10-KA3-A6-KB3-B6-KC3-C6
	 */
	private String mapProductCode(String oriCode, String selfType, String targetType) {

		if (null == oriCode || null == selfType || null == targetType) {
			log.error("输入参数oriCode:{},selfType:{},targetType:{}", oriCode, selfType, targetType);
			return "无法进行产品代码转换" + oriCode;
		}

		oriCode = StringUtils.trimWhitespace(oriCode);
		selfType = StringUtils.trimWhitespace(selfType);
		targetType = StringUtils.trimWhitespace(targetType);

		String upperOriCode = oriCode.toUpperCase();
		String upperSelfType = selfType.toUpperCase();

		Pattern codePattern = Pattern.compile(regularExpression);
		String[] orgChars = codePattern.split(upperSelfType);

		for (String string : orgChars) {
			log.debug("拆分结果:{}", string);
		}

		Matcher matcher = codePattern.matcher(upperSelfType);

		Map<String, String> result = new HashMap<String, String>();
		int splitIdx = 0;
		while (matcher.find()) {
			String key = matcher.group();
			log.debug("{}. 当前匹配:{}", splitIdx, key);

			int beginIdx = upperOriCode.indexOf(orgChars[splitIdx]) + orgChars[splitIdx].length();

			String value = "";
			if (splitIdx + 1 < orgChars.length) {
				int endIdx = upperOriCode.indexOf(orgChars[splitIdx + 1], beginIdx);
				log.debug("截取字符串位置:{} - {}", beginIdx, endIdx);
				value = upperOriCode.substring(beginIdx, endIdx);
			}
			else {
				value = upperOriCode.substring(beginIdx);
			}

			result.put(key, value);
			log.debug("{}. 匹配结果:{}", splitIdx, value);
			splitIdx++;
		}

		log.debug("匹配结果:{}", result);

		return new Rewriter(regularExpression) {
			public String replacement() {
				String key = group(0);
				return result.get(key);
			}
		}.rewrite(targetType);
	}

	/**
	 * 获取到第一个-位置的值 findByIDStartingWithOrMiProductCodeStartingWith
	 * @param productCode
	 * @return
	 */
	private String extractBeginChar(String productCode) {
		Pattern codePattern = Pattern.compile("[a-zA-Z]+");
		Matcher matcher = codePattern.matcher(productCode);

		if (matcher.find()) {
			String key = matcher.group();
			productCode = key;
		}

		return productCode;

	}

	public static void main(String[] args) {

		QuotationProcessor processor = new QuotationProcessor();

		System.out.println(processor.isFullyMatch("CSHV-①-②", "CSHV-10-100"));
		System.out.println(processor.isFullyMatch("ASRKR-①-g6-②-F③-S④-KA⑤-A⑥-KB⑦-B⑧-KC⑨-C⑩-A", "ASRKR-10-g6-50-F10-S10-KA3-A6-KB3-B6-KC3-C6-A"));
		
		// {id=ASRKR-①-g6-②-F③-S④-KA⑤-A⑥-KB⑦-B⑧-KC⑨-C⑩-A,
		// miProductCode=SFGKRRA①-②-F③-S④-KA⑤-A⑥-KB⑦-B⑧-KC⑨-C⑩\

		// System.out.println(processor.extractBeginChar("PSFRN6-15-F5-B3-P3"));

		//System.out.println("ASRKR-10-g6-50-F10-S10-KA3-A6-KB3-B6-KC3-C6-B".length());
		//System.out.println("ASRKR-①-g6-②-F③-S④-KA⑤-A⑥-KB⑦-B⑧-KC⑨-C⑩-A".length());

		//System.out.println(processor.mapProductCode("ASRKR-10-g6-50-F10-S10-KA3-A6-KB3-B6-KC3-C6-B", "ASRKR-①-g6-②-F③-S④-KA⑤-A⑥-KB⑦-B⑧-KC⑨-C⑩-A",	"SFGKRRA①-②-F③-S④-KA⑤-A⑥-KB⑦-B⑧-KC⑨-C⑩"));
		
	}

}
