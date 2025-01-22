package com.stocktide.stocktideserver.stock.controller;

import com.stocktide.stocktideserver.member.dto.MemberDTO;
import com.stocktide.stocktideserver.member.entity.Member;
import com.stocktide.stocktideserver.member.repository.MemberRepository;
import com.stocktide.stocktideserver.stock.dto.StockHoldResponseDto;
import com.stocktide.stocktideserver.stock.dto.StockOrderResponseDto;
import com.stocktide.stocktideserver.stock.entity.StockOrder;
import com.stocktide.stocktideserver.stock.mapper.StockMapper;
import com.stocktide.stocktideserver.stock.service.StockHoldService;
import com.stocktide.stocktideserver.stock.service.StockOrderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/api/stock")
@RequiredArgsConstructor
public class StockOrderController {

    private final StockOrderService stockOrderService;
    private final StockMapper stockMapper;
    private final StockHoldService stockHoldService;
    private final MemberRepository memberRepository;

    // 보유 주식 정보들 반환하는 api
    @GetMapping("/stockholds")
    public ResponseEntity<List<StockHoldResponseDto>> getStockHolds(@RequestParam Long companyId, @AuthenticationPrincipal MemberDTO memberDTO) {

        List<StockHoldResponseDto> stockHoldResponseDtos = stockHoldService.findStockHolds(memberDTO.getMemberId(), companyId);

        stockHoldResponseDtos = stockHoldService.setPercentage(stockHoldResponseDtos);

        return new ResponseEntity<>(stockHoldResponseDtos, HttpStatus.OK);

    }

    // 매수 api
    @PostMapping("/buy")
    public ResponseEntity<Object> buyStocks(@RequestParam(name = "companyId") long companyId,
                                    @RequestParam(name = "price") long price,
                                    @RequestParam(name = "stockCount") int stockCount,
                                    @AuthenticationPrincipal MemberDTO memberDTO) {
        Optional<Member> member = memberRepository.findByMemberId(memberDTO.getMemberId());
        StockOrder stockOrder = stockOrderService.buyStocks(member.get(), companyId, price, stockCount);
        StockOrderResponseDto stockOrderResponseDto = stockMapper.stockOrderToStockOrderResponseDto(stockOrder);

        return new ResponseEntity<>(stockOrderResponseDto, HttpStatus.CREATED);
    }

    // 매도 api
    @PostMapping("/sell")
    public ResponseEntity<Object> sellStocks(@RequestParam(name = "companyId") long companyId,
                                     @RequestParam(name = "price") long price,
                                     @RequestParam(name = "stockCount") int stockCount,
                                     @AuthenticationPrincipal MemberDTO memberDTO) {
        Optional<Member> member = memberRepository.findByMemberId(memberDTO.getMemberId());
        StockOrder stockOrder = stockOrderService.sellStocks(member.get(), companyId, price, stockCount);
        StockOrderResponseDto stockOrderResponseDto = stockMapper.stockOrderToStockOrderResponseDto(stockOrder);

        return new ResponseEntity<>(stockOrderResponseDto, HttpStatus.CREATED);
    }

    // 멤버의 stockOrder를 반환하는 api
    @GetMapping("/stockorders")
    public ResponseEntity<Object> getStockOrders(@AuthenticationPrincipal MemberDTO memberDTO) {
        Optional<Member> member = memberRepository.findByMemberId(memberDTO.getMemberId());
        List<StockOrderResponseDto> stockOrderResponseDtos = stockOrderService.getMemberStockOrders(member.get().getMemberId());

        return new ResponseEntity<>(stockOrderResponseDtos, HttpStatus.OK);
    }

    // 미 체결된 매수, 매도 삭제하는 api
    @DeleteMapping("/stockorders")
    public void deleteStockOrders(@AuthenticationPrincipal MemberDTO memberDTO,
                                  @RequestParam("stockOrderId") long stockOrderId,
                                  @RequestParam("stockCount") int stockCount) {
        Optional<Member> member = memberRepository.findByMemberId(memberDTO.getMemberId());
        stockOrderService.deleteStockOrder(member.get(), stockOrderId, stockCount);
    }

    // 30분 마다 실행되는 예약 매도 매수기능 실행하는 api
    @GetMapping("checkOrder")
    public ResponseEntity<Object> checkOrder(@AuthenticationPrincipal MemberDTO memberDTO) {
        log.info("checkOrder {}", memberDTO.getMemberId());
        stockOrderService.checkOrder();

        return new ResponseEntity<>(HttpStatus.OK);
    }

}