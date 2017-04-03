package com.sadetec.util;

import java.math.BigDecimal;
import java.net.InetSocketAddress;
import java.net.Proxy;
import java.net.Proxy.Type;
import java.nio.charset.Charset;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

import org.jsoup.Jsoup;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.sadetec.model.Product;
import com.sadetec.repository.ProductRepository;

@Component("pricePageProcessor")
public class PricePageProcessor {

	private final Logger log = LoggerFactory.getLogger(PricePageProcessor.class);

	private String loginUrl = "https://cn.misumi-ec.com/mydesk2/s/login_frame";
	private String quoteReqUrl = "http://cn.misumi-ec.com/mydesk2/s/quotation_request";
	private String quoteInqUrl = "http://cn.misumi-ec.com/mydesk2/s/quotation_inquiry";
	private Boolean isLogin = false;

	private SimpleClientHttpRequestFactory requestFactory = new SimpleClientHttpRequestFactory();
	private RestTemplate restTemplate = new RestTemplate(requestFactory);

	private HttpHeaders loginHeader = new HttpHeaders();
	
	private AtomicInteger finished = new AtomicInteger(0);
	private Long total;
	
	private volatile boolean needShutDown = false;
	
	@Autowired
	private ProductRepository productRepository;

	@Autowired
	private ObjectMapper objectMapper;

	public void setProxy(String proxyUrl) {
		Proxy proxy = new Proxy(Type.HTTP, new InetSocketAddress(proxyUrl, 80));
		requestFactory.setProxy(proxy);
	}
	
	public void setTotal() {
		this.total = productRepository.countByProcByIsNullAndProcFlagIsNull();
	}
	
	public Long getTotal() {
		return this.total;
	}
	
	public void shutdown() {
		this.needShutDown = true;
	}
	
	public AtomicInteger getFinished() {
		return finished;
	}

	public void init(String proxyUrl, String userid, String password) {
		if(!StringUtils.isEmpty(proxyUrl)) {
			this.setProxy(proxyUrl);
		}		
		this.login(userid,password);
		this.setTotal();
		this.needShutDown = false;
	}
	
	public void login(String userid, String password) {
		
		if(this.isLogin) {
			log.info("已登录,直接返回.");
			return;
		}

		requestFactory.setReadTimeout(60000);
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(new MediaType("application", "x-www-form-urlencoded", Charset.forName("UTF-8")));
		MultiValueMap<String, String> countParams = new LinkedMultiValueMap<String, String>();
		countParams.add("userid", userid);
		countParams.add("password", password);
		HttpEntity<MultiValueMap<String, String>> loginReq = new HttpEntity<MultiValueMap<String, String>>(countParams, headers);
		HttpEntity<String> response = restTemplate.exchange(loginUrl, HttpMethod.POST, loginReq, String.class);

		HttpHeaders loginRespHeader = response.getHeaders();
		List<String> cookies = loginRespHeader.get("Set-Cookie");
		if (cookies != null && !cookies.isEmpty()) {
			for (String cookie : cookies) {
				loginHeader.add("Cookie", cookie);
			}
		}

		String wosCookie = Jsoup.parse(response.getBody()).select("div.wrapper img").first().attr("src");
		String ssoCookie = Jsoup.parse(response.getBody()).select("div.wrapper img").last().attr("src");

		HttpHeaders imgHeader = new HttpHeaders();
		imgHeader.set("Accept", "image/webp,image/*,*/*;q=0.8");
		imgHeader.set("Accept-Encoding", "gzip, deflate, sdch, br");
		imgHeader.set("Accept-Language", "zh-CN,zh;q=0.8,en-GB;q=0.6,en;q=0.4");
		imgHeader.set("User-Agent", "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36");
		HttpEntity<?> imgEntity = new HttpEntity<>(null, imgHeader);
		HttpEntity<String> wosResp = restTemplate.exchange(wosCookie, HttpMethod.GET, imgEntity, String.class);
		List<String> wosCookies = wosResp.getHeaders().get(HttpHeaders.SET_COOKIE);

		if (wosCookies != null && !wosCookies.isEmpty()) {
			for (String cookie : wosCookies) {
				loginHeader.add(HttpHeaders.COOKIE, cookie);
			}
		}

		HttpEntity<String> ssoResp = restTemplate.exchange(ssoCookie, HttpMethod.GET, imgEntity, String.class);
		List<String> ssoCookies = ssoResp.getHeaders().get(HttpHeaders.SET_COOKIE);

		if (ssoCookies != null && !ssoCookies.isEmpty()) {
			for (String cookie : ssoCookies) {
				loginHeader.add(HttpHeaders.COOKIE, cookie);
			}
		}

		log.info("登录Cookie值:{}", loginHeader.get(HttpHeaders.COOKIE));
		this.isLogin = true;
	}

	public BigDecimal process(Product product, Integer quantity) {
		try {
			UriComponentsBuilder quoteReqUriBuilder = UriComponentsBuilder.fromHttpUrl(quoteReqUrl)
														.queryParam("brand_code", product.getBrdCode())
														.queryParam("part_number", toPartNum(product.getId()))
														.queryParam("quantity", String.valueOf(quantity))
														.queryParam("response_type", "json")
														.queryParam("callback", "_jsonp_2_")
														.queryParam("_", String.valueOf(System.currentTimeMillis()));

			HttpEntity<?> quoteReq = new HttpEntity<>(loginHeader);
			HttpEntity<String> quoteResp = restTemplate.exchange(quoteReqUriBuilder.build().encode().toUri(), HttpMethod.GET, quoteReq, String.class);
			String quoteRespString = quoteResp.getBody();
			String quoteRespJson = this.jsonpTojson(quoteRespString);
			JsonNode root = objectMapper.readTree(quoteRespJson);
			String receptionCode = root.get("result").get("RECEPTION_CODE").asText();

			log.info("确认价格请求:{}", receptionCode);
			
			UriComponentsBuilder quoteInqUriBuilder = UriComponentsBuilder.fromHttpUrl(quoteInqUrl)
					.queryParam("reception_code", receptionCode)
					.queryParam("response_type", "json")
					.queryParam("callback", "_jsonp_2_")
					.queryParam("_", String.valueOf(System.currentTimeMillis()));

			HttpEntity<?> quoteInqReq = new HttpEntity<>(loginHeader);
			HttpEntity<String> quoteInqResp = restTemplate.exchange(quoteInqUriBuilder.build().encode().toUri(), HttpMethod.GET, quoteInqReq, String.class);
			
			String quoteInqRespJson = this.jsonpTojson(quoteInqResp.getBody());
			JsonNode quoteInqRoot = objectMapper.readTree(quoteInqRespJson);
			ArrayNode details = (ArrayNode) (quoteInqRoot.get("result").get("ary_detail"));
			String unitPrice = details.get(0).get("UNIT_PRICE").asText();
			BigDecimal price = BigDecimal.valueOf(new Double(unitPrice));
			log.info("转换为价格:{}", price);
			return price;
			
		}
		catch (Exception e) {
			e.printStackTrace();
			return BigDecimal.ZERO;
		}
	}

	public String jsonpTojson(String jsonp) {

		if (StringUtils.isEmpty(jsonp)) {
			return jsonp;
		}

		if (!jsonp.contains("(") && !jsonp.contains(")")) {
			return jsonp;
		}

		int first = jsonp.indexOf("(");
		int last = jsonp.lastIndexOf(")");
		
		String temp = jsonp.substring(first + 1, last);
		temp = temp.replaceAll("\"dateSYUKADATE\":new Date[(]\\d{13}[)],", "");
		return temp;

	}
	
	public String toPartNum(String prodId) {

		if (StringUtils.isEmpty(prodId)) {
			return prodId;
		}

		if (!prodId.contains("[") && !prodId.contains("]")) {
			return prodId;
		}

		return new Rewriter("\\[(.*?)\\]") {
		    public String replacement() {
				String curValue = group(1);
				if(curValue.contains("-")) {
					curValue = curValue.substring(0,curValue.indexOf("-"));
				}
				if(curValue.contains(",")) {
					curValue = curValue.substring(0,curValue.indexOf(","));
				}
				return curValue;
		    }
		}.rewrite(prodId);
		
	}
	
	public List<Product> lockRows(String threadId) {
		log.info("通过线程ID锁定待处理的数据:{}" + threadId);
		productRepository.lockRows(threadId);
		return productRepository.getLockedRows(threadId);
	}
	
	@Async	
    public void executeAsyncTask(String threadId){
		List<Product> tobeProcessed = this.lockRows(threadId);
		
		//如果还有未处理的产品,则线程继续执行
		while(tobeProcessed.size() > 0) {
			if(this.needShutDown) {
				break;
			}
			for (Product product : tobeProcessed) {
				log.info("线程{} 待处理产品为: {}" , threadId, product);
				product.setUnitPrice(this.process(product,1));
				product.setProcFlag(true);
				productRepository.save(product);
				this.finished.incrementAndGet();
			}
			tobeProcessed = this.lockRows(threadId);
		}		
    }
	
	public static void main(String[] args) {

		PricePageProcessor pricePageProcessor = new PricePageProcessor();
		System.out.println(pricePageProcessor.toPartNum("MTRF0.3-3"));
		/*
		pricePageProcessor.objectMapper = new ObjectMapper();
		Product product = new Product();
		product.setId("MTRF0.3-3");
		product.setBrdCode("MSM1");

		Integer quantity = 1;

		pricePageProcessor.setProxy("cn-proxy.jp.oracle.com");
		pricePageProcessor.login();
		pricePageProcessor.process(product, quantity);
		*/

	}

}
