/*
 * Source code generated by Celerio, a Jaxio product.
 * Documentation: http://www.jaxio.com/documentation/celerio/
 * Follow us on twitter: @jaxiosoft
 * Need commercial support ? Contact us: info@jaxio.com
 * Template pack-angular:src/main/java/rest/EntityResource.java.e.vm
 */
package com.sadetec.rest;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sadetec.model.ResPartner;
import com.sadetec.repository.ResPartnerRepository;
import com.sadetec.rest.support.PageResponse;

@RestController
@RequestMapping("/api/resPartner")
public class ResPartnerResource {

    private final Logger log = LoggerFactory.getLogger(ResPartnerResource.class);

    @Autowired
    private ResPartnerRepository resPartnerRepository;

	@Autowired
	private ObjectMapper objectMapper;

	@RequestMapping(value = "/create", method = POST, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<PageResponse<ResPartner>> create(@RequestBody String json) throws URISyntaxException {

		log.info("Create json : {}", json);

		List<ResPartner> pageContents = new ArrayList<ResPartner>();
		PageResponse<ResPartner> pageResponse = new PageResponse<ResPartner>(pageContents);

		try {
			JsonNode root = objectMapper.readTree(json);
			JsonNode tempNode = root.get("data");
			if (tempNode.isArray()) {
				List<ResPartner> stockQuants = objectMapper.convertValue(tempNode, new TypeReference<List<ResPartner>>() {
				});
				for (ResPartner temp : stockQuants) {
					log.info("ResPartner to Create : {}", temp);
					resPartnerRepository.save(temp);
				}
				pageContents.addAll(stockQuants);
			}
			else {
				ResPartner tempObj = objectMapper.convertValue(tempNode, ResPartner.class);
				resPartnerRepository.save(tempObj);
				pageContents.add(tempObj);
			}

			pageResponse.setSuccess(Boolean.TRUE);
			pageResponse.setMessage("Create ResPartner Success");
			return new ResponseEntity<PageResponse<ResPartner>>(pageResponse, HttpStatus.OK);

		}
		catch (Exception e) {
			e.printStackTrace();
			pageResponse.setSuccess(Boolean.FALSE);
			pageResponse.setMessage("Create ResPartner Failure");
			return new ResponseEntity<PageResponse<ResPartner>>(pageResponse, HttpStatus.OK);
		}

	}

	@RequestMapping(value = "/page", method = GET, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<PageResponse<ResPartner>> findPage(@RequestParam(value = "page", required = false, defaultValue = "1") Integer page,
			@RequestParam(value = "start", required = false) Integer start, @RequestParam(value = "limit", required = false, defaultValue = "25") Integer limit,
			@RequestParam(value = "filter", required = false) String filter, @RequestParam(value = "sort", required = false) String sort,
			@RequestParam(value = "resId", required = false) Integer resId,
			@RequestParam(value = "partnerType", required = false) String partnerType) throws URISyntaxException {
		
		
		Page<ResPartner> result = null;
		if("Customer".equals(partnerType)) {
			result = resPartnerRepository.findByIsCustomerIsTrue(new PageRequest(page - 1, limit));
		}
		if("Supplier".equals(partnerType)) {
			result = resPartnerRepository.findByIsSupplierIsTrue(new PageRequest(page - 1, limit));
		}
		
		PageResponse<ResPartner> pageResponse = new PageResponse<ResPartner>(result == null ? Collections.emptyList(): result.getContent());
		pageResponse.setSuccess(Boolean.TRUE);
		pageResponse.setTotal(result == null ? 0 : result.getTotalElements());

		return new ResponseEntity<PageResponse<ResPartner>>(pageResponse, HttpStatus.OK);

	}

	@RequestMapping(value = "/update", method = POST, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<PageResponse<ResPartner>> update(@RequestBody String json) throws URISyntaxException {

		log.debug("Update by id ResPartner : {}", json);
		PageResponse<ResPartner> pageResponse = new PageResponse<ResPartner>(null);
		TypeReference<List<ResPartner>> typeRef = new TypeReference<List<ResPartner>>() {
		};
		try {
			JsonNode root = objectMapper.readTree(json);
			JsonNode tempNode = root.get("data");
			if (tempNode.isArray()) {
				List<ResPartner> temps = objectMapper.convertValue(tempNode, typeRef);
				for (Iterator<ResPartner> ketIter = temps.iterator(); ketIter.hasNext();) {
					ResPartner tempObj = ketIter.next();
					resPartnerRepository.save(tempObj);
				}
			}
			else {
				ResPartner tempObj = objectMapper.convertValue(tempNode, ResPartner.class);
				resPartnerRepository.save(tempObj);
			}

			pageResponse.setSuccess(Boolean.TRUE);
			pageResponse.setMessage("Update ResPartner Success");
			return new ResponseEntity<PageResponse<ResPartner>>(pageResponse, HttpStatus.OK);
		}
		catch (Exception e) {
			e.printStackTrace();
			pageResponse.setSuccess(Boolean.FALSE);
			pageResponse.setMessage("Update ResPartner Failure");
			return new ResponseEntity<PageResponse<ResPartner>>(pageResponse, HttpStatus.OK);
		}

	}

	@RequestMapping(value = "/delete", method = POST, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<PageResponse<ResPartner>> delete(@RequestBody String json) throws URISyntaxException {

		log.debug("Delete by id ResPartner : {}", json);
		PageResponse<ResPartner> pageResponse = new PageResponse<ResPartner>(null);
		TypeReference<List<ResPartner>> typeRef = new TypeReference<List<ResPartner>>() {
		};
		try {
			JsonNode root = objectMapper.readTree(json);
			JsonNode tempNode = root.get("data");
			if (tempNode.isArray()) {
				List<ResPartner> temps = objectMapper.convertValue(tempNode, typeRef);
				for (Iterator<ResPartner> ketIter = temps.iterator(); ketIter.hasNext();) {
					ResPartner tempObj = ketIter.next();
					ResPartner temp = resPartnerRepository.findOne(tempObj.getId());
					if (null != temp) {
						resPartnerRepository.delete(temp);
					}
				}
			}
			else {
				ResPartner tempObj = objectMapper.convertValue(tempNode, ResPartner.class);
				ResPartner temp = resPartnerRepository.findOne(tempObj.getId());
				if (null != temp) {
					resPartnerRepository.delete(temp);
				}
			}

			pageResponse.setSuccess(Boolean.TRUE);
			pageResponse.setMessage("Delete ResPartner Success");
			return new ResponseEntity<PageResponse<ResPartner>>(pageResponse, HttpStatus.OK);
		}
		catch (Exception e) {
			e.printStackTrace();
			pageResponse.setSuccess(Boolean.FALSE);
			pageResponse.setMessage("Delete ResPartner Failure");
			return new ResponseEntity<PageResponse<ResPartner>>(pageResponse, HttpStatus.OK);
		}

	}
}