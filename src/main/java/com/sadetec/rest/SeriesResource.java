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

import org.apache.commons.beanutils.BeanUtils;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sadetec.model.Category;
import com.sadetec.model.Series;
import com.sadetec.model.Series_;
import com.sadetec.repository.CategoryRepository;
import com.sadetec.repository.SeriesRepository;
import com.sadetec.rest.support.PageResponse;
import com.sadetec.service.StorageException;
import com.sadetec.service.StorageService;
import com.sadetec.util.ExcelImportUtils;
import com.sadetec.util.WorkbookProperties;

@RestController
@RequestMapping("/api/series")
public class SeriesResource {

    private final Logger log = LoggerFactory.getLogger(SeriesResource.class);

	@Autowired
	private ObjectMapper objectMapper;
	
    @Autowired
    private SeriesRepository seriesRepository;
    
    @Autowired
    private CategoryRepository categoryRepository;
    
	@Autowired
	private WorkbookProperties workbookProperties;

	@Autowired
	private StorageService storageService;

    /**
     * 上传产品类别
     * 
     * @param file
     * @return
     * @throws IOException
     */
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

			List<Map<String, Object>> columnValues = ExcelImportUtils.columns(workbook, workbookProperties.getProductSeriesConfig());

			List<String> errors = new ArrayList<String>();
			for (Map<String, Object> map : columnValues) {
				try {
					Series tempSeries = new Series();
					BeanUtils.populate(tempSeries, map);
					
					Category tempCategory = categoryRepository.getByCategoryName(tempSeries.getSeriesName());
					if(null != tempCategory) {
						tempSeries.setCategoryCode(tempCategory.getId());
					}
					
					log.info("待保存订单产品信息:{}", tempSeries);
					seriesRepository.saveAndFlush(tempSeries);
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

	@RequestMapping(value = "/create", method = POST, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<PageResponse<Series>> create(@RequestBody String json) throws URISyntaxException {

		log.info("Create json : {}", json);

		List<Series> pageContents = new ArrayList<Series>();
		PageResponse<Series> pageResponse = new PageResponse<Series>(pageContents);
		
		try {
			JsonNode root = objectMapper.readTree(json);
			JsonNode tempNode = root.get("data");
			if (tempNode.isArray()) {
				List<Series> seriess = objectMapper.convertValue(tempNode, new TypeReference<List<Series>>() {
				});
				for (Series temp : seriess) {
					log.info("Series to Create : {}", temp);
					seriesRepository.save(temp);
				}
				pageContents.addAll(seriess);
			}
			else {
				Series tempObj = objectMapper.convertValue(tempNode, Series.class);
				seriesRepository.save(tempObj);
				pageContents.add(tempObj);
			}

			pageResponse.setSuccess(Boolean.TRUE);
			pageResponse.setMessage("Create Series Success");
			return new ResponseEntity<PageResponse<Series>>(pageResponse, HttpStatus.OK);

		}
		catch (Exception e) {
			e.printStackTrace();
			pageResponse.setSuccess(Boolean.FALSE);
			pageResponse.setMessage("Create Series Failure");
			return new ResponseEntity<PageResponse<Series>>(pageResponse, HttpStatus.OK);
		}

	}
	
	@RequestMapping(value = "/page", method = GET, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<PageResponse<Series>> findPage(@RequestParam(value = "page", required = false, defaultValue = "1") Integer page,
			@RequestParam(value = "start", required = false) Integer start, @RequestParam(value = "limit", required = false, defaultValue = "25") Integer limit,
			@RequestParam(value = "filter", required = false) String filter, @RequestParam(value = "sort", required = false) String sort,
			@RequestParam(value = "categoryCode", required = false) String categoryCode,
			@RequestParam(value = "seriesCode", required = false) String seriesCode) throws URISyntaxException {

		PageRequest pageReq = new PageRequest(page - 1, limit, Sort.Direction.ASC, Series_.id.getName());
		
		
		Page<Series> results;
		if(StringUtils.isEmpty(categoryCode)) {
			if(!StringUtils.isEmpty(seriesCode)) {
				results = seriesRepository.findByIdContains(seriesCode, pageReq);
			} else {
				results = seriesRepository.findAll(pageReq);
			}
		} else {
			results = seriesRepository.findByCategoryCode(categoryCode, pageReq);
		}
		
		PageResponse<Series> pageResponse = new PageResponse<Series>(results.getContent());
		pageResponse.setSuccess(Boolean.TRUE);
		pageResponse.setTotal(results.getTotalElements());

		return new ResponseEntity<PageResponse<Series>>(pageResponse, HttpStatus.OK);

	}
	
	@RequestMapping(value = "/update", method = POST, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<PageResponse<Series>> update(@RequestBody String json) throws URISyntaxException {

		log.debug("Update by id Series : {}", json);
		PageResponse<Series> pageResponse = new PageResponse<Series>(null);
		TypeReference<List<Series>> typeRef = new TypeReference<List<Series>>() {
		};
		try {
			JsonNode root = objectMapper.readTree(json);
			JsonNode tempNode = root.get("data");
			if (tempNode.isArray()) {
				List<Series> temps = objectMapper.convertValue(tempNode, typeRef);
				for (Iterator<Series> ketIter = temps.iterator(); ketIter.hasNext();) {
					Series tempObj = ketIter.next();
					seriesRepository.save(tempObj);
				}
			}
			else {
				Series tempObj = objectMapper.convertValue(tempNode, Series.class);
				seriesRepository.save(tempObj);
			}

			pageResponse.setSuccess(Boolean.TRUE);
			pageResponse.setMessage("Update Series Success");
			return new ResponseEntity<PageResponse<Series>>(pageResponse, HttpStatus.OK);
		}
		catch (Exception e) {
			e.printStackTrace();
			pageResponse.setSuccess(Boolean.FALSE);
			pageResponse.setMessage("Update Series Failure");
			return new ResponseEntity<PageResponse<Series>>(pageResponse, HttpStatus.OK);
		}

	}
	
	@RequestMapping(value = "/delete", method = POST, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<PageResponse<Series>> delete(@RequestBody String json) throws URISyntaxException {

		log.debug("Delete by id Series : {}", json);
		PageResponse<Series> pageResponse = new PageResponse<Series>(null);
		TypeReference<List<Series>> typeRef = new TypeReference<List<Series>>() {
		};
		try {
			JsonNode root = objectMapper.readTree(json);
			JsonNode tempNode = root.get("data");
			if (tempNode.isArray()) {
				List<Series> temps = objectMapper.convertValue(tempNode, typeRef);
				for (Iterator<Series> ketIter = temps.iterator(); ketIter.hasNext();) {
					Series tempObj = ketIter.next();
					Series temp = seriesRepository.findById(tempObj.getId());
					if (null != temp) {
						seriesRepository.delete(temp);
					}
				}
			}
			else {
				Series tempObj = objectMapper.convertValue(tempNode, Series.class);
				Series temp = seriesRepository.findById(tempObj.getId());
				if (null != temp) {
					seriesRepository.delete(temp);
				}
			}

			pageResponse.setSuccess(Boolean.TRUE);
			pageResponse.setMessage("Delete Series Success");
			return new ResponseEntity<PageResponse<Series>>(pageResponse, HttpStatus.OK);
		}
		catch (Exception e) {
			e.printStackTrace();
			pageResponse.setSuccess(Boolean.FALSE);
			pageResponse.setMessage("Delete Series Failure");
			return new ResponseEntity<PageResponse<Series>>(pageResponse, HttpStatus.OK);
		}

	}
}