package com.sadetec.rest;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

import java.io.IOException;
import java.net.URISyntaxException;
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
import com.sadetec.model.SysRole;
import com.sadetec.repository.ManualProductMapRepository;
import com.sadetec.rest.support.AutoCompleteQuery;
import com.sadetec.rest.support.PageResponse;
import com.sadetec.service.StorageException;
import com.sadetec.service.StorageService;
import com.sadetec.util.ExcelImportUtils;
import com.sadetec.util.FilterCondition;
import com.sadetec.util.UserContext;
import com.sadetec.util.WorkbookProperties;

@RestController
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
					manualProductMapRepository.save(tempMap);
				}
				catch (Exception e) {
					log.error("导入产品对照信息出错：{},失败原因:{}", map, e.getMessage());
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

	@PostMapping("/compare")
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

			List<String> errors = new ArrayList<String>();
			for (Map<String, Object> map : columnValues) {
				try {
					String productCode = (String)map.get("productCode");
					if (StringUtils.hasText(productCode)) {
						List<ManualProductMap> result = manualProductMapRepository.findByMiProductCodeOrId(productCode,productCode);
						if (result.size() > 0) {
							returnList.add(result.get(0));
						}
						else {
							log.error("配置库中未找到报价产品对照信息：{}", map);
						}
					}
				}
				catch (Exception e) {
					log.error("报价产品对照信息出错：{},失败原因:{}", map, e.getMessage());
				}
			}
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
	public ResponseEntity<PageResponse<ManualProductMap>> findAll(@RequestParam(value = "page", required = false, defaultValue = "1") Integer page,
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
		Page<ManualProductMap> result;
		if (null != productCode) {
			result = manualProductMapRepository.findByMiProductCodeContainsOrIdContains(productCode, productCode, new PageRequest(0, limit));
		}
		else {
			result = manualProductMapRepository.findAll(new PageRequest(page - 1, limit));
		}

		List<ManualProductMap> postAuthResults = result.getContent();

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
}