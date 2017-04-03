package com.sadetec.util;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;

import org.springframework.util.StringUtils;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

public class FilterCondition {
	private String type;
	private String comparison;
	private String value;
	private String field;
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getComparison() {
		return comparison;
	}
	public void setComparison(String comparison) {
		this.comparison = comparison;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
	public String getField() {
		return field;
	}
	public void setField(String field) {
		this.field = field;
	}
	public static List<FilterCondition> decodeJson(String filter) {
		List<FilterCondition> temps = new ArrayList<FilterCondition>();
        ObjectMapper mapper = new ObjectMapper();
        TypeReference<List<FilterCondition>> typeRef = new TypeReference<List<FilterCondition>>(){};
        try {
            JsonNode data = mapper.readValue(filter, JsonNode.class);
            Iterator<JsonNode> iterator = data.elements();
            while (iterator.hasNext()) {
                JsonNode tempJson = iterator.next();
                if (tempJson.isArray()) {
                    temps = mapper.convertValue(tempJson, typeRef);
                } else {
                	FilterCondition temp = mapper.convertValue(tempJson, FilterCondition.class);
                    temps.add(temp);
                }
            }
        }catch (Exception ex) {
            ex.printStackTrace();
        }
        return temps;
	}
	
	private static String convertComparison(String comparison) {
		if ("lt".equals(comparison)) {
			return " < ";
		} else if ("gt".equals(comparison)) {
			return " > ";
		} else if ("eq".equals(comparison)) {
			return " = ";
		} else {
			return " LIKE ";
		}
	}
	
	private static String quoteValue(String comparison, String type, String value) {
		
		if(comparison == null || !"ltgteq".contains(comparison)) {
			value = "%" + value + "%";
		}
		
		if ("date".equals(type)) {
			return "'" + value + "'";
		} else if ("numeric".equals(type)) {
			return value;
		} else if ("string".equals(type)) {
			return "'" + value + "'" ;
		} else {
			return "'" + value + "'";
		}
	}
	
	
	public static String buildWhereSQL(String filter) {
		if(!StringUtils.hasLength(filter)) {
			return "WHERE 1=1";
		}
		String sql = " WHERE 1=1 ";
		Collection<FilterCondition> conditions  = decodeJson(filter);
		for (FilterCondition filterCondition : conditions) {
			sql = sql + " AND o." + filterCondition.getField() + convertComparison(filterCondition.getComparison()) +  quoteValue(filterCondition.getComparison(), filterCondition.getType(),filterCondition.getValue());
		}
		return sql;
	}
}
