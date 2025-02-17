package com.stocktide.stocktideserver.liama.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stocktide.stocktideserver.liama.dto.LiamaQueryDto;
import com.stocktide.stocktideserver.liama.service.LiamaService;


import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/liama")
public class LiamaController {
    private final LiamaService liamaService;
    private final WebClient webClient;

    @Autowired
    public LiamaController(LiamaService liamaService, WebClient.Builder webClientBuilder) {
        this.liamaService = liamaService;
        this.webClient = webClientBuilder
                .baseUrl("http://localhost:8300")  // Liama API 서버 주소
                .build();
    }

    @PostMapping("/ask")
    public Mono<String> askLiama(@RequestBody LiamaQueryDto queryDto) {
        return webClient.post()
                .uri("/ask")
                .bodyValue(queryDto)
                .retrieve()
                .bodyToMono(String.class);
    }
}