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
import com.sadetec.model.Category;
import com.sadetec.model.CategoryTreeNode;
import com.sadetec.repository.CategoryRepository;
import com.sadetec.rest.support.PageResponse;

@RestController
@RequestMapping("/api/categories")
public class CategoryResource {

    private final Logger log = LoggerFactory.getLogger(CategoryResource.class);

	@Autowired
	private ObjectMapper objectMapper;
	
    @Autowired
    private CategoryRepository categoryRepository;

	@RequestMapping(value = "/create", method = POST, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<PageResponse<Category>> create(@RequestBody String json) throws URISyntaxException {

		log.info("Create json : {}", json);

		List<Category> pageContents = new ArrayList<Category>();
		PageResponse<Category> pageResponse = new PageResponse<Category>(pageContents);
		
		try {
			JsonNode root = objectMapper.readTree(json);
			JsonNode tempNode = root.get("data");
			if (tempNode.isArray()) {
				List<Category> categorys = objectMapper.convertValue(tempNode, new TypeReference<List<Category>>() {
				});
				for (Category temp : categorys) {
					log.info("Category to Create : {}", temp);
					categoryRepository.save(temp);
				}
				pageContents.addAll(categorys);
			}
			else {
				Category tempObj = objectMapper.convertValue(tempNode, Category.class);
				categoryRepository.save(tempObj);
				pageContents.add(tempObj);
			}

			pageResponse.setSuccess(Boolean.TRUE);
			pageResponse.setMessage("Create Category Success");
			return new ResponseEntity<PageResponse<Category>>(pageResponse, HttpStatus.OK);

		}
		catch (Exception e) {
			e.printStackTrace();
			pageResponse.setSuccess(Boolean.FALSE);
			pageResponse.setMessage("Create Category Failure");
			return new ResponseEntity<PageResponse<Category>>(pageResponse, HttpStatus.OK);
		}

	}
	
	@RequestMapping(value = "/page", method = GET, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<PageResponse<CategoryTreeNode>> findPage(@RequestParam(value = "page", required = false, defaultValue = "1") Integer page,
			@RequestParam(value = "start", required = false) Integer start, @RequestParam(value = "limit", required = false, defaultValue = "25") Integer limit,
			@RequestParam(value = "filter", required = false) String filter, @RequestParam(value = "sort", required = false) String sort,
			@RequestParam(value = "parentCode", required = false) String parentCode) throws URISyntaxException {

		List<Category> results = new ArrayList<>();
		if (null != parentCode) {
			results = categoryRepository.findByParentCode(parentCode);
		} else {
			results = categoryRepository.findByCategoryLevel(1);				
		}
			
		//Tranform to tree data model
		
		List<CategoryTreeNode> categoryTreeNodes = new ArrayList<>();
		for (Category category : results) {
			CategoryTreeNode treeNode = new CategoryTreeNode(category.getId(), category.getCategoryName(), !category.getHasChildCategory(), category);
			categoryTreeNodes.add(treeNode);
		}
		

		PageResponse<CategoryTreeNode> pageResponse = new PageResponse<CategoryTreeNode>(categoryTreeNodes);
		pageResponse.setSuccess(Boolean.TRUE);
		pageResponse.setTotal(results.size());

		return new ResponseEntity<PageResponse<CategoryTreeNode>>(pageResponse, HttpStatus.OK);

	}
	
	@RequestMapping(value = "/update", method = POST, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<PageResponse<Category>> update(@RequestBody String json) throws URISyntaxException {

		log.debug("Update by id Category : {}", json);
		PageResponse<Category> pageResponse = new PageResponse<Category>(null);
		TypeReference<List<Category>> typeRef = new TypeReference<List<Category>>() {
		};
		try {
			JsonNode root = objectMapper.readTree(json);
			JsonNode tempNode = root.get("data");
			if (tempNode.isArray()) {
				List<Category> temps = objectMapper.convertValue(tempNode, typeRef);
				for (Iterator<Category> ketIter = temps.iterator(); ketIter.hasNext();) {
					Category tempObj = ketIter.next();
					categoryRepository.save(tempObj);
				}
			}
			else {
				Category tempObj = objectMapper.convertValue(tempNode, Category.class);
				categoryRepository.save(tempObj);
			}

			pageResponse.setSuccess(Boolean.TRUE);
			pageResponse.setMessage("Update Category Success");
			return new ResponseEntity<PageResponse<Category>>(pageResponse, HttpStatus.OK);
		}
		catch (Exception e) {
			e.printStackTrace();
			pageResponse.setSuccess(Boolean.FALSE);
			pageResponse.setMessage("Update Category Failure");
			return new ResponseEntity<PageResponse<Category>>(pageResponse, HttpStatus.OK);
		}

	}
	
	@RequestMapping(value = "/delete", method = POST, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<PageResponse<Category>> delete(@RequestBody String json) throws URISyntaxException {

		log.debug("Delete by id Category : {}", json);
		PageResponse<Category> pageResponse = new PageResponse<Category>(null);
		TypeReference<List<Category>> typeRef = new TypeReference<List<Category>>() {
		};
		try {
			JsonNode root = objectMapper.readTree(json);
			JsonNode tempNode = root.get("data");
			if (tempNode.isArray()) {
				List<Category> temps = objectMapper.convertValue(tempNode, typeRef);
				for (Iterator<Category> ketIter = temps.iterator(); ketIter.hasNext();) {
					Category tempObj = ketIter.next();
					Category temp = categoryRepository.findById(tempObj.getId());
					if (null != temp) {
						categoryRepository.delete(temp);
					}
				}
			}
			else {
				Category tempObj = objectMapper.convertValue(tempNode, Category.class);
				Category temp = categoryRepository.findById(tempObj.getId());
				if (null != temp) {
					categoryRepository.delete(temp);
				}
			}

			pageResponse.setSuccess(Boolean.TRUE);
			pageResponse.setMessage("Delete Category Success");
			return new ResponseEntity<PageResponse<Category>>(pageResponse, HttpStatus.OK);
		}
		catch (Exception e) {
			e.printStackTrace();
			pageResponse.setSuccess(Boolean.FALSE);
			pageResponse.setMessage("Delete Category Failure");
			return new ResponseEntity<PageResponse<Category>>(pageResponse, HttpStatus.OK);
		}

	}
}