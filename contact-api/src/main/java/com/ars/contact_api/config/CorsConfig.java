package com.ars.contact_api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.List;

@Configuration
public class CorsConfig {


    @Bean
    public CorsFilter corsFilter() {
        var urlBasedCorsConfigSource = new UrlBasedCorsConfigurationSource();
        var corsConfig = new CorsConfiguration();
        corsConfig.setAllowCredentials(true);
        corsConfig.setAllowedOrigins(List.of("http://localhost:5173"));
        corsConfig.setAllowedHeaders(List.of(
                "Origin",
                "Access-Control-Request-Method",
                "Access-Control-Request-Headers",
                "Content-Type",
                "Authorization"
        ));
        corsConfig.setExposedHeaders(List.of("Authorization", "Content-Type"));

        corsConfig.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        urlBasedCorsConfigSource.registerCorsConfiguration("/**", corsConfig);
        return new CorsFilter(urlBasedCorsConfigSource);


    }
}
