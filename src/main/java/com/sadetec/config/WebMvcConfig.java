package com.sadetec.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * Config the welcome page.
 * @author gtqin
 *
 */

@Configuration
public class WebMvcConfig extends WebMvcConfigurerAdapter implements WebMvcConfigurer {

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
//        registry.addViewController("/").setViewName("forward:/index.html");
//        registry.setOrder(Ordered.HIGHEST_PRECEDENCE);
//        super.addViewControllers(registry);
//        registry.addViewController("/index").setViewName("index");
//        registry.addViewController("/").setViewName("index");
        registry.addViewController("/login").setViewName("login");
    }
}
