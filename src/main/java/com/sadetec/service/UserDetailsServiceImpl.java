
package com.sadetec.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sadetec.model.SysRole;
import com.sadetec.model.SysUser;
import com.sadetec.repository.SysRoleRepository;
import com.sadetec.repository.SysUserRepository;

/**
 * An implementation of Spring Security's {@link UserDetailsService}.
 * 
 * @see http://static.springsource.org/spring-security/site/reference.html
 */
@Service("userDetailsService")
public class UserDetailsServiceImpl implements UserDetailsService {

	private static final Logger log = LoggerFactory.getLogger(UserDetailsServiceImpl.class);

	@Autowired
	private SysUserRepository sysUserRepository;

	@Autowired
	private SysRoleRepository sysRoleRepository;
	
	/**
	 * Retrieve an account depending on its login this method is not case sensitive.
	 *
	 * @param username the user's username
	 * @return a Spring Security userdetails object that matches the username
	 * @throws UsernameNotFoundException when the user could not be found
	 */
	@Transactional(readOnly = true)
	@Override
	public UserDetails loadUserByUsername(String username) {
		if (username == null || username.trim().isEmpty()) {
			log.error("用户名不能为空{}",username);
			throw new UsernameNotFoundException("用户名不能为空");
		}
		SysUser user = sysUserRepository.getByLoginName(username);
		if (user == null) {
			log.error("用户{}不存在",username);
			throw new UsernameNotFoundException("用户" + username + "不存在");
		}

		List<SysRole> roles = sysRoleRepository.findByUserId(user.getId());
		Collection<GrantedAuthority> grantedAuths = toGrantedAuthorities(roles);

		boolean enabled = "1".equalsIgnoreCase(user.getEnabled());
		boolean accountNonExpired = true;
		boolean credentialsNonExpired = true;
		boolean accountNonLocked = true;
		UserDetails userdetails = new User(user.getLoginName(), user.getPassword(), enabled, accountNonExpired, credentialsNonExpired, accountNonLocked,
				grantedAuths);
		return userdetails;

	}

	private Collection<GrantedAuthority> toGrantedAuthorities(List<SysRole> roles) {
		List<GrantedAuthority> result = new ArrayList<>();
		for (SysRole role : roles) {
			result.add(new SimpleGrantedAuthority(role.getName()));
		}
		return result;
	}
}