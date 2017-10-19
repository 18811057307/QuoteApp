package com.sadetec.service;

import java.util.List;
import java.util.Set;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.DelegateTask;
import org.camunda.bpm.engine.delegate.ExecutionListener;
import org.camunda.bpm.engine.delegate.TaskListener;
import org.camunda.bpm.engine.task.IdentityLink;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.sadetec.model.SysUser;
import com.sadetec.repository.FormInstanceRepository;
import com.sadetec.repository.SysUserRepository;

@Service("notificationService")
public class NotificationService implements TaskListener {

	private static final Logger log = LoggerFactory.getLogger(NotificationService.class);

	@Autowired
	private FormInstanceRepository formInstanceRepository;

	@Autowired
	private SysUserRepository sysUserRepository;

	@Autowired
	private JavaMailSender javaMailSender;

	@Async
	@Override
	public void notify(DelegateTask delegateTask) {
		
		String assignee = delegateTask.getAssignee();

		if (assignee != null) {
			log.info("通过邮件进行任务通知,目标人员:{}", assignee);
			SysUser user = sysUserRepository.getByLoginName(assignee);
			sendMail(user,"待办理事项:" + delegateTask.getName(),"请登录系统, 完成待办任务.http://121.197.3.238:8088/sadetec/");

		} else {
			Set<IdentityLink> candidates = delegateTask.getCandidates();
			for (IdentityLink identityLink : candidates) {
				String groupId = identityLink.getGroupId();
				log.info("通过邮件进行任务通知,目标岗位:{}", groupId);
				List<SysUser> users = sysUserRepository.findByRoleName(groupId);
				for (SysUser sysUser : users) {
					sendMail(sysUser,"待认领事项:" + delegateTask.getName(),"请登录系统,认领任务.http://121.197.3.238:8088/sadetec/");
				}
			}
			
		}
	}
	
	private void sendMail(SysUser user, String subject, String msg) {
		if (user != null) {

			// Get Email Address from User Profile
			String recipient = user.getEmail();

			if (recipient != null && !recipient.isEmpty()) {

				MimeMessage mailMsg = javaMailSender.createMimeMessage();
				MimeMessageHelper helper = new MimeMessageHelper(mailMsg);
				try {
					helper.setFrom("service@sadetec.com");
					helper.setTo(recipient);
					helper.setSubject(subject);
					helper.setText(msg);
					javaMailSender.send(mailMsg);
				}
				catch (MessagingException e) {
					log.error("向{}发送通知邮件失败 ,原因:{}",recipient,e.getCause());
				}
			}
			else {
				log.error("未设置用户:{}的邮箱", user.getName());
			}

		}
		else {
			log.error("未找到用户");
		}
	}

}
