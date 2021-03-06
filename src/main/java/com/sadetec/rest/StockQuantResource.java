/*
 * Source code generated by Celerio, a Jaxio product.
 * Documentation: http://www.jaxio.com/documentation/celerio/
 * Follow us on twitter: @jaxiosoft
 * Need commercial support ? Contact us: info@jaxio.com
 * Template pack-angular:src/main/java/rest/EntityResource.java.e.vm
 */
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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sadetec.model.SalesOrder;
import com.sadetec.model.StockQuant;
import com.sadetec.repository.StockQuantRepository;
import com.sadetec.rest.support.PageResponse;
import com.sadetec.service.StorageException;
import com.sadetec.service.StorageService;
import com.sadetec.util.ExcelImportUtils;
import com.sadetec.util.WorkbookProperties;

@RestController
@RequestMapping("/api/stockQuant")
public class StockQuantResource {

    private final Logger log = LoggerFactory.getLogger(StockQuantResource.class);

    @Autowired
    private StockQuantRepository stockQuantRepository;
    
	@Autowired
	private StorageService storageService;

	@Autowired
	private WorkbookProperties workbookProperties;
    
	@Autowired
	private ObjectMapper objectMapper;

    /**
     * 上传库存信息
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

			List<Map<String, Object>> columnValues = ExcelImportUtils.columns(workbook, workbookProperties.getStockQuantConfig());

			List<String> errors = new ArrayList<String>();
			for (Map<String, Object> map : columnValues) {
				try {
					StockQuant tempStock = new StockQuant();
					BeanUtils.populate(tempStock, map);
					StockQuant quant = stockQuantRepository.findOneByLocationAndLot(tempStock.getLocation(),tempStock.getLot());
					if(null != quant) {
						BeanUtils.populate(quant, map);
						stockQuantRepository.saveAndFlush(quant);
					} else {
						log.info("待保存库存信息:{}", tempStock);
						stockQuantRepository.saveAndFlush(tempStock);
					}
				}
				catch (Exception e) {
					log.error("导入库存信息出错：{},失败原因:{}", map, e.getCause());
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
	public ResponseEntity<PageResponse<StockQuant>> create(@RequestBody String json) throws URISyntaxException {

		log.info("Create json : {}", json);

		List<StockQuant> pageContents = new ArrayList<StockQuant>();
		PageResponse<StockQuant> pageResponse = new PageResponse<StockQuant>(pageContents);

		try {
			JsonNode root = objectMapper.readTree(json);
			JsonNode tempNode = root.get("data");
			if (tempNode.isArray()) {
				List<StockQuant> stockQuants = objectMapper.convertValue(tempNode, new TypeReference<List<StockQuant>>() {
				});
				for (StockQuant temp : stockQuants) {
					log.info("StockQuant to Create : {}", temp);
					stockQuantRepository.save(temp);
				}
				pageContents.addAll(stockQuants);
			}
			else {
				StockQuant tempObj = objectMapper.convertValue(tempNode, StockQuant.class);
				stockQuantRepository.save(tempObj);
				pageContents.add(tempObj);
			}

			pageResponse.setSuccess(Boolean.TRUE);
			pageResponse.setMessage("Create StockQuant Success");
			return new ResponseEntity<PageResponse<StockQuant>>(pageResponse, HttpStatus.OK);

		}
		catch (Exception e) {
			e.printStackTrace();
			pageResponse.setSuccess(Boolean.FALSE);
			pageResponse.setMessage("Create StockQuant Failure");
			return new ResponseEntity<PageResponse<StockQuant>>(pageResponse, HttpStatus.OK);
		}

	}

	@RequestMapping(value = "/page", method = GET, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<PageResponse<StockQuant>> findPage(@RequestParam(value = "page", required = false, defaultValue = "1") Integer page,
			@RequestParam(value = "start", required = false) Integer start, @RequestParam(value = "limit", required = false, defaultValue = "25") Integer limit,
			@RequestParam(value = "filter", required = false) String filter, @RequestParam(value = "sort", required = false) String sort,
			@RequestParam(value = "resId", required = false) Integer resId) throws URISyntaxException {

		Page<StockQuant> result  = stockQuantRepository.findAll(new PageRequest(page - 1, limit));
		PageResponse<StockQuant> pageResponse = new PageResponse<StockQuant>(result.getContent());
		pageResponse.setSuccess(Boolean.TRUE);
		pageResponse.setTotal(result.getTotalElements());

		return new ResponseEntity<PageResponse<StockQuant>>(pageResponse, HttpStatus.OK);

	}
	
	@RequestMapping(value = "/findStock", method = GET, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<PageResponse<StockQuant>> findStock(
			@RequestParam(value = "formInstanceId", required = false) Integer formInstanceId) throws URISyntaxException {

		List<StockQuant> result  = stockQuantRepository.findByProductIdInSalesOrder(formInstanceId);
		PageResponse<StockQuant> pageResponse = new PageResponse<StockQuant>(result);
		pageResponse.setSuccess(Boolean.TRUE);
		pageResponse.setTotal(result.size());

		return new ResponseEntity<PageResponse<StockQuant>>(pageResponse, HttpStatus.OK);

	}

	@RequestMapping(value = "/update", method = POST, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<PageResponse<StockQuant>> update(@RequestBody String json) throws URISyntaxException {

		log.debug("Update by id StockQuant : {}", json);
		PageResponse<StockQuant> pageResponse = new PageResponse<StockQuant>(null);
		TypeReference<List<StockQuant>> typeRef = new TypeReference<List<StockQuant>>() {
		};
		try {
			JsonNode root = objectMapper.readTree(json);
			JsonNode tempNode = root.get("data");
			if (tempNode.isArray()) {
				List<StockQuant> temps = objectMapper.convertValue(tempNode, typeRef);
				for (Iterator<StockQuant> ketIter = temps.iterator(); ketIter.hasNext();) {
					StockQuant tempObj = ketIter.next();
					stockQuantRepository.save(tempObj);
				}
			}
			else {
				StockQuant tempObj = objectMapper.convertValue(tempNode, StockQuant.class);
				stockQuantRepository.save(tempObj);
			}

			pageResponse.setSuccess(Boolean.TRUE);
			pageResponse.setMessage("Update StockQuant Success");
			return new ResponseEntity<PageResponse<StockQuant>>(pageResponse, HttpStatus.OK);
		}
		catch (Exception e) {
			e.printStackTrace();
			pageResponse.setSuccess(Boolean.FALSE);
			pageResponse.setMessage("Update StockQuant Failure");
			return new ResponseEntity<PageResponse<StockQuant>>(pageResponse, HttpStatus.OK);
		}

	}

	@RequestMapping(value = "/delete", method = POST, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<PageResponse<StockQuant>> delete(@RequestBody String json) throws URISyntaxException {

		log.debug("Delete by id StockQuant : {}", json);
		PageResponse<StockQuant> pageResponse = new PageResponse<StockQuant>(null);
		TypeReference<List<StockQuant>> typeRef = new TypeReference<List<StockQuant>>() {
		};
		try {
			JsonNode root = objectMapper.readTree(json);
			JsonNode tempNode = root.get("data");
			if (tempNode.isArray()) {
				List<StockQuant> temps = objectMapper.convertValue(tempNode, typeRef);
				for (Iterator<StockQuant> ketIter = temps.iterator(); ketIter.hasNext();) {
					StockQuant tempObj = ketIter.next();
					StockQuant temp = stockQuantRepository.findOne(tempObj.getId());
					if (null != temp) {
						stockQuantRepository.delete(temp);
					}
				}
			}
			else {
				StockQuant tempObj = objectMapper.convertValue(tempNode, StockQuant.class);
				StockQuant temp = stockQuantRepository.findOne(tempObj.getId());
				if (null != temp) {
					stockQuantRepository.delete(temp);
				}
			}

			pageResponse.setSuccess(Boolean.TRUE);
			pageResponse.setMessage("Delete StockQuant Success");
			return new ResponseEntity<PageResponse<StockQuant>>(pageResponse, HttpStatus.OK);
		}
		catch (Exception e) {
			e.printStackTrace();
			pageResponse.setSuccess(Boolean.FALSE);
			pageResponse.setMessage("Delete StockQuant Failure");
			return new ResponseEntity<PageResponse<StockQuant>>(pageResponse, HttpStatus.OK);
		}

	}
}