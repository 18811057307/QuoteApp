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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sadetec.model.CategorySpec;
import com.sadetec.repository.CategorySpecRepository;
import com.sadetec.rest.support.PageResponse;

@RestController
@RequestMapping("/api/categorySpec")
public class CategorySpecResource {

    private final Logger log = LoggerFactory.getLogger(CategorySpecResource.class);

	@Autowired
	private ObjectMapper objectMapper;
	
    @Autowired
    private CategorySpecRepository categorySpecRepository;

	@RequestMapping(value = "/create", method = POST, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<PageResponse<CategorySpec>> create(@RequestBody String json) throws URISyntaxException {

		log.info("Create json : {}", json);

		List<CategorySpec> pageContents = new ArrayList<CategorySpec>();
		PageResponse<CategorySpec> pageResponse = new PageResponse<CategorySpec>(pageContents);
		
		try {
			JsonNode root = objectMapper.readTree(json);
			JsonNode tempNode = root.get("data");
			if (tempNode.isArray()) {
				List<CategorySpec> categorys = objectMapper.convertValue(tempNode, new TypeReference<List<CategorySpec>>() {
				});
				for (CategorySpec temp : categorys) {
					log.info("CategorySpec to Create : {}", temp);
					categorySpecRepository.save(temp);
				}
				pageContents.addAll(categorys);
			}
			else {
				CategorySpec tempObj = objectMapper.convertValue(tempNode, CategorySpec.class);
				categorySpecRepository.save(tempObj);
				pageContents.add(tempObj);
			}

			pageResponse.setSuccess(Boolean.TRUE);
			pageResponse.setMessage("Create CategorySpec Success");
			return new ResponseEntity<PageResponse<CategorySpec>>(pageResponse, HttpStatus.OK);

		}
		catch (Exception e) {
			e.printStackTrace();
			pageResponse.setSuccess(Boolean.FALSE);
			pageResponse.setMessage("Create CategorySpec Failure");
			return new ResponseEntity<PageResponse<CategorySpec>>(pageResponse, HttpStatus.OK);
		}

	}
	
	@RequestMapping(value = "/page", method = GET, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<PageResponse<CategorySpec>> findPage(@RequestParam(value = "page", required = false, defaultValue = "1") Integer page,
			@RequestParam(value = "start", required = false) Integer start, @RequestParam(value = "limit", required = false, defaultValue = "25") Integer limit,
			@RequestParam(value = "filter", required = false) String filter, @RequestParam(value = "sort", required = false) String sort,
			@RequestParam(value = "categoryCode", required = true) String categoryCode) throws URISyntaxException {

		List<CategorySpec> results = categorySpecRepository.findByCategoryCode(categoryCode);

		PageResponse<CategorySpec> pageResponse = new PageResponse<CategorySpec>(results);
		pageResponse.setSuccess(Boolean.TRUE);
		pageResponse.setTotal(results.size());

		return new ResponseEntity<PageResponse<CategorySpec>>(pageResponse, HttpStatus.OK);

	}
	
	@RequestMapping(value = "/update", method = POST, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<PageResponse<CategorySpec>> update(@RequestBody String json) throws URISyntaxException {

		log.debug("Update by id CategorySpec : {}", json);
		PageResponse<CategorySpec> pageResponse = new PageResponse<CategorySpec>(null);
		TypeReference<List<CategorySpec>> typeRef = new TypeReference<List<CategorySpec>>() {
		};
		try {
			JsonNode root = objectMapper.readTree(json);
			JsonNode tempNode = root.get("data");
			if (tempNode.isArray()) {
				List<CategorySpec> temps = objectMapper.convertValue(tempNode, typeRef);
				for (Iterator<CategorySpec> ketIter = temps.iterator(); ketIter.hasNext();) {
					CategorySpec tempObj = ketIter.next();
					categorySpecRepository.save(tempObj);
				}
			}
			else {
				CategorySpec tempObj = objectMapper.convertValue(tempNode, CategorySpec.class);
				categorySpecRepository.save(tempObj);
			}

			pageResponse.setSuccess(Boolean.TRUE);
			pageResponse.setMessage("Update CategorySpec Success");
			return new ResponseEntity<PageResponse<CategorySpec>>(pageResponse, HttpStatus.OK);
		}
		catch (Exception e) {
			e.printStackTrace();
			pageResponse.setSuccess(Boolean.FALSE);
			pageResponse.setMessage("Update CategorySpec Failure");
			return new ResponseEntity<PageResponse<CategorySpec>>(pageResponse, HttpStatus.OK);
		}

	}
	
	@RequestMapping(value = "/delete", method = POST, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<PageResponse<CategorySpec>> delete(@RequestBody String json) throws URISyntaxException {

		log.debug("Delete by id CategorySpec : {}", json);
		PageResponse<CategorySpec> pageResponse = new PageResponse<CategorySpec>(null);
		TypeReference<List<CategorySpec>> typeRef = new TypeReference<List<CategorySpec>>() {
		};
		try {
			JsonNode root = objectMapper.readTree(json);
			JsonNode tempNode = root.get("data");
			if (tempNode.isArray()) {
				List<CategorySpec> temps = objectMapper.convertValue(tempNode, typeRef);
				for (Iterator<CategorySpec> ketIter = temps.iterator(); ketIter.hasNext();) {
					CategorySpec tempObj = ketIter.next();
					CategorySpec temp = categorySpecRepository.findOne(tempObj.getId());
					if (null != temp) {
						categorySpecRepository.delete(temp);
					}
				}
			}
			else {
				CategorySpec tempObj = objectMapper.convertValue(tempNode, CategorySpec.class);
				CategorySpec temp = categorySpecRepository.findOne(tempObj.getId());
				if (null != temp) {
					categorySpecRepository.delete(temp);
				}
			}

			pageResponse.setSuccess(Boolean.TRUE);
			pageResponse.setMessage("Delete CategorySpec Success");
			return new ResponseEntity<PageResponse<CategorySpec>>(pageResponse, HttpStatus.OK);
		}
		catch (Exception e) {
			e.printStackTrace();
			pageResponse.setSuccess(Boolean.FALSE);
			pageResponse.setMessage("Delete CategorySpec Failure");
			return new ResponseEntity<PageResponse<CategorySpec>>(pageResponse, HttpStatus.OK);
		}

	}
}