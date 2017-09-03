package com.sadetec.model;

import java.util.Date;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.camunda.bpm.engine.task.Task;
import org.springframework.format.annotation.DateTimeFormat;

public class TaskInstance {

	private Integer revision;

	private String assignee;

	private String name;

	private String description;

	private Integer priority;

	private String emergency;

	@Temporal(TemporalType.TIMESTAMP)
	@DateTimeFormat(style = "S-")
	private Date createTime;

	private Boolean isIdentityLinksInitialized;

	private String executionId;

	private String processInstanceId;

	private String processDefinitionId;

	private String processDefinitionName;

	private String taskDefinitionKey;

	private String formResourceKey;

	private Integer formInstanceId;

	private String id;

	private Integer version;

	private String owner;

	private String parentTaskId;

	@Temporal(TemporalType.TIMESTAMP)
	@DateTimeFormat(style = "S-")
	private Date dueDate;

	private String title;

	@Temporal(TemporalType.TIMESTAMP)
	@DateTimeFormat(style = "S-")
	private Date endDate;

	@Temporal(TemporalType.TIMESTAMP)
	@DateTimeFormat(style = "S-")
	private Date lastModified;

	private String docNumber;

	private String seqNumber;

	public TaskInstance(Task t) {
		this.assignee = t.getAssignee();
		this.description = t.getDescription();
		this.executionId = t.getExecutionId();
		this.id = t.getId();
		this.name = t.getName();
		this.owner = t.getOwner();
		this.parentTaskId = t.getParentTaskId();
		this.processDefinitionId = t.getProcessDefinitionId();
		this.processInstanceId = t.getProcessInstanceId();
		this.taskDefinitionKey = t.getTaskDefinitionKey();
		this.createTime = t.getCreateTime();
		this.dueDate = t.getDueDate();
		this.priority = t.getPriority();
	}

	public TaskInstance() {
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getOwner() {
		return owner;
	}

	public void setOwner(String owner) {
		this.owner = owner;
	}

	public String getParentTaskId() {
		return parentTaskId;
	}

	public void setParentTaskId(String parentTaskId) {
		this.parentTaskId = parentTaskId;
	}

	public Date getDueDate() {
		return dueDate;
	}

	public void setDueDate(Date dueDate) {
		this.dueDate = dueDate;
	}

	public Integer getVersion() {
		return this.version;
	}

	public void setVersion(Integer version) {
		this.version = version;
	}

	public Integer getRevision() {
		return this.revision;
	}

	public void setRevision(Integer revision) {
		this.revision = revision;
	}

	public String getAssignee() {
		return this.assignee;
	}

	public void setAssignee(String assignee) {
		this.assignee = assignee;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Integer getPriority() {
		return this.priority;
	}

	public void setPriority(Integer priority) {
		this.priority = priority;
	}

	public Date getCreateTime() {
		return this.createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Boolean getIsIdentityLinksInitialized() {
		return this.isIdentityLinksInitialized;
	}

	public void setIsIdentityLinksInitialized(Boolean isIdentityLinksInitialized) {
		this.isIdentityLinksInitialized = isIdentityLinksInitialized;
	}

	public String getExecutionId() {
		return this.executionId;
	}

	public void setExecutionId(String executionId) {
		this.executionId = executionId;
	}

	public String getProcessInstanceId() {
		return this.processInstanceId;
	}

	public void setProcessInstanceId(String processInstanceId) {
		this.processInstanceId = processInstanceId;
	}

	public String getProcessDefinitionId() {
		return this.processDefinitionId;
	}

	public void setProcessDefinitionId(String processDefinitionId) {
		this.processDefinitionId = processDefinitionId;
	}

	public String getProcessDefinitionName() {
		return processDefinitionName;
	}

	public void setProcessDefinitionName(String processDefinitionName) {
		this.processDefinitionName = processDefinitionName;
	}

	public String getTaskDefinitionKey() {
		return this.taskDefinitionKey;
	}

	public void setTaskDefinitionKey(String taskDefinitionKey) {
		this.taskDefinitionKey = taskDefinitionKey;
	}

	public String getFormResourceKey() {
		return this.formResourceKey;
	}

	public void setFormResourceKey(String formResourceKey) {
		this.formResourceKey = formResourceKey;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public Integer getFormInstanceId() {
		return formInstanceId;
	}

	public void setFormInstanceId(Integer formInstanceId) {
		this.formInstanceId = formInstanceId;
	}

	public String getEmergency() {
		return emergency;
	}

	public void setEmergency(String emergency) {
		this.emergency = emergency;
	}

	public Date getLastModified() {
		return lastModified;
	}

	public void setLastModified(Date lastModified) {
		this.lastModified = lastModified;
	}

	public String getDocNumber() {
		return docNumber;
	}

	public void setDocNumber(String docNumber) {
		this.docNumber = docNumber;
	}

	public String getSeqNumber() {
		return seqNumber;
	}

	public void setSeqNumber(String seqNumber) {
		this.seqNumber = seqNumber;
	}

	public String toString() {
		StringBuilder sb = new StringBuilder();
		sb.append("Revision: ").append(getRevision()).append(", ");
		sb.append("Assignee: ").append(getAssignee()).append(", ");
		sb.append("Name: ").append(getName()).append(", ");
		sb.append("Description: ").append(getDescription()).append(", ");
		sb.append("Priority: ").append(getPriority()).append(", ");
		sb.append("CreateTime: ").append(getCreateTime()).append(", ");
		sb.append("IsIdentityLinksInitialized: ").append(getIsIdentityLinksInitialized()).append(", ");
		sb.append("ExecutionId: ").append(getExecutionId()).append(", ");
		sb.append("ProcessInstanceId: ").append(getProcessInstanceId()).append(", ");
		sb.append("ProcessDefinitionId: ").append(getProcessDefinitionId()).append(", ");
		sb.append("ProcessDefinitionName: ").append(getProcessDefinitionName()).append(", ");
		sb.append("TaskDefinitionKey: ").append(getTaskDefinitionKey()).append(", ");
		sb.append("FormResourceKey: ").append(getFormResourceKey());
		return sb.toString();
	}
}
