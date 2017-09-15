package com.sadetec.workflow;

import java.util.ArrayList;
import java.util.List;

import org.camunda.bpm.engine.ProcessEngine;
import org.camunda.bpm.engine.impl.cfg.ProcessEngineConfigurationImpl;
import org.camunda.bpm.engine.impl.cfg.ProcessEnginePlugin;
import org.camunda.bpm.identity.impl.ldap.plugin.LdapIdentityProviderPlugin;
import org.camunda.bpm.spring.boot.starter.configuration.CamundaProcessEngineConfiguration;
import org.camunda.bpm.spring.boot.starter.configuration.Ordering;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Component
@Order(Ordering.DEFAULT_ORDER + 1)
public class SadeCamundaConfiguration implements CamundaProcessEngineConfiguration{

	protected static final Logger logger = LoggerFactory.getLogger(SadeCamundaConfiguration.class);
	
	@Override
	public void postInit(ProcessEngineConfigurationImpl pec) {
		
	}

	@Override
	public void postProcessEngineBuild(ProcessEngine pe) {
		//logger.info("postProcessEngineBuild当前的身份服务{}",pe.getIdentityService());
	}

	@Override
	public void preInit(ProcessEngineConfigurationImpl pec) {
		
		/**
		logger.info("preInit当前的身份服务1111111111111111111");
		
		LdapIdentityProviderPlugin ldapIdentityProviderPlugin = new LdapIdentityProviderPlugin();
		ldapIdentityProviderPlugin.setServerUrl("ldap://ldap.forumsys.com:389/");
		ldapIdentityProviderPlugin.setManagerDn("cn=read-only-admin,dc=example,dc=com");
		ldapIdentityProviderPlugin.setManagerPassword("password");
		ldapIdentityProviderPlugin.setBaseDn("dc=example,dc=com");
		ldapIdentityProviderPlugin.setUserSearchBase("");
		ldapIdentityProviderPlugin.setUserSearchFilter("(objectclass=person)");
		ldapIdentityProviderPlugin.setUserIdAttribute("uid");
		ldapIdentityProviderPlugin.setUserFirstnameAttribute("cn");
		ldapIdentityProviderPlugin.setUserLastnameAttribute("sn");
		ldapIdentityProviderPlugin.setUserEmailAttribute("mail");
		ldapIdentityProviderPlugin.setUserPasswordAttribute("userPassword");
		ldapIdentityProviderPlugin.setGroupSearchBase("");
		ldapIdentityProviderPlugin.setGroupSearchFilter("(objectclass=groupOfNames)");
		ldapIdentityProviderPlugin.setGroupIdAttribute("ou");
		ldapIdentityProviderPlugin.setGroupNameAttribute("cn");
		ldapIdentityProviderPlugin.setGroupMemberAttribute("member");
		logger.info("preInit当前的身份服务22222222222222222222");
		List<ProcessEnginePlugin> processEnginePlugins = new ArrayList<>();
		processEnginePlugins.add(ldapIdentityProviderPlugin);
		pec.setProcessEnginePlugins(processEnginePlugins);
		logger.info("preInit当前的身份服务33333333333333333333333");
		
		**/
		
	}
}
