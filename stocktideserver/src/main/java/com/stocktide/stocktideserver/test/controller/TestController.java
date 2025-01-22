package com.stocktide.stocktideserver.test.controller;

import com.stocktide.stocktideserver.member.dto.MemberDTO;
import com.stocktide.stocktideserver.stock.dto.CompanyModifyDTO;
import com.stocktide.stocktideserver.stock.service.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@Log4j2
@RequiredArgsConstructor
@RequestMapping("/api/test")
public class TestController {

    private final StockAsBiService stockAsBiService;
    private final StockMinService stockMinService;
    private final StockOrderService stockOrderService;

    @GetMapping("/test1")
    public ResponseEntity<String> test(@AuthenticationPrincipal MemberDTO memberDTO) {
        if(memberDTO != null) {
            log.info("memberDTO is not null {}:", memberDTO.toString());
            return ResponseEntity.ok(
                    "Member ID: " + memberDTO.getMemberId()
            );
        }
        log.info("memberDTO is null");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
    }


    //회사 수정
    @PutMapping("/updateCompany")
    public Map<String, String> updateCompany(@AuthenticationPrincipal MemberDTO memberDTO)  throws InterruptedException {
        log.info("memberDTO is not null {}:", memberDTO.toString());
        stockAsBiService.updateStockAsBi();
        stockOrderService.checkOrder();
        stockMinService.updateDomesticStockMin();
        return Map.of("RESULT", "SUCCESS");
    }
}
