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
import com.sadetec.repository.SysUserRepository;

@Service("salesOrderProcessService")
public class SalesOrderProcessService implements JavaDelegate {

	private static final Logger log = LoggerFactory.getLogger(SalesOrderProcessService.class);
	
	@Autowired
	private FormInstanceRepository formInstanceRepository;
	
	@Autowired
	private SalesOrderRepository salesOrderRepository;
	
	@Autowired
	private ManualProductMapRepository manualProductMapRepository;
	
	@Override
	public void execute(DelegateExecution execution) throws Exception {
		log.info("开始进行订单:{}的产品分类处理", execution.getBusinessKey());

		String businessKey = execution.getBusinessKey();
		
		FormInstance formInstance = formInstanceRepository.findOne(Integer.parseInt(businessKey));
		
		List<SalesOrder> salesOrders = salesOrderRepository.findByFormInstanceId(formInstance.getId());
		
		for (SalesOrder salesOrder : salesOrders) {
			log.info(salesOrder.getProductCode());
			
			ManualProductMap productMap = manualProductMapRepository.findById(salesOrder.getProductCode());
			
			if(null == productMap) {
				salesOrder.setProcessType("工厂核算");
			}
			
			if(null != productMap && null != productMap.getAtProductQuote() && (productMap.getAtProductQuote().compareTo(BigDecimal.ZERO) == 1)) {
				salesOrder.setProcessType("自动报价");
				salesOrder.setUnitPrice(productMap.getAtProductQuote());
			}
			
			if(null != productMap && null == productMap.getAtProductQuote()) {
				salesOrder.setProcessType("采购询价");
			}
			
			if(null != productMap && null != productMap.getAtProductQuote() && (productMap.getAtProductQuote().compareTo(BigDecimal.ZERO) < 1)) {
				salesOrder.setProcessType("采购询价");
			}
			
			salesOrderRepository.saveAndFlush(salesOrder);
			
		}
		
	}

}
