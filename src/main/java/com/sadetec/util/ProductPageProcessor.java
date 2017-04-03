package com.sadetec.util;

import java.net.InetSocketAddress;
import java.net.Proxy;
import java.net.Proxy.Type;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

import javax.xml.transform.dom.DOMSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.http.converter.xml.SourceHttpMessageConverter;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.w3c.dom.Document;
import org.w3c.dom.Node;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sadetec.model.Product;
import com.sadetec.model.Series;
import com.sadetec.repository.ProductRepository;

@Component("productPageProcessor")
public class ProductPageProcessor {

	private final Logger log = LoggerFactory.getLogger(ProductPageProcessor.class);

	private String seriesQueryUrl = "http://cn.misumi-ec.com/vona2/spookserver";
	
	private SimpleClientHttpRequestFactory requestFactory = new SimpleClientHttpRequestFactory();

	@Autowired
	private ProductRepository productRepository;

	@Autowired
	private ObjectMapper objectMapper;
	

	public void setProxy(String proxyUrl) {
		Proxy proxy = new Proxy(Type.HTTP, new InetSocketAddress(proxyUrl, 80));
		requestFactory.setProxy(proxy);		
	}

	public boolean process(Series curSeries) {

		requestFactory.setReadTimeout(60000);

		RestTemplate restTemplate = new RestTemplate(requestFactory);

		restTemplate.getMessageConverters().add(0, new StringHttpMessageConverter(Charset.forName("UTF-8")));

		SourceHttpMessageConverter<DOMSource> sourceHttpMsgCon = new SourceHttpMessageConverter<DOMSource>();
		sourceHttpMsgCon.setSupportDtd(true);
		restTemplate.getMessageConverters().add(1, sourceHttpMsgCon);

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(new MediaType("application", "x-www-form-urlencoded", Charset.forName("UTF-8")));
		MultiValueMap<String, String> countParams = new LinkedMultiValueMap<String, String>();
		countParams.add("PageName", "detail");
		countParams.add("categoryLevel", "7");
		countParams.add("categoryCode", curSeries.getId());
		countParams.add("listType", "HISSU");
		countParams.add("Command", "CountParam_detail");
		countParams.add("RequestType", "PerAttribute");
		countParams.add("Protocol", "com.forcia.spook.honeybee.Primrose");
		countParams.add("Date", String.valueOf(System.currentTimeMillis()));
		HttpEntity<MultiValueMap<String, String>> countReq = new HttpEntity<MultiValueMap<String, String>>(countParams, headers);
		ResponseEntity<DOMSource> countResp = restTemplate.postForEntity(seriesQueryUrl, countReq, DOMSource.class);
		Document countDoc = getDocument(countResp.getBody());
		Integer count = Integer.valueOf(countDoc.getElementsByTagName("array").item(4).getTextContent());
		log.info("解析数量{}", count);

		MultiValueMap<String, String> listParams = new LinkedMultiValueMap<String, String>();
		listParams.add("PageName", "detail");
		listParams.add("categoryLevel", "7");
		listParams.add("categoryCode", curSeries.getId());
		listParams.add("listType", "HISSU");
		listParams.add("Command", "List_detail");
		listParams.add("RequestType", "PerAttribute");
		listParams.add("Protocol", "com.forcia.spook.honeybee.Primrose");
		listParams.add("ItemPerPage", "45");
		listParams.add("sortOrder", "");
		listParams.add("Date", String.valueOf(System.currentTimeMillis()));

		int totalPage = Math.floorDiv(count, 45) + 1;
		for (int page = 1; page <= totalPage; page++) {
			listParams.remove("Page");
			listParams.add("Page", Integer.toString(page));
			HttpEntity<MultiValueMap<String, String>> productPageReq = new HttpEntity<MultiValueMap<String, String>>(listParams, headers);
			ResponseEntity<DOMSource> productPageResp = restTemplate.postForEntity(seriesQueryUrl, productPageReq, DOMSource.class);

			try {
				Document productDoc = getDocument(productPageResp.getBody());
				String productIdTxt = productDoc.getElementsByTagName("array").item(3).getTextContent();
				String productTxt = productDoc.getElementsByTagName("array").item(4).getTextContent();

				List<String> productIds = new ArrayList<>();				
				Scanner productIdScanner = new Scanner(productIdTxt);
				while (productIdScanner.hasNextLine()) {
					productIds.add(productIdScanner.nextLine());
				}
				productIdScanner.close();

				List<String> productJsons = new ArrayList<>();				
				Scanner productScanner = new Scanner(productTxt);
				while (productScanner.hasNextLine()) {
					productJsons.add(productScanner.nextLine());
				}
				productScanner.close();
				
				if (productIds.size() != productJsons.size()) {
					return false;
				}

				int i = 0;
				
				for (String tempJson : productJsons) {
					JsonNode root = objectMapper.readTree(tempJson);
					Product product = new Product();
					product.setId(productIds.get(i));
					product.setProductName(root.get("series_name").asText());
					product.setProductSpec(root.get("sycd").asText());
					product.setProductUrl(curSeries.getSeriesUrl() + "/?HissuCode=" + productIds.get(i));
					product.setSeriesCode(root.get("series_code").asText());
					product.setTypeCode(root.get("type_code").asText());
					product.setTypeName(root.get("type_name").asText());
					product.setBrdCode(root.get("brd_code").asText());
					product.setBrdName(root.get("disp_brandName").asText());

					log.info("待保存产品:{}", product);
					productRepository.save(product);
					i++;

				}
				

			}
			catch (Exception e) {
				e.printStackTrace();
				return false;
			}

		}
		return true;
	}

	private Document getDocument(DOMSource source) {
		Node node = source.getNode();
		if (node instanceof Document) {
			return (Document) node;
		}
		else if (node != null) {
			return node.getOwnerDocument();
		}
		else {
			return null;
		}
	}

	public static void main(String[] args) {

		ProductPageProcessor productPageProcessor = new ProductPageProcessor();
		productPageProcessor.objectMapper = new ObjectMapper();
		Series series = new Series();
		series.setId("222005933703");

		productPageProcessor.process(series);

	}


}
