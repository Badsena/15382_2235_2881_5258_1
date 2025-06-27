package com.example.demo;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.RedirectViewControllerRegistration;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    // Example: CORS configuration (optional)
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("https://3000.vs.amypo.com")
                .allowedMethods("*")
                .allowedHeaders("*");
    }

    // Example: Redirect HTTP to HTTPS (Spring-side, optional if behind IIS)
    // Only needed if you're handling HTTP directly in Spring Boot
    // Otherwise, do this in IIS web.config instead.
    /*
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        RedirectViewControllerRegistration r = registry.addRedirectViewController("http://{path}", "https://3000.vs.amypo.com/{path}");
        r.setKeepQueryParams(true);
    }
    */

}
