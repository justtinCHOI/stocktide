package com.stocktide.stocktideserver.stock.controller;


import com.stocktide.stocktideserver.stock.service.DomesticApiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/kospi")
public class StockController {

    private final DomesticApiService apiCallService;

    // 코스피 월봉 정보
    @GetMapping("/")
    public ResponseEntity getKospiMonth() {
        String kospi = apiCallService.getMarketMonthDataFromApi();
        return ResponseEntity.ok(kospi);
    }

}

