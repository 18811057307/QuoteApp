package com.sadetec.rest;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

import java.io.IOException;
import java.net.URISyntaxException;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.util.Assert;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sadetec.model.ManualProductMap;
import com.sadetec.model.ProcessorStatus;
import com.sadetec.model.Product;
import com.sadetec.model.QuotationHistory;
import com.sadetec.model.QuotationLog;
import com.sadetec.model.SysUser;
import com.sadetec.repository.ManualProductMapRepository;
import com.sadetec.repository.ProductRepository;
import com.sadetec.repository.QuotationHistoryRepository;
import com.sadetec.repository.QuotationLogRepository;
import com.sadetec.repository.SysUserRepository;
import com.sadetec.rest.support.AutoCompleteQuery;
import com.sadetec.rest.support.PageResponse;
import com.sadetec.service.StorageException;
import com.sadetec.service.StorageService;
import com.sadetec.util.ExcelImportUtils;
import com.sadetec.util.FilterCondition;
import com.sadetec.util.PricePageProcessor;
import com.sadetec.util.QuotationProcessor;
import com.sadetec.util.UserContext;
import com.sadetec.util.WorkbookProperties;

@RestController
@EnableGlobalMethodSecurity(prePostEnabled = true)
@RequestMapping("/api/manualProductMap")
public class ManualProductMapResource {

	private final Logger log = LoggerFactory.getLogger(ManualProductMapResource.class);

	@Autowired
	private ManualProductMapRepository manualProductMapRepository;

	@Autowired
	private ObjectMapper objectMapper;

	@Autowired
	private StorageService storageService;

	@Autowired
	private WorkbookProperties workbookProperties;

	@Autowired
	private PricePageProcessor pricePageProcessor;

	@Autowired
	private ProductRepository productRepository;

	@Autowired
	private QuotationHistoryRepository quotationHistoryRepository;

	@Autowired
	private QuotationLogRepository quotationLogRepository;

	@Autowired
	private QuotationProcessor quotationProcessor;

	@Autowired
	private SysUserRepository sysUserRepository;
	
	@PostMapping("/upload")
	public ResponseEntity<PageResponse> handleFileUpload(@RequestParam("file") MultipartFile file) throws IOException {
		try {
			storageService.store(file);
			PageResponse pageResponse = new PageResponse(null);
			pageResponse.setSuccess(true);

			String oriFileName = file.getOriginalFilename();

			Workbook workbook = null;
			if (oriFileName.endsWith("xlsx")) {
				workbook = new XSSFWorkbook(storageService.loadAsStream(oriFileName));
			}
			else if (oriFileName.endsWith("xls")) {
				workbook = new HSSFWorkbook(storageService.loadAsStream(oriFileName));
			}

			List<Map<String, Object>> columnValues = ExcelImportUtils.columns(workbook, workbookProperties.getProductMapConfig());

			List<String> errors = new ArrayList<String>();
			for (Map<String, Object> map : columnValues) {
				try {
					ManualProductMap tempMap = new ManualProductMap();
					BeanUtils.populate(tempMap, map);
					log.info("待保存对照:{}", tempMap);
					manualProductMapRepository.saveAndFlush(tempMap);
				}
				catch (Exception e) {
					log.error("导入产品对照信息出错：{},失败原因:{}", map, e.getCause());
				}
			}

			return new ResponseEntity<PageResponse>(pageResponse, HttpStatus.OK);
		}
		catch (StorageException se) {
			PageResponse pageResponse = new PageResponse(null);
			pageResponse.setSuccess(false);
			pageResponse.setMessage(se.getMessage());
			return new ResponseEntity<PageResponse>(pageResponse, HttpStatus.OK);
		}
	}

	@RequestMapping(value = "/needPrice", method = GET, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<PageResponse<Product>> needPrice(@RequestParam(value = "needPrice", required = false, defaultValue = "false") Boolean needPrice,
			@RequestParam(value = "userid", required = false, defaultValue = "fragrantland") String userid,
			@RequestParam(value = "password", required = false, defaultValue = "passw0rd") String password) throws URISyntaxException {

		List<Product> result = new ArrayList<>();
		PageResponse<Product> status = new PageResponse<Product>(result);

		String loginName = UserContext.getUsername();

		log.info("报价处理时是否查询Mi报价:{}, 账户:{}, 密码:{}", needPrice, userid, password);

		quotationProcessor.initMiUser(loginName, userid, password, needPrice);

		status.setSuccess(Boolean.TRUE);
		status.setMessage("查询价格设置完成.");
		status.setData(result);
		return new ResponseEntity<PageResponse<Product>>(status, HttpStatus.OK);

	}

	@RequestMapping(value = "/compareStatus", method = GET, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<ProcessorStatus> compareStatus() throws URISyntaxException {
		ProcessorStatus status = new ProcessorStatus();
		String loginName = UserContext.getUsername();
		status.setTotal(quotationProcessor.getTotal(loginName));
		status.setFinished(quotationProcessor.getFinishedMap(loginName));
		status.setActiveCount(quotationProcessor.getFinishedPrice(loginName));
		return new ResponseEntity<ProcessorStatus>(status, HttpStatus.OK);

	}

	@RequestMapping(value = "/getMyQuotation", method = GET, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<PageResponse<QuotationHistory>> getMyQuotation() throws IOException {
		
		String loginName = UserContext.getUsername();
		List<QuotationHistory> returnList = quotationHistoryRepository.findByLoginName(loginName);
		
		String name = "匿名用户";
		SysUser curUser = sysUserRepository.getByLoginName(loginName);
		if(null != curUser) {
			name = curUser.getName();
		}
		
		Timestamp now = Timestamp.valueOf(LocalDateTime.now());
		
		// 查询完成后,将本次查询的结果另存至QuotationLog表中,用于统计
		for (QuotationHistory temp : returnList) {

			if (!org.apache.commons.lang3.StringUtils.contains(temp.getAtProductCode(), "未找到")) {
				try {
					QuotationLog tempLog = new QuotationLog();
					org.springframework.beans.BeanUtils.copyProperties(temp, tempLog, "id");
					tempLog.setName(name);
					tempLog.setQuotationTime(now);
					log.info("报价对照另存到日志表,待保存信息:{}", tempLog);
					quotationLogRepository.saveAndFlush(tempLog);
				}
				catch (Exception e) {
					e.printStackTrace();
					log.error("转存产品对照信息出错：{},失败原因:{}", temp, e.getCause());
				}
			}

		}

		List<String> curUserRoles = UserContext.getRoles();

		if (!curUserRoles.contains("ADMIN")) {

			if (!curUserRoles.contains("MI_QUOTE")) {
				for (QuotationHistory temp : returnList) {
					temp.setMiProductQuote(null);
				}
			}
			if (!curUserRoles.contains("AT_QUOTE")) {
				for (QuotationHistory temp : returnList) {
					temp.setAtProductQuote(null);
				}
			}
			if (!curUserRoles.contains("FACTORY_QUOTE")) {
				for (QuotationHistory temp : returnList) {
					temp.setFactoryQuote(null);
				}
			}
			if (!curUserRoles.contains("UNI_QUOTE")) {
				for (QuotationHistory temp : returnList) {
					temp.setUniQuote(null);
				}
			}
		}

		PageResponse<QuotationHistory> pageResponse = new PageResponse<QuotationHistory>(returnList);
		pageResponse.setSuccess(true);
		return new ResponseEntity<PageResponse<QuotationHistory>>(pageResponse, HttpStatus.OK);

	}

	@RequestMapping(value = "/quoteQuery", method = GET, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<PageResponse<ManualProductMap>> quoteQuery(@RequestParam(value = "productCode", required = true) String productCode)
			throws IOException {
		List<ManualProductMap> returnList = new ArrayList<ManualProductMap>();
		PageResponse<ManualProductMap> pageResponse = new PageResponse<ManualProductMap>(returnList);

		List<QuotationHistory> toProcessed = new ArrayList<QuotationHistory>();

		String[] tempCodes;
		if (productCode.contains(",")) {
			tempCodes = StringUtils.commaDelimitedListToStringArray(productCode);
		}
		else if (productCode.contains(";")) {
			tempCodes = StringUtils.delimitedListToStringArray(productCode, ";");
		}
		else {
			tempCodes = new String[] { productCode };
		}

		String loginName = UserContext.getUsername();
		for (String tempCode : tempCodes) {
			if (StringUtils.hasText(tempCode)) {
				QuotationHistory temp = new QuotationHistory();
				temp.setProductCode(StringUtils.trimWhitespace(tempCode));
				temp.setLoginName(loginName);
				toProcessed.add(temp);
			}

		}

		quotationHistoryRepository.deleteByLoginName(loginName);
		quotationProcessor.initThreadMap(loginName, toProcessed.size());
		quotationProcessor.executeAsyncTask(loginName, toProcessed);

		pageResponse.setMessage("报价查询请求已提交，后台正在处理，可在下方查看报价处理进度...");
		pageResponse.setSuccess(true);
		return new ResponseEntity<PageResponse<ManualProductMap>>(pageResponse, HttpStatus.OK);

	}

	@PostMapping(value = "/compare", produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<PageResponse<ManualProductMap>> compare(@RequestParam("file") MultipartFile file) throws IOException {
		List<ManualProductMap> returnList = new ArrayList<ManualProductMap>();
		PageResponse<ManualProductMap> pageResponse = new PageResponse<ManualProductMap>(returnList);
		try {
			storageService.store(file);
			String oriFileName = file.getOriginalFilename();
			Workbook workbook = null;
			if (oriFileName.endsWith("xlsx")) {
				workbook = new XSSFWorkbook(storageService.loadAsStream(oriFileName));
			}
			else if (oriFileName.endsWith("xls")) {
				workbook = new HSSFWorkbook(storageService.loadAsStream(oriFileName));
			}

			List<Map<String, Object>> columnValues = ExcelImportUtils.columns(workbook, workbookProperties.getQuoteConfig());

			List<QuotationHistory> toProcessed = new ArrayList<QuotationHistory>();
			String loginName = UserContext.getUsername();
			for (Map<String, Object> map : columnValues) {
				String productCode = (String) map.get("productCode");
				if (StringUtils.hasText(productCode)) {
					QuotationHistory temp = new QuotationHistory();
					temp.setProductCode(StringUtils.trimWhitespace(productCode));
					temp.setLoginName(loginName);
					toProcessed.add(temp);
				}

			}

			quotationHistoryRepository.deleteByLoginName(loginName);

			quotationProcessor.initThreadMap(loginName, toProcessed.size());
			quotationProcessor.executeAsyncTask(loginName, toProcessed);
			log.info("开始处理用户:{}提交的价格查询请求,共计产品项:{}", UserContext.getUsername(), toProcessed.size());
			pageResponse.setSuccess(true);
			return new ResponseEntity<PageResponse<ManualProductMap>>(pageResponse, HttpStatus.OK);
		}
		catch (StorageException se) {
			log.error("报价产品对照信息失败,原因:{}", se.getMessage());
			pageResponse.setSuccess(false);
			return new ResponseEntity<PageResponse<ManualProductMap>>(pageResponse, HttpStatus.INSUFFICIENT_STORAGE);
		}
	}

	/**
	 * Create a new ManualProductMap.
	 */
	@RequestMapping(value = "/create", method = POST, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<PageResponse<ManualProductMap>> create(@RequestBody String json) throws URISyntaxException {

		log.info("Create json : {}", json);

		List<ManualProductMap> pageContents = new ArrayList<ManualProductMap>();
		PageResponse<ManualProductMap> pageResponse = new PageResponse<ManualProductMap>(pageContents);

		try {
			JsonNode root = objectMapper.readTree(json);
			JsonNode tempNode = root.get("data");
			if (tempNode.isArray()) {
				List<ManualProductMap> manualProductMaps = objectMapper.convertValue(tempNode, new TypeReference<List<ManualProductMap>>() {
				});
				for (ManualProductMap temp : manualProductMaps) {
					log.info("ManualProductMap to Create : {}", temp);
					manualProductMapRepository.save(temp);
				}
				pageContents.addAll(manualProductMaps);
			}
			else {
				ManualProductMap tempObj = objectMapper.convertValue(tempNode, ManualProductMap.class);
				manualProductMapRepository.save(tempObj);
				pageContents.add(tempObj);
			}

			pageResponse.setSuccess(Boolean.TRUE);
			pageResponse.setMessage("Create ManualProductMap Success");
			return new ResponseEntity<PageResponse<ManualProductMap>>(pageResponse, HttpStatus.OK);

		}
		catch (Exception e) {
			e.printStackTrace();
			pageResponse.setSuccess(Boolean.FALSE);
			pageResponse.setMessage("Create ManualProductMap Failure");
			return new ResponseEntity<PageResponse<ManualProductMap>>(pageResponse, HttpStatus.OK);
		}

	}

	/**
	 * Find by id ManualProductMap.
	 */
	@RequestMapping(value = "/{id}", method = GET, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<ManualProductMap> findById(@PathVariable Integer id) throws URISyntaxException {

		log.debug("Find by id ManualProductMap : {}", id);

		return Optional.ofNullable(manualProductMapRepository.findOne(id)).map(ManualProductMap -> new ResponseEntity<>(ManualProductMap, HttpStatus.OK))
				.orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	/**
	 * Find a Page of ManualProductMap using query by example.
	 */
	@RequestMapping(value = "/page", method = GET, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<PageResponse<ManualProductMap>> findPage(@RequestParam(value = "page", required = false, defaultValue = "1") Integer page,
			@RequestParam(value = "start", required = false) Integer start, @RequestParam(value = "limit", required = false, defaultValue = "25") Integer limit,
			@RequestParam(value = "filter", required = false) String filter, @RequestParam(value = "sort", required = false) String sort,
			@RequestParam(value = "productCode", required = false) String productCode) throws URISyntaxException {

		if (null != filter) {
			List<FilterCondition> temps = FilterCondition.decodeJson(filter);

			ManualProductMap probe = new ManualProductMap();
			ExampleMatcher matcher = ExampleMatcher.matching();
			for (FilterCondition filterCondition : temps) {
				// BeanUtils.setProperty(probe, filterCondition.getField(),
				// filterCondition.getValue());
			}
		}
		Page<ManualProductMap> result = null;
		;
		List<ManualProductMap> postAuthResults = new ArrayList<>();
		if (null != productCode) {
			if (productCode.contains(",")) {

				String[] tempCodes = StringUtils.commaDelimitedListToStringArray(productCode);
				for (String tempCode : tempCodes) {
					result = manualProductMapRepository.findByMiProductCodeContainsOrIdContains(tempCode, tempCode, new PageRequest(0, limit));
					postAuthResults.addAll(result.getContent());
				}

			}
			else if (productCode.contains(";")) {

				String[] tempCodes = StringUtils.delimitedListToStringArray(productCode, ";");
				for (String tempCode : tempCodes) {
					result = manualProductMapRepository.findByMiProductCodeContainsOrIdContains(tempCode, tempCode, new PageRequest(0, limit));
					postAuthResults.addAll(result.getContent());
				}

			}
			else {
				result = manualProductMapRepository.findByMiProductCodeContainsOrIdContains(productCode, productCode, new PageRequest(0, limit));
				postAuthResults.addAll(result.getContent());
			}

		}
		else {
			result = manualProductMapRepository.findAll(new PageRequest(page - 1, limit));
			postAuthResults.addAll(result.getContent());
		}

		List<String> curUserRoles = UserContext.getRoles();

		if (!curUserRoles.contains("ADMIN")) {

			if (!curUserRoles.contains("MI_QUOTE")) {
				for (ManualProductMap temp : postAuthResults) {
					temp.setMiProductQuote(null);
				}
			}
			if (!curUserRoles.contains("AT_QUOTE")) {
				for (ManualProductMap temp : postAuthResults) {
					temp.setAtProductQuote(null);
				}
			}
			if (!curUserRoles.contains("FACTORY_QUOTE")) {
				for (ManualProductMap temp : postAuthResults) {
					temp.setFactoryQuote(null);
				}
			}
			if (!curUserRoles.contains("UNI_QUOTE")) {
				for (ManualProductMap temp : postAuthResults) {
					temp.setUniQuote(null);
				}
			}
		}

		PageResponse<ManualProductMap> pageResponse = new PageResponse<ManualProductMap>(postAuthResults);
		pageResponse.setSuccess(Boolean.TRUE);
		pageResponse.setTotal(result.getTotalElements());

		return new ResponseEntity<PageResponse<ManualProductMap>>(pageResponse, HttpStatus.OK);

	}

	/**
	 * Auto complete support.
	 */
	@RequestMapping(value = "/complete", method = POST, produces = APPLICATION_JSON_VALUE)
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<List<ManualProductMap>> complete(@RequestBody AutoCompleteQuery acq) throws URISyntaxException {

		List<ManualProductMap> results = manualProductMapRepository.complete(acq.query, acq.maxResults);

		return new ResponseEntity<>(results, new HttpHeaders(), HttpStatus.OK);
	}

	/**
	 * update
	 */
	@RequestMapping(value = "/update", method = POST, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<PageResponse<ManualProductMap>> update(@RequestBody String json) throws URISyntaxException {

		log.debug("Update by id ManualProductMap : {}", json);
		PageResponse<ManualProductMap> pageResponse = new PageResponse<ManualProductMap>(null);
		TypeReference<List<ManualProductMap>> typeRef = new TypeReference<List<ManualProductMap>>() {
		};
		try {
			JsonNode root = objectMapper.readTree(json);
			JsonNode tempNode = root.get("data");
			if (tempNode.isArray()) {
				List<ManualProductMap> temps = objectMapper.convertValue(tempNode, typeRef);
				for (Iterator<ManualProductMap> ketIter = temps.iterator(); ketIter.hasNext();) {
					ManualProductMap tempObj = ketIter.next();
					manualProductMapRepository.save(tempObj);
				}
			}
			else {
				ManualProductMap tempObj = objectMapper.convertValue(tempNode, ManualProductMap.class);
				manualProductMapRepository.save(tempObj);
			}

			pageResponse.setSuccess(Boolean.TRUE);
			pageResponse.setMessage("Update ManualProductMap Success");
			return new ResponseEntity<PageResponse<ManualProductMap>>(pageResponse, HttpStatus.OK);
		}
		catch (Exception e) {
			e.printStackTrace();
			pageResponse.setSuccess(Boolean.FALSE);
			pageResponse.setMessage("Update ManualProductMap Failure");
			return new ResponseEntity<PageResponse<ManualProductMap>>(pageResponse, HttpStatus.OK);
		}

	}

	/**
	 * Delete by id ManualProductMap.
	 */
	@RequestMapping(value = "/delete", method = POST, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<PageResponse<ManualProductMap>> delete(@RequestBody String json) throws URISyntaxException {

		log.debug("Delete by id ManualProductMap : {}", json);
		PageResponse<ManualProductMap> pageResponse = new PageResponse<ManualProductMap>(null);
		TypeReference<List<ManualProductMap>> typeRef = new TypeReference<List<ManualProductMap>>() {
		};
		try {
			JsonNode root = objectMapper.readTree(json);
			JsonNode tempNode = root.get("data");
			if (tempNode.isArray()) {
				List<ManualProductMap> temps = objectMapper.convertValue(tempNode, typeRef);
				for (Iterator<ManualProductMap> ketIter = temps.iterator(); ketIter.hasNext();) {
					ManualProductMap tempObj = ketIter.next();
					ManualProductMap temp = manualProductMapRepository.findById(tempObj.getId());
					if (null != temp) {
						manualProductMapRepository.delete(temp);
					}
				}
			}
			else {
				ManualProductMap tempObj = objectMapper.convertValue(tempNode, ManualProductMap.class);
				ManualProductMap temp = manualProductMapRepository.findById(tempObj.getId());
				if (null != temp) {
					manualProductMapRepository.delete(temp);
				}
			}

			pageResponse.setSuccess(Boolean.TRUE);
			pageResponse.setMessage("Delete ManualProductMap Success");
			return new ResponseEntity<PageResponse<ManualProductMap>>(pageResponse, HttpStatus.OK);
		}
		catch (Exception e) {
			e.printStackTrace();
			pageResponse.setSuccess(Boolean.FALSE);
			pageResponse.setMessage("Delete ManualProductMap Failure");
			return new ResponseEntity<PageResponse<ManualProductMap>>(pageResponse, HttpStatus.OK);
		}

	}

	@RequestMapping(value = "/inquiryMiPrice", method = GET, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<PageResponse<Product>> inquiryMiPrice(@RequestParam(value = "miProductCode", required = true) String miProductCode,
			@RequestParam(value = "atProductCode", required = true) String atProductCode,
			@RequestParam(value = "userid", required = false, defaultValue = "fragrantland") String userid,
			@RequestParam(value = "password", required = false, defaultValue = "passw0rd") String password) throws URISyntaxException {

		List<Product> result = new ArrayList<>();
		PageResponse<Product> status = new PageResponse<Product>(result);

		ManualProductMap manualProductMap = manualProductMapRepository.findById(atProductCode);

		Product miProduct = new Product();
		miProduct.setBrdCode("");
		miProduct.setId(miProductCode);

		if (null == manualProductMap || null == manualProductMap.getMiProductQuote() || 0 == manualProductMap.getMiProductQuote().intValue()) {
			try {
				pricePageProcessor.login(userid, password);
			}
			catch (Exception e) {
				log.error("登录mi失败{},帐号{}密码{}", e.getCause(), userid, password);
				status.setSuccess(Boolean.FALSE);
				status.setMessage("查询Mi产品价格时登录Mi网站失败.");
				return new ResponseEntity<PageResponse<Product>>(status, HttpStatus.OK);
			}
			miProduct.setUnitPrice(pricePageProcessor.process(miProduct, 1));

			if (null != manualProductMap) {
				manualProductMap.setMiProductQuote(miProduct.getUnitPrice());
				manualProductMapRepository.save(manualProductMap);
			}
		}
		else {
			miProduct.setUnitPrice(manualProductMap.getMiProductQuote());
		}

		result.add(miProduct);
		status.setSuccess(Boolean.TRUE);
		status.setMessage("查询Mi产品价格完成");
		status.setData(result);
		return new ResponseEntity<PageResponse<Product>>(status, HttpStatus.OK);

	}
}