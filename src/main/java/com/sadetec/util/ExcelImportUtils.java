package com.sadetec.util;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.ss.usermodel.FormulaEvaluator;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Row.MissingCellPolicy;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellReference;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.util.StringUtils;

import com.fasterxml.jackson.core.JsonEncoding;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sadetec.rest.ManualProductMapResource;

public class ExcelImportUtils {

	private static final Logger log = LoggerFactory.getLogger(ManualProductMapResource.class);

	/**
	 * Looks through supplied index (columnIndex), and matches a siteID in that column,
	 * returning the row of the match
	 */
	static Row findRowById(Sheet sheet, String siteId, int columnIndex) {
		for (Row row : sheet) {
			if (row.getCell(columnIndex).getStringCellValue() == siteId) {
				log.info("found ID" + siteId);
				return row;
			}
		}
		return null;
	}

	/**
	 * receives a list of column names, i.e. ['Site', 'ID'], and tries to find the indexes
	 * of the columns matching those names returning a map, i.e. ['Site':2, 'ID':8]
	 */
	static Map<String, Object> createColumnMapFromColumnNames(List<String> columnNames, Row headerRow) {
		Map<String, Object> columnIndexMap = new HashMap<String, Object>();
		for (Cell c : headerRow) {
			if (columnNames.contains(c.getStringCellValue())) {
				columnIndexMap.put(c.getStringCellValue(), c.getColumnIndex());
			}
		}
		return columnIndexMap;
	}

	/**
	 * WorkbookConfig { sheet:'Sheet1', firstRow: 2, lastRow:-1, columnMap:
	 * {'B':'title','C':'author','D':'numSold'} propertyMap:
	 * {'title':{type:'string',defaultValue:''},'author':{type:'int',defaultValue:0}} }
	 * @param workbook
	 * @param config
	 * @return
	 */
	public static List<Map<String, Object>> columns(Workbook workbook, String config) {
		ObjectMapper mapper = new ObjectMapper();
		try {
			WorkbookConfigBean configBean = mapper.readValue(config, WorkbookConfigBean.class);
			Sheet sheet = workbook.getSheet(configBean.getSheet());
			FormulaEvaluator evaluator = workbook.getCreationHelper().createFormulaEvaluator();
			return convertColumnMapManyRows(evaluator, sheet, configBean.getColumnMap(), configBean.getPropertyMap(), configBean.getFirstRow(),
					configBean.getLastRow());
		}
		catch (Exception ex) {
			throw new HttpMessageNotReadableException("Could not read JSON: " + ex.getMessage(), ex);
		}
	}

	/**
	 * Receives sheet, offset, and map of columns. Map is between a column name (i.e. B)
	 * and what will become returning map key. For example, columnMap could be
	 * ['B':'endDate', 'D':cost], which will cause going down the B and D columns and
	 * retrieving values packaging up as maps to be returned, in this case something like
	 * [[endDate:LocalDate(2009/1/2), cost:30], [endDate: LocalDate(2009,1,3), cost:20]]
	 * This method is very generic, and could be used by anything
	 */

	private static List<Map<String, Object>> convertColumnMapManyRows(FormulaEvaluator evaluator, Sheet currentSheet, Map<String, String> columnMap,
			Map<String, Map<String, Object>> propertyMap, Integer firstRow, Integer lastRow) {
		List<Map<String, Object>> returnList = new ArrayList<Map<String, Object>>();
		if (currentSheet == null) {
			return returnList;
		}

		boolean foundBlankRow = false;
		for (int rowIndex = firstRow; (rowIndex < lastRow || ((lastRow == -1)) && !foundBlankRow); rowIndex++) {
			Map<String, Object> returnParams = convertColumnMapOneRow(evaluator, currentSheet, columnMap, propertyMap, rowIndex);
			if (null == returnParams) {
				foundBlankRow = true;
			}
			else {
				returnList.add(returnParams);
			}
		}
		return returnList;
	}

	private static Map<String, Object> convertColumnMapOneRow(FormulaEvaluator evaluator, Sheet currentSheet, Map<String, String> columnMap,
			Map<String, Map<String, Object>> propertyMap, int rowIndex) {
		Row row = currentSheet.getRow(rowIndex);
		if (null == row) {
			return null;
		}
		Map<String, Object> returnParams = new HashMap<String, Object>();

		Set<String> colKeyset = columnMap.keySet();
		for (Iterator<String> iterator = colKeyset.iterator(); iterator.hasNext();) {
			String columnName = (String) iterator.next();
			String propertyName = columnMap.get(columnName);
			
			Map<String, Object> property = propertyMap.get(propertyName);
			Object value = getCellValueByColName(evaluator, row, columnName, property);
			if (null == value || !StringUtils.hasLength(value.toString())) {
				if(null != property) {
					returnParams.put(propertyName, property.get("defaultValue"));					
				} else {
					returnParams.put(propertyName, "");
				}
			}
			else {
				returnParams.put(propertyName, value);
			}
		}
		return returnParams;
	}

	private static Object getCellValueByColName(FormulaEvaluator evaluator, Row row, String columnName, Map<String, Object> property) {
		int colIndex = CellReference.convertColStringToIndex(columnName);
		Cell cell = row.getCell(colIndex, MissingCellPolicy.CREATE_NULL_AS_BLANK);
		return getCellValue(evaluator, cell, property);
	}

	private static Object getCellValue(FormulaEvaluator evaluator, Cell cell, Map<String, Object> property) {
		if (cell == null) {
			return null;
		}
		String expectedType = "string";
		if (null != property && property.containsKey("type") && property.get("type") != null) {
			expectedType = property.get("type").toString();
		}

		switch (cell.getCellType()) {
		case Cell.CELL_TYPE_STRING:
			String strValue = cell.getStringCellValue();
			if ("string".equals(expectedType)) {
				return strValue;
			}
			if ("date".equals(expectedType)) {
				String defaultFormat = "yyyy年MM月dd日";
				if (property.containsKey("format") && property.get("format") != null) {
					defaultFormat = property.get("format").toString();
				}
				List<String> patterns = new ArrayList<String>();
				patterns.add(defaultFormat);
				return DateUtil.parseYYYYMMDDDate(strValue);
			}
			if ("int".equals(expectedType)) {
				try {
					return Integer.parseInt(strValue);
				}
				catch (Exception e) {
					return null;
				}
			}

			if ("double".equals(expectedType)) {
				try {
					return Double.valueOf(strValue);
				}
				catch (Exception e) {
					return null;
				}
			}

		case Cell.CELL_TYPE_NUMERIC:
			if ("string".equals(expectedType)) {
				cell.setCellType(Cell.CELL_TYPE_STRING);
				String numValue = cell.getStringCellValue();
				if (StringUtils.hasLength(numValue)) {
					return numValue;
				}
				else {
					return null;
				}
			}
			if (org.apache.poi.ss.usermodel.DateUtil.isCellDateFormatted(cell)) {
				return cell.getDateCellValue();
			}
			else {
				Double numeric = cell.getNumericCellValue();
				if (numeric != null) {
					return numeric;
				}
				else {
					return null;
				}
			}
		case Cell.CELL_TYPE_ERROR:
			return null;
		// TODO
		case Cell.CELL_TYPE_FORMULA:
			evaluator.evaluateFormulaCell(cell);
			return null;
		case Cell.CELL_TYPE_BOOLEAN:
			return cell.getBooleanCellValue();
		case Cell.CELL_TYPE_BLANK:
			return null;
		default:
			return null;
		}
	}

	static Cell getCell(Sheet currentSheet, String ref) {
		CellReference cellReference = new CellReference(ref);
		Row row = currentSheet.getRow(cellReference.getRow());
		Cell cell = row.getCell(cellReference.getCol());
		return cell;
	}

	static Cell getCellOrCreate(Sheet currentSheet, String ref) {
		CellReference cellReference = new CellReference(ref);
		Row row = currentSheet.getRow(cellReference.getRow());
		Cell cell = row.getCell(cellReference.getCol());
		if (cell == null) {
			cell = row.createCell(cellReference.getCol(), Cell.CELL_TYPE_BLANK);
		}
		return cell;
	}

	public static void main(String[] args) throws FileNotFoundException, IOException {

		Workbook workbook = null;
		String oriFileName = "d:\\tmp\\对照111.xlsx";
		if (oriFileName.endsWith("xlsx")) {
			workbook = new XSSFWorkbook(new FileInputStream(oriFileName));
		}
		else if (oriFileName.endsWith("xls")) {
			workbook = new HSSFWorkbook(new FileInputStream(oriFileName));
		}
		
		String config = "{\"sheet\":\"Sheet1\",\"firstRow\": 1,\"lastRow\":-1,\"columnMap\":{\"A\":\"miProductName\",\"B\":\"atProductCode\",\"C\":\"miProductCode\"},\"propertyMap\":{\"miProductName\":{\"type\":\"string\",\"defaultValue\":\"\"},\"atProductCode\":{\"type\":\"string\",\"defaultValue\":\"\"}}}";
		//String config = "{\"sheet\":\"Sheet1\",\"firstRow\": 1,\"lastRow\":-1,\"columnMap\":{\"A\":\"miProductName\",\"B\":\"atProductCode\",\"C\":\"miProductCode\"}}";

		//ObjectMapper mapper = new ObjectMapper();
		//System.out.println(mapper.readValue(config, WorkbookConfigBean.class).getSheet());
		
		
		List<Map<String, Object>> columnValues = ExcelImportUtils.columns(workbook, config);

		List<String> errors = new ArrayList<String>();
		for (Map<String, Object> map : columnValues) {			
			new ObjectMapper().getFactory().createGenerator(System.out, JsonEncoding.UTF8).writeObject(map);
		}

	}
}