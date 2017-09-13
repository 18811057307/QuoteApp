package com.sadetec.service;

import java.math.BigDecimal;
import java.util.List;

import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sadetec.model.FormInstance;
import com.sadetec.model.ManualProductMap;
import com.sadetec.model.SalesOrder;
import com.sadetec.repository.FormInstanceRepository;
import com.sadetec.repository.ManualProductMapRepository;
import com.sadetec.repository.SalesOrderRepository;
import com.sadetec.util.QuotationProcessor;

@Service("salesOrderProcessService")
public class SalesOrderProcessService implements JavaDelegate {

	private static final Logger log = LoggerFactory.getLogger(SalesOrderProcessService.class);

	@Autowired
	private FormInstanceRepository formInstanceRepository;

	@Autowired
	private SalesOrderRepository salesOrderRepository;

	@Autowired
	private ManualProductMapRepository manualProductMapRepository;
	
	@Autowired
	private QuotationProcessor quotationProcessor;

	@Override
	public void execute(DelegateExecution execution) throws Exception {
		log.info("当前活动ID:{}", execution.getCurrentActivityId());
		String businessKey = execution.getBusinessKey();
		FormInstance formInstance = formInstanceRepository.findOne(Integer.parseInt(businessKey));
		
		
		if ("product_process".equals(execution.getCurrentActivityId())) {

			log.info("开始进行订单:{}的产品分类处理", businessKey);

			List<SalesOrder> salesOrders = salesOrderRepository.findByFormInstanceId(formInstance.getId());

			Boolean needFactory = false;
			Boolean needPurchase = false;

			for (SalesOrder salesOrder : salesOrders) {
				ManualProductMap productMap = manualProductMapRepository.findById(salesOrder.getProductCode());

				if (null == productMap) {
					
					//判断是否存在模糊匹配的情况
					ManualProductMap matchedMap = quotationProcessor.hasMatchedRecord(salesOrder.getProductCode());					
					if(null == matchedMap) {
						salesOrder.setProcessType("工厂核算");
						needFactory = true;
					} else {
						productMap = matchedMap;
					}
					
				}

				if (null != productMap && null != productMap.getUniQuote() && (productMap.getUniQuote().compareTo(BigDecimal.ZERO) == 1)) {
					salesOrder.setProcessType("自动报价");
					salesOrder.setUnitPrice(productMap.getUniQuote());
				}

				if (null != productMap && null == productMap.getUniQuote()) {
					salesOrder.setProcessType("采购询价");
					needPurchase = true;
				}

				if (null != productMap && null != productMap.getUniQuote() && (productMap.getUniQuote().compareTo(BigDecimal.ZERO) < 1)) {
					salesOrder.setProcessType("采购询价");
					needPurchase = true;
				}

				salesOrderRepository.saveAndFlush(salesOrder);

			}

			execution.setVariable("needFactory", needFactory);
			execution.setVariable("needPurchase", needPurchase);

		}

		if ("calc_total_price".equals(execution.getCurrentActivityId())) {
			log.info("开始计算订单总价:{}", businessKey);

			BigDecimal totalPrice = salesOrderRepository.calcTotalPrice(formInstance.getId());

			Boolean needAudit = false;
			if (null != totalPrice) {
				if (totalPrice.intValue() >= 10000) {
					needAudit = true;
				}
			}

			execution.setVariable("needAudit", needAudit);

		}

	}

}
