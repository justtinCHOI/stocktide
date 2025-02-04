package com.stocktide.stocktideserver.stock.controller;

import com.stocktide.stocktideserver.member.entity.Member;
import com.stocktide.stocktideserver.stock.dto.StockOrderResponseDto;
import com.stocktide.stocktideserver.stock.entity.StockOrder;
import com.stocktide.stocktideserver.stock.mapper.StockMapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 주식 주문 상태 업데이트를 실시간으로 처리하는 컨트롤러
 * Long Polling 방식을 사용하여 주문 상태 변경을 실시간으로 감지합니다.
 *
 * @author StockTide Dev Team
 * @version 1.0
 * @since 2025-02-03
 */
@RestController
@RequestMapping("/api/long-polling")
@RequiredArgsConstructor
@Tag(name = "Long Polling", description = "실시간 주문 상태 업데이트 API")
public class LongPollingController {

    private List<StockOrder> updateBuyStockOrders;
    private List<StockOrder> updateSellStockOrders;
    private final StockMapper stockMapper;

    /**
     * 주문 상태 변경을 대기하고 감지합니다.
     *
     * @param member 현재 로그인한 회원 정보
     * @return 업데이트된 주문 정보
     * @throws InterruptedException 대기 중 인터럽트 발생 시
     */
    @Operation(summary = "주문 상태 감지", description = "주문 상태 변경을 실시간으로 감지합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "상태 변경 감지 성공"),
            @ApiResponse(responseCode = "408", description = "타임아웃 발생")
    })
    @SecurityRequirement(name = "bearerAuth")
    @GetMapping("/listen")
    public ResponseEntity listenForUpdate(Member member) throws InterruptedException {
        updateBuyStockOrders = new ArrayList<>();
        updateSellStockOrders = new ArrayList<>();

        waitForStockOrdersToUpdate();

        List<StockOrder> memberBuyStockOrder = updateBuyStockOrders.stream()
                .filter(stockOrder -> stockOrder.getMember().getMemberId() == member.getMemberId())
                .collect(Collectors.toList());

        List<StockOrder> memberSellStockOrder = updateSellStockOrders.stream()
                .filter(stockOrder -> stockOrder.getMember().getMemberId() == member.getMemberId())
                .collect(Collectors.toList());

        List<StockOrderResponseDto> buyStockOrderResponseDtos = stockMapper.stockOrdersToStockOrderResponseDtos(memberBuyStockOrder);
        List<StockOrderResponseDto> sellStockOrderResponseDtos = stockMapper.stockOrdersToStockOrderResponseDtos(memberSellStockOrder);

        List<List<StockOrderResponseDto>> updateStockOrders = new ArrayList<>();
        updateStockOrders.add(buyStockOrderResponseDtos);
        updateStockOrders.add(sellStockOrderResponseDtos);

        return new ResponseEntity(updateStockOrders, HttpStatus.OK);
    }

    private void waitForStockOrdersToUpdate() throws InterruptedException {
        // 변경된 데이터가 도착할 때까지 대기
        synchronized (this) {
            if (updateBuyStockOrders.isEmpty() && updateSellStockOrders.isEmpty()) {
                wait();
            }
        }
    }

    public synchronized void notifyDataUpdated(List<StockOrder> buyStockOrders,
                                               List<StockOrder> sellStockOrders) {
        updateBuyStockOrders = buyStockOrders;
        updateSellStockOrders = sellStockOrders;
        notify(); // 대기 중인 스레드를 깨워 응답을 보냄
    }
}
