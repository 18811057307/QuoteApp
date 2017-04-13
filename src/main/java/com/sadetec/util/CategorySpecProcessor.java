package com.sadetec.util;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.Proxy;
import java.net.Proxy.Type;
import java.nio.charset.Charset;
import java.util.List;

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
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sadetec.model.Category;
import com.sadetec.model.CategorySpec;
import com.sadetec.repository.CategorySpecRepository;

@Component("categorySpecProcessor")
public class CategorySpecProcessor {

	private final Logger log = LoggerFactory.getLogger(CategorySpecProcessor.class);

	private String queryUrl = "http://cn.misumi-ec.com/vona2/spookserver";

	private SimpleClientHttpRequestFactory requestFactory = new SimpleClientHttpRequestFactory();

	@Autowired
	private CategorySpecRepository categorySpecRepository;

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
		countParams.add("Command", "GetCategory");
		countParams.add("RequestType", "PerAttribute");
		countParams.add("Protocol", "com.forcia.spook.honeybee.Primrose");
		countParams.add("Date", String.valueOf(System.currentTimeMillis()));
		HttpEntity<MultiValueMap<String, String>> countReq = new HttpEntity<MultiValueMap<String, String>>(countParams, headers);
		ResponseEntity<String> countResp = restTemplate.postForEntity(queryUrl, countReq, String.class);
		log.info("获取到{}", countResp.getBody());
		Document countDoc = Jsoup.parse(countResp.getBody(), "", Parser.xmlParser());
		String tempJson = countDoc.select("array").get(10).text();
		log.info("解析Category 规格分类{}", tempJson);

		try {
			
			List<JsonNode> myObjects = objectMapper.readValue(tempJson, new TypeReference<List<JsonNode>>(){});
			
			for (JsonNode jsonNode : myObjects) {
				
				CategorySpec categorySpec = new CategorySpec();
				categorySpec.setCategoryCode(curCate.getId());
				categorySpec.setKey(jsonNode.get("key").asText());
				categorySpec.setTitle(jsonNode.get("title").asText());
				categorySpec.setUnit(jsonNode.get("unit").asText());
				categorySpec.setIllustrationType(jsonNode.get("illustration_type").asText());
				categorySpec.setCategorySpecNo(jsonNode.get("categorySpecNo").asText());
				categorySpec.setPropertyCode(jsonNode.get("p_property_code").asText());
				categorySpec.setAryChoiceName(objectMapper.writeValueAsString(jsonNode.get("ary_choice_name")));
				categorySpec.setAryChoiceCode(objectMapper.writeValueAsString(jsonNode.get("ary_choiceCode")));
				categorySpec.setValueType(jsonNode.get("value_type").asText());
				categorySpec.setExtraSpec(jsonNode.get("extra_spec").asText());
				categorySpec.setNoticeString(jsonNode.get("noticeString").asText());
				categorySpec.setHasParamSpec(jsonNode.get("has_paramSpec").asText());
				
				categorySpec.setUseFlag(jsonNode.get("use_flag").asText());
				categorySpec.setGroupingStep(jsonNode.get("grouping_step").asText());
				categorySpec.setDisplayPattern(jsonNode.get("display_pattern").asText());
				categorySpec.setIsSpecInch(jsonNode.get("is_spec_inch").asText());
				categorySpec.setSimilarFlag(jsonNode.get("similarFlag").asText());
				categorySpec.setGroupTitle(jsonNode.get("groupTitle").asText());
				categorySpec.setGroupNoticeString(jsonNode.get("groupNoticeString").asText());
				categorySpec.setGroupIndex(jsonNode.get("groupIndex").asText());
				categorySpec.setIsParent(jsonNode.get("is_parent").asText());
				
				log.info("待保存的分类选型型号：{}",categorySpec);
				
				categorySpecRepository.save(categorySpec);
				
			}
			
			
			
		}
		catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		catch (IOException e) {
			e.printStackTrace();
		}

	}
	
	public static void main(String[] args) {
		Category category = new Category();
		category.setId("M0101000000");
		category.setCategoryLevel(3);
		
		
		CategorySpecProcessor categorySpecProcessor = new CategorySpecProcessor();
		
		ObjectMapper objectMapper = new ObjectMapper();
		categorySpecProcessor.objectMapper = objectMapper;
		
		categorySpecProcessor.process(category);
	}

}
