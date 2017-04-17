package com.sadetec.util;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import com.ctc.wstx.util.StringUtil;
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

	private String regularExpression = "[\\u2460-\\u246F]+";

	private Boolean needPrice = false;

	private Integer total;

	private Integer finishedMap = 0;

	private Integer finishedPrice = 0;
	
	private String userid;
	
	private String password;

	@Autowired
	private ManualProductMapRepository manualProductMapRepository;

	@Autowired
	private QuotationHistoryRepository quotationHistoryRepository;

	@Autowired
	private PricePageProcessor pricePageProcessor;

	@Async
	public void executeAsyncTask(List<QuotationHistory> myHistory) {

		this.setTotal(myHistory.size());
		this.setFinishedMap(0);
		this.setFinishedPrice(0);

		String curLoginName = "";
		
		for (QuotationHistory quotationHistory : myHistory) {
			curLoginName = quotationHistory.getLoginName();
			String productCode = quotationHistory.getProductCode();
			List<ManualProductMap> mapResults = manualProductMapRepository.findByMiProductCodeOrId(productCode, productCode);

			if (mapResults.size() > 0) {
				ManualProductMap fullMatch = mapResults.get(0);
				BeanUtils.copyProperties(fullMatch, quotationHistory);

				// 如果已有报价,则不再查询报价
				if (null == quotationHistory.getMiProductQuote() || 0 == quotationHistory.getMiProductQuote().intValue()) {
					quotationHistory.setProcFlag(false);
				}
				else {
					quotationHistory.setProcFlag(true);
					this.increaseFinishedPrice();
				}
			}
			else {
				getMatchedMap(quotationHistory);
			}

			log.info("待保存的报价信息{}", quotationHistory);

			quotationHistoryRepository.saveAndFlush(quotationHistory);
			
			this.increaseFinishedMap();

		}
		
		if(this.needPrice) {
			
			List<QuotationHistory> needPrices = quotationHistoryRepository.findByLoginNameAndProcFlag(curLoginName, false);
			
			pricePageProcessor.login(getUserid(), getPassword());
			
			for (QuotationHistory quotationHistory : needPrices) {
				Product product = new Product();
				product.setId(quotationHistory.getMiProductCode());
				product.setBrdCode("");
				try {
					quotationHistory.setMiProductQuote(pricePageProcessor.process(product, 1));					
				} catch (Exception e) {
					log.error("获取Mi报价失败:{}", e.getCause());
				}
				quotationHistory.setProcFlag(true);
				quotationHistoryRepository.saveAndFlush(quotationHistory);
				
				ManualProductMap productMap = manualProductMapRepository.findById(quotationHistory.getId());
				if(null != productMap) {
					productMap.setMiProductQuote(quotationHistory.getMiProductQuote());
					manualProductMapRepository.saveAndFlush(productMap);
				}
				
				this.increaseFinishedPrice();
			}
			
		}
	}

	/**
	 * @param productCode
	 * @param mapLikeResults
	 */
	private void getMatchedMap(QuotationHistory quotationHistory) {
		String productCode = quotationHistory.getProductCode();
		String beginStr = extractBeginChar(productCode);
		log.info("未查询到完全一样的产品代码，尝试根据代码起始字符串:{}进行匹配.", beginStr);
		List<ManualProductMap> mapLikeResults = manualProductMapRepository.findFirst100ByMiProductCodeStartingWithOrIdStartingWith(beginStr, beginStr);
		log.info("根据代码起始字符串:{},匹配到记录数量：{}.", beginStr, mapLikeResults.size());
		
		// 判断查询到的结果是否完全符合产品型号
		for (ManualProductMap manualProductMap : mapLikeResults) {

			Pattern codePattern = Pattern.compile(regularExpression);

			Boolean fullyMatchAT = true;
			Boolean fullyMatchMI = true;

			String[] atChars = codePattern.split(manualProductMap.getId());
			for (String atChar : atChars) {
				fullyMatchAT = fullyMatchAT && org.apache.commons.lang3.StringUtils.containsIgnoreCase(productCode,atChar);
			}

			String[] miChars = codePattern.split(manualProductMap.getMiProductCode());
			for (String miChar : miChars) {
				fullyMatchMI = fullyMatchMI && org.apache.commons.lang3.StringUtils.containsIgnoreCase(productCode,miChar);
			}

			log.info("匹配到记录：{}, 检查后AT代码符合度为: {},Mi代码符合度为: {}", manualProductMap, fullyMatchAT, fullyMatchMI);

			// 如果匹配到AT的产品代码,则设置对应的Mi产品代码,跳出匹配循环
			if (fullyMatchAT) {
				BeanUtils.copyProperties(manualProductMap, quotationHistory);
				quotationHistory.setId(productCode);
				quotationHistory.setMiProductCode(mapProductCode(productCode, manualProductMap.getId(), manualProductMap.getMiProductCode()));
				log.info("匹配到AT产品:{}，转换为Mi产品:{}", productCode, quotationHistory.getMiProductCode());
				quotationHistory.setProcFlag(false);
				return;
			}

			if (fullyMatchMI) {
				// 匹配到Mi的产品代码,则设置对应的AT产品代码
				BeanUtils.copyProperties(manualProductMap, quotationHistory);
				quotationHistory.setId(mapProductCode(productCode, manualProductMap.getMiProductCode(), manualProductMap.getId()));
				quotationHistory.setMiProductCode(productCode);
				log.info("匹配到Mi产品:{}，转换为AT产品:{}", productCode, quotationHistory.getId());
				quotationHistory.setProcFlag(false);
				return;
			}
		}
		
		quotationHistory.setId("配置库未找到代码为:"+productCode+"的产品");
		quotationHistory.setMiProductCode("以代码:"+beginStr+"为开始的产品");
		quotationHistory.setProcFlag(true);
		this.increaseFinishedPrice();
		return;
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
		
		if(null == oriCode || null == selfType || null == targetType) {
			log.error("输入参数oriCode:{},selfType:{},targetType:{}",oriCode,selfType,targetType);
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

	public Boolean getNeedPrice() {
		return needPrice;
	}

	public void setNeedPrice(Boolean needPrice) {
		this.needPrice = needPrice;
	}

	public Integer getTotal() {
		return total;
	}

	public void setTotal(Integer total) {
		this.total = total;
	}

	public Integer getFinishedMap() {
		return finishedMap;
	}

	public void setFinishedMap(Integer finishedMap) {
		this.finishedMap = finishedMap;
	}

	public Integer getFinishedPrice() {
		return finishedPrice;
	}

	public void setFinishedPrice(Integer finishedPrice) {
		this.finishedPrice = finishedPrice;
	}
	
	public void increaseFinishedPrice() {
		this.finishedPrice ++;
	}

	public void increaseFinishedMap() {
		this.finishedMap ++;
	}
	
	
	public String getUserid() {
		return userid;
	}

	public void setUserid(String userid) {
		this.userid = userid;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public static void main(String[] args) {

		QuotationProcessor processor = new QuotationProcessor();

		//System.out.println(processor.extractBeginChar("PSFRN6-15-F5-B3-P3"));
		System.out.println(processor.mapProductCode(" pSfrN6-15-F5-b3-P3","PSFRN①-②-F③-B④-P⑤","ASTSE-①-g6-②-F③-P④-M⑤-B"));

	}

}
