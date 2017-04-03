package com.sadetec.util;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@ConfigurationProperties("excel.import.config")
@Component("workbookProperties")
public class WorkbookProperties {

	private String productMapConfig;
	private String quoteConfig;
	public String getProductMapConfig() {
		return productMapConfig;
	}
	public void setProductMapConfig(String productMapConfig) {
		this.productMapConfig = productMapConfig;
	}
	public String getQuoteConfig() {
		return quoteConfig;
	}
	public void setQuoteConfig(String quoteConfig) {
		this.quoteConfig = quoteConfig;
	}
	
	
	
}
