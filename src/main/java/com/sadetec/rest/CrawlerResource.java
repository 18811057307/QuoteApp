package com.sadetec.rest;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

import java.net.URISyntaxException;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sadetec.model.Category;
import com.sadetec.model.Product;
import com.sadetec.model.Series;
import com.sadetec.repository.CategoryRepository;
import com.sadetec.repository.ProductRepository;
import com.sadetec.repository.SeriesRepository;
import com.sadetec.rest.support.PageResponse;
import com.sadetec.util.CategoryPageProcessor;
import com.sadetec.util.IndexPageProcessor;
import com.sadetec.util.PricePageProcessor;
import com.sadetec.util.ProductPageProcessor;
import com.sadetec.util.SeriesPageProcessor;

import us.codecraft.webmagic.Spider;

@RestController
@RequestMapping("/api/crawler")
public class CrawlerResource {

	private final Logger log = LoggerFactory.getLogger(CrawlerResource.class);

	@Autowired
	private CategoryRepository categoryRepository;
	
	@Autowired
	private SeriesRepository seriesRepository;
	
	@Autowired
	private ProductRepository productRepository;
	
	
	@Autowired
	private IndexPageProcessor indexPageProcessor;	
	
	@Autowired
	private CategoryPageProcessor categoryPageProcessor;	
	
	@Autowired
	private SeriesPageProcessor seriesPageProcessor;		

	@Autowired
	private ProductPageProcessor productPageProcessor;
	
	@Autowired
	private PricePageProcessor pricePageProcessor;
	
	@RequestMapping(value = "/crawlIndexPage", method = POST, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<PageResponse> crawlIndexPage(
			@RequestParam(value = "urlToCrawl", required = true, defaultValue = "1") String urlToCrawl,
			@RequestParam(value = "proxyUrl", required = false) String proxyUrl) throws URISyntaxException {

		log.info("Create Crawler : {}", urlToCrawl);

		if(!StringUtils.isEmpty(proxyUrl)) {
			indexPageProcessor.setProxy(proxyUrl);
		}
		
		Spider.create(indexPageProcessor).addUrl(urlToCrawl).thread(1).run();

		PageResponse pageResponse = new PageResponse(null);
		pageResponse.setSuccess(Boolean.TRUE);
		pageResponse.setMessage("Start Index Page Crawler");

		return new ResponseEntity<PageResponse>(pageResponse, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/crawlCategoryPage", method = POST, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<PageResponse> crawlCategoryPage(@RequestParam(value = "proxyUrl", required = false) String proxyUrl) throws URISyntaxException {

		log.info("Start Category Page Crawler");

		if(!StringUtils.isEmpty(proxyUrl)) {
			categoryPageProcessor.setProxy(proxyUrl);
		}
		
		List<Category> results = categoryRepository.findByHasChildCategoryAndProcFlag(false,false);
		
		for (Category category : results) {
			Spider.create(categoryPageProcessor).addUrl(category.getCategoryUrl()).run();			
		}
		

		PageResponse pageResponse = new PageResponse(null);
		pageResponse.setSuccess(Boolean.TRUE);
		pageResponse.setMessage("Start CategoryPage Page Crawler");

		return new ResponseEntity<PageResponse>(pageResponse, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/crawlSeriesPage", method = POST, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<PageResponse> crawlSeriesPage(@RequestParam(value = "proxyUrl", required = false) String proxyUrl) throws URISyntaxException {

		log.info("Start Series Page Crawler");

		if(!StringUtils.isEmpty(proxyUrl)) {
			seriesPageProcessor.setProxy(proxyUrl);
		}
		
		List<Category> categories = categoryRepository.findByHasChildCategoryAndProcByIsNull(false);
		for (Category category : categories) {
			seriesPageProcessor.process(category);
			category.setProcBy("QuoteAppSeriesPageCrawler");
			categoryRepository.save(category);
		}
		
		PageResponse pageResponse = new PageResponse(null);
		pageResponse.setSuccess(Boolean.TRUE);
		pageResponse.setMessage("Start Series Page Crawler");

		return new ResponseEntity<PageResponse>(pageResponse, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/crawlProductPage", method = POST, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<PageResponse> crawlProductPage(@RequestParam(value = "proxyUrl", required = false) String proxyUrl) throws URISyntaxException {

		log.info("Start Product Page Crawler");

		if(!StringUtils.isEmpty(proxyUrl)) {
			productPageProcessor.setProxy(proxyUrl);
		}
		
		PageRequest pageRequest = new PageRequest(0, 50);		
		Page<Series> series = seriesRepository.findByProcFlagIsNull(pageRequest);
		
		for(int page=0; page < series.getTotalPages(); page ++) {
			pageRequest = new PageRequest(0, 50);
			series = seriesRepository.findByProcFlagIsNull(pageRequest);
			for (Series tempSeries : series.getContent()) {
				if (productPageProcessor.process(tempSeries)) {
					tempSeries.setProcFlag(true);
					seriesRepository.save(tempSeries);
				}
			}
			
		}
		
		PageResponse pageResponse = new PageResponse(null);
		pageResponse.setSuccess(Boolean.TRUE);
		pageResponse.setMessage("Start Product Page Crawler");

		return new ResponseEntity<PageResponse>(pageResponse, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/crawlPricePage", method = POST, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<PageResponse> crawlPricePage(@RequestParam(value = "proxyUrl", required = false) String proxyUrl) throws URISyntaxException {

		log.info("Start Price Page Crawler");

		if(!StringUtils.isEmpty(proxyUrl)) {
			pricePageProcessor.setProxy(proxyUrl);
		}
		
		pricePageProcessor.login();
		
		PageRequest pageRequest = new PageRequest(0, 50);		
		Page<Product> products = productRepository.findByProcFlagIsNull(pageRequest);
		
		for(int page=0; page < products.getTotalPages(); page ++) {
			pageRequest = new PageRequest(0, 50);
			products = productRepository.findByProcFlagIsNull(pageRequest);
			for (Product tempProduct : products.getContent()) {
				tempProduct.setUnitPrice(pricePageProcessor.process(tempProduct,1));
				tempProduct.setProcFlag(true);
				productRepository.save(tempProduct);
			}
			
		}
		
		PageResponse pageResponse = new PageResponse(null);
		pageResponse.setSuccess(Boolean.TRUE);
		pageResponse.setMessage("Start Product Page Crawler");

		return new ResponseEntity<PageResponse>(pageResponse, HttpStatus.OK);
	}

}