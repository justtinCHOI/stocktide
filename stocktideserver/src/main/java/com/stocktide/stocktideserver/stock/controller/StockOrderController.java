package com.stocktide.stocktideserver.stock.controller;

import com.stocktide.stocktideserver.member.dto.MemberDto;
import com.stocktide.stocktideserver.member.entity.Member;
import com.stocktide.stocktideserver.member.repository.MemberRepository;
import com.stocktide.stocktideserver.stock.dto.common.StockHoldResponseDto;
import com.stocktide.stocktideserver.stock.dto.common.StockOrderResponseDto;
import com.stocktide.stocktideserver.stock.entity.StockOrder;
import com.stocktide.stocktideserver.stock.mapper.StockMapper;
import com.stocktide.stocktideserver.stock.service.StockHoldService;
import com.stocktide.stocktideserver.stock.service.StockOrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * 주식 주문 처리를 담당하는 컨트롤러
 * 주식 매수/매도 주문 및 보유 주식 조회 기능을 제공합니다.
 *
 * @author StockTide Dev Team
 * @version 1.0
 * @since 2025-02-03
 */
@Slf4j
@RestController
@RequestMapping("/api/stock")
@RequiredArgsConstructor
@Tag(name = "Stock Order", description = "주식 주문 처리 API")
@SecurityRequirement(name = "bearerAuth")
public class StockOrderController {

    private final StockOrderService stockOrderService;
    private final StockMapper stockMapper;
    private final StockHoldService stockHoldService;
    private final MemberRepository memberRepository;

    /**
     * 사용자의 보유 주식 정보를 조회합니다.
     *
     * @param memberDTO 회원 정보
     * @return 보유 주식 목록
     */
    @Operation(summary = "보유 주식 조회", description = "사용자의 보유 주식 정보를 조회합니다.")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "조회 성공",
                    content = @Content(schema = @Schema(implementation = StockHoldResponseDto.class))
            )
    })
    @GetMapping("/stockholds")
    public ResponseEntity<List<StockHoldResponseDto>> getStockHolds(@AuthenticationPrincipal MemberDto memberDTO) {

        List<StockHoldResponseDto> stockHoldResponseDtos = stockHoldService.findStockHolds(memberDTO.getMemberId());

        stockHoldResponseDtos = stockHoldService.setPercentage(stockHoldResponseDtos);

        return new ResponseEntity<>(stockHoldResponseDtos, HttpStatus.OK);

    }

    /**
     * 주식 매수 주문을 처리합니다.
     *
     * @param companyId 회사 ID
     * @param price 주문 가격
     * @param stockCount 주문 수량
     * @param memberDTO 회원 정보
     * @return 주문 처리 결과
     */
    @Operation(summary = "주식 매수", description = "주식 매수 주문을 처리합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "주문 성공"),
            @ApiResponse(responseCode = "400", description = "잘못된 주문"),
            @ApiResponse(responseCode = "422", description = "잔액 부족")
    })
    @PostMapping("/buy")
    public ResponseEntity<Object> buyStocks(@RequestParam(name = "companyId") long companyId,
                                    @RequestParam(name = "price") long price,
                                    @RequestParam(name = "stockCount") int stockCount,
                                    @AuthenticationPrincipal MemberDto memberDTO) {
        Optional<Member> member = memberRepository.findByMemberId(memberDTO.getMemberId());
        StockOrder stockOrder = stockOrderService.buyStocks(member.get(), companyId, price, stockCount);
        StockOrderResponseDto stockOrderResponseDto = stockMapper.stockOrderToStockOrderResponseDto(stockOrder);

        return new ResponseEntity<>(stockOrderResponseDto, HttpStatus.CREATED);
    }

    /**
     * 주식 매도 주문을 처리합니다.
     *
     * @param companyId 회사 ID
     * @param price 주문 가격
     * @param stockCount 주문 수량
     * @param memberDTO 회원 정보
     * @return 주문 처리 결과
     */
    @Operation(summary = "주식 매도", description = "주식 매도 주문을 처리합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "주문 성공"),
            @ApiResponse(responseCode = "400", description = "잘못된 주문"),
            @ApiResponse(responseCode = "422", description = "보유 주식 부족")
    })
    @PostMapping("/sell")
    public ResponseEntity<Object> sellStocks(@RequestParam(name = "companyId") long companyId,
                                     @RequestParam(name = "price") long price,
                                     @RequestParam(name = "stockCount") int stockCount,
                                     @AuthenticationPrincipal MemberDto memberDTO) {
        Optional<Member> member = memberRepository.findByMemberId(memberDTO.getMemberId());
        StockOrder stockOrder = stockOrderService.sellStocks(member.get(), companyId, price, stockCount);
        StockOrderResponseDto stockOrderResponseDto = stockMapper.stockOrderToStockOrderResponseDto(stockOrder);

        return new ResponseEntity<>(stockOrderResponseDto, HttpStatus.CREATED);
    }

    /**
     * 주문 내역을 조회합니다.
     *
     * @param memberDTO 회원 정보
     * @return 주문 내역 목록
     */
    @Operation(summary = "주문 내역 조회", description = "회원의 주문 내역을 조회합니다.")
    @GetMapping("/stockorders")
    public ResponseEntity<Object> getStockOrders(@AuthenticationPrincipal MemberDto memberDTO) {
        Optional<Member> member = memberRepository.findByMemberId(memberDTO.getMemberId());
        List<StockOrderResponseDto> stockOrderResponseDtos = stockOrderService.getMemberStockOrders(member.get().getMemberId());

        return new ResponseEntity<>(stockOrderResponseDtos, HttpStatus.OK);
    }

    /**
     * 미체결 주문을 취소, 업데이트합니다.
     *
     * @param memberDTO 회원 정보
     * @param stockOrderId 주문 ID
     * @param stockCount 취소 수량
     */
    @Operation(summary = "주문 취소", description = "미체결된 주문을 취소합니다.")
    @DeleteMapping("/stockorders")
    public void deleteStockOrders(@AuthenticationPrincipal MemberDto memberDTO,
                                  @RequestParam("stockOrderId") long stockOrderId,
                                  @RequestParam("stockCount") int stockCount) {
        Optional<Member> member = memberRepository.findByMemberId(memberDTO.getMemberId());
        stockOrderService.deleteStockOrder(member.get(), stockOrderId, stockCount);
    }

    // 30분 마다 실행되는 예약 매도 매수기능 실행하는 api
    @GetMapping("checkOrder")
    public ResponseEntity<Object> checkOrder(@AuthenticationPrincipal MemberDto memberDTO) {
        stockOrderService.checkOrder();

        return new ResponseEntity<>(HttpStatus.OK);
    }

}