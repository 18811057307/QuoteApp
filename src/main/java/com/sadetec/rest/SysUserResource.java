package com.sadetec.rest;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

import java.net.URISyntaxException;
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
import com.sadetec.model.SysUser;
import com.sadetec.model.SysUserRole;
import com.sadetec.model.SysUserRolePk;
import com.sadetec.repository.SysUserRepository;
import com.sadetec.repository.SysUserRoleRepository;
import com.sadetec.rest.support.AutoCompleteQuery;
import com.sadetec.rest.support.PageResponse;
import com.sadetec.util.FilterCondition;

@RestController
@RequestMapping("/api/sysUser")
public class SysUserResource {

	private final Logger log = LoggerFactory.getLogger(SysUserResource.class);

	@Autowired
	private SysUserRepository sysUserRepository;

	@Autowired
	private SysUserRoleRepository sysUserRoleRepository;
	
	@Autowired
	private ObjectMapper objectMapper;

	@RequestMapping(value = "/create", method = POST, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<PageResponse<SysUser>> create(@RequestBody String json) throws URISyntaxException {

		log.info("Create json : {}", json);

		List<SysUser> sysUsers = SysUser.fromJsonToSysUser(json);

		for (SysUser temp : sysUsers) {
			log.info("SysUser to Create : {}", temp);
			temp.setEnabled("1");
			sysUserRepository.save(temp);
		}

		PageResponse<SysUser> pageResponse = new PageResponse<SysUser>(sysUsers);
		pageResponse.setSuccess(Boolean.TRUE);
		pageResponse.setMessage("Create SysUser Success");

		return new ResponseEntity<PageResponse<SysUser>>(pageResponse, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/assign", method = POST, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<PageResponse<SysUser>> assign(@RequestParam(value = "userId", required = false, defaultValue = "1") Integer userId,
			@RequestParam(value = "roleId", required = false, defaultValue = "1") Integer roleId,
			@RequestParam(value = "checked", required = false, defaultValue = "1") Boolean checked) throws URISyntaxException {

		PageResponse<SysUser> pageResponse = new PageResponse<>(null);
		pageResponse.setSuccess(Boolean.TRUE);

		if(checked) {
			SysUserRole sysUserRole = new SysUserRole();
			sysUserRole.setId(new SysUserRolePk(roleId, userId));
			sysUserRoleRepository.save(sysUserRole);
			pageResponse.setMessage("成功分配角色");
		} else {
			sysUserRoleRepository.delete(new SysUserRolePk(roleId, userId));
			pageResponse.setMessage("成功删除角色");
		}
		
		return new ResponseEntity<PageResponse<SysUser>>(pageResponse, HttpStatus.OK);
	}

	/**
	 * Find by id SysUser.
	 */
	@RequestMapping(value = "/{id}", method = GET, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<SysUser> findById(@PathVariable Integer id) throws URISyntaxException {

		log.debug("Find by id SysUser : {}", id);

		return Optional.ofNullable(sysUserRepository.findOne(id)).map(SysUser -> new ResponseEntity<>(SysUser, HttpStatus.OK))
				.orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	/**
	 * Find a Page of SysUser using query by example.
	 */
	@RequestMapping(value = "/page", method = GET, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<PageResponse<SysUser>> findAll(@RequestParam(value = "page", required = false, defaultValue = "1") Integer page,
			@RequestParam(value = "start", required = false) Integer start, @RequestParam(value = "limit", required = false, defaultValue = "25") Integer limit,
			@RequestParam(value = "filter", required = false) String filter, @RequestParam(value = "sort", required = false) String sort
			, @RequestParam(value = "loginName", required = false) String loginName)
			throws URISyntaxException {

		if (null != filter) {
			List<FilterCondition> temps = FilterCondition.decodeJson(filter);

			SysUser probe = new SysUser();
			ExampleMatcher matcher = ExampleMatcher.matching();
			for (FilterCondition filterCondition : temps) {
				// BeanUtils.setProperty(probe, filterCondition.getField(),
				// filterCondition.getValue());
			}
		}
		Page<SysUser> result;
		if(null != loginName) {
			result = sysUserRepository.findByLoginNameContainsOrNameContains(loginName,loginName,new PageRequest(page - 1, limit));
		} else {
			result = sysUserRepository.findAll(new PageRequest(page - 1, limit));
		}
		PageResponse<SysUser> pageResponse = new PageResponse<SysUser>(result.getContent());
		pageResponse.setSuccess(Boolean.TRUE);
		pageResponse.setTotal(result.getTotalElements());

		return new ResponseEntity<PageResponse<SysUser>>(pageResponse, HttpStatus.OK);

	}

	/**
	 * Auto complete support.
	 */
	@RequestMapping(value = "/complete", method = POST, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<List<SysUser>> complete(@RequestBody AutoCompleteQuery acq) throws URISyntaxException {

		List<SysUser> results = sysUserRepository.complete(acq.query, acq.maxResults);

		return new ResponseEntity<>(results, new HttpHeaders(), HttpStatus.OK);
	}

	/**
	 * update
	 */
	@RequestMapping(value = "/update", method = POST, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<PageResponse<SysUser>> update(@RequestBody String json) throws URISyntaxException {

		log.debug("Update by id SysUser : {}", json);
		PageResponse<SysUser> pageResponse = new PageResponse<SysUser>(null);
		TypeReference<List<SysUser>> typeRef = new TypeReference<List<SysUser>>() {
		};
		try {
			JsonNode root = objectMapper.readTree(json);
			JsonNode tempNode = root.get("data");
			if (tempNode.isArray()) {
				List<SysUser> temps = objectMapper.convertValue(tempNode, typeRef);
				for (Iterator<SysUser> ketIter = temps.iterator(); ketIter.hasNext();) {
					SysUser tempObj = ketIter.next();
					tempObj.setEnabled("1");
					sysUserRepository.save(tempObj);
				}
			}
			else {
				SysUser tempObj = objectMapper.convertValue(tempNode, SysUser.class);
				tempObj.setEnabled("1");
				sysUserRepository.save(tempObj);
			}

			pageResponse.setSuccess(Boolean.TRUE);
			pageResponse.setMessage("Update SysUser Success");
			return new ResponseEntity<PageResponse<SysUser>>(pageResponse, HttpStatus.OK);
		}
		catch (Exception e) {
			e.printStackTrace();
			pageResponse.setSuccess(Boolean.FALSE);
			pageResponse.setMessage("Update SysUser Failure");
			return new ResponseEntity<PageResponse<SysUser>>(pageResponse, HttpStatus.OK);
		}

	}

	/**
	 * Delete by id SysUser.
	 */
	@RequestMapping(value = "/delete", method = POST, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<PageResponse<SysUser>> delete(@RequestBody String json) throws URISyntaxException {

		log.debug("Delete by id SysUser : {}", json);
		PageResponse<SysUser> pageResponse = new PageResponse<SysUser>(null);
		TypeReference<List<SysUser>> typeRef = new TypeReference<List<SysUser>>() {
		};
		try {
			JsonNode root = objectMapper.readTree(json);
			JsonNode tempNode = root.get("data");
			if (tempNode.isArray()) {
				List<SysUser> temps = objectMapper.convertValue(tempNode, typeRef);
				for (Iterator<SysUser> ketIter = temps.iterator(); ketIter.hasNext();) {
					SysUser tempObj = ketIter.next();
					SysUser temp = sysUserRepository.findOne(tempObj.getId());
					if (null != temp) {
						sysUserRepository.delete(temp.getId());
					}
				}
			}
			else {
				SysUser tempObj = objectMapper.convertValue(tempNode, SysUser.class);
				SysUser temp = sysUserRepository.findOne(tempObj.getId());
				if (null != temp) {
					sysUserRepository.delete(temp.getId());
				}
			}

			pageResponse.setSuccess(Boolean.TRUE);
			pageResponse.setMessage("Delete SysUser Success");
			return new ResponseEntity<PageResponse<SysUser>>(pageResponse, HttpStatus.OK);
		}
		catch (Exception e) {
			e.printStackTrace();
			pageResponse.setSuccess(Boolean.FALSE);
			pageResponse.setMessage("Delete SysUser Failure");
			return new ResponseEntity<PageResponse<SysUser>>(pageResponse, HttpStatus.OK);
		}

	}
}