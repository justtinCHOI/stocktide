package com.stocktide.stocktideserver.member.controller;

import com.stocktide.stocktideserver.util.CustomJWTException;
import com.stocktide.stocktideserver.util.JWTUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * JWT 토큰 갱신을 담당하는 컨트롤러
 * Access Token과 Refresh Token의 갱신을 처리합니다.
 *
 * @author StockTide Dev Team
 * @version 1.0
 * @since 2025-02-03
 */
@RestController
@RequiredArgsConstructor
@Log4j2
@Tag(name = "Token", description = "토큰 갱신 API")
public class APIRefreshController {

    /**
     * 토큰을 갱신합니다.
     * Access Token이 만료된 경우 새로운 Access Token을 발급합니다.
     * Refresh Token이 만료된 경우 새로운 Refresh Token을 발급합니다.
     *
     * @param authHeader Authorization 헤더 (Bearer 토큰)
     * @param refreshToken 리프레시 토큰
     * @return 새로운 토큰 정보
     * @throws CustomJWTException 토큰이 유효하지 않은 경우
     */
    @Operation(summary = "토큰 갱신", description = "Access Token과 Refresh Token을 갱신합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "토큰 갱신 성공"),
            @ApiResponse(responseCode = "400", description = "유효하지 않은 토큰"),
            @ApiResponse(responseCode = "401", description = "만료된 토큰")
    })
    @RequestMapping("/api/member/refresh")
    public Map<String, Object> refresh(@RequestHeader("Authorization") String authHeader, String refreshToken) {
        // 해더 ->  accessToken 을 얻고, 매개변수 -> refreshToken
        log.info("refresh authHeader: " + authHeader);
        log.info("refresh refreshToken: " + refreshToken);

        if (refreshToken == null) {
            throw new CustomJWTException("NULL_REFRASH");
        }

        if (authHeader == null || authHeader.length() < 7) {
            throw new CustomJWTException("INVALID_STRING");
        }

        String accessToken = authHeader.substring(7);

        // Access 토큰이 만료되지 않았다면 그대로 반환
        if (!checkExpiredToken(accessToken)) {
            log.info("accessToken is not expired");
            return Map.of("accessToken", accessToken, "refreshToken", refreshToken);
        }
        log.info("accessToken is expired");

        Map<String, Object> claims = JWTUtil.validateToken(refreshToken);

        // refreshToken 의 claims 으로써 accessToken 생성
        String newAccessToken = JWTUtil.generateToken(claims, 10);
        log.info("accessToken is generated: " + newAccessToken);

        log.info("exp: " + claims.get("exp"));

        String newRefreshToken;
        // refreshToken 만료에 가까워지면 새로운 refreshToken 생성
        if(checkTime((Integer) claims.get("exp"))){
            newRefreshToken = JWTUtil.generateToken(claims, 60 * 24);
            log.info("refreshToken is generated: " + newRefreshToken);
        }
        newRefreshToken = refreshToken;

        return Map.of("accessToken", newAccessToken, "refreshToken", newRefreshToken);
    }

    //시간이 1시간 미만으로 남았다면
    private boolean checkTime(Integer exp) {

        //JWT exp를 날짜로 변환
        java.util.Date expDate = new java.util.Date((long) exp * (1000));

        //현재 시간과의 차이 계산 - 밀리세컨즈
        long gap = expDate.getTime() - System.currentTimeMillis();

        //분단위 계산
        long leftMin = gap / (1000 * 60);

        //1시간도 안남았는지..
        return leftMin < 60;
    }

    private boolean checkExpiredToken(String token) {

        try {
            JWTUtil.validateToken(token);
            //오류가 안뜨면 false, Expired 오류메세지의 오류 -> true
        } catch (CustomJWTException ex) {
            if (ex.getMessage().equals("Expired")) {
                return true;
            }
        }
        return false;
    }

}
