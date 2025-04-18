package com.personalfinance.personal_finance_app.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
        .allowedOrigins(
            "http://localhost:8081",
            "https://personal-finance-app-production-693d.up.railway.app"
        
        )
        .allowedMethods("GET", "POST", "PUT", "DELETE")  
        .allowedHeaders("*");  
    }


}
