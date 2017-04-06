package com.sadetec.rest;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sadetec.model.Category;
import com.sadetec.model.ProcessorStatus;
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
	
	@Autowired
	private ThreadPoolTaskExecutor threadPoolTaskExecutor;
	
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
	
	@RequestMapping(value = "/asynCrawlProduct", method = POST, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<PageResponse<String>> asynCrawlProduct(
			@RequestParam(value = "proxyUrl", required = false) String proxyUrl
			,@RequestParam(value = "numOfThread", required = false, defaultValue="2") Integer numOfThread) throws URISyntaxException {

		List<String> taskIds = new ArrayList<String>();
		
		productPageProcessor.init(proxyUrl);
		
		for (int i = 0; i < numOfThread; i++) {
			String taskId = "CrawlProduct-Thead-" + i;
			productPageProcessor.executeAsyncTask(taskId);
		}
		
		PageResponse<String> pageResponse = new PageResponse<String>(taskIds);
		pageResponse.setSuccess(Boolean.TRUE);
		pageResponse.setMessage("产品爬虫工具已启动");
		return new ResponseEntity<PageResponse<String>>(pageResponse, HttpStatus.OK);
		
	}
	
	@RequestMapping(value = "/productCrawlerStatus", method = GET, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<ProcessorStatus> productCrawlerStatus() throws URISyntaxException {
		ProcessorStatus status = new ProcessorStatus();
		status.setTotal(productPageProcessor.getTotal());
		status.setFinished(productPageProcessor.getFinished().get());
		status.setActiveCount(threadPoolTaskExecutor.getActiveCount());
		return new ResponseEntity<ProcessorStatus>(status, HttpStatus.OK);
		
	}
		
	@RequestMapping(value = "/asynCrawlPrice", method = POST, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<PageResponse<String>> asynCrawlPrice(
			@RequestParam(value = "proxyUrl", required = false) String proxyUrl
			,@RequestParam(value = "numOfThread", required = false, defaultValue="2") Integer numOfThread
			,@RequestParam(value = "userid", required = false, defaultValue="agapanthus") String userid
			,@RequestParam(value = "password", required = false, defaultValue="agapanth") String password) throws URISyntaxException {
		List<String> taskIds = new ArrayList<String>();
		
		pricePageProcessor.init(proxyUrl, userid, password);
		
		for (int i = 0; i < numOfThread; i++) {
			String taskId = "CrawlPrice-Thead-" + i;
			pricePageProcessor.executeAsyncTask(i);
		}
		
		PageResponse<String> pageResponse = new PageResponse<String>(taskIds);
		pageResponse.setSuccess(Boolean.TRUE);
		pageResponse.setMessage("产品价格爬虫工具已启动");
		return new ResponseEntity<PageResponse<String>>(pageResponse, HttpStatus.OK);
		
	}
	
	@RequestMapping(value = "/priceCrawlerStatus", method = GET, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<ProcessorStatus> priceCrawlerStatus() throws URISyntaxException {
		ProcessorStatus status = new ProcessorStatus();
		status.setTotal(pricePageProcessor.getTotal());
		status.setFinished(pricePageProcessor.getFinished().get());
		status.setActiveCount(threadPoolTaskExecutor.getActiveCount());
		return new ResponseEntity<ProcessorStatus>(status, HttpStatus.OK);
		
	}
	
	@RequestMapping(value = "/stopCrawler", method = GET, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<PageResponse> stopCrawler() throws URISyntaxException {
		productPageProcessor.shutdown();
		pricePageProcessor.shutdown();
		PageResponse status = new PageResponse(null);
		status.setSuccess(Boolean.TRUE);
		status.setMessage("爬虫任务已停止");
		return new ResponseEntity<PageResponse>(status, HttpStatus.OK);
		
	}


}