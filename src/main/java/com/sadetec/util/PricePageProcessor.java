package com.sadetec.util;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.net.InetSocketAddress;
import java.net.Proxy;
import java.net.Proxy.Type;
import java.nio.charset.Charset;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.zip.GZIPInputStream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.sadetec.model.Product;
import com.sadetec.repository.ProductRepository;

@Component("pricePageProcessor")
public class PricePageProcessor {


	private final Logger log = LoggerFactory.getLogger(PricePageProcessor.class);
	
	//v1,https://cn.misumi-ec.com/mydesk2/s/login_frame
	//v2,https://api.cn.misumi-ec.com/api/v1/auth/login
	private static final String loginUrl = "https://api.cn.misumi-ec.com/api/v1/auth/login";
	
	//v1,http://cn.misumi-ec.com/mydesk2/s/quotation_request
	//v2,https://api.cn.misumi-ec.com/api/v1/price/check
	private static final  String quoteReqUrl = "https://api.cn.misumi-ec.com/api/v1/price/check";
	private static final  String quoteInqUrl = "http://cn.misumi-ec.com/mydesk2/s/quotation_inquiry";
	private static final String applicationId = "77f56fb2-4165-4116-b82f-e495838bb6e1";
	
	
	private Boolean isLogin = false;

	private SimpleClientHttpRequestFactory requestFactory = new SimpleClientHttpRequestFactory();
	private RestTemplate restTemplate = new RestTemplate(requestFactory);

	private HttpHeaders loginHeader = new HttpHeaders();
	
	private AtomicInteger finished = new AtomicInteger(0);
	private Long total;
	
	private volatile boolean needShutDown = false;
	
	private String userid;
	private String password;
	private String sessionId;
	
	@Autowired
	private ProductRepository productRepository;

	@Autowired
	private ObjectMapper objectMapper;

	public void setProxy(String proxyUrl) {
		Proxy proxy = new Proxy(Type.HTTP, new InetSocketAddress(proxyUrl, 80));
		requestFactory.setProxy(proxy);
	}
	
	public void setTotal() {
		//this.total = productRepository.countByProcByIsNullAndProcFlagIsNull();
		//由于服务器性能问题，不能做进行total操作
		this.total = 3004364L;
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
		if(StringUtils.isEmpty(proxyUrl)) {
			requestFactory.setProxy(null);
		} else {
			this.setProxy(proxyUrl);
		}
		this.userid = userid;
		this.password = password;
		this.login(userid, password);
		this.setTotal();
		this.needShutDown = false;
	}
	
	public void login(String userid, String password) {
		
		if(this.isLogin && userid.equals(this.userid)) {
			log.info("已登录,直接返回.");
			return;
		}

		requestFactory.setReadTimeout(60000);		
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
		
		JSONObject loginReq = new JSONObject();
		loginReq.put("loginId", userid);
		loginReq.put("password", password);
		
		HttpEntity<String> entity = new HttpEntity<String>(loginReq.toString(), headers);
		
		UriComponentsBuilder loginReqUriBuilder = UriComponentsBuilder.fromHttpUrl(loginUrl)
				.queryParam("lang", "CHN")
				.queryParam("suppressResponseCode", "true")
				.queryParam("applicationId", applicationId)
				.queryParam("_", String.valueOf(System.currentTimeMillis()));
		
		HttpEntity<String> response = restTemplate.exchange(loginReqUriBuilder.build().encode().toUri(), HttpMethod.POST, entity, String.class);

		HttpHeaders loginRespHeader = response.getHeaders();
		List<String> cookies = loginRespHeader.get("Set-Cookie");
		if (cookies != null && !cookies.isEmpty()) {
			for (String cookie : cookies) {
				loginHeader.add("Cookie", cookie);
			}
		}

		try{
			log.debug("应答信息:{}",response.getBody());
			String loginResp = response.getBody();
			JsonNode root = objectMapper.readTree(loginResp);
			
			String sessId = root.get("sessionId").asText();
			if(!StringUtils.isEmpty(sessId)) {
				this.sessionId = sessId;
			}
			
			Iterator<JsonNode> createCookieUrls = root.get("createCookieUrlList").elements();
			
			HttpHeaders imgHeader = new HttpHeaders();
			imgHeader.set("Accept", "image/webp,image/*,*/*;q=0.8");
			imgHeader.set("Accept-Encoding", "gzip, deflate, sdch, br");
			imgHeader.set("Accept-Language", "zh-CN,zh;q=0.8,en-GB;q=0.6,en;q=0.4");
			imgHeader.set("User-Agent", "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36");
			HttpEntity<?> imgEntity = new HttpEntity<>(null, imgHeader);
			while (createCookieUrls.hasNext()) {
				JsonNode jsonNode = (JsonNode) createCookieUrls.next();
				log.debug("创建客户端Cookie的URL:{}", jsonNode.asText());
				HttpEntity<String> setCookieResp = restTemplate.exchange(jsonNode.asText(), HttpMethod.GET, imgEntity, String.class);
				List<String> setCookies = setCookieResp.getHeaders().get(HttpHeaders.SET_COOKIE);
				
				if (setCookies != null && !setCookies.isEmpty()) {
					for (String cookie : setCookies) {
						loginHeader.add(HttpHeaders.COOKIE, cookie);
					}
				}
			}

			log.info("登录Cookie值:{}", loginHeader.get(HttpHeaders.COOKIE));
			
			
		} catch(Exception e) {
			e.printStackTrace();
			log.info("登录出错:{}", e.getMessage());
		}
		
		this.userid = userid;
		this.password = password;
		this.isLogin = true;
	}

	public BigDecimal process(Product product, Integer quantity) {
		try {
			UriComponentsBuilder quoteReqUriBuilder = UriComponentsBuilder.fromHttpUrl(quoteReqUrl)
														.queryParam("lang", "CHN")
														.queryParam("suppressResponseCode", "true")
														.queryParam("applicationId", applicationId)
														.queryParam("sessionId", this.sessionId)
														.queryParam("_", String.valueOf(System.currentTimeMillis()));
			loginHeader.set("Accept", "*/*");
			loginHeader.set("Accept-Encoding","gzip, deflate, sdch");
			loginHeader.set("Accept-Language","zh-CN,zh;q=0.8,en-GB;q=0.6,en;q=0.4");
			loginHeader.set("Host","cn.misumi-ec.com");
			loginHeader.set("Referer",product.getProductUrl());
			loginHeader.set("User-Agent","Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36");

			//{quantity: 1, partNumber: "PSFGT6-300-M3", brandCode: "MSM1"}
			JSONObject prodJson = new JSONObject();
			prodJson.put("quantity", String.valueOf(quantity));
			prodJson.put("partNumber", toPartNum(product.getId()));
			
			if(StringUtils.isEmpty(product.getBrdCode())) {
				prodJson.put("brandCode", "MSM1");
			} else {
				prodJson.put("brandCode", product.getBrdCode());
			}

			JSONArray productList = new JSONArray();
			productList.add(prodJson);
			
			JSONObject quoteReq = new JSONObject();
			quoteReq.put("productList", productList);
			
			HttpEntity<String> entity = new HttpEntity<String>(quoteReq.toString(), loginHeader);
			
			restTemplate.getMessageConverters().add(0, new StringHttpMessageConverter(Charset.forName("UTF-8")));
			HttpEntity<byte[]> quoteResp = restTemplate.exchange(quoteReqUriBuilder.build().encode().toUri(), HttpMethod.POST, entity, byte[].class);
			
			String quoteRespString;
			
			if("gzip".equalsIgnoreCase(quoteResp.getHeaders().getFirst("Content-Encoding"))) {
				quoteRespString = this.decompress(quoteResp);				
			} else {
				quoteRespString = new String(quoteResp.getBody(),"UTF-8");
			}
			
			
			log.info("询价请求应答:{}",quoteRespString);
			
			JsonNode quoteInqRoot = objectMapper.readTree(quoteRespString);
			ArrayNode details = (ArrayNode) (quoteInqRoot.get("priceList"));
			String unitPrice = details.get(0).get("unitPrice").asText();
			BigDecimal price = BigDecimal.valueOf(new Double(unitPrice));
			log.info("转换为价格:{}", price);
			return price;

			
		}
		catch (Exception e) {
			e.printStackTrace();
			log.info("获取价格出错:{}", e.getMessage());
			return BigDecimal.ZERO;
		}
	}

	private String decompress(HttpEntity<byte[]> quoteInqResp) throws IOException, UnsupportedEncodingException {
		GZIPInputStream gzipInputStream = new GZIPInputStream(new ByteArrayInputStream(quoteInqResp.getBody()));			
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		for (int value = 0; value != -1;) {
		    value = gzipInputStream.read();
		    if (value != -1) {
		        baos.write(value);
		    }
		}
		gzipInputStream.close();
		baos.close();
		String sReturn = new String(baos.toByteArray(), "UTF-8");
		log.info("返回价格信息:{}", sReturn);		
		return sReturn;
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
		log.info("通过线程ID{}锁定待处理的数据:{}", threadId);
		productRepository.lockRows(threadId);
		return productRepository.getLockedRows(threadId);
	}
	
	//@Async	
    public void executeAsyncTask(Integer threadId){
		
		this.login(this.userid, this.password);
		
		//List<Product> tobeProcessed = this.lockRows(threadId);
		
		List<Product> tobeProcessed = productRepository.findByProcFlagIsNull(new PageRequest(threadId*2, 10)).getContent();
		
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
			//tobeProcessed = this.lockRows(threadId);
			tobeProcessed = productRepository.findByProcFlagIsNull(new PageRequest(threadId*2, 10)).getContent();
		}		
    }
	
	public static void main(String[] args) {

		PricePageProcessor pricePageProcessor = new PricePageProcessor();
		//System.out.println(pricePageProcessor.toPartNum("MTRF0.3-3"));
		
		pricePageProcessor.objectMapper = new ObjectMapper();
		Product product = new Product();
		product.setId("PSFGT6-300-M3");
		product.setBrdCode("MSM1");

		Integer quantity = 1;

		//pricePageProcessor.setProxy("cn-proxy.jp.oracle.com");
		pricePageProcessor.login("fragrantland","passw0rd");
		pricePageProcessor.process(product, quantity);
		

	}

}
