package com.sadetec.util;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@ConfigurationProperties("excel.import.config")
@Component("workbookProperties")
public class WorkbookProperties {

	private String productMapConfig;
	private String productSeriesConfig;
	private String quoteConfig;
	private String salseOrderConfig;
	private String stockQuantConfig;

	public String getProductMapConfig() {
		return productMapConfig;
	}

	public void setProductMapConfig(String productMapConfig) {
		this.productMapConfig = productMapConfig;
	}

	public String getProductSeriesConfig() {
		return productSeriesConfig;
	}

	public void setProductSeriesConfig(String productSeriesConfig) {
		this.productSeriesConfig = productSeriesConfig;
	}

	public String getQuoteConfig() {
		return quoteConfig;
	}

	public void setQuoteConfig(String quoteConfig) {
		this.quoteConfig = quoteConfig;
	}

	public String getSalseOrderConfig() {
		return salseOrderConfig;
	}

	public void setSalseOrderConfig(String salseOrderConfig) {
		this.salseOrderConfig = salseOrderConfig;
	}

	public String getStockQuantConfig() {
		return stockQuantConfig;
	}

	public void setStockQuantConfig(String stockQuantConfig) {
		this.stockQuantConfig = stockQuantConfig;
	}

}
