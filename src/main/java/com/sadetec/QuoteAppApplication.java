package com.sadetec;

import java.util.List;

import org.camunda.bpm.engine.RepositoryService;
import org.camunda.bpm.engine.RuntimeService;
import org.camunda.bpm.engine.TaskService;
import org.camunda.bpm.engine.task.Task;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.sadetec.service.StorageProperties;

@SpringBootApplication
@EnableConfigurationProperties(StorageProperties.class)
public class QuoteAppApplication {
	
    protected static final Logger logger = LoggerFactory.getLogger(QuoteAppApplication.class);
    
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
    
	public static void main(String[] args) {
		SpringApplication.run(QuoteAppApplication.class, args);
	}
	
	/**
	@Bean
    public CommandLineRunner init(final RepositoryService repositoryService,
                                  final RuntimeService runtimeService,
                                  final TaskService taskService) {

        return new CommandLineRunner() {
            @Override
            public void run(String... strings) throws Exception {
                System.out.println("Number of process definitions : "
                	+ repositoryService.createProcessDefinitionQuery().count());
                System.out.println("Number of tasks : " + taskService.createTaskQuery().count());
                //runtimeService.startProcessInstanceByKey("sales_order_process");
                System.out.println("Number of tasks after process start: "
                    + taskService.createTaskQuery().count());
                System.out.println("Number of tasks assign to PURCHASE_ADMIN: "
                        + taskService.createTaskQuery().taskCandidateGroup("PURCHASE_ADMIN").count());
                List<Task> groupTask = taskService.createTaskQuery().taskCandidateGroup("PURCHASE_ADMIN").list();
                for (Task task : groupTask) {
					System.out.println(task.getName());
					taskService.claim(task.getId(), "admin");
				}
            }
        };
    }
    **/
	
}
