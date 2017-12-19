/* Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.sadetec.model;

import java.util.Date;

import org.camunda.bpm.engine.history.HistoricActivityInstance;
import org.camunda.bpm.engine.history.HistoricProcessInstance;
import org.camunda.bpm.engine.task.Task;

public class ProcessInstanceDto {

	private Integer formInstanceId;
	private String processInstanceId;
	private String title;
	private String seqNumber;
	private String drafterId;
	private String drafter;
	private String salesId;
	private String sales;
	private String draftOrg;
	private String comment;
	private String description;
	private String assignee;
    private Date createDate;
	private Date startTime;
	private Date endTime;
	private Long durationInMillis;
	private String state;
	
	public static ProcessInstanceDto fromEntity(HistoricProcessInstance processInstance, FormInstance formInstance) {
		ProcessInstanceDto instanceDto = new ProcessInstanceDto();
		instanceDto.setProcessInstanceId(processInstance.getId());
		instanceDto.setFormInstanceId(formInstance.getId());
		
		instanceDto.setTitle(formInstance.getTitle());
		instanceDto.setSeqNumber(formInstance.getSeqNumber());
		instanceDto.setDrafterId(formInstance.getDrafterId());
		instanceDto.setDrafter(formInstance.getDrafter());
		instanceDto.setSalesId(formInstance.getSalesId());
		instanceDto.setSales(formInstance.getSales());
		instanceDto.setDraftOrg(formInstance.getDraftOrg());
		instanceDto.setComment(formInstance.getComment());
		instanceDto.setDescription(formInstance.getDescription());
		instanceDto.setCreateDate(formInstance.getCreateDate());
		
		instanceDto.setAssignee(processInstance.getId());
		
		instanceDto.setStartTime(processInstance.getStartTime());
		instanceDto.setEndTime(processInstance.getEndTime());
		instanceDto.setDurationInMillis(processInstance.getDurationInMillis());
		instanceDto.setState(processInstance.getState());
		
		return instanceDto;
		
	}
	
	public Integer getFormInstanceId() {
		return formInstanceId;
	}

	public void setFormInstanceId(Integer formInstanceId) {
		this.formInstanceId = formInstanceId;
	}


	public String getProcessInstanceId() {
		return processInstanceId;
	}


	public void setProcessInstanceId(String processInstanceId) {
		this.processInstanceId = processInstanceId;
	}


	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getSeqNumber() {
		return seqNumber;
	}
	public void setSeqNumber(String seqNumber) {
		this.seqNumber = seqNumber;
	}
	public String getDrafterId() {
		return drafterId;
	}
	public void setDrafterId(String drafterId) {
		this.drafterId = drafterId;
	}
	public String getDrafter() {
		return drafter;
	}
	public void setDrafter(String drafter) {
		this.drafter = drafter;
	}
	public String getDraftOrg() {
		return draftOrg;
	}
	public void setDraftOrg(String draftOrg) {
		this.draftOrg = draftOrg;
	}
	
	public String getSalesId() {
		return salesId;
	}

	public void setSalesId(String salesId) {
		this.salesId = salesId;
	}

	public String getSales() {
		return sales;
	}

	public void setSales(String sales) {
		this.sales = sales;
	}

	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getAssignee() {
		return assignee;
	}
	public void setAssignee(String assignee) {
		this.assignee = assignee;
	}
	
	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public Date getStartTime() {
		return startTime;
	}
	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}
	public Date getEndTime() {
		return endTime;
	}
	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}
	public Long getDurationInMillis() {
		return durationInMillis;
	}
	public void setDurationInMillis(Long durationInMillis) {
		this.durationInMillis = durationInMillis;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}

}
