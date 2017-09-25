package com.sadetec.model;

import java.math.BigDecimal;

public class CategoryTreeNode extends BaseTreeNode {

	private String categoryName;
	private String quoterName;
	private String auditorName;
	private BigDecimal factoryRatio;
	private BigDecimal unitRatio;
	private Category category;

	public CategoryTreeNode(String id, String text, Boolean leaf, String iconCls, String cls, String qtip) {
		super(id, text, leaf, iconCls, cls, qtip);
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public String getQuoterName() {
		return quoterName;
	}

	public void setQuoterName(String quoterName) {
		this.quoterName = quoterName;
	}

	public String getAuditorName() {
		return auditorName;
	}

	public void setAuditorName(String auditorName) {
		this.auditorName = auditorName;
	}

	public BigDecimal getFactoryRatio() {
		return factoryRatio;
	}

	public void setFactoryRatio(BigDecimal factoryRatio) {
		this.factoryRatio = factoryRatio;
	}

	public BigDecimal getUnitRatio() {
		return unitRatio;
	}

	public void setUnitRatio(BigDecimal unitRatio) {
		this.unitRatio = unitRatio;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

}
