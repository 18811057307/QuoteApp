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

@Component("indexPageProcessor")
public class IndexPageProcessor implements PageProcessor {

	private final Logger log = LoggerFactory.getLogger(IndexPageProcessor.class);
	
	@Autowired
	private CategoryRepository categoryRepository;
		
	private Site site = Site.me().setTimeOut(60000).setRetryTimes(3).setSleepTime(10000)
			.addHeader("User-Agent",  "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.80 Safari/537.36 Core/1.47.516.400 QQBrowser/9.4.8188.400")  
			.addHeader("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8")  
			.addHeader("Accept-Encoding", "gzip, deflate, sdch")
			.addHeader("Accept-Language", "zh-CN,zh;q=0.8")  ;
	
	@Override
	public Site getSite() {
		return site;
	}
	
	public void setProxy(String proxyUrl) {
		site.setHttpProxy(new HttpHost(proxyUrl));
	}

	@Override
	public void process(Page page) {
		
		Html tempHtml = page.getHtml();
		
		//获取产品主分类
		List<Selectable> categorys = tempHtml.xpath("div[@class=\"categoryList\"]/dl//dd/a[contains(@href,'vona2')]").nodes();
		
		
		//遍历主分类
		for (Selectable maincategory : categorys) {		

			//通过主分类的data-headcat-code值获取其子分类
			String childCategoryPath = "div[@data-grandchild-parent=\"" + maincategory.xpath("//a/@data-headcat-code") + "\"]/ul[1]//a";
			
			List<Selectable> childCategorys = tempHtml.xpath(childCategoryPath).nodes();
			
			Category mainCategory = new Category();
			mainCategory.setId(maincategory.xpath("//a/@data-headcat-code").toString());
			mainCategory.setCategoryName(StringUtils.trimLeadingWhitespace(maincategory.xpath("//a/text()").toString()));
			mainCategory.setCategoryUrl(maincategory.xpath("//a/@href").toString());
			mainCategory.setCategoryLevel(1);
			if(childCategorys.isEmpty()) {
				mainCategory.setHasChildCategory(false);
				mainCategory.setProcFlag(false);
			} else {
				mainCategory.setHasChildCategory(true);
				mainCategory.setProcFlag(true);
			}			
			log.info("待保存的主分类：{}", mainCategory);
			categoryRepository.save(mainCategory);
			
			//遍历子分类，获取第三层分类
			for (Selectable childCategory : childCategorys) {
				
				String grandChildPath = "div[@id=\"grandchildList_" + maincategory.xpath("//a/@data-headcat-code") +  "\"]//a[contains(@href,\"" + childCategory.xpath("//a/@href") + "\")]";
				log.debug("第三级分类的xpath：{}", grandChildPath.toString());
				List<Selectable> grandCategorys = tempHtml.xpath(grandChildPath).nodes();
				
				Category tempChildCategory = new Category();
				tempChildCategory.setId(childCategory.xpath("//a/@data-headcat-code").toString());
				tempChildCategory.setCategoryName(childCategory.xpath("//a/text()").toString());
				tempChildCategory.setCategoryUrl(childCategory.xpath("//a/@href").toString());
				tempChildCategory.setCategoryLevel(2);
				tempChildCategory.setParentCode(mainCategory.getId());
				if(grandCategorys.isEmpty()) {
					tempChildCategory.setHasChildCategory(false);
					tempChildCategory.setProcFlag(false);
				} else {
					tempChildCategory.setHasChildCategory(true);
					tempChildCategory.setProcFlag(true);
				}		
				log.info("待保存的二级分类：{}", tempChildCategory);
				categoryRepository.save(tempChildCategory);
				
				//遍历第三层分类
				for (Selectable grandCategory : grandCategorys) {
					
					Category grandChildCategory = new Category();
					String grandUrl = grandCategory.xpath("//a/@href").toString();
					String[] splitedUrl = StringUtils.delimitedListToStringArray(grandUrl, "/");
					String grandCode = "";
					if(splitedUrl.length > 0) {
						
						if(StringUtils.endsWithIgnoreCase(grandUrl, "/")) {
							grandCode = splitedUrl[splitedUrl.length - 2];							
						} else {
							grandCode = splitedUrl[splitedUrl.length - 1];
						}
						
					}
					grandChildCategory.setId(grandCode);
					grandChildCategory.setCategoryName(grandCategory.xpath("//a/text()").toString());
					grandChildCategory.setCategoryUrl(grandCategory.xpath("//a/@href").toString());
					grandChildCategory.setCategoryLevel(3);
					grandChildCategory.setParentCode(tempChildCategory.getId());
					//TODO - 如何判断是否有子分类? 首先设置为无自分类，在处理对应页面时，再根据页面内容具体设置
					grandChildCategory.setHasChildCategory(false);
					grandChildCategory.setProcFlag(false);
					log.info("待保存的三级分类：{}", grandChildCategory);
					categoryRepository.save(grandChildCategory);
					
				}
			}
			
		}
		
	}

}
