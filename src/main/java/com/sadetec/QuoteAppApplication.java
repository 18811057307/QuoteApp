package com.sadetec;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.core.task.TaskExecutor;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import com.sadetec.service.StorageProperties;

@SpringBootApplication
@EnableConfigurationProperties(StorageProperties.class)
public class QuoteAppApplication {
	
    protected static final Logger logger = LoggerFactory.getLogger(QuoteAppApplication.class);
    
	public static void main(String[] args) {
		SpringApplication.run(QuoteAppApplication.class, args);
	}
}
