package com.stocktide.stocktideserver.config;

import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import io.swagger.v3.oas.models.servers.Server;

import java.util.List;

@Configuration
@SecurityScheme(
        name = "bearerAuth",
        type = SecuritySchemeType.HTTP,
        bearerFormat = "JWT",
        scheme = "bearer"
)
public class SwaggerConfig {

    @Bean
    public OpenAPI stockTideOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("StockTide API Documentation")
                        .description("StockTide 서비스의 API 문서")
                        .version("1.0.0")
                        .license(new License()
                                .name("Apache 2.0")
                                .url("http://springdoc.org")))
                .externalDocs(new ExternalDocumentation()
                        .description("JavaDoc 문서 보기")
                        .url("/javadoc/index.html"))
                .servers(List.of(
                        new Server().url("https://www.stocktide.store"),
                        new Server().url("http://localhost:8080")
                ));

    }
}