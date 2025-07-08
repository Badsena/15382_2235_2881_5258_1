package com.example.demo;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("https://3000.vs.amypo.com")  // Make sure only this one origin is allowed
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")  // Explicitly list allowed HTTP methods
                .allowedHeaders("*")  // Allow all headers, can be more restrictive
                .allowCredentials(true);  // Allow credentials if required (cookies, etc.)
    }
}
