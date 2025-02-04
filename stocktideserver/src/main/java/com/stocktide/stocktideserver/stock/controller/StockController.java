package com.stocktide.stocktideserver.stock.controller;


import com.stocktide.stocktideserver.stock.service.DomesticApiService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * KOSPI 지수 관련 정보를 제공하는 컨트롤러
 * KOSPI 지수의 시세 및 차트 데이터를 제공합니다.
 *
 * @author StockTide Dev Team
 * @version 1.0
 * @since 2025-02-03
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/kospi")
@Tag(name = "KOSPI", description = "KOSPI 지수 정보 API")
public class StockController {

    private final DomesticApiService apiCallService;


    /**
     * KOSPI 지수의 월간 데이터를 조회합니다.
     *
     * @return KOSPI 월간 차트 데이터
     */
    @Operation(summary = "KOSPI 월간 데이터", description = "KOSPI 지수의 월간 차트 데이터를 조회합니다.")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "조회 성공",
                    content = @Content(mediaType = "application/json")
            ),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    @GetMapping("/")
    public ResponseEntity getKospiMonth() {
        String kospi = apiCallService.getMarketMonthDataFromApi();
        return ResponseEntity.ok(kospi);
    }

}
