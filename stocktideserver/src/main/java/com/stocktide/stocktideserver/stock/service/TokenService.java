package com.stocktide.stocktideserver.stock.service;

import com.stocktide.stocktideserver.stock.entity.Token;
import com.stocktide.stocktideserver.stock.repository.TokenRepository;
import jakarta.transaction.Transactional;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@Transactional
@Slf4j
public class TokenService {

    // postman 로 새로운 발급시 (요청시 X) database의 expired에 갱신이 안되기 때문에 오류가 난다.

    private final TokenRepository tokenRepository;
    private final RestTemplate restTemplate;

    public TokenService(RestTemplate restTemplate, TokenRepository tokenRepository) {
        this.restTemplate = restTemplate;
        this.tokenRepository = tokenRepository;
    }

    @Getter
    @Value("${token.app-key}")
    private String APP_KEY;

    @Getter
    @Value("${token.app-secret}")
    private String APP_SECRET;

    @Getter
    @Value("${stock-url.token}")
    private String TOKEN_URL;



    public String getAccessToken() {
        log.info("---------------getAccessToken  started----------------------------------------");
        log.info("---------------tokenVerification : {}----------------------------------------", tokenVerification());

        // 만료 되지 않았을 경우
        if(tokenVerification()) {

            Optional<Token> token = tokenRepository.findById(1L);
            log.info("--------------- token : {}----------------------------------------", token.get().getToken());

            return token.get().getToken();

        }
        // 만료 되었을 경우
        else {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            Map<String, String> body = new HashMap<>();
            body.put("grant_type", "client_credentials");
            body.put("appkey", APP_KEY);
            body.put("appsecret", APP_SECRET);

            HttpEntity<Map<String, String>> request = new HttpEntity<>(body, headers);

            ResponseEntity<Map> response = restTemplate.postForEntity(TOKEN_URL, request, Map.class);

            Optional<Token> token = tokenRepository.findById(1L);

            if(token.isEmpty()) {
                Token newToken = new Token();

                newToken.setTokenId(1L);
                newToken.setToken(response.getBody().get("access_token").toString());
                newToken.setExpired(LocalDateTime.now().plusDays(1));

                tokenRepository.save(newToken);
                log.info("--------------- isEmpty tokenRepository.save  {}----------------------------------------", newToken.getToken());

            }
            else {
                token.get().setToken(response.getBody().get("access_token").toString());
                token.get().setExpired(LocalDateTime.now().plusDays(1));

                tokenRepository.save(token.get());

                log.info("--------------- isNotEmpty tokenRepository.save  {}----------------------------------------", token.get().getToken());

            }
            log.info("---------------getAccessToken  finished----------------------------------------");

            return response.getBody().get("access_token").toString();
        }
    }

    public boolean tokenVerification() {
        LocalDateTime currentDateTime = LocalDateTime.now();
        Optional<Token> token = tokenRepository.findById(1L);

        // 토큰이 비어있거나, 현재 시간이 토큰 유효시간보다 뒤에 있을 때(만료 됨)
        return token.isPresent() && !currentDateTime.isAfter(token.get().getExpired());
    }
}
