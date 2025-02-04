package com.stocktide.stocktideserver.member.controller;

import com.stocktide.stocktideserver.member.dto.MemberDTO;
import com.stocktide.stocktideserver.member.dto.MemberModifyDTO;
import com.stocktide.stocktideserver.member.service.MemberService;
import com.stocktide.stocktideserver.util.JWTUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * 소셜 로그인 및 회원 정보 관리를 담당하는 컨트롤러
 * 카카오 로그인 및 회원 정보 수정 기능을 제공합니다.
 *
 * @author StockTide Dev Team
 * @version 1.0
 * @since 2025-02-03
 */
@RestController
@Log4j2
@RequiredArgsConstructor
@Tag(name = "Social", description = "소셜 로그인 및 회원 관리 API")
public class SocialController {

    private final MemberService memberService;

    /**
     * 카카오 로그인을 처리하고 JWT 토큰을 발급합니다.
     *
     * @param accessToken 카카오 액세스 토큰
     * @return JWT 토큰 및 회원 정보
     */
    @Operation(summary = "카카오 로그인", description = "카카오 소셜 로그인을 처리합니다.")
    @GetMapping("/api/member/kakao")
    public Map<String, Object> getMemberFromKakao(String accessToken) {

        // 1. api 요청 accessToken -> nickname -> 새로운 MemberDTO
        // 2. 새로운 MemberDTO -> claims -> accessToken, refreshToken -> claims

        //1.
        MemberDTO memberDTO = memberService.getKakaoMember(accessToken);

        //2.
        Map<String, Object> claims = memberDTO.getClaims();

        String jwtAccessToken = JWTUtil.generateToken(claims, 10);
        String jwtRefreshToken = JWTUtil.generateToken(claims, 60 * 24);

        //spring security 는 JWT 를 gson 으로 변환해서 response 에 넣어준다.
        claims.put("accessToken", jwtAccessToken);
        claims.put("refreshToken", jwtRefreshToken);

        return claims;
    }

    /**
     * 회원 정보를 수정합니다.
     *
     * @param memberModifyDTO 수정할 회원 정보
     * @return 수정된 회원 정보
     */
    @Operation(summary = "회원정보 수정", description = "회원의 기본 정보를 수정합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "수정 성공"),
            @ApiResponse(responseCode = "404", description = "회원 정보 없음")
    })
    @PutMapping("/api/member/modify")
    public ResponseEntity<MemberModifyDTO> modify(@RequestBody MemberModifyDTO memberModifyDTO) {

        MemberModifyDTO savedMemberDTO = memberService.modifyMember(memberModifyDTO);

        return new ResponseEntity<>(savedMemberDTO, HttpStatus.OK);

    }

    /**
     * 이메일 중복을 확인합니다.
     *
     * @param email 확인할 이메일
     * @return 중복 여부 (true: 중복, false: 사용가능)
     */
    @Operation(summary = "이메일 중복 확인", description = "회원가입 시 이메일 중복을 확인합니다.")
    @GetMapping("/api/member/checkEmail")
    public boolean checkEmail(@RequestParam String email) {
        return  memberService.checkEmail(email);
    }

}
