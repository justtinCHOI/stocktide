package com.stocktide.stocktideserver.config;

import com.stocktide.stocktideserver.formatter.LocalDateFormatter;
import com.stocktide.stocktideserver.formatter.LocalDateTimeFormatter;
import com.stocktide.stocktideserver.formatter.TokenExpireFormatter;
import lombok.extern.log4j.Log4j2;
import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@Log4j2
public class CustomServletConfig implements WebMvcConfigurer {

    @Override
    public void addFormatters(FormatterRegistry registry) {
        registry.addFormatter(new LocalDateFormatter());
        registry.addFormatter(new LocalDateTimeFormatter());
        registry.addFormatter(new TokenExpireFormatter());
    }

}

