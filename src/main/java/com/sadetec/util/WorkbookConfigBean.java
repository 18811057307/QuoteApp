package com.sadetec.util;

import java.util.HashMap;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

public class WorkbookConfigBean {

	@JsonProperty("sheet")
	private String sheet;

	@JsonProperty("firstRow")
	private Integer firstRow = 0;

	@JsonProperty("lastRow")
	private Integer lastRow = -1;

	@JsonProperty("columnMap")
	private Map<String, String> columnMap = new HashMap<String, String>();

	@JsonProperty("propertyMap")
	private Map<String, Map<String, Object>> propertyMap = new HashMap<String, Map<String, Object>>();

	public Map<String, String> getColumnMap() {
		return columnMap;
	}

	@JsonDeserialize(as = HashMap.class, keyAs = String.class, contentAs = String.class)
	public void setColumnMap(Map<String, String> columnMap) {
		this.columnMap = columnMap;
	}

	public Map<String, Map<String, Object>> getPropertyMap() {
		return propertyMap;
	}

	public void setPropertyMap(Map<String, Map<String, Object>> propertyMap) {
		this.propertyMap = propertyMap;
	}

	public String getSheet() {
		return sheet;
	}

	public void setSheet(String sheet) {
		this.sheet = sheet;
	}

	public Integer getFirstRow() {
		return firstRow;
	}

	public void setFirstRow(Integer firstRow) {
		this.firstRow = firstRow;
	}

	public Integer getLastRow() {
		return lastRow;
	}

	public void setLastRow(Integer lastRow) {
		this.lastRow = lastRow;
	}

}
