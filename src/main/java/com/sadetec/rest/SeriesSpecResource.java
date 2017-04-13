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
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sadetec.model.SeriesSpec;
import com.sadetec.model.SeriesSpec_;
import com.sadetec.repository.SeriesSpecRepository;
import com.sadetec.rest.support.PageResponse;

@RestController
@RequestMapping("/api/seriesSpec")
public class SeriesSpecResource {

    private final Logger log = LoggerFactory.getLogger(SeriesSpecResource.class);

	@Autowired
	private ObjectMapper objectMapper;
	
    @Autowired
    private SeriesSpecRepository seriesSpecRepository;

	@RequestMapping(value = "/create", method = POST, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<PageResponse<SeriesSpec>> create(@RequestBody String json) throws URISyntaxException {

		log.info("Create json : {}", json);

		List<SeriesSpec> pageContents = new ArrayList<SeriesSpec>();
		PageResponse<SeriesSpec> pageResponse = new PageResponse<SeriesSpec>(pageContents);
		
		try {
			JsonNode root = objectMapper.readTree(json);
			JsonNode tempNode = root.get("data");
			if (tempNode.isArray()) {
				List<SeriesSpec> seriess = objectMapper.convertValue(tempNode, new TypeReference<List<SeriesSpec>>() {
				});
				for (SeriesSpec temp : seriess) {
					log.info("SeriesSpec to Create : {}", temp);
					seriesSpecRepository.save(temp);
				}
				pageContents.addAll(seriess);
			}
			else {
				SeriesSpec tempObj = objectMapper.convertValue(tempNode, SeriesSpec.class);
				seriesSpecRepository.save(tempObj);
				pageContents.add(tempObj);
			}

			pageResponse.setSuccess(Boolean.TRUE);
			pageResponse.setMessage("Create SeriesSpec Success");
			return new ResponseEntity<PageResponse<SeriesSpec>>(pageResponse, HttpStatus.OK);

		}
		catch (Exception e) {
			e.printStackTrace();
			pageResponse.setSuccess(Boolean.FALSE);
			pageResponse.setMessage("Create SeriesSpec Failure");
			return new ResponseEntity<PageResponse<SeriesSpec>>(pageResponse, HttpStatus.OK);
		}

	}
	
	@RequestMapping(value = "/page", method = GET, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<PageResponse<SeriesSpec>> findPage(@RequestParam(value = "page", required = false, defaultValue = "1") Integer page,
			@RequestParam(value = "start", required = false) Integer start, @RequestParam(value = "limit", required = false, defaultValue = "25") Integer limit,
			@RequestParam(value = "filter", required = false) String filter, @RequestParam(value = "sort", required = false) String sort,
			@RequestParam(value = "seriesCode", required = true) String seriesCode) throws URISyntaxException {

		PageRequest pageReq = new PageRequest(page - 1, limit, Sort.Direction.ASC, SeriesSpec_.id.getName());
		Page<SeriesSpec> results = seriesSpecRepository.findBySeriesCode(seriesCode, pageReq);
		
		PageResponse<SeriesSpec> pageResponse = new PageResponse<SeriesSpec>(results.getContent());
		pageResponse.setSuccess(Boolean.TRUE);
		pageResponse.setTotal(results.getTotalElements());

		return new ResponseEntity<PageResponse<SeriesSpec>>(pageResponse, HttpStatus.OK);

	}
	
	@RequestMapping(value = "/update", method = POST, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<PageResponse<SeriesSpec>> update(@RequestBody String json) throws URISyntaxException {

		log.debug("Update by id SeriesSpec : {}", json);
		PageResponse<SeriesSpec> pageResponse = new PageResponse<SeriesSpec>(null);
		TypeReference<List<SeriesSpec>> typeRef = new TypeReference<List<SeriesSpec>>() {
		};
		try {
			JsonNode root = objectMapper.readTree(json);
			JsonNode tempNode = root.get("data");
			if (tempNode.isArray()) {
				List<SeriesSpec> temps = objectMapper.convertValue(tempNode, typeRef);
				for (Iterator<SeriesSpec> ketIter = temps.iterator(); ketIter.hasNext();) {
					SeriesSpec tempObj = ketIter.next();
					seriesSpecRepository.save(tempObj);
				}
			}
			else {
				SeriesSpec tempObj = objectMapper.convertValue(tempNode, SeriesSpec.class);
				seriesSpecRepository.save(tempObj);
			}

			pageResponse.setSuccess(Boolean.TRUE);
			pageResponse.setMessage("Update SeriesSpec Success");
			return new ResponseEntity<PageResponse<SeriesSpec>>(pageResponse, HttpStatus.OK);
		}
		catch (Exception e) {
			e.printStackTrace();
			pageResponse.setSuccess(Boolean.FALSE);
			pageResponse.setMessage("Update SeriesSpec Failure");
			return new ResponseEntity<PageResponse<SeriesSpec>>(pageResponse, HttpStatus.OK);
		}

	}
	
	@RequestMapping(value = "/delete", method = POST, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<PageResponse<SeriesSpec>> delete(@RequestBody String json) throws URISyntaxException {

		log.debug("Delete by id SeriesSpec : {}", json);
		PageResponse<SeriesSpec> pageResponse = new PageResponse<SeriesSpec>(null);
		TypeReference<List<SeriesSpec>> typeRef = new TypeReference<List<SeriesSpec>>() {
		};
		try {
			JsonNode root = objectMapper.readTree(json);
			JsonNode tempNode = root.get("data");
			if (tempNode.isArray()) {
				List<SeriesSpec> temps = objectMapper.convertValue(tempNode, typeRef);
				for (Iterator<SeriesSpec> ketIter = temps.iterator(); ketIter.hasNext();) {
					SeriesSpec tempObj = ketIter.next();
					SeriesSpec temp = seriesSpecRepository.findOne(tempObj.getId());
					if (null != temp) {
						seriesSpecRepository.delete(temp);
					}
				}
			}
			else {
				SeriesSpec tempObj = objectMapper.convertValue(tempNode, SeriesSpec.class);
				SeriesSpec temp = seriesSpecRepository.findOne(tempObj.getId());
				if (null != temp) {
					seriesSpecRepository.delete(temp);
				}
			}

			pageResponse.setSuccess(Boolean.TRUE);
			pageResponse.setMessage("Delete SeriesSpec Success");
			return new ResponseEntity<PageResponse<SeriesSpec>>(pageResponse, HttpStatus.OK);
		}
		catch (Exception e) {
			e.printStackTrace();
			pageResponse.setSuccess(Boolean.FALSE);
			pageResponse.setMessage("Delete SeriesSpec Failure");
			return new ResponseEntity<PageResponse<SeriesSpec>>(pageResponse, HttpStatus.OK);
		}

	}
}