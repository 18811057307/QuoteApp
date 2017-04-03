package com.sadetec.util;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.Proxy;
import java.net.Proxy.Type;
import java.nio.charset.Charset;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.parser.Parser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sadetec.model.Category;
import com.sadetec.model.Series;
import com.sadetec.repository.CategoryRepository;
import com.sadetec.repository.SeriesRepository;

@Component("seriesPageProcessor")
public class SeriesPageProcessor {

	private final Logger log = LoggerFactory.getLogger(SeriesPageProcessor.class);

	private String seriesQueryUrl = "http://cn.misumi-ec.com/vona2/spookserver";
	
	private SimpleClientHttpRequestFactory requestFactory = new SimpleClientHttpRequestFactory();

	@Autowired
	private CategoryRepository categoryRepository;
	
	@Autowired
	private SeriesRepository seriesRepository;
	
	@Autowired
	private ObjectMapper objectMapper;
	
	public void setProxy(String proxyUrl) {
		Proxy proxy = new Proxy(Type.HTTP, new InetSocketAddress(proxyUrl, 80));
		requestFactory.setProxy(proxy);
	}

	public void process(Category curCate) {

		requestFactory.setReadTimeout(60000);
		RestTemplate restTemplate = new RestTemplate(requestFactory);
		restTemplate.getMessageConverters().add(0, new StringHttpMessageConverter(Charset.forName("UTF-8")));

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(new MediaType("application", "x-www-form-urlencoded", Charset.forName("UTF-8")));
		MultiValueMap<String, String> countParams = new LinkedMultiValueMap<String, String>();
		countParams.add("PageName", "search");
		countParams.add("categoryLevel", curCate.getCategoryLevel().toString());
		countParams.add("categoryCode", curCate.getId());
		countParams.add("listType", "SERIES");
		countParams.add("Command", "CountParam_search");
		countParams.add("RequestType", "PerAttribute");
		countParams.add("Protocol", "com.forcia.spook.honeybee.Primrose");
		countParams.add("Date", String.valueOf(System.currentTimeMillis()));
		HttpEntity<MultiValueMap<String, String>> countReq = new HttpEntity<MultiValueMap<String, String>>(countParams, headers);
		ResponseEntity<String> countResp = restTemplate.postForEntity(seriesQueryUrl, countReq, String.class);
		log.info("获取到{}", countResp.getBody());
		Document countDoc = Jsoup.parse(countResp.getBody(), "", Parser.xmlParser());
		Integer count = Integer.valueOf(countDoc.select("array").get(3).text());
		log.info("解析数量{}", count);

		MultiValueMap<String, String> listParams = new LinkedMultiValueMap<String, String>();
		listParams.add("PageName", "search");
		listParams.add("categoryLevel", curCate.getCategoryLevel().toString());
		listParams.add("categoryCode", curCate.getId());
		listParams.add("listType", "SERIES");
		listParams.add("Command", "List_search");
		listParams.add("RequestType", "PerAttribute");
		listParams.add("Protocol", "com.forcia.spook.honeybee.Primrose");
		listParams.add("ItemPerPage", "45");
		listParams.add("sortOrder", "");

		int totalPage = Math.floorDiv(count, 45) + 1;
		for (int page = 1; page <= totalPage; page++) {
			listParams.remove("Page");
			listParams.add("Page", Integer.toString(page));
			HttpEntity<MultiValueMap<String, String>> seriesPageReq = new HttpEntity<MultiValueMap<String, String>>(listParams, headers);
			ResponseEntity<String> seriesPageResp = restTemplate.postForEntity(seriesQueryUrl, seriesPageReq, String.class);
			Document seriesDoc = Jsoup.parse(seriesPageResp.getBody(), "", Parser.xmlParser());
			String seriesTxt = seriesDoc.select("array").get(4).text();
			log.info("获取到产品系列{}", seriesTxt);
			String[] seriesJsons = StringUtils.delimitedListToStringArray(seriesTxt, "} {");
			
			for (String tempJson : seriesJsons) {
				if(!tempJson.startsWith("{")) {
					tempJson = "{" + tempJson;
				}
				if(!tempJson.endsWith("}")) {
					tempJson = tempJson + "}";
				}
				try {
					JsonNode root = objectMapper.readTree(tempJson);
					Series series = new Series();
					String seriesCode = root.get("series_code").asText();
					series.setId(seriesCode);
					series.setSeriesName(root.get("series_name").asText());
					series.setSeriesUrl("http://cn.misumi-ec.com/vona2/detail/" + seriesCode);
					series.setBrdCode(root.get("brd_code").asText());
					series.setBrdName(root.get("disp_brandName").asText());
					series.setCategoryCode(curCate.getId());
					log.info("待保存的产品系列信息:{}", series);
					seriesRepository.save(series);					
				}
				catch (JsonProcessingException e) {
					e.printStackTrace();
				}
				catch (IOException e) {
					e.printStackTrace();
				}
				
			}
			
		}
	}

	public static void main(String[] args) {

		SeriesPageProcessor seriesPageProcessor = new SeriesPageProcessor();
		seriesPageProcessor.objectMapper = new ObjectMapper();
		Category category = new Category();
		category.setId("M0101000000");
		category.setCategoryLevel(3);

		seriesPageProcessor.process(category);

	}

}
