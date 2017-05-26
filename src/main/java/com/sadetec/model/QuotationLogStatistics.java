package com.sadetec.model;

import com.google.common.base.MoreObjects;

public class QuotationLogStatistics {

	private String atProductCode;
	private String atProductName;
	private String miProductCode;
	private String miProductName;
	private String name;
	private Long count;

	public QuotationLogStatistics(String atCode, String atName, String miCode, String miName, String name, Long count) {

		this.atProductCode = atCode;
		this.atProductName = atName;
		this.miProductCode = miCode;
		this.miProductName = miName;
		this.name = name;
		this.count = count;

	}
	
	public QuotationLogStatistics(String name, Long count) {

		this.name = name;
		this.count = count;

	}

	public String getAtProductCode() {
		return atProductCode;
	}

	public void setAtProductCode(String atProductCode) {
		this.atProductCode = atProductCode;
	}

	public String getAtProductName() {
		return atProductName;
	}

	public void setAtProductName(String atProductName) {
		this.atProductName = atProductName;
	}

	public String getMiProductCode() {
		return miProductCode;
	}

	public void setMiProductCode(String miProductCode) {
		this.miProductCode = miProductCode;
	}

	public String getMiProductName() {
		return miProductName;
	}

	public void setMiProductName(String miProductName) {
		this.miProductName = miProductName;
	}

	public Long getCount() {
		return count;
	}

	public void setCount(Long count) {
		this.count = count;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public String toString() {
		return MoreObjects.toStringHelper(this) //
				.add("atProductCode", getAtProductCode()) //
				.add("atProductName", getAtProductName()) //
				.add("miProductName", getMiProductName()) //
				.add("miProductCode", getMiProductCode()) //
				.add("name", getName()) //
				.add("count", getCount()) //
				.toString();
	}

}
