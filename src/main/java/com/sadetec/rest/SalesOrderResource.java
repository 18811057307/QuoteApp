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
import java.math.BigDecimal;
import java.net.URI;
import java.net.URISyntaxException;
import java.nio.file.FileSystem;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sadetec.model.MailMessage;
import com.sadetec.model.SalesOrder;
import com.sadetec.model.SysUser;
import com.sadetec.repository.CategoryRepository;
import com.sadetec.repository.MailMessageRepository;
import com.sadetec.repository.SalesOrderRepository;
import com.sadetec.repository.SysUserRepository;
import com.sadetec.rest.support.PageResponse;
import com.sadetec.service.StorageException;
import com.sadetec.service.StorageService;
import com.sadetec.util.ExcelImportUtils;
import com.sadetec.util.UserContext;
import com.sadetec.util.WorkbookProperties;

@RestController
@RequestMapping("/api/salesOrder")
public class SalesOrderResource {

	private final Logger log = LoggerFactory.getLogger(SalesOrderResource.class);

	@Autowired
	private SalesOrderRepository salesOrderRepository;

	@Autowired
	private StorageService storageService;

	@Autowired
	private WorkbookProperties workbookProperties;

	@Autowired
	private ObjectMapper objectMapper;

	@Autowired
	private SysUserRepository sysUserRepository;

	@Autowired
	private MailMessageRepository mailMessageRepository;

	@Autowired
	private CategoryRepository categoryRepository;

	/**
	 * 上传销售订单，将订单中的产品信息进行预处理
	 * 
	 * @param file
	 * @return
	 * @throws IOException
	 */
	@PostMapping("/upload")
	public ResponseEntity<PageResponse> handleFileUpload(@RequestParam("file") MultipartFile file,
			@RequestParam(value = "formInstanceId", required = true) Integer formInstanceId) throws IOException {
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

			List<Map<String, Object>> columnValues = ExcelImportUtils.columns(workbook, workbookProperties.getSalseOrderConfig());

			List<String> errors = new ArrayList<String>();
			for (Map<String, Object> map : columnValues) {
				try {
					SalesOrder tempOrder = new SalesOrder();
					BeanUtils.populate(tempOrder, map);
					tempOrder.setFormInstanceId(formInstanceId);
					
					tempOrder.setCostPrice(BigDecimal.ZERO);
					tempOrder.setFactoryPrice(BigDecimal.ZERO);
					tempOrder.setUnitPrice(BigDecimal.ZERO);
					
					tempOrder.setNeedProc(true);
					log.info("待保存订单产品信息:{}", tempOrder);
					//BUG - 过滤Excel中的空行
					if(StringUtils.isNotEmpty(tempOrder.getProductCode()) && StringUtils.isNotEmpty(tempOrder.getCategoryName())) {
						salesOrderRepository.saveAndFlush(tempOrder);
					}
				}
				catch (Exception e) {
					log.error("导入订单出错：{},失败原因:{}", map, e.getCause());
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

	//drawingUpload
	@PostMapping("/drawingUpload")
	public ResponseEntity<PageResponse> drawingUpload(@RequestParam("file") MultipartFile file,
			@RequestParam(value = "salesOrderId", required = true) Integer salesOrderId) throws IOException {
		try {
			Path storePath = storageService.store("询价图纸/"+salesOrderId,file);

			SalesOrder tempOrder = salesOrderRepository.findOne(salesOrderId);
			if(null != tempOrder) {
				tempOrder.setDrawingUrl(storePath.toString());
				salesOrderRepository.save(tempOrder);
			}
			PageResponse pageResponse = new PageResponse(null);
			pageResponse.setSuccess(true);
			pageResponse.setMessage("图纸保存成功,路径为："+storePath.toString());
			return new ResponseEntity<PageResponse>(pageResponse, HttpStatus.OK);
		}
		catch (StorageException se) {
			PageResponse pageResponse = new PageResponse(null);
			pageResponse.setSuccess(false);
			pageResponse.setMessage(se.getMessage());
			return new ResponseEntity<PageResponse>(pageResponse, HttpStatus.OK);
		}
	}
	
	//drawingUpload
	@RequestMapping(value = "/drawingDownload", method = GET)
	@ResponseBody
	public ResponseEntity<Resource> drawingDownload(@RequestParam(value = "salesOrderId", required = true) Integer salesOrderId) throws IOException {
		SalesOrder tempOrder = salesOrderRepository.findOne(salesOrderId);
		String relativePath = tempOrder.getDrawingUrl();
		String fileName;
		if(relativePath.lastIndexOf(FileSystems.getDefault().getSeparator()) != -1) {
			fileName = relativePath.substring(relativePath.lastIndexOf(FileSystems.getDefault().getSeparator()));			
		} else {
			fileName = relativePath;
		}
		HttpHeaders respHeaders = new HttpHeaders();
		respHeaders.setContentType(MediaType.APPLICATION_OCTET_STREAM);
		respHeaders.set("Content-Disposition", "attachment; filename="+fileName);
		Resource fileResource = storageService.loadAsResource(relativePath);
		
		return new ResponseEntity<Resource>(fileResource, respHeaders, HttpStatus.OK);
	}
	/**
	 * Create a new SalesOrder.
	 */
	@RequestMapping(value = "/", method = POST, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<SalesOrder> create(@RequestBody SalesOrder salesOrderDTO) throws URISyntaxException {

		log.debug("Create SalesOrder : {}", salesOrderDTO);

		if (salesOrderDTO.isIdSet()) {
			return ResponseEntity.badRequest().header("Failure", "Cannot create SalesOrder with existing ID").body(null);
		}

		SalesOrder result = salesOrderRepository.save(salesOrderDTO);

		return ResponseEntity.created(new URI("/api/salesOrders/" + result.getId())).body(result);
	}

	/**
	 * Find by id SalesOrder.
	 */
	@RequestMapping(value = "/{id}", method = GET, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<SalesOrder> findById(@PathVariable Integer id) throws URISyntaxException {

		log.debug("Find by id SalesOrder : {}", id);

		return Optional.ofNullable(salesOrderRepository.findOne(id)).map(salesOrderDTO -> new ResponseEntity<>(salesOrderDTO, HttpStatus.OK))
				.orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	/**
	 * Update SalesOrder.
	 */
	@RequestMapping(value = "/update", method = POST, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<PageResponse<SalesOrder>> update(@RequestBody String json) throws URISyntaxException {

		log.debug("Update SalesOrder : {}", json);
		PageResponse<SalesOrder> pageResponse = new PageResponse<SalesOrder>(null);
		TypeReference<List<SalesOrder>> typeRef = new TypeReference<List<SalesOrder>>() {
		};
		try {
			JsonNode root = objectMapper.readTree(json);
			JsonNode tempNode = root.get("data");
			if (tempNode.isArray()) {
				List<SalesOrder> temps = objectMapper.convertValue(tempNode, typeRef);
				for (Iterator<SalesOrder> ketIter = temps.iterator(); ketIter.hasNext();) {
					SalesOrder tempObj = ketIter.next();

					//recordChangeSummary(tempObj); TODO 更好的方法设置权限

					salesOrderRepository.save(tempObj);
				}
			}
			else {
				SalesOrder tempObj = objectMapper.convertValue(tempNode, SalesOrder.class);
				//recordChangeSummary(tempObj);
				salesOrderRepository.save(tempObj);
			}

			pageResponse.setSuccess(Boolean.TRUE);
			pageResponse.setMessage("Update SalesOrder Success");
			return new ResponseEntity<PageResponse<SalesOrder>>(pageResponse, HttpStatus.OK);
		}
		catch (Exception e) {
			e.printStackTrace();
			pageResponse.setSuccess(Boolean.FALSE);
			pageResponse.setMessage("Update SalesOrder Failure");
			return new ResponseEntity<PageResponse<SalesOrder>>(pageResponse, HttpStatus.OK);
		}
	}

	private void recordChangeSummary(SalesOrder salesOrder) {
		if (null != salesOrder.getId()) {
			SalesOrder oriOrder = salesOrderRepository.findOne(salesOrder.getId());

			if (null != oriOrder) {
				String comment = "";
				if (oriOrder.getAmount() != salesOrder.getAmount()) {
					comment += String.format("数量由%d变更为%d;", oriOrder.getAmount(), salesOrder.getAmount());
				}

				if (BigDecimal.ZERO.compareTo(oriOrder.getCostPrice()) == 0 && oriOrder.getCostPrice().compareTo(salesOrder.getCostPrice()) != 0) {
					comment += String.format("成本价设置为%f;", salesOrder.getCostPrice());
				}
				
				if (BigDecimal.ZERO.compareTo(oriOrder.getCostPrice()) != 0 && oriOrder.getCostPrice().compareTo(salesOrder.getCostPrice()) != 0) {
					comment += String.format("成本价由%f变更为%f;", oriOrder.getCostPrice(), salesOrder.getCostPrice());
				}

				if (BigDecimal.ZERO.compareTo(oriOrder.getFactoryPrice()) == 0 && oriOrder.getFactoryPrice().compareTo(salesOrder.getFactoryPrice()) != 0) {
					comment += String.format("出厂价设置为%f;", salesOrder.getFactoryPrice());
				}
				
				if (BigDecimal.ZERO.compareTo(oriOrder.getFactoryPrice()) != 0 && oriOrder.getFactoryPrice().compareTo(salesOrder.getFactoryPrice()) != 0) {
					comment += String.format("出厂价由%f变更为%f;", oriOrder.getFactoryPrice(), salesOrder.getFactoryPrice());
				}
				
				if (BigDecimal.ZERO.compareTo(oriOrder.getUnitPrice()) == 0 && oriOrder.getUnitPrice().compareTo(salesOrder.getUnitPrice()) != 0) {
					comment += String.format("统一价设置为%f;", salesOrder.getUnitPrice());
				}
				
				if (BigDecimal.ZERO.compareTo(oriOrder.getUnitPrice()) != 0 && oriOrder.getUnitPrice().compareTo(salesOrder.getUnitPrice()) != 0) {
					comment += String.format("统一价由%f变更为%f;", oriOrder.getUnitPrice(), salesOrder.getUnitPrice());
				}

				if (!StringUtils.equals(oriOrder.getAuditorId(), salesOrder.getAuditorId())) {
					SysUser oriAuditor = sysUserRepository.getByLoginName(oriOrder.getAuditorId());
					SysUser newAuditor = sysUserRepository.getByLoginName(salesOrder.getAuditorId());

					if (null == oriAuditor) {
						comment += String.format("审核员指定为%s;", newAuditor.getName());
					}
					else {
						comment += String.format("审核员由%s变更为%s;", oriAuditor.getName(), newAuditor.getName());
					}
				}

				if (!StringUtils.equals(oriOrder.getQuoterId(), salesOrder.getQuoterId())) {
					SysUser oriQuoter = sysUserRepository.getByLoginName(oriOrder.getQuoterId());
					SysUser neworiQuoter = sysUserRepository.getByLoginName(salesOrder.getQuoterId());

					if (null == oriQuoter) {
						comment += String.format("采购员指定为%s;", neworiQuoter.getName());
					}
					else {
						comment += String.format("采购员由%s变更为%s;", oriQuoter.getName(), neworiQuoter.getName());
					}
				}

				if (StringUtils.isNotEmpty(comment)) {
					comment = String.format("产品(%s)的%s", oriOrder.getProductCode(), comment);
					SysUser curUser = sysUserRepository.getByLoginName(UserContext.getUsername());
					MailMessage tempObj = new MailMessage();
					tempObj.setAuthorId(curUser.getName());
					tempObj.setCreateUid(curUser.getLoginName());
					tempObj.setBody(comment);
					tempObj.createDate(new Date());
					tempObj.setResId(oriOrder.getFormInstanceId());
					mailMessageRepository.save(tempObj);
				}


			}

		}
	}

	/**
	 * Find a Page of SalesOrder using query by example.
	 */
	@RequestMapping(value = "/page", method = GET, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<PageResponse<SalesOrder>> findPage(
			@RequestParam(value = "formInstanceId", required = true) Integer formInstanceId
			,@RequestParam(value = "taskDefinitionKey", required = false) String taskDefinitionKey)
			throws URISyntaxException {
		List<SalesOrder> results = new ArrayList<>();
		
		if(null == taskDefinitionKey) {
			results = salesOrderRepository.findByFormInstanceIdOrderById(formInstanceId);
		}
		
		//如果是任务分配环节,则获取所有的产品信息
		if("manual_allocation".equals(taskDefinitionKey)) {
			results = salesOrderRepository.findByFormInstanceIdOrderById(formInstanceId);
		}
		
		//如果是询价环节,则至获取当前用户被分配的产品信息
		if("price_inquiry".equals(taskDefinitionKey)) {
			results = salesOrderRepository.findByFormInstanceIdAndQuoterIdAndNeedProc(formInstanceId, UserContext.getUsername(), true);
		}
		
		//如果是审核环节,则至获取当前用户被分配的,以及所有大类的
		if("price_audit".equals(taskDefinitionKey)) {
			results.addAll(salesOrderRepository.findByFormInstanceIdAndAuditorId(formInstanceId, UserContext.getUsername()));
			results.addAll(salesOrderRepository.findByCategoryName(formInstanceId, UserContext.getUsername()));
		}
		
		//最后跟踪下单状态，获取所有产品信息
		if("order_status".equals(taskDefinitionKey)) {
			results = salesOrderRepository.findByFormInstanceIdOrderById(formInstanceId);
		}
		

		PageResponse<SalesOrder> pageResponse = new PageResponse<SalesOrder>(results);
		pageResponse.setSuccess(Boolean.TRUE);
		pageResponse.setTotal(results.size());

		return new ResponseEntity<PageResponse<SalesOrder>>(pageResponse, HttpStatus.OK);
	}

	/**
	 * Delete SalesOrder By FormInstance ID.
	 */
	@RequestMapping(value = "/delete", method = POST, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<Void> delete(@RequestParam(value = "formInstanceId", required = true) Integer formInstanceId) throws URISyntaxException {

		log.debug("Delete by FormInstanceId : {}", formInstanceId);

		try {
			salesOrderRepository.deleteRows(formInstanceId);
			return ResponseEntity.ok().build();
		}
		catch (Exception x) {
			x.printStackTrace();
			return ResponseEntity.status(HttpStatus.CONFLICT).build();
		}
	}
}