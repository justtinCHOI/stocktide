package com.stocktide.stocktideserver.stock.service;

import com.stocktide.stocktideserver.formatter.TokenExpireFormatter;
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

import java.text.ParseException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;

/**
 * 한국투자증권 API 토큰 관리 서비스
 *
 * API 접근을 위한 인증 토큰을 발급, 검증, 갱신하는 핵심 서비스입니다.
 * 토큰의 만료 시간을 추적하고 필요에 따라 새로운 토큰을 발급합니다.
 *
 * @author StockTide Dev Team
 * @version 1.0
 * @since 2025-02-03
 */
@Service
@Transactional
@Slf4j
public class TokenService {

    // postman 로 새로운 발급시 (요청시 X) database의 expired에 갱신이 안되기 때문에 오류가 난다.

    private final TokenRepository tokenRepository;
    private final RestTemplate restTemplate;
    private final TokenExpireFormatter tokenExpireFormatter = new TokenExpireFormatter();

    /**
     * 토큰 서비스 생성자
     *
     * 토큰 저장소와 REST 통신을 위한 RestTemplate을 초기화합니다.
     *
     * @param restTemplate HTTP 통신을 위한 RestTemplate
     * @param tokenRepository 토큰 정보 저장을 위한 리포지토리
     */
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

    /**
     * 유효한 액세스 토큰을 조회하거나 발급합니다.
     *
     * 다음과 같은 토큰 관리 로직을 수행합니다:
     * 1. 기존 토큰의 유효성 검사
     * 2. 유효한 경우 기존 토큰 반환
     * 3. 만료된 경우 새로운 토큰 발급 및 저장
     *
     * @return 유효한 액세스 토큰 문자열
     * @throws RuntimeException 토큰 발급 과정에서 오류 발생 시
     */
    public String getAccessToken() {
        log.info("---------------getAccessToken started----------------------------------------");

        // 기존 토큰 유효성 검증
        if(tokenVerification()) {
            Optional<Token> token = tokenRepository.findById(1L);
            log.info("--------------- existing token : {}----------------------------------------", token.get().getToken());
            return token.get().getToken();
        }

        // 토큰 재발급 프로세스
        return issueNewAccessToken();
    }


    /**
     * 현재 저장된 토큰의 유효성을 검증합니다.
     *
     * 토큰이 존재하고 만료 시간이 현재 시간보다 이후인지 확인합니다.
     *
     * @return 토큰 유효성 (true: 유효, false: 만료)
     */
    public boolean tokenVerification() {
        LocalDateTime currentDateTime = LocalDateTime.now();
        Optional<Token> token = tokenRepository.findById(1L);

        // 토큰이 비어있거나, 현재 시간이 토큰 유효시간보다 뒤에 있을 때(만료 됨)
        return token.isPresent() && !currentDateTime.isAfter(token.get().getExpired());
    }


    /**
     * API로부터 받은 만료 시간 문자열을 LocalDateTime으로 변환합니다.
     *
     * 토큰의 만료 시간을 파싱하며, 파싱 실패 시 기본값을 반환합니다.
     *
     * @param expireTimeStr API로부터 받은 만료 시간 문자열
     * @return 파싱된 LocalDateTime 또는 기본 만료 시간
     */
    public LocalDateTime formateTokenExpire(String expireTimeStr) {
        try {
            return tokenExpireFormatter.parse(expireTimeStr, Locale.getDefault());
        } catch (ParseException e) {
            log.error("Failed to parse expire time: {}", expireTimeStr);
            return LocalDateTime.now().plusDays(1);
        }

    }

    /**
     * 새로운 액세스 토큰을 발급합니다.
     *
     * OAuth 2.0 클라이언트 자격증명 방식으로 새로운 토큰을 요청하고
     * 데이터베이스에 저장합니다.
     *
     * @return 새로 발급된 액세스 토큰
     * @throws RuntimeException 토큰 발급 중 오류 발생 시
     */
    private String issueNewAccessToken() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, String> body = new HashMap<>();
        body.put("grant_type", "client_credentials");
        body.put("appkey", APP_KEY);
        body.put("appsecret", APP_SECRET);

        HttpEntity<Map<String, String>> request = new HttpEntity<>(body, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity(TOKEN_URL, request, Map.class);

        return processAndSaveNewToken(response);
    }

    /**
     * 새로 발급된 토큰을 처리하고 저장합니다.
     *
     * @param response API 응답 엔티티
     * @return 새로 발급된 액세스 토큰
     */
    private String processAndSaveNewToken(ResponseEntity<Map> response) {
        Optional<Token> token = tokenRepository.findById(1L);
        String accessToken = response.getBody().get("access_token").toString();
        String expireTimeStr = response.getBody().get("access_token_token_expired").toString();

        if (token.isEmpty()) {
            Token newToken = createNewToken(accessToken, expireTimeStr);
            tokenRepository.save(newToken);
        } else {
            updateExistingToken(token.get(), accessToken, expireTimeStr);
        }

        return accessToken;
    }

    /**
     * 새로운 토큰 엔티티를 생성합니다.
     *
     * @param accessToken 액세스 토큰
     * @param expireTimeStr 만료 시간 문자열
     * @return 새로 생성된 Token 엔티티
     */
    private Token createNewToken(String accessToken, String expireTimeStr) {
        Token newToken = new Token();
        newToken.setTokenId(1L);
        newToken.setToken(accessToken);
        newToken.setExpired(formateTokenExpire(expireTimeStr));
        return newToken;
    }

    /**
     * 기존 토큰 엔티티를 업데이트합니다.
     *
     * @param existingToken 기존 토큰 엔티티
     * @param accessToken   새로운 액세스 토큰
     * @param expireTimeStr 만료 시간 문자열
     */
    private void updateExistingToken(Token existingToken, String accessToken, String expireTimeStr) {
        existingToken.setToken(accessToken);
        existingToken.setExpired(formateTokenExpire(expireTimeStr));
        tokenRepository.save(existingToken);
    }
}
