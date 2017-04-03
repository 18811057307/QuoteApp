package com.sadetec.util;

import java.util.List;

import org.apache.http.HttpHost;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import com.sadetec.model.Category;
import com.sadetec.repository.CategoryRepository;

import us.codecraft.webmagic.Page;
import us.codecraft.webmagic.Site;
import us.codecraft.webmagic.processor.PageProcessor;
import us.codecraft.webmagic.selector.Html;
import us.codecraft.webmagic.selector.Selectable;

@Component("categoryPageProcessor")
public class CategoryPageProcessor implements PageProcessor {

	private final Logger log = LoggerFactory.getLogger(CategoryPageProcessor.class);
	
	@Autowired
	private CategoryRepository categoryRepository;

	private Site site = Site.me().setTimeOut(60000).setRetryTimes(3).setSleepTime(1000)
			.addHeader("User-Agent",
					"Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.80 Safari/537.36 Core/1.47.516.400 QQBrowser/9.4.8188.400")
			.addHeader("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8")
			.addHeader("Accept-Encoding", "gzip, deflate, sdch").addHeader("Accept-Language", "zh-CN,zh;q=0.8");

	@Override
	public Site getSite() {
		return site;
	}
	
	public void setProxy(String proxyUrl) {
		site.setHttpProxy(new HttpHost(proxyUrl));
	}

	@Override
	public void process(Page page) {
		//总条数
		//System.out.println(page.getHtml().xpath("primrose/array[4]/text()").get());
		
		///获取vona2/detail/110300000120/
		//System.out.println(page.getHtml().xpath("primrose/array[5]/text()").get());
		
		Html tempHtml = page.getHtml();	
		//如果页面包含div class="crmCategoryOtherList_box"说明该页面是分类页面，否则是产品页面
		List<Selectable> categorys = tempHtml.xpath("div[@class=\"crmCategoryOtherList_box\"]/ul//li/a").nodes();		
		if(categorys.isEmpty()) {
			//TODO 产品列表页面
			log.info("该页面为产品页面{}", page.getUrl());
			String[] splitedPageUrl = StringUtils.delimitedListToStringArray(page.getUrl().toString(), "/");
			String pageCategoryCode = "";
			if(splitedPageUrl.length > 0) {					
				if(StringUtils.endsWithIgnoreCase(page.getUrl().toString(), "/")) {						
					pageCategoryCode = splitedPageUrl[splitedPageUrl.length - 2];
				} else {
					pageCategoryCode = splitedPageUrl[splitedPageUrl.length - 1];
				}					
			} 
			Category pageCategory = categoryRepository.findById(pageCategoryCode);
			pageCategory.setProcFlag(true);
			pageCategory.setHasChildCategory(false);
			categoryRepository.save(pageCategory);
			log.info("保存产品页面状态{}", pageCategory.toString());
			
		} else {
			log.info("该页面为分类页面{}", page.getUrl());
			for (Selectable crmCategory : categorys) {
				
				String crmCategoryUrl = crmCategory.xpath("//a/@href").toString();
				String crmCategoryName = crmCategory.xpath("//a/span[@class='tit']/text()").toString();
				String[] splitedUrl = StringUtils.delimitedListToStringArray(crmCategoryUrl, "/");
				String crmCategoryCode = "";
				String parentCode = "";
				Integer crmCategoryLevel = 0;
				if(splitedUrl.length > 0) {					
					if(StringUtils.endsWithIgnoreCase(crmCategoryUrl, "/")) {						
						crmCategoryCode = splitedUrl[splitedUrl.length - 2];
						parentCode = splitedUrl[splitedUrl.length - 3];
					} else {
						crmCategoryCode = splitedUrl[splitedUrl.length - 1];
						parentCode = splitedUrl[splitedUrl.length - 2];
					}					
				} 
				Category parentCate = categoryRepository.findById(parentCode);
				if(null != parentCate) {
					crmCategoryLevel = parentCate.getCategoryLevel() + 1;
					Category crmChildCategory = new Category();
					crmChildCategory.setId(crmCategoryCode);
					crmChildCategory.setCategoryName(crmCategoryName);
					crmChildCategory.setCategoryUrl(crmCategoryUrl);
					crmChildCategory.setCategoryLevel(crmCategoryLevel);
					crmChildCategory.setParentCode(parentCate.getId());
					crmChildCategory.setHasChildCategory(false);
					crmChildCategory.setProcFlag(true);
					categoryRepository.save(crmChildCategory);
					parentCate.setHasChildCategory(true);
					parentCate.setProcFlag(true);
					categoryRepository.save(parentCate);
					
				} else {
					log.error("遍历产品页面出错，未找到上级分类.");
				}
				
				
				
			}
			
		}
				
	}

	public static void main(String[] args) {
		
		/* 获取分类下的产品
	    Request request = new Request("http://cn.misumi-ec.com/vona2/spookserver");
	    request.setMethod(HttpConstant.Method.POST);
	    
	    NameValuePair[] nameValuePair = new NameValuePair[8];
	    nameValuePair[0] = new BasicNameValuePair("PageName", "search");
	    nameValuePair[1] = new BasicNameValuePair("categoryLevel", "3");
	    nameValuePair[2] = new BasicNameValuePair("categoryCode", "M0101000000");
	    nameValuePair[3] = new BasicNameValuePair("listType", "SERIES");
	    nameValuePair[4] = new BasicNameValuePair("Command", "CountParam_search");
	    nameValuePair[5] = new BasicNameValuePair("RequestType", "PerAttribute");
	    nameValuePair[6] = new BasicNameValuePair("Protocol", "com.forcia.spook.honeybee.Primrose");
	    nameValuePair[7] = new BasicNameValuePair("Date", String.valueOf(System.currentTimeMillis()));	    
	    
	        
	    NameValuePair[] nameValuePair = new NameValuePair[11];
	    nameValuePair[0] = new BasicNameValuePair("PageName", "search");
	    nameValuePair[1] = new BasicNameValuePair("categoryLevel", "3");
	    nameValuePair[2] = new BasicNameValuePair("categoryCode", "M0101000000");
	    nameValuePair[3] = new BasicNameValuePair("listType", "SERIES");
	    nameValuePair[4] = new BasicNameValuePair("Command", "List_search");
	    nameValuePair[5] = new BasicNameValuePair("RequestType", "PerAttribute");
	    nameValuePair[6] = new BasicNameValuePair("Protocol", "com.forcia.spook.honeybee.Primrose");
	    nameValuePair[7] = new BasicNameValuePair("Page", "1");
	    nameValuePair[8] = new BasicNameValuePair("ItemPerPage", "45");
	    nameValuePair[9] = new BasicNameValuePair("sortOrder", "");
	    nameValuePair[10] = new BasicNameValuePair("Date", String.valueOf(System.currentTimeMillis()));	    
	    request.putExtra("nameValuePair", nameValuePair);	   		
		Spider.create(new ProductPageProcessor()).addRequest(request).thread(1).run();
		*/
	}

}
