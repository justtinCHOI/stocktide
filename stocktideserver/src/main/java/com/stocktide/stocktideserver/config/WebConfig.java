//package com.stocktide.stocktideserver.config;
//
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.servlet.config.annotation.CorsRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//
//@Configuration
//public class WebConfig implements WebMvcConfigurer {
//    @Override
//    public void addCorsMappings(CorsRegistry registry) {
//        registry.addMapping("/**")
////                .allowedOrigins("http://localhost:5173")  // Vite 개발서버 포트
//                .allowedOrigins("https://stocktide.store", "https://www.stocktide.store")
//                .allowedMethods("*")
//                .allowedHeaders("*")
//                .allowCredentials(true) // 추가
//                .maxAge(3600); //
//    }
//}