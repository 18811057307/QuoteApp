package com.sadetec.rest;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sadetec.model.CheckTreeNode;
import com.sadetec.model.SysRole;
import com.sadetec.model.SysUser;
import com.sadetec.repository.SysRoleRepository;
import com.sadetec.repository.SysUserRepository;
import com.sadetec.rest.support.AutoCompleteQuery;
import com.sadetec.rest.support.PageResponse;
import com.sadetec.util.FilterCondition;
import com.sadetec.util.UserContext;

@RestController
@RequestMapping("/api/sysRole")
public class SysRoleResource {

	private final Logger log = LoggerFactory.getLogger(SysRoleResource.class);

	@Autowired
	private SysUserRepository sysUserRepository;
	
	@Autowired
	private SysRoleRepository sysRoleRepository;

	@Autowired
	private ObjectMapper objectMapper;

	@RequestMapping(value = "/create", method = POST, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<PageResponse<SysRole>> create(@RequestBody String json) throws URISyntaxException {
		log.info("Create json : {}", json);
		List<SysRole> pageContents = new ArrayList<SysRole>();
		PageResponse<SysRole> pageResponse = new PageResponse<SysRole>(pageContents);
		try {
			JsonNode root = objectMapper.readTree(json);
			JsonNode tempNode = root.get("data");
			if (tempNode.isArray()) {
				List<SysRole> sysRoles = objectMapper.convertValue(tempNode, new TypeReference<List<SysRole>>() {
				});
				for (SysRole temp : sysRoles) {
					log.info("SysRole to Create : {}", temp);
					sysRoleRepository.save(temp);
				}
				pageContents.addAll(sysRoles);
			}
			else {
				SysRole tempObj = objectMapper.convertValue(tempNode, SysRole.class);
				sysRoleRepository.save(tempObj);
				pageContents.add(tempObj);
			}

			pageResponse.setSuccess(Boolean.TRUE);
			pageResponse.setMessage("Create SysRole Success");
			return new ResponseEntity<PageResponse<SysRole>>(pageResponse, HttpStatus.OK);

		}
		catch (Exception e) {
			e.printStackTrace();
			pageResponse.setSuccess(Boolean.FALSE);
			pageResponse.setMessage("Create SysRole Failure");
			return new ResponseEntity<PageResponse<SysRole>>(pageResponse, HttpStatus.OK);
		}

	}

	/**
	 * Find by id SysRole.
	 */
	@RequestMapping(value = "/{id}", method = GET, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<SysRole> findById(@PathVariable Integer id) throws URISyntaxException {

		log.debug("Find by id SysRole : {}", id);

		return Optional.ofNullable(sysRoleRepository.findOne(id)).map(SysRole -> new ResponseEntity<>(SysRole, HttpStatus.OK))
				.orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	/**
	 * Find a Page of SysRole using query by example.
	 */
	@RequestMapping(value = "/page", method = GET, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<PageResponse<SysRole>> findAll(@RequestParam(value = "page", required = false, defaultValue = "1") Integer page,
			@RequestParam(value = "start", required = false) Integer start, @RequestParam(value = "limit", required = false, defaultValue = "25") Integer limit,
			@RequestParam(value = "filter", required = false) String filter, @RequestParam(value = "sort", required = false) String sort,
			@RequestParam(value = "name", required = false) String name) throws URISyntaxException {

		if (null != filter) {
			List<FilterCondition> temps = FilterCondition.decodeJson(filter);

			SysRole probe = new SysRole();
			ExampleMatcher matcher = ExampleMatcher.matching();
			for (FilterCondition filterCondition : temps) {
				// BeanUtils.setProperty(probe, filterCondition.getField(),
				// filterCondition.getValue());
			}
		}
		Page<SysRole> result;
		if (null != name) {
			result = sysRoleRepository.findByNameContains(name, new PageRequest(page - 1, limit));
		}
		else {
			result = sysRoleRepository.findAll(new PageRequest(page - 1, limit));
		}
		PageResponse<SysRole> pageResponse = new PageResponse<SysRole>(result.getContent());
		pageResponse.setSuccess(Boolean.TRUE);
		pageResponse.setTotal(result.getTotalElements());

		return new ResponseEntity<PageResponse<SysRole>>(pageResponse, HttpStatus.OK);

	}

	/**
	 * Auto complete support.
	 */
	@RequestMapping(value = "/complete", method = POST, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<List<SysRole>> complete(@RequestBody AutoCompleteQuery acq) throws URISyntaxException {

		List<SysRole> results = sysRoleRepository.complete(acq.query, acq.maxResults);

		return new ResponseEntity<>(results, new HttpHeaders(), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/userRoles", method = GET, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<List<CheckTreeNode>> getUserRoles(@RequestParam(value = "userId", required = false, defaultValue = "1") Integer userId) throws URISyntaxException {

		List<SysRole> allRoles = sysRoleRepository.findAll();
		List<SysRole> userRoles = sysRoleRepository.findByUserId(userId);
		String usersRoleStr = "";
		for (SysRole sysRole : userRoles) {
			usersRoleStr += sysRole.getName();
		}
		
		List<CheckTreeNode> results = new ArrayList<>();
		for (SysRole sysRole : allRoles) {			
			CheckTreeNode treeNode = new CheckTreeNode(sysRole.getId(), sysRole.getRemarks()+"(" + sysRole.getName() + ")", true, usersRoleStr.contains(sysRole.getName()));
			results.add(treeNode);
		}
		
		return new ResponseEntity<List<CheckTreeNode>>(results, new HttpHeaders(), HttpStatus.OK);
	}


	/**
	 * update
	 */
	@RequestMapping(value = "/update", method = POST, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<PageResponse<SysRole>> update(@RequestBody String json) throws URISyntaxException {

		log.debug("Update by id SysRole : {}", json);
		PageResponse<SysRole> pageResponse = new PageResponse<SysRole>(null);
		TypeReference<List<SysRole>> typeRef = new TypeReference<List<SysRole>>() {
		};
		try {
			JsonNode root = objectMapper.readTree(json);
			JsonNode tempNode = root.get("data");
			if (tempNode.isArray()) {
				List<SysRole> temps = objectMapper.convertValue(tempNode, typeRef);
				for (Iterator<SysRole> ketIter = temps.iterator(); ketIter.hasNext();) {
					SysRole tempObj = ketIter.next();
					sysRoleRepository.save(tempObj);
				}
			}
			else {
				SysRole tempObj = objectMapper.convertValue(tempNode, SysRole.class);
				sysRoleRepository.save(tempObj);
			}

			pageResponse.setSuccess(Boolean.TRUE);
			pageResponse.setMessage("Update SysRole Success");
			return new ResponseEntity<PageResponse<SysRole>>(pageResponse, HttpStatus.OK);
		}
		catch (Exception e) {
			e.printStackTrace();
			pageResponse.setSuccess(Boolean.FALSE);
			pageResponse.setMessage("Update SysRole Failure");
			return new ResponseEntity<PageResponse<SysRole>>(pageResponse, HttpStatus.OK);
		}

	}

	/**
	 * Delete by id SysRole.
	 */
	@RequestMapping(value = "/delete", method = POST, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<PageResponse<SysRole>> delete(@RequestBody String json) throws URISyntaxException {

		log.debug("Delete by id SysRole : {}", json);
		PageResponse<SysRole> pageResponse = new PageResponse<SysRole>(null);
		TypeReference<List<SysRole>> typeRef = new TypeReference<List<SysRole>>() {
		};
		try {
			JsonNode root = objectMapper.readTree(json);
			JsonNode tempNode = root.get("data");
			if (tempNode.isArray()) {
				List<SysRole> temps = objectMapper.convertValue(tempNode, typeRef);
				for (Iterator<SysRole> ketIter = temps.iterator(); ketIter.hasNext();) {
					SysRole tempObj = ketIter.next();
					SysRole temp = sysRoleRepository.findOne(tempObj.getId());
					if (null != temp) {
						sysRoleRepository.delete(temp.getId());
					}
				}
			}
			else {
				SysRole tempObj = objectMapper.convertValue(tempNode, SysRole.class);
				SysRole temp = sysRoleRepository.findOne(tempObj.getId());
				if (null != temp) {
					sysRoleRepository.delete(temp.getId());
				}
			}

			pageResponse.setSuccess(Boolean.TRUE);
			pageResponse.setMessage("Delete SysRole Success");
			return new ResponseEntity<PageResponse<SysRole>>(pageResponse, HttpStatus.OK);
		}
		catch (Exception e) {
			e.printStackTrace();
			pageResponse.setSuccess(Boolean.FALSE);
			pageResponse.setMessage("Delete SysRole Failure");
			return new ResponseEntity<PageResponse<SysRole>>(pageResponse, HttpStatus.OK);
		}

	}
}