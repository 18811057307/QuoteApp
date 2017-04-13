package com.sadetec;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.context.junit4.SpringRunner;

import com.sadetec.model.Series;
import com.sadetec.repository.CategoryRepository;
import com.sadetec.repository.SeriesRepository;
import com.sadetec.util.CategoryPageProcessor;
import com.sadetec.util.CategorySpecProcessor;
import com.sadetec.util.IndexPageProcessor;
import com.sadetec.util.ProductPageProcessor;
import com.sadetec.util.SeriesPageProcessor;
import com.sadetec.util.SeriesSpecProcessor;

@RunWith(SpringRunner.class)
@SpringBootTest
public class QuoteAppApplicationTests {

	@Autowired
	private CategoryRepository categoryRepository;
	
	@Autowired
	private SeriesRepository seriesRepository;
	
	@Autowired
	private IndexPageProcessor indexPageProcessor;	
	
	@Autowired
	private CategoryPageProcessor categoryPageProcessor;	
	
	@Autowired
	private SeriesPageProcessor seriesPageProcessor;		

	@Autowired
	private ProductPageProcessor productPageProcessor;
	
	@Autowired
	private CategorySpecProcessor categorySpecProcessor;
	
	
	@Autowired
	private SeriesSpecProcessor seriesSpecProcessor;
	
	
	@Test
	public void contextLoads() {
		/*
		categoryRepository.deleteAll();
		
		Spider.create(indexPageProcessor).addUrl("http://cn.misumi-ec.com/").run();
		
		Assert.assertTrue("查询结果数量应大约1", categoryRepository.findAll().size() > 0);
		*/
		
		/*
		List<Category> results = categoryRepository.findByHasChildCategoryAndProcFlag(false,false);
		
		for (Category category : results) {
			categorySpecProcessor.process(category);		
		}
		*/
		List<Series> serieses = seriesRepository.findByProcFlag(false);
		for (Series series : serieses) {
			
			seriesSpecProcessor.process(series);
			
		}
		
		
		//seriesPageProcessor.process("http://cn.misumi-ec.com/vona2/spookserver");
		
		/*
		List<Category> categories = categoryRepository.findByHasChildCategoryAndProcByIsNull(false);
		for (Category category : categories) {
			seriesPageProcessor.process(category);
			category.setProcBy("QuoteAppCrawler");
			categoryRepository.save(category);
		}
		*/
		
		/*
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
		*/
		
		
	}

}
