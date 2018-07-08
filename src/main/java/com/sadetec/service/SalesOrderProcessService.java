package com.sadetec.service;

import java.io.OutputStream;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.apache.commons.lang.StringUtils;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFColor;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.camunda.bpm.engine.HistoryService;
import org.camunda.bpm.engine.TaskService;
import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.camunda.bpm.engine.history.HistoricTaskInstance;
import org.camunda.bpm.engine.task.Task;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.util.DateUtils;

import com.sadetec.model.Category;
import com.sadetec.model.FormInstance;
import com.sadetec.model.ManualProductMap;
import com.sadetec.model.SalesOrder;
import com.sadetec.model.StockQuant;
import com.sadetec.model.SysUser;
import com.sadetec.repository.CategoryRepository;
import com.sadetec.repository.FormInstanceRepository;
import com.sadetec.repository.ManualProductMapRepository;
import com.sadetec.repository.SalesOrderRepository;
import com.sadetec.repository.StockQuantRepository;
import com.sadetec.repository.SysUserRepository;
import com.sadetec.util.DateUtil;
import com.sadetec.util.QuotationProcessor;

@Service("salesOrderProcessService")
public class SalesOrderProcessService implements JavaDelegate {

	private static final Logger log = LoggerFactory.getLogger(SalesOrderProcessService.class);

	@Autowired
	private FormInstanceRepository formInstanceRepository;

	@Autowired
	private SalesOrderRepository salesOrderRepository;
	
	@Autowired
	private SysUserRepository sysUserRepository;

	@Autowired
	private ManualProductMapRepository manualProductMapRepository;
	
	@Autowired
	private QuotationProcessor quotationProcessor;
	
	@Autowired
	private CategoryRepository categoryRepository;
	
	@Autowired
	private StockQuantRepository stockQuantRepository;

	@Autowired
	private StorageService storageService;
	
	@Autowired
	private JavaMailSender javaMailSender;
	
	@Autowired
	private TaskService taskService;
	
	@Autowired
	private HistoryService historyService;
	
	@Override
	public void execute(DelegateExecution execution) throws Exception {
		log.info("当前活动ID:{}", execution.getCurrentActivityId());
		String businessKey = execution.getProcessBusinessKey();
		FormInstance formInstance = formInstanceRepository.findOne(Integer.parseInt(businessKey));
		
		
		if ("product_process".equals(execution.getCurrentActivityId())) {

			log.info("开始进行订单:{}的产品分类处理", businessKey);

			List<SalesOrder> salesOrders = salesOrderRepository.findByFormInstanceIdOrderById(formInstance.getId());
			
			Boolean needManualAllocation = Boolean.FALSE;

			for (SalesOrder salesOrder : salesOrders) {
				
				//按照品牌进行查询 FIXME 多个供应商的处理
				ManualProductMap productMap = null;
				if(StringUtils.containsIgnoreCase(salesOrder.getBrand(),"A&T") || StringUtils.containsIgnoreCase(salesOrder.getBrand(),"爱安特")) {
					productMap = manualProductMapRepository.findById(salesOrder.getProductCode());
					if(productMap != null) {
						salesOrder.setAtProductCode(productMap.getId());
					}
				} 
				
				if(StringUtils.containsIgnoreCase(salesOrder.getBrand(),"misumi") || StringUtils.containsIgnoreCase(salesOrder.getBrand(),"米思米")) {
					List<ManualProductMap> productMaps = manualProductMapRepository.findByMiProductCode(salesOrder.getProductCode());
					if(productMaps.size() > 0) {
						productMap = productMaps.get(0);
						salesOrder.setAtProductCode(productMap.getId());
					}
				} 
				
				if (null == productMap) {
					//判断是否存在模糊匹配的情况
					ManualProductMap matchedMap = quotationProcessor.hasMatchedRecord(salesOrder.getProductCode());					
					if(null == matchedMap) {
						salesOrder.setProcessType("工厂核算");
					} else {
						productMap = matchedMap;
						if(!(StringUtils.contains(salesOrder.getBrand(),"A&T") || StringUtils.contains(salesOrder.getBrand(),"爱安特"))) {
							salesOrder.setAtProductCode(quotationProcessor.mapProductCode(salesOrder.getProductCode(), matchedMap.getMiProductCode(), matchedMap.getId()));
						} 
					}
				} 

				if (null != productMap && null != productMap.getUniQuote() && (productMap.getUniQuote().compareTo(BigDecimal.ZERO) == 1)) {
					salesOrder.setProcessType("自动报价");
					salesOrder.setUnitPrice(productMap.getUniQuote());
					
					if(null != productMap.getAtProductQuote() && productMap.getAtProductQuote().compareTo(BigDecimal.ZERO) == 1) {
						salesOrder.setCostPrice(productMap.getAtProductQuote());
					}
					
					if(null != productMap.getFactoryQuote() && productMap.getFactoryQuote().compareTo(BigDecimal.ZERO) == 1) {
						salesOrder.setFactoryPrice(productMap.getFactoryQuote());
					}
					
					salesOrder.setNeedProc(false);
				}

				if (null != productMap && null == productMap.getUniQuote()) {
					salesOrder.setProcessType("产品技术处理");
				}

				if (null != productMap && null != productMap.getUniQuote() && (productMap.getUniQuote().compareTo(BigDecimal.ZERO) < 1)) {
					salesOrder.setProcessType("产品技术处理");
				}
				
				Category belongCata = categoryRepository.getByCategoryName(salesOrder.getCategoryName());
				if(null != belongCata) {
					//只有非自动报价的才需要进行核价
					if(!"自动报价".equals(salesOrder.getProcessType())) {
						if(belongCata.getQuoterId() != null) {
							salesOrder.setQuoterId(belongCata.getQuoterId());
							salesOrder.setQuoterName(belongCata.getQuoterName());
							salesOrder.setAuditorId(belongCata.getAuditorId());
							salesOrder.setAuditorName(belongCata.getAuditorName());
						} else {
							needManualAllocation = true;
						}
						salesOrder.setNeedProc(true);
					}
				} else {
					//如果没有找到分类，需要进行手工分配
					salesOrder.setNeedProc(true);
					needManualAllocation = true;
				}
				
				//查询更新库存信息
				StockQuant stockQuant = stockQuantRepository.findOneByProductId(salesOrder.getAtProductCode());
				if(null != stockQuant) {
					salesOrder.setStockAmount(stockQuant.getUseQty().intValue());
				}
				
				salesOrderRepository.saveAndFlush(salesOrder);

			}

			execution.setVariable("businessKey", businessKey);
			execution.setVariable("drafter", formInstance.getDrafterId());
			execution.setVariable("needManualAllocation", needManualAllocation);
			

		}

		if ("assign_price_auditor".equals(execution.getCurrentActivityId())) {
			String priceInquiryAssignee = execution.getVariable("participant").toString();
			log.info("{}处理完毕,开始分配审核人.", priceInquiryAssignee);
			List<SalesOrder> doneOrder = salesOrderRepository.findByFormInstanceIdAndQuoterId(Integer.parseInt(businessKey),priceInquiryAssignee);
			if(doneOrder.size() > 0) {
				
				//设置出厂价以及统一价,暂时取消,TODO 确认价格的关系
				/**
				for (SalesOrder salesOrder : doneOrder) {
					String catagoryName = salesOrder.getCategoryName();
					Category category = categoryRepository.getByCategoryName(catagoryName);
					if(null != category) {
						BigDecimal factoryRatio = category.getFactoryRatio();
						BigDecimal unitRatio = category.getUnitRatio();
						BigDecimal costPrice = salesOrder.getCostPrice();						
						salesOrder.setFactoryPrice(costPrice.divide(factoryRatio, 4, BigDecimal.ROUND_HALF_UP));						
						salesOrder.setUnitPrice(salesOrder.getFactoryPrice().multiply(unitRatio).setScale(4, BigDecimal.ROUND_HALF_UP));
						salesOrderRepository.save(salesOrder);
					}
				}**/
				
				execution.setVariable("priceAuditor", doneOrder.get(0).getAuditorId());
			}
			
			
		}
		
		if ("check_audit_result".equals(execution.getCurrentActivityId())) {
			String priceAuditorAssignee = execution.getVariable("priceAuditor").toString();
			log.info("{}处理完毕,审核结果判断.", priceAuditorAssignee);

			Boolean isPass = false;
			
			List<HistoricTaskInstance> preTasks = historyService.createHistoricTaskInstanceQuery()
							.executionId(execution.getId())
							.taskDefinitionKey("price_inquiry").orderByTaskId().desc().list();
			HistoricTaskInstance preTask = preTasks.get(0);
			log.info("preTask's assignee:{}",preTask.getAssignee());
			
			//审批当前子流程产品技术报价的，以及自动报价中属于当前审核员的
			List<SalesOrder> needProcOrders = salesOrderRepository.findByFormInstanceIdAndQuoterIdAndNeedProc(Integer.parseInt(businessKey), preTask.getAssignee(),true);

			//设置报价完成日期和报价单号
			formInstance.setLastModified(new Date());
			
			//String.format("%06",12);
			if(StringUtils.isEmpty(formInstance.getSeqNumber())) {
				Long curMonthSeq = formInstanceRepository.getCurMonthSeqNumber();
				formInstance.setSeqNumber("TJAAT"+new SimpleDateFormat("yyyyMM").format(new Date())+String.format("%06d",curMonthSeq.intValue()+1));
			}
			formInstanceRepository.save(formInstance);
			
			if(needProcOrders.size() == 0) {
				isPass = true;
			}

			execution.setVariable("isPass", isPass);

		}
		
		if ("send_mail".equals(execution.getCurrentActivityId())) {
			
			//将价格反写回报价映射表 TODO多个供应商的处理
			List<SalesOrder> completeOrder = salesOrderRepository.findByFormInstanceIdOrderById(formInstance.getId());
			for (SalesOrder tempOrder : completeOrder) {
				if(StringUtils.isNotBlank(tempOrder.getAtProductCode())) {
					ManualProductMap tempMap = manualProductMapRepository.findById(tempOrder.getAtProductCode());
					if(tempMap != null) {
						tempMap.setAtProductQuote(tempOrder.getCostPrice());
						tempMap.setUniQuote(tempOrder.getUnitPrice());
						tempMap.setFactoryQuote(tempOrder.getFactoryPrice());
					} else {
						tempMap = new ManualProductMap();
						tempMap.setId(tempOrder.getAtProductCode());
						tempMap.setAtProductName(tempOrder.getProductName());
						tempMap.setAtProductQuote(tempOrder.getCostPrice());
						tempMap.setUniQuote(tempOrder.getUnitPrice());
						tempMap.setFactoryQuote(tempOrder.getFactoryPrice());
					}
					manualProductMapRepository.save(tempMap);
				}
			}
			
			
			log.info("{}询价处理完毕,开始发送邮件.", formInstance.getTitle());
			XSSFWorkbook salesOrderExcel = new XSSFWorkbook();
			XSSFSheet productSheet = salesOrderExcel.createSheet("报价单");
			
			XSSFCellStyle style = salesOrderExcel.createCellStyle();
	        XSSFFont font = salesOrderExcel.createFont();
	        font.setFontName("微软雅黑");
	        font.setBold(true);
	        style.setFont(font);
	        
			// create header row， 报价单号	询价时间	营业人员	联系方式	客户名称	
	        XSSFRow header = productSheet.createRow(0);
	        header.createCell(0).setCellValue("报价单号");
	        header.getCell(0).setCellStyle(style);
	        header.createCell(1).setCellValue("询价时间");
	        header.getCell(1).setCellStyle(style);
	        header.createCell(2).setCellValue("营业人员");
	        header.getCell(2).setCellStyle(style);
	        header.createCell(3).setCellValue("联系方式");
	        header.getCell(3).setCellStyle(style);
	        header.createCell(4).setCellValue("客户名称");
	        header.getCell(4).setCellStyle(style);
	        
	        //产品名称	询价型号	报价型号	数量	单位	统一价  总价	货期	报价有效期	备注
	        header.createCell(5).setCellValue("供应商");
	        header.getCell(5).setCellStyle(style);	        
	        header.createCell(6).setCellValue("产品名称");
	        header.getCell(6).setCellStyle(style);
	        header.createCell(7).setCellValue("询价型号");
	        header.getCell(7).setCellStyle(style);
	        header.createCell(8).setCellValue("报价型号");
			header.getCell(8).setCellStyle(style);
			header.createCell(9).setCellValue("数量");
			header.getCell(9).setCellStyle(style);
			header.createCell(10).setCellValue("单位");
			header.getCell(10).setCellStyle(style);
			header.createCell(11).setCellValue("统一价");
			header.getCell(11).setCellStyle(style);
			header.createCell(12).setCellValue("总价");
			header.getCell(12).setCellStyle(style);
			header.createCell(13).setCellValue("货期");
			header.getCell(13).setCellStyle(style);
			header.createCell(14).setCellValue("报价有效期");
			header.getCell(14).setCellStyle(style);
			header.createCell(15).setCellValue("备注");
			header.getCell(15).setCellStyle(style);
			
			List<Object[]> salesOrders = salesOrderRepository.findSalesOrderWithStock(formInstance.getId());
			int rowCount = 1;
			for (Object[] order : salesOrders) {
				XSSFRow aRow = productSheet.createRow(rowCount++);
				aRow.createCell(0).setCellValue(formInstance.getSeqNumber());
				aRow.createCell(1).setCellValue(DateUtil.toString(formInstance.getCreateDate()));
				aRow.createCell(2).setCellValue(formInstance.getSales());
				aRow.createCell(3).setCellValue(formInstance.getMobile());
				aRow.createCell(4).setCellValue(formInstance.getTitle());
				
				aRow.createCell(5).setCellValue(order[0] != null ? order[0].toString() : "");
				aRow.createCell(6).setCellValue(order[1] != null ? order[1].toString() : "");
				aRow.createCell(7).setCellValue(order[2] != null ? order[2].toString() : "");
				aRow.createCell(8).setCellValue(order[3] != null ? order[3].toString() : "");
				aRow.createCell(9).setCellValue(order[4] != null ? order[4].toString() : "");
				aRow.createCell(10).setCellValue(order[5] != null ? order[5].toString() : "");
				aRow.createCell(11).setCellValue(order[6] != null ? order[6].toString() : "");
				aRow.createCell(12).setCellValue(order[7] != null ? order[7].toString() : "");
				aRow.createCell(13).setCellValue(order[8] != null ? order[8].toString() : "");
				aRow.createCell(14).setCellValue(order[9] != null ? order[9].toString() : "");
				aRow.createCell(15).setCellValue(order[10] != null ? order[10].toString() : "");
			}
			
			//Merged region A2 must contain 2 or more cells
			if(rowCount > 2) {
				productSheet.addMergedRegion(new CellRangeAddress(1, rowCount-1, 0, 0));//合并单元格  
				productSheet.addMergedRegion(new CellRangeAddress(1, rowCount-1, 1, 1));//合并单元格 
				productSheet.addMergedRegion(new CellRangeAddress(1, rowCount-1, 2, 2));//合并单元格 
				productSheet.addMergedRegion(new CellRangeAddress(1, rowCount-1, 3, 3));//合并单元格 
				productSheet.addMergedRegion(new CellRangeAddress(1, rowCount-1, 4, 4));//合并单元格 
			}
			
			DateTimeFormatter format = DateTimeFormat.forPattern("yyyyMMdd");
			
			DateTimeFormatter curFormat = DateTimeFormat.forPattern("yyyyMMddHHmmss");
			
			String fileName = formInstance.getTitle() + "-" + curFormat.print(new Date().getTime()) + "-" + formInstance.getDrafter() + "-" + format.print(formInstance.getCreateDate().getTime()) + ".xlsx";
			
			OutputStream os = storageService.openOutPutStream(fileName);
			salesOrderExcel.write(os);
			salesOrderExcel.close();
			os.close();
			
			MimeMessage mailMsg = javaMailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(mailMsg,true);
			try {
				List<String> receiptens = new ArrayList<>();
				SysUser drafter = sysUserRepository.getByLoginName(formInstance.getDrafterId());
				SysUser sales = sysUserRepository.getByLoginName(formInstance.getSalesId());
				if(drafter != null) {
					if(StringUtils.isNotEmpty(drafter.getEmail())) {
						receiptens.add(drafter.getEmail());
					}
				}
				if(sales != null) {
					if(StringUtils.isNotEmpty(sales.getEmail())) {
						receiptens.add(sales.getEmail());
					}
				}
				
				receiptens.add("yaotiehan@sadetec.com");
				receiptens.add("353481434@qq.com");
				
				helper.setFrom("service@sadetec.com");
				helper.setTo(receiptens.toArray(new String[0]));
				helper.setSubject(formInstance.getTitle() + "询价完成");
				helper.setText(String.format("询价结果请参考附件内容或登录系统查看:%s","http://121.197.3.238:8088/sadetec/"));
				helper.addAttachment(fileName, storageService.load(fileName).toFile());
				javaMailSender.send(mailMsg);
			}
			catch (MessagingException e) {
				log.error("发送通知邮件失败 ,原因:{}",e.getCause());
			}
		}

	}

}
