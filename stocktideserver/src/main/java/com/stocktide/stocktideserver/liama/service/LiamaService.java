package com.stocktide.stocktideserver.liama.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.stocktide.stocktideserver.liama.entity.LiamaResult;
import com.stocktide.stocktideserver.liama.repository.LiamaResultRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class LiamaService {

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private LiamaResultRepository liamaResultRepository;

    @Value("${liama.api.url}")
    private String liamaApiUrl;

    public String getLiamaResponse(String query) {
        try {
            ResponseEntity<String> response = restTemplate.postForEntity(
                    liamaApiUrl + "/ask",
                    query,
                    String.class
            );

            LiamaResult result = new LiamaResult();
            result.setMarkdown(response.getBody());
            result.setQuery(query);
            liamaResultRepository.save(result);

            return response.getBody();
        } catch (Exception e) {
            log.error("Liama API 호출 중 오류 발생", e);
            return "죄송합니다. 현재 AI 서비스를 이용할 수 없습니다.";
        }
    }
}