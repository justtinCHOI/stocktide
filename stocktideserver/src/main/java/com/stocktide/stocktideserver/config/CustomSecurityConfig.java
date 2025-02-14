package com.stocktide.stocktideserver.config;

import com.stocktide.stocktideserver.security.filter.JWTCheckFilter;
import com.stocktide.stocktideserver.security.handler.APILoginFailHandler;
import com.stocktide.stocktideserver.security.handler.APILoginSuccessHandler;
import com.stocktide.stocktideserver.security.handler.CustomAccessDeniedHandler;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@Log4j2
@RequiredArgsConstructor
@EnableMethodSecurity
public class CustomSecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable);

        // Swagger UI 경로 허용 추가
        http.authorizeHttpRequests(authz -> authz
                .requestMatchers(
                        "/v3/api-docs/**",
                        "/swagger-ui/**",
                        "/swagger-ui.html",
                        "/api/**"
                ).permitAll()

//                // Swagger UI 관련
//                .requestMatchers(
//                        "/v3/api-docs/**",
//                        "/swagger-ui/**",
//                        "/swagger-ui.html"
//                ).permitAll()
//
//                // 회원 관련 API
//                .requestMatchers("/api/member/**").permitAll()
//
//                // 주식 관련 Public API
//                .requestMatchers(
//                        "/api/company/**",
//                        "/api/stock/**",
//                        "/api/kospi/**"
//                ).permitAll()
//
//                // WebSocket 엔드포인트
//                .requestMatchers(
//                        "/ws-stocktide/**",
//                        "/topic/**",
//                        "/app/**"
//                ).permitAll()
//
//                // JWT 인증이 필요한 API
//                .requestMatchers(
//                        "/api/cash/**",         // 계좌 관련
//                        "/api/my/**",           // 마이페이지 관련
//                        "/api/stockorder/**",   // 주문 관련
//                        "/api/long-polling/**",    //
//                        "/api/stockholds/**"    // 보유주식 관련
//                ).authenticated()

                // 기본 설정
                .anyRequest().authenticated()
        );

        http.cors(httpSecurityCorsConfigurer -> {
            httpSecurityCorsConfigurer.configurationSource(corsConfigurationSource());
        });
        http.sessionManagement(httpSecuritySessionManagementConfigurer ->
        {
            httpSecuritySessionManagementConfigurer.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        });
        http.formLogin(config -> {
//            config.loginPage("/api/member/login");
//            config.successHandler(new APILoginSuccessHandler());
//            config.failureHandler(new APILoginFailHandler());
            config.loginProcessingUrl("/api/member/login") // 벡엔드 로그인 처리 URL
                    .loginPage("/member/login") // 프론트엔드 로그인 페이지 경로
                    .successHandler(new APILoginSuccessHandler())
                    .failureHandler(new APILoginFailHandler());
        });
        http.addFilterBefore(new JWTCheckFilter(), UsernamePasswordAuthenticationFilter.class);
        http.exceptionHandling(config -> {
            config.accessDeniedHandler(new CustomAccessDeniedHandler());
        });
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
//        configuration.setAllowedOrigins(List.of("https://localhost:5173"));
        configuration.setAllowedOriginPatterns(List.of("*")); // 모든 출처 허용
//        configuration.setAllowedOrigins(Arrays.asList(
//                "https://stocktide.store",
//                "https://www.stocktide.store"
//        ));
        configuration.setAllowedMethods(Arrays.asList("HEAD", "GET", "POST", "PUT", "DELETE", "PATCH"));
        configuration.setAllowedHeaders(Arrays.asList(
                "Authorization",
                "Cache-Control",
                "Content-Type",
                "Origin",
                "Accept",
                "X-Requested-With"
        ));
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
