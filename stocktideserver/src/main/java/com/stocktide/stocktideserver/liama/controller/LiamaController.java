package com.stocktide.stocktideserver.liama.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stocktide.stocktideserver.liama.dto.LiamaQueryDto;
import com.stocktide.stocktideserver.liama.service.LiamaService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/liama")
@Slf4j
@Tag(name = "Liama AI", description = "Liama AI 질의 API")
public class LiamaController {

    @Autowired
    private LiamaService liamaService;

    @PostMapping("/ask")
    @Operation(summary = "Liama AI에 질문", description = "Liama AI에 질의하고 결과를 반환합니다.")
    public ResponseEntity<String> askLiama(@RequestBody LiamaQueryDto queryDto) {
        log.info("Liama 질의: {}", queryDto.getQuery());
        String response = liamaService.getLiamaResponse(queryDto.getQuery());
        return ResponseEntity.ok(response);
    }
}