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
import com.sadetec.model.MailMessage;
import com.sadetec.repository.MailMessageRepository;
import com.sadetec.rest.support.PageResponse;

@RestController
@RequestMapping("/api/mailMessage")
public class MailMessageResource {

	private final Logger log = LoggerFactory.getLogger(MailMessageResource.class);

	@Autowired
	private MailMessageRepository mailMessageRepository;

	@Autowired
	private ObjectMapper objectMapper;

	@RequestMapping(value = "/create", method = POST, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<PageResponse<MailMessage>> create(@RequestBody String json) throws URISyntaxException {

		log.info("Create json : {}", json);

		List<MailMessage> pageContents = new ArrayList<MailMessage>();
		PageResponse<MailMessage> pageResponse = new PageResponse<MailMessage>(pageContents);

		try {
			JsonNode root = objectMapper.readTree(json);
			JsonNode tempNode = root.get("data");
			if (tempNode.isArray()) {
				List<MailMessage> mailMessages = objectMapper.convertValue(tempNode, new TypeReference<List<MailMessage>>() {
				});
				for (MailMessage temp : mailMessages) {
					log.info("MailMessage to Create : {}", temp);
					mailMessageRepository.save(temp);
				}
				pageContents.addAll(mailMessages);
			}
			else {
				MailMessage tempObj = objectMapper.convertValue(tempNode, MailMessage.class);
				mailMessageRepository.save(tempObj);
				pageContents.add(tempObj);
			}

			pageResponse.setSuccess(Boolean.TRUE);
			pageResponse.setMessage("Create MailMessage Success");
			return new ResponseEntity<PageResponse<MailMessage>>(pageResponse, HttpStatus.OK);

		}
		catch (Exception e) {
			e.printStackTrace();
			pageResponse.setSuccess(Boolean.FALSE);
			pageResponse.setMessage("Create MailMessage Failure");
			return new ResponseEntity<PageResponse<MailMessage>>(pageResponse, HttpStatus.OK);
		}

	}

	@RequestMapping(value = "/page", method = GET, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<PageResponse<MailMessage>> findPage(@RequestParam(value = "page", required = false, defaultValue = "1") Integer page,
			@RequestParam(value = "start", required = false) Integer start, @RequestParam(value = "limit", required = false, defaultValue = "25") Integer limit,
			@RequestParam(value = "filter", required = false) String filter, @RequestParam(value = "sort", required = false) String sort,
			@RequestParam(value = "resId", required = false) Integer resId) throws URISyntaxException {

		Page<MailMessage> result  = mailMessageRepository.findByResId(resId, new PageRequest(page - 1, limit));
		PageResponse<MailMessage> pageResponse = new PageResponse<MailMessage>(result.getContent());
		pageResponse.setSuccess(Boolean.TRUE);
		pageResponse.setTotal(result.getTotalElements());

		return new ResponseEntity<PageResponse<MailMessage>>(pageResponse, HttpStatus.OK);

	}

	@RequestMapping(value = "/update", method = POST, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<PageResponse<MailMessage>> update(@RequestBody String json) throws URISyntaxException {

		log.debug("Update by id MailMessage : {}", json);
		PageResponse<MailMessage> pageResponse = new PageResponse<MailMessage>(null);
		TypeReference<List<MailMessage>> typeRef = new TypeReference<List<MailMessage>>() {
		};
		try {
			JsonNode root = objectMapper.readTree(json);
			JsonNode tempNode = root.get("data");
			if (tempNode.isArray()) {
				List<MailMessage> temps = objectMapper.convertValue(tempNode, typeRef);
				for (Iterator<MailMessage> ketIter = temps.iterator(); ketIter.hasNext();) {
					MailMessage tempObj = ketIter.next();
					mailMessageRepository.save(tempObj);
				}
			}
			else {
				MailMessage tempObj = objectMapper.convertValue(tempNode, MailMessage.class);
				mailMessageRepository.save(tempObj);
			}

			pageResponse.setSuccess(Boolean.TRUE);
			pageResponse.setMessage("Update MailMessage Success");
			return new ResponseEntity<PageResponse<MailMessage>>(pageResponse, HttpStatus.OK);
		}
		catch (Exception e) {
			e.printStackTrace();
			pageResponse.setSuccess(Boolean.FALSE);
			pageResponse.setMessage("Update MailMessage Failure");
			return new ResponseEntity<PageResponse<MailMessage>>(pageResponse, HttpStatus.OK);
		}

	}

	@RequestMapping(value = "/delete", method = POST, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<PageResponse<MailMessage>> delete(@RequestBody String json) throws URISyntaxException {

		log.debug("Delete by id MailMessage : {}", json);
		PageResponse<MailMessage> pageResponse = new PageResponse<MailMessage>(null);
		TypeReference<List<MailMessage>> typeRef = new TypeReference<List<MailMessage>>() {
		};
		try {
			JsonNode root = objectMapper.readTree(json);
			JsonNode tempNode = root.get("data");
			if (tempNode.isArray()) {
				List<MailMessage> temps = objectMapper.convertValue(tempNode, typeRef);
				for (Iterator<MailMessage> ketIter = temps.iterator(); ketIter.hasNext();) {
					MailMessage tempObj = ketIter.next();
					MailMessage temp = mailMessageRepository.findById(tempObj.getId());
					if (null != temp) {
						mailMessageRepository.delete(temp);
					}
				}
			}
			else {
				MailMessage tempObj = objectMapper.convertValue(tempNode, MailMessage.class);
				MailMessage temp = mailMessageRepository.findById(tempObj.getId());
				if (null != temp) {
					mailMessageRepository.delete(temp);
				}
			}

			pageResponse.setSuccess(Boolean.TRUE);
			pageResponse.setMessage("Delete MailMessage Success");
			return new ResponseEntity<PageResponse<MailMessage>>(pageResponse, HttpStatus.OK);
		}
		catch (Exception e) {
			e.printStackTrace();
			pageResponse.setSuccess(Boolean.FALSE);
			pageResponse.setMessage("Delete MailMessage Failure");
			return new ResponseEntity<PageResponse<MailMessage>>(pageResponse, HttpStatus.OK);
		}

	}
}