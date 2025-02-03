package com.stocktide.stocktideserver.formatter;

import org.springframework.format.Formatter;

import java.text.ParseException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

public class TokenExpireFormatter implements Formatter<LocalDateTime> {

    private static final String DATE_TIME_PATTERN = "yyyy-MM-dd HH:mm:ss";
    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern(DATE_TIME_PATTERN);

    // 문자열 -> LocalDateTime
    @Override
    public LocalDateTime parse(String text, Locale locale) throws ParseException {
        return LocalDateTime.parse(text, formatter);
    }

    // LocalDateTime -> 문자열
    @Override
    public String print(LocalDateTime object, Locale locale) {
        return formatter.format(object);
    }
}