package com.stocktide.stocktideserver.member.controller;

import com.stocktide.stocktideserver.member.dto.MemberDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Log4j2
@RequiredArgsConstructor
@RequestMapping("/api/member")
public class MemberController {

    @GetMapping("/test")
    public ResponseEntity<String> test(@AuthenticationPrincipal MemberDTO memberDTO) {
        if(memberDTO != null) {
            return ResponseEntity.ok(
                    "Member ID: " + memberDTO.getMemberId()
            );
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
    }
}
