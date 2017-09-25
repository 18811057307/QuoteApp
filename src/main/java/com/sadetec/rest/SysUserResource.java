package com.sadetec.rest;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.apache.commons.collections4.map.HashedMap;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sadetec.model.BaseTreeNode;
import com.sadetec.model.SysCompany;
import com.sadetec.model.SysUser;
import com.sadetec.model.SysUserRole;
import com.sadetec.model.SysUserRolePk;
import com.sadetec.repository.SysCompanyRepository;
import com.sadetec.repository.SysUserRepository;
import com.sadetec.repository.SysUserRoleRepository;
import com.sadetec.rest.support.AutoCompleteQuery;
import com.sadetec.rest.support.PageResponse;
import com.sadetec.util.FilterCondition;
import com.sadetec.util.UserContext;

@RestController
@RequestMapping("/api/sysUser")
public class SysUserResource {

	private final Logger log = LoggerFactory.getLogger(SysUserResource.class);

	@Autowired
	private SysUserRepository sysUserRepository;

	@Autowired
	private SysUserRoleRepository sysUserRoleRepository;
	
	@Autowired
	private SysCompanyRepository sysCompanyRepository;
	
	@Autowired
	private ObjectMapper objectMapper;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private JavaMailSender javaMailSender;

	@RequestMapping(value = "/create", method = POST, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<PageResponse<SysUser>> create(@RequestBody String json) throws URISyntaxException {

		log.info("Create json : {}", json);

		List<SysUser> sysUsers = SysUser.fromJsonToSysUser(json);

		for (SysUser temp : sysUsers) {
			log.info("SysUser to Create : {}", temp);
			temp.setEnabled("1");
			temp.setPassword(passwordEncoder.encode(temp.getPassword()));
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
	public ResponseEntity<PageResponse<SysUser>> findAll(@RequestParam(value = "page", required = false) Integer page,
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
		Sort sortByName = new Sort(Direction.ASC, "name");
		if(null != loginName) {
			result = sysUserRepository.findByLoginNameContainsOrNameContains(loginName,loginName,new PageRequest(page - 1, limit));
		} else if (null != page){
			result = sysUserRepository.findAll(new PageRequest(page - 1, limit, sortByName));
		} else {
			result = sysUserRepository.findAll(new PageRequest(0, -1, sortByName));
		}
		PageResponse<SysUser> pageResponse = new PageResponse<SysUser>(result.getContent());
		pageResponse.setSuccess(Boolean.TRUE);
		pageResponse.setTotal(result.getTotalElements());

		return new ResponseEntity<PageResponse<SysUser>>(pageResponse, HttpStatus.OK);

	}

	/**
	 * 人员下拉选择组件,按公司-人员的方式展示.
	 */
	@RequestMapping(value = "/userTree", method = GET, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<List<BaseTreeNode>> getUsersTree(
			@RequestParam(value = "companyId", required = false) Integer companyId,
			@RequestParam(value = "roleCode", required = false) String roleCode) throws URISyntaxException {

		Sort sortBySequence = new Sort(Direction.ASC,"sequence");
		List<BaseTreeNode> userTree = new ArrayList<>();
		
		if(null == companyId || 0 == companyId) {
			List<SysCompany> companies = sysCompanyRepository.findAll(sortBySequence);		
			for (SysCompany sysCompany : companies) {
				BaseTreeNode company = new BaseTreeNode(sysCompany.getId().toString(), sysCompany.getName(), false, "company-icon", "", "");
				userTree.add(company);
			}			
		} else {
			
			List<SysUser> companyUsers;
			if(StringUtils.isNotEmpty(roleCode)) {
				companyUsers = sysUserRepository.findByCompanyIdAndRoleCodeOrderBySequence(companyId, roleCode);				
			} else {
				companyUsers = sysUserRepository.findByCompanyIdOrderBySequence(companyId);
			}
			for (SysUser sysUser : companyUsers) {
				BaseTreeNode user = new BaseTreeNode(sysUser.getLoginName(), sysUser.getName(), true, "icon-users", "", "");
				userTree.add(user);
			}
		}

		return new ResponseEntity<>(userTree, new HttpHeaders(), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/userRawValue", method = GET, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<Map<String,String>> getUsersRawValue(@RequestParam(value = "loginName", required = false) String loginName) throws URISyntaxException {

		Map<String,String> result = new HashMap<>();
		if(StringUtils.isNotEmpty(loginName)) {
			SysUser tempUser = sysUserRepository.getByLoginName(loginName);
			result.put("data", tempUser.getName());			
		} else {
			result.put("data", "");
		}
		return new ResponseEntity<>(result, new HttpHeaders(), HttpStatus.OK);
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
	
	@RequestMapping(value = "/modifyPassword", method = POST, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<PageResponse<SysUser>> modifyPassword(
			@RequestParam(value = "oriPassword", required = true) String oriPassword,
			@RequestParam(value = "newPassword", required = true) String newPassword)
			throws URISyntaxException {
		SysUser curUser = sysUserRepository.getByLoginName(UserContext.getUsername());	
		
		PageResponse<SysUser> resp = new PageResponse<>(null);
		
		if(null != curUser) {
			if(passwordEncoder.matches(oriPassword,curUser.getPassword())) {
				curUser.setPassword(passwordEncoder.encode(newPassword));
				sysUserRepository.saveAndFlush(curUser);
				resp.setSuccess(true);
				resp.setMessage("密码修改成功");
				return new ResponseEntity<PageResponse<SysUser>>(resp, HttpStatus.OK);
			} else {
				resp.setSuccess(false);
				resp.setMessage("原始密码验证失败");
				return new ResponseEntity<PageResponse<SysUser>>(resp, HttpStatus.OK);
			}
		}
		
		resp.setSuccess(false);
		resp.setMessage("更新密码失败");
		return new ResponseEntity<PageResponse<SysUser>>(resp, HttpStatus.OK);
		
	}
	
	@RequestMapping(value = "/resetPassword", method = POST, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<PageResponse<SysUser>> resetPassword(@RequestParam(value = "loginName", required = true) String loginName)
			throws URISyntaxException {
		SysUser curUser = sysUserRepository.getByLoginName(loginName);	
		
		PageResponse<SysUser> resp = new PageResponse<>(null);
		
		if(null != curUser) {
			String newPassword = getRandomString(6);
			curUser.setPassword(passwordEncoder.encode(newPassword));
			sysUserRepository.saveAndFlush(curUser);
			
			MimeMessage mailMsg = javaMailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(mailMsg);
			try {
				helper.setFrom("service@sadetec.com");
				helper.setTo(curUser.getEmail());
				helper.setSubject("密码重置通知");
				helper.setText(String.format("你的密码已重置为%s,请登录系统修改:%s",newPassword,"http://121.197.3.238:8088/sadetec/"));
				javaMailSender.send(mailMsg);
			}
			catch (MessagingException e) {
				log.error("向{}发送通知邮件失败 ,原因:{}",curUser.getName(),e.getCause());
			}
			
			resp.setSuccess(true);
			resp.setMessage("密码重置成功");
			return new ResponseEntity<PageResponse<SysUser>>(resp, HttpStatus.OK);
		}
		
		resp.setSuccess(false);
		resp.setMessage("密码重置失败");
		return new ResponseEntity<PageResponse<SysUser>>(resp, HttpStatus.OK);
		
	}
	
	/*
	@RequestMapping(value = "/encodePassword", method = GET, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<PageResponse<SysUser>> encodePassword()
			throws URISyntaxException {
		
		List<SysUser> allUser = sysUserRepository.findAll();
		
		for (SysUser sysUser : allUser) {
			sysUser.setPassword(passwordEncoder.encode(sysUser.getPassword()));
			sysUserRepository.saveAndFlush(sysUser);
		}
		
		PageResponse<SysUser> resp = new PageResponse<>(null);
		resp.setSuccess(true);
		resp.setMessage("加密密码");
		return new ResponseEntity<PageResponse<SysUser>>(resp, HttpStatus.OK);
		
	}
	*/
	
	private static String getRandomString(int length) { //length表示生成字符串的长度  
	    String base = "abcdefghijklmnopqrstuvwxyz0123456789";     
	    Random random = new Random();     
	    StringBuffer sb = new StringBuffer();     
	    for (int i = 0; i < length; i++) {     
	        int number = random.nextInt(base.length());     
	        sb.append(base.charAt(number));     
	    }     
	    return sb.toString();     
	 }     
}