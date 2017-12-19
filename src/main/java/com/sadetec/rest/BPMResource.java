package com.sadetec.rest;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.commons.io.IOUtils;
import org.camunda.bpm.engine.FormService;
import org.camunda.bpm.engine.HistoryService;
import org.camunda.bpm.engine.IdentityService;
import org.camunda.bpm.engine.RepositoryService;
import org.camunda.bpm.engine.RuntimeService;
import org.camunda.bpm.engine.TaskService;
import org.camunda.bpm.engine.form.StartFormData;
import org.camunda.bpm.engine.history.HistoricActivityInstance;
import org.camunda.bpm.engine.history.HistoricProcessInstance;
import org.camunda.bpm.engine.history.HistoricTaskInstance;
import org.camunda.bpm.engine.repository.ProcessDefinition;
import org.camunda.bpm.engine.runtime.ProcessInstance;
import org.camunda.bpm.engine.task.Task;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sadetec.model.BaseTreeNode;
import com.sadetec.model.FormInstance;
import com.sadetec.model.HistoricActivityInstanceDto;
import com.sadetec.model.ProcessDefinitionDto;
import com.sadetec.model.ProcessInstanceDto;
import com.sadetec.model.SysUser;
import com.sadetec.model.TaskInstance;
import com.sadetec.repository.FormInstanceRepository;
import com.sadetec.repository.SysUserRepository;
import com.sadetec.rest.support.PageResponse;
import com.sadetec.service.StorageException;
import com.sadetec.service.StorageService;
import com.sadetec.util.UserContext;

@RestController
@RequestMapping("/api/bpm")
public class BPMResource {

	private final Logger log = LoggerFactory.getLogger(BPMResource.class);

	@Autowired
	private RepositoryService repositoryService;

	@Autowired
	private RuntimeService runtimeService;

	@Autowired
	private TaskService taskService;

	@Autowired
	private HistoryService historyService;

	@Autowired
	private IdentityService identityService;

	@Autowired
	private FormService formService;

	@Autowired
	private SysUserRepository sysUserRepository;

	@Autowired
	private FormInstanceRepository formInstanceRepository;

	@Autowired
	private ObjectMapper objectMapper;

	@Autowired
	private StorageService storageService;
	
	@Autowired
	private ResourceLoader resourceLoader;

	/**
	 * 
	 */
	@RequestMapping(value = "/process-definitions", method = GET, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<PageResponse<ProcessDefinitionDto>> listProcessDefinitions() {

		List<ProcessDefinitionDto> results = new ArrayList<>();
		List<ProcessDefinition> definitions = repositoryService.createProcessDefinitionQuery().latestVersion().list();
		for (ProcessDefinition processDefinition : definitions) {
			results.add(ProcessDefinitionDto.fromProcessDefinition(processDefinition));
		}

		PageResponse<ProcessDefinitionDto> pageResponse = new PageResponse<ProcessDefinitionDto>(results);
		pageResponse.setSuccess(Boolean.TRUE);
		pageResponse.setTotal(results.size());

		return new ResponseEntity<PageResponse<ProcessDefinitionDto>>(pageResponse, HttpStatus.OK);

	}
	
	/**
	 * 管理员查看所有的流程实例
	 * @param processKey
	 * @param title
	 * @param start
	 * @param limit
	 * @return
	 */
	@RequestMapping(value = "/processInstances", method = GET, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<PageResponse<ProcessInstanceDto>> listProcessInstances(
			@RequestParam(value = "processKey", required = false) String processKey, 
			@RequestParam(value = "title", required = false) String title,
			@RequestParam(value = "start", required = false) Integer start, 
			@RequestParam(value = "limit", required = false, defaultValue = "25") Integer limit) {
		
		List<ProcessInstanceDto> results = new ArrayList<>();
		
		if(StringUtils.isEmpty(title)) {
			List<HistoricProcessInstance> instances = historyService.createHistoricProcessInstanceQuery().processDefinitionKey(processKey).orderByProcessInstanceStartTime().desc().listPage(start, limit);
			//遍历流程实例,获取相关的FormInstance
			for (HistoricProcessInstance historicProcessInstance : instances) {
				FormInstance formInstance = formInstanceRepository.findOneByProcessInstanceId(historicProcessInstance.getId());
				if(null != formInstance) {
					ProcessInstanceDto instanceDto = ProcessInstanceDto.fromEntity(historicProcessInstance, formInstance);
					results.add(instanceDto);
				}
			}
		} else {
			List<FormInstance> instances = formInstanceRepository.findByTitleContains(title);
			
			//遍历表单实例，获取对应的流程信息
			for (FormInstance formInstance : instances) {
				
				String procInstId = formInstance.getProcessInstanceId();
				HistoricProcessInstance temp = historyService.createHistoricProcessInstanceQuery().processInstanceId(procInstId).singleResult();
				ProcessInstanceDto instanceDto = ProcessInstanceDto.fromEntity(temp, formInstance);
				results.add(instanceDto);
				
			}
			
		}
		
		PageResponse<ProcessInstanceDto> pageResponse = new PageResponse<ProcessInstanceDto>(results);
		pageResponse.setSuccess(Boolean.TRUE);
		pageResponse.setTotal(results.size());

		return new ResponseEntity<PageResponse<ProcessInstanceDto>>(pageResponse, HttpStatus.OK);

	}

	/**
	 * 
	 */
	@RequestMapping(value = "/startForm", method = GET, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<PageResponse<FormInstance>> getStartForm(@RequestParam(value = "processDefinitionId", required = true) String processDefinitionId) {

		StartFormData startFormData = formService.getStartFormData(processDefinitionId);

		log.info("获取到流程{}的启动表单key:{}", processDefinitionId, startFormData.getFormKey());

		SysUser sysUser = sysUserRepository.getByLoginName(UserContext.getUsername());

		FormInstance formInstance;

		List<FormInstance> draftInstance = formInstanceRepository.findByDrafterIdAndProcessInstanceId(sysUser.getLoginName(), "DRAFT");
		if (draftInstance.isEmpty()) {
			formInstance = new FormInstance();
			formInstance.setProcessDefinitionId(processDefinitionId);
			formInstance.setProcessInstanceId("DRAFT");
			formInstance.setDrafterId(sysUser.getLoginName());
			formInstance.setDrafter(sysUser.getName());
			formInstance.setDraftOrg(sysUser.getCompanyId().toString());
			formInstance.setCreateDate(new Date());
			formInstanceRepository.save(formInstance);
		}
		else {
			formInstance = draftInstance.get(0);
			formInstance.setProcessDefinitionId(processDefinitionId);
			formInstance.setCreateDate(new Date());
			formInstanceRepository.save(formInstance);
		}

		List<FormInstance> results = new ArrayList<>();
		results.add(formInstance);

		PageResponse<FormInstance> pageResponse = new PageResponse<FormInstance>(results);
		pageResponse.setMessage("表单的配置数据");
		pageResponse.setSuccess(Boolean.TRUE);
		pageResponse.setTotal(results.size());

		return new ResponseEntity<PageResponse<FormInstance>>(pageResponse, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/taskForm", method = GET, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<Map<String, String>> getTaskForm(
			@RequestParam(value = "taskId", required = true) String taskId) throws IOException {

		Map<String, String> formModel = new HashMap<>();
		String formKey = formService.getTaskFormData(taskId).getFormKey();
		
		String getRenderedTaskForm = IOUtils.toString(resourceLoader.getResource("classpath:/forms/"+formKey+".json").getInputStream());
		
		log.info("根据FormKey:{},获取到的内容:{}",formKey,getRenderedTaskForm);
		
		formModel.put("metadata", getRenderedTaskForm);
		return new ResponseEntity<Map<String, String>>(formModel, HttpStatus.OK);

	}

	/**
	 * 启动流程
	 */
	@RequestMapping(value = "/processes", method = POST, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<PageResponse<FormInstance>> start(@RequestBody String json) {

		PageResponse<FormInstance> pageResponse = new PageResponse<FormInstance>(null);
		log.debug("Start Process For FormInstance : {}", json);
		TypeReference<List<FormInstance>> typeRef = new TypeReference<List<FormInstance>>() {
		};

		// 设置流程发起人的ID
		identityService.setAuthenticatedUserId(UserContext.getUsername());

		try {
			JsonNode root = objectMapper.readTree(json);
			JsonNode tempNode = root.get("data");

			if (tempNode.isArray()) {
				List<FormInstance> temps = objectMapper.convertValue(tempNode, typeRef);
				for (Iterator<FormInstance> ketIter = temps.iterator(); ketIter.hasNext();) {
					FormInstance tempObj = ketIter.next();
					//将FormInstance的ID设置为流程的BusinessKey
					ProcessInstance instance = runtimeService.startProcessInstanceById(tempObj.getProcessDefinitionId(),tempObj.getId().toString());
					tempObj.setProcessInstanceId(instance.getProcessInstanceId());
					
					SysUser sales = sysUserRepository.getByLoginName(tempObj.getSalesId());
					if(null != sales) {
						tempObj.setSales(sales.getName());
					}
					formInstanceRepository.save(tempObj);
				}
			}
			else {
				FormInstance tempObj = objectMapper.convertValue(tempNode, FormInstance.class);
				//将FormInstance的ID设置为流程的BusinessKey
				ProcessInstance instance = runtimeService.startProcessInstanceById(tempObj.getProcessDefinitionId(),tempObj.getId().toString());
				tempObj.setProcessInstanceId(instance.getProcessInstanceId());
				SysUser sales = sysUserRepository.getByLoginName(tempObj.getSalesId());
				if(null != sales) {
					tempObj.setSales(sales.getName());
				}
				formInstanceRepository.save(tempObj);
			}

			pageResponse.setSuccess(Boolean.TRUE);
			pageResponse.setMessage("Start Process Success");
			return new ResponseEntity<PageResponse<FormInstance>>(pageResponse, HttpStatus.OK);
		}
		catch (Exception e) {
			e.printStackTrace();
			pageResponse.setSuccess(Boolean.FALSE);
			pageResponse.setMessage("Start Process Failure");
			return new ResponseEntity<PageResponse<FormInstance>>(pageResponse, HttpStatus.OK);
		}

	}

	/**
	 * 完成待办
	 */
	@RequestMapping(value = "/complete", method = POST, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<PageResponse<FormInstance>> completeTask(@RequestBody String json) {

		PageResponse<FormInstance> pageResponse = new PageResponse<FormInstance>(null);
		log.debug("Complete Task For FormInstance : {}", json);
		TypeReference<List<FormInstance>> typeRef = new TypeReference<List<FormInstance>>() {
		};
		try {
			JsonNode root = objectMapper.readTree(json);
			JsonNode tempNode = root.get("data");
			if (tempNode.isArray()) {
				List<FormInstance> temps = objectMapper.convertValue(tempNode, typeRef);
				for (Iterator<FormInstance> ketIter = temps.iterator(); ketIter.hasNext();) {
					FormInstance tempObj = ketIter.next();
					formInstanceRepository.save(tempObj);
				}
			}
			else {
				FormInstance tempObj = objectMapper.convertValue(tempNode, FormInstance.class);
				formInstanceRepository.save(tempObj);
			}

			String taskId = root.get("taskId").asText();
			log.info("完成任务{}", taskId);
			taskService.complete(taskId);
			pageResponse.setSuccess(Boolean.TRUE);
			pageResponse.setMessage("Success Complete Task");
			return new ResponseEntity<PageResponse<FormInstance>>(pageResponse, HttpStatus.OK);
		}
		catch (Exception e) {
			e.printStackTrace();
			pageResponse.setSuccess(Boolean.FALSE);
			pageResponse.setMessage("Start Process Failure");
			return new ResponseEntity<PageResponse<FormInstance>>(pageResponse, HttpStatus.OK);
		}

	}

	@RequestMapping(value = "/getNavTree", method = GET, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<PageResponse<BaseTreeNode>> navTree() {

		String userName = UserContext.getUsername();
		Long myTasksNum = taskService.createTaskQuery().taskAssignee(userName).count();
		Long myGroupNum = 0L;
		List<String> roles = UserContext.getRoles();
		for (String role : roles) {
			myGroupNum += taskService.createTaskQuery().taskCandidateGroup(role).count();
		}
		
		Long myDoneNum = formInstanceRepository.countCompleteFormInstanceByAssignee(userName);
		
		Long myStartNum = 0L;
		
		//如果角色是销售经理,则获取本部门的所有发起的询价流程
		if(roles.contains("SALES_MANAGER")) {
			SysUser curUser = sysUserRepository.getByLoginName(UserContext.getUsername());
			if(null != curUser.getCompanyId() && 0 != curUser.getCompanyId()) {
				myStartNum = formInstanceRepository.countByCompanyId(curUser.getCompanyId());
			} else {
				myStartNum = formInstanceRepository.countByDrafterId(userName);
			}
			
		} else {			
			myStartNum = formInstanceRepository.countByDrafterId(userName);			
		}
		
		BaseTreeNode myTask = new BaseTreeNode("MY", String.format("待处理(%d)",myTasksNum), true, myTasksNum > 0 ? "new-icon" : "",myTasksNum > 0 ? "ux-desktop-black" : "","");
		BaseTreeNode myGroup = new BaseTreeNode("GROUP", String.format("待认领(%d)",myGroupNum), true, myGroupNum > 0 ? "new-icon" : "",myTasksNum > 0 ? "ux-desktop-black" : "","");
		BaseTreeNode myDone = new BaseTreeNode("DONE", String.format("已处理(%d)",myDoneNum), true, "","","");
		BaseTreeNode myStart = new BaseTreeNode("BYME", String.format("由我发起(%d)",myStartNum), true, "","","");
		
		List<BaseTreeNode> navtree = new ArrayList<>();
		navtree.add(myTask);
		navtree.add(myGroup);
		navtree.add(myDone);
		navtree.add(myStart);
		
		PageResponse<BaseTreeNode> pageResponse = new PageResponse<BaseTreeNode>(navtree);
		pageResponse.setSuccess(Boolean.TRUE);
		pageResponse.setTotal(navtree.size());
		
		return ResponseEntity.ok().body(pageResponse);
	}
	
	
	@RequestMapping(value = "/getProcessAdminNavTree", method = GET, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<PageResponse<BaseTreeNode>> processAdminNavTree() {

		List<BaseTreeNode> navtree = new ArrayList<>();
		//获取所有流程
		List<ProcessDefinition> definitions = repositoryService.createProcessDefinitionQuery().latestVersion().list();
		for (ProcessDefinition processDefinition : definitions) {
		
			String processKey = processDefinition.getKey();
			long processInstanceCount =  historyService.createHistoricProcessInstanceQuery().processDefinitionKey(processKey).count();
			
			BaseTreeNode procesNode = new BaseTreeNode(processDefinition.getKey(),processDefinition.getName() + "(" + processInstanceCount + ")", true, "", "", "");
			
			navtree.add(procesNode);
		}
		
		PageResponse<BaseTreeNode> pageResponse = new PageResponse<BaseTreeNode>(navtree);
		pageResponse.setSuccess(Boolean.TRUE);
		pageResponse.setTotal(navtree.size());
		
		return ResponseEntity.ok().body(pageResponse);
	}
	
	/**
	 * 获取待办
	 */
	@RequestMapping(value = "/tasks", method = GET, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<List<TaskInstance>> listTasks(@RequestParam(value = "assignment", required = false) String assignment) {

		List<Task> tasks = new ArrayList<>();

		List<FormInstance> historyFormInstances = new ArrayList<>();

		String userName = UserContext.getUsername();
		switch (assignment) {
		case "MY":
			tasks = taskService.createTaskQuery().taskAssignee(userName).list();
			break;
		case "GROUP":
			List<String> roles = UserContext.getRoles();
			for (String role : roles) {
				tasks.addAll(taskService.createTaskQuery().taskCandidateGroup(role).list());
			}
			break;
		case "DONE":
			historyFormInstances = formInstanceRepository.findCompleteFormInstanceByAssignee(userName);
			break;
		case "BYME":
			//如果角色是销售经理,则获取本部门的所有发起的询价流程
			if(UserContext.getRoles().contains("SALES_MANAGER")) {
				SysUser curUser = sysUserRepository.getByLoginName(userName);
				if(null != curUser.getCompanyId() && 0 != curUser.getCompanyId()) {
					historyFormInstances = formInstanceRepository.findByCompanyId(curUser.getCompanyId());
				} else {
					historyFormInstances = formInstanceRepository.findByDrafter(userName);
				}
			} else {	
				historyFormInstances = formInstanceRepository.findByDrafter(userName);
			}
			
			
			break;
		default:
			break;
		}

		List<TaskInstance> mytasks = new ArrayList<>();
		for (Task task : tasks) {
			log.info("获取到的事项:{}",task);
			
			FormInstance formInstance = formInstanceRepository.findOneByProcessInstanceId(task.getProcessInstanceId());
			if(null != formInstance) {
				TaskInstance tempTask = new TaskInstance(task);
				tempTask.setTitle(formInstance.getTitle());
				tempTask.setFormInstanceId(formInstance.getId());
				mytasks.add(tempTask);				
			} else {
				taskService.setAssignee(task.getId(),"");
				log.error("任务:{},没有对应的FormInstance,需要排查原因.",task.getProcessInstanceId());
			}
		}

		for (FormInstance formInstance : historyFormInstances) {

			TaskInstance tempTask = new TaskInstance();
			/**
			 * 获取流程名称
			 */
			ProcessDefinition processDefinition = repositoryService.getProcessDefinition(formInstance.getProcessDefinitionId());
			if (null != processDefinition) {
				tempTask.setProcessDefinitionName(processDefinition.getName());
			}

			/**
			 * 获取当前流程的办理环节
			 */
			List<HistoricTaskInstance> historicTaskInstances = historyService.createHistoricTaskInstanceQuery()
					.processInstanceId(formInstance.getProcessInstanceId()).orderByHistoricTaskInstanceEndTime().desc().list();
			if (!historicTaskInstances.isEmpty()) {
				HistoricTaskInstance lastTask = historicTaskInstances.get(0);
				tempTask.setAssignee(lastTask.getAssignee());
				tempTask.setDescription(lastTask.getDescription());
				tempTask.setExecutionId(lastTask.getExecutionId());
				tempTask.setId(lastTask.getId());
				tempTask.setName(lastTask.getName());
				tempTask.setOwner(lastTask.getOwner());
				tempTask.setParentTaskId(lastTask.getParentTaskId());
				tempTask.setProcessDefinitionId(lastTask.getProcessDefinitionId());
				tempTask.setProcessInstanceId(lastTask.getProcessInstanceId());
				tempTask.setCreateTime(lastTask.getStartTime());
				tempTask.setDueDate(lastTask.getDueDate());
				tempTask.setPriority(lastTask.getPriority());
				tempTask.setEndDate(lastTask.getEndTime());
				tempTask.setTaskDefinitionKey(lastTask.getTaskDefinitionKey());
			}

			tempTask.setTitle(formInstance.getTitle());
			tempTask.setFormInstanceId(formInstance.getId());
			mytasks.add(tempTask);
		}

		return ResponseEntity.ok().body(mytasks);
	}

	@RequestMapping(value = "/claim", method = GET, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<String> claim(@RequestParam(value = "taskId", required = true) String taskId) {
		String userName = UserContext.getUsername();
		log.info("{}接收待办事项{}", userName, taskId);
		taskService.claim(taskId, userName);
		return ResponseEntity.ok().body("{success:true}");
	}

	@RequestMapping(value = "/history", method = GET, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<PageResponse<HistoricActivityInstanceDto>> history(
			@RequestParam(value = "processInstanceId", required = true) String processInstanceId
			,@RequestParam(value = "ignoreStep", required = false, defaultValue="false") Boolean ignoreStep) {
		log.info("流程办理情况{}", processInstanceId);

		List<HistoricActivityInstance> hais = historyService.createNativeHistoricActivityInstanceQuery()
				.sql("SELECT * FROM ACT_HI_ACTINST T WHERE T.PROC_INST_ID_ = #{processInstanceId} ORDER BY T.SEQUENCE_COUNTER_ DESC")
				.parameter("processInstanceId", processInstanceId).list();
		List<HistoricActivityInstanceDto> results = new ArrayList<>();
		for (HistoricActivityInstance historicActivityInstance : hais) {
			HistoricActivityInstanceDto temp = HistoricActivityInstanceDto.fromHistoricActivityInstance(historicActivityInstance);

			// Gateway类型的环节不显示
			if (!temp.getActivityType().contains("Gateway") 
					&& !temp.getActivityType().contains("multiInstanceBody") 
					&& !temp.getActivityType().contains("subProcess")
					&& !temp.getActivityType().contains("serviceTask")) {
				if (!StringUtils.isEmpty(temp.getAssignee())) {
					SysUser sysUser = sysUserRepository.getByLoginName(temp.getAssignee());
					if (null != sysUser) {
						temp.setAssignee(sysUser.getName());
					}
				}

				//对于销售流程发起人,至查看启动和结束两个环节
				if(ignoreStep) {
					if((temp.getActivityType().contains("EndEvent") || temp.getActivityType().contains("startEvent")) && !temp.getParentActivityInstanceId().contains("sub_flow")) {
						results.add(temp);
					}
					
				} else {
					results.add(temp);					
				}
			}
		}

		FormInstance formInstance = formInstanceRepository.findOneByProcessInstanceId(processInstanceId);
		if(null != formInstance) {
			log.info("根据流程ID{},查询到的发起人{}", processInstanceId, formInstance.getDrafterId());
			SysUser drafer = sysUserRepository.getByLoginName(formInstance.getDrafterId());
			results.get(results.size() - 1).setAssignee(drafer.getName());
		}
		PageResponse<HistoricActivityInstanceDto> pageResponse = new PageResponse<HistoricActivityInstanceDto>(results);

		pageResponse.setSuccess(Boolean.TRUE);
		pageResponse.setTotal(results.size());
		pageResponse.setMessage("Get History Success");
		return new ResponseEntity<PageResponse<HistoricActivityInstanceDto>>(pageResponse, HttpStatus.OK);
	}

	@PostMapping("/upload")
	public ResponseEntity<PageResponse> deploy(@RequestParam("file") MultipartFile file) throws IOException {
		try {
			storageService.store(file);
			PageResponse pageResponse = new PageResponse(null);
			pageResponse.setSuccess(true);

			String resourceName = file.getOriginalFilename();
			repositoryService.createDeployment().addInputStream(resourceName, file.getInputStream()).deploy();

			return new ResponseEntity<PageResponse>(pageResponse, HttpStatus.OK);
		}
		catch (StorageException se) {
			PageResponse pageResponse = new PageResponse(null);
			pageResponse.setSuccess(false);
			pageResponse.setMessage(se.getMessage());
			return new ResponseEntity<PageResponse>(pageResponse, HttpStatus.OK);
		}
	}
	
	@RequestMapping(value = "/deleteProcessDefinition", method = GET, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<PageResponse<FormInstance>> deleteDeploy(@RequestParam(value = "processDefinitionId", required = true) String processDefinitionId
			,@RequestParam(value = "cascade", required = false, defaultValue= "false") Boolean cascade) {

		log.warn("危险操作：删除流程定义{}",processDefinitionId);
		List<FormInstance> formInstance = formInstanceRepository.findByProcessDefinitionId(processDefinitionId);
		for (FormInstance temp : formInstance) {
			formInstanceRepository.delete(temp);
		}
		
		repositoryService.deleteProcessDefinition(processDefinitionId, cascade);
		
		
		PageResponse<FormInstance> pageResponse = new PageResponse<FormInstance>(null);
		pageResponse.setMessage("成功删除流程定义" + processDefinitionId);
		pageResponse.setSuccess(Boolean.TRUE);
		pageResponse.setTotal(0);

		return new ResponseEntity<PageResponse<FormInstance>>(pageResponse, HttpStatus.OK);
	}
}
