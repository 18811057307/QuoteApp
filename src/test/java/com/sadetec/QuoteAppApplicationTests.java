package com.sadetec;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.sadetec.model.Category;
import com.sadetec.model.Series;
import com.sadetec.repository.CategoryRepository;
import com.sadetec.repository.SeriesRepository;
import com.sadetec.util.CategoryPageProcessor;
import com.sadetec.util.CategorySpecProcessor;
import com.sadetec.util.IndexPageProcessor;
import com.sadetec.util.PricePageProcessor;
import com.sadetec.util.ProductPageProcessor;
import com.sadetec.util.Rewriter;
import com.sadetec.util.SeriesPageProcessor;
import com.sadetec.util.SeriesSpecProcessor;

@RunWith(SpringRunner.class)
@SpringBootTest
public class QuoteAppApplicationTests {

	private final Logger log = LoggerFactory.getLogger(QuoteAppApplicationTests.class);

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
		 * categoryRepository.deleteAll();
		 * 
		 * Spider.create(indexPageProcessor).addUrl("http://cn.misumi-ec.com/").run();
		 * 
		 * Assert.assertTrue("查询结果数量应大约1", categoryRepository.findAll().size() > 0);
		 */

		/*
		List<Category> results = categoryRepository.findByHasChildCategoryAndProcFlag(false, false);

		for (Category category : results) {
			categorySpecProcessor.process(category);
		}

		List<Series> serieses = seriesRepository.findByProcFlag(false);
		for (Series series : serieses) {

			seriesSpecProcessor.process(series);

		}
		*/

		// seriesPageProcessor.process("http://cn.misumi-ec.com/vona2/spookserver");

		/*
		 * List<Category> categories =
		 * categoryRepository.findByHasChildCategoryAndProcByIsNull(false); for (Category
		 * category : categories) { seriesPageProcessor.process(category);
		 * category.setProcBy("QuoteAppCrawler"); categoryRepository.save(category); }
		 */

		/*
		 * PageRequest pageRequest = new PageRequest(0, 50); Page<Series> series =
		 * seriesRepository.findByProcFlagIsNull(pageRequest);
		 * 
		 * for(int page=0; page < series.getTotalPages(); page ++) { pageRequest = new
		 * PageRequest(0, 50); series =
		 * seriesRepository.findByProcFlagIsNull(pageRequest); for (Series tempSeries :
		 * series.getContent()) { if (productPageProcessor.process(tempSeries)) {
		 * tempSeries.setProcFlag(true); seriesRepository.save(tempSeries); } }
		 * 
		 * }
		 */

	}

	public static void main(String[] args) {
		Logger log = LoggerFactory.getLogger(QuoteAppApplicationTests.class);
		String type = "PSFRN①-②-F③-B④-P⑤";
		String code = "PSFRN6-15-F5-B3-P3";

		Pattern codePattern = Pattern.compile("[\u2460-\u246F]");
		String[] orgChars = codePattern.split(type);
		for (String string : orgChars) {
			System.out.println(string);
		}

		Matcher matcher = codePattern.matcher(type);

		Map<String, String> result = new HashMap<String, String>();
		int splitIdx = 0;
		while (matcher.find()) {
			String key = matcher.group();
			log.info("{}. 当前匹配:{}", splitIdx, key);

			int beginIdx = code.indexOf(orgChars[splitIdx]) + orgChars[splitIdx].length();
			
			String value = "";
			if(splitIdx + 1 < orgChars.length) {
				int endIdx = code.indexOf(orgChars[splitIdx + 1], beginIdx);
				log.info("截取字符串位置:{} - {}", beginIdx, endIdx);
				value = code.substring(beginIdx, endIdx);
			} else {
				value = code.substring(beginIdx);
			}

			result.put(key, value);
			log.info("{}. 匹配结果:{}", splitIdx, value);
			splitIdx++;
		}

		log.info("匹配结果:{}", result);
		
		String mimType = "PSFGKRRA①-②-F③-S④-KA⑤-A⑥-KB⑦-B⑧-KC⑨-C⑩";
		String mimCode = new Rewriter("[\\u2460-\\u246F]+") {
		    public String replacement() {
				String key = group(0);
				System.err.println(key);
				return result.get(key);
		    }
		}.rewrite(mimType);
		log.info("转换结果:{}", mimCode);

	}

}
