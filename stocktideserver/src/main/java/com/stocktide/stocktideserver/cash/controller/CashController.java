package com.stocktide.stocktideserver.cash.controller;

import com.stocktide.stocktideserver.cash.dto.CashResponseDto;
import com.stocktide.stocktideserver.cash.entity.Cash;
import com.stocktide.stocktideserver.cash.mapper.CashMapper;
import com.stocktide.stocktideserver.cash.service.CashService;
import com.stocktide.stocktideserver.member.dto.MemberDTO;
import com.stocktide.stocktideserver.member.entity.Member;
import com.stocktide.stocktideserver.member.repository.MemberRepository;
import com.stocktide.stocktideserver.member.service.MemberServiceImpl;
import com.stocktide.stocktideserver.stock.service.StockHoldService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


/**
 * 현금 자산 관리를 위한 컨트롤러
 * 계좌 생성, 조회, 수정, 삭제 등의 기능을 제공합니다.
 *
 * @author StockTide Dev Team
 * @version 1.0
 * @since 2025-02-03
 */
@Slf4j
@RestController
@RequestMapping("/api/cash")
@RequiredArgsConstructor
@Tag(name = "Cash", description = "현금 자산 관리 API")
public class CashController {

    private final CashMapper mapper;
    private final CashService cashService;
    private final MemberServiceImpl memberService;
    private final StockHoldService stockHoldService;
//    private final StockOrderService stockOrderService;
    private final MemberRepository memberRepository;

    /**
     * 회원의 모든 현금 계좌 정보를 조회합니다.
     *
     * @param memberId 회원 ID
     * @return 현금 계좌 목록
     */
    @Operation(summary = "현금 계좌 목록 조회", description = "회원의 모든 현금 계좌 정보를 조회합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "조회 성공"),
            @ApiResponse(responseCode = "404", description = "회원 정보를 찾을 수 없음")
    })
    @GetMapping
    private ResponseEntity<Object> getCashList(@RequestParam long memberId){

        Member member = memberRepository.findById(memberId).orElse(null);

        if (member == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        List<Cash> cashList = member.getCashList();
        List<CashResponseDto> cashResponseDtoList= new ArrayList<>();
        for (Cash cash : cashList) {
            CashResponseDto responseDto = mapper.cashToCashResponseDto(cash);
            cashResponseDtoList.add(responseDto);
        }

        return new ResponseEntity<>(cashResponseDtoList, HttpStatus.OK);
    }

    /**
     * 새로운 현금 계좌를 생성합니다.
     *
     * @param memberId 회원 ID
     * @return 생성된 계좌 정보
     */
    @Operation(summary = "현금 계좌 생성", description = "새로운 현금 계좌를 생성합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "계좌 생성 성공"),
            @ApiResponse(responseCode = "400", description = "이미 최대 계좌 수 보유")
    })
    @PostMapping
    public ResponseEntity<Object> createCash(@RequestParam long memberId){

        Cash createdCash = cashService.createCash(memberId);

        CashResponseDto responseDto = mapper.cashToCashResponseDto(createdCash);

        return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
    }

    /**
     * 특정 현금 계좌를 삭제합니다.
     *
     * @param cashId 계좌 ID
     * @return 삭제된 계좌 ID
     */
    @Operation(summary = "현금 계좌 삭제", description = "특정 현금 계좌를 삭제합니다.")
    @DeleteMapping("/{cashId}")
    public ResponseEntity<Object> deleteCash(@PathVariable("cashId") Long cashId) {

        cashService.remove(cashId);

        return new ResponseEntity<>(cashId, HttpStatus.OK);
    }

    /**
     * 계좌의 잔액을 업데이트합니다.
     *
     * @param cashId 계좌 ID
     * @param money 원화 금액
     * @param dollar 달러 금액
     * @return 업데이트된 계좌 정보
     */
    @Operation(summary = "계좌 잔액 수정", description = "계좌의 원화와 달러 잔액을 수정합니다.")
    @PutMapping("/{cashId}")
    public ResponseEntity<Object> updateCash(@PathVariable("cashId") Long cashId
            , @RequestParam long money
            , @RequestParam long dollar) {
        log.info("---PutMapping-----------cashId money : {} {} {}", cashId, money, dollar);

        Cash cash = cashService.updateCash(cashId, money, dollar);

        return new ResponseEntity<>(cash, HttpStatus.OK);
    }

    /**
     * 회원의 특정 현금 계좌 정보를 조회합니다.
     * @return 계좌 정보
     */
    @Operation(summary = "단일 계좌 조회", description = "회원의 특정 현금 계좌 정보를 조회합니다.")
    @GetMapping("/one")
    private ResponseEntity<Object> getOneCash(@AuthenticationPrincipal MemberDTO memberDTO ) {

        Cash cash = cashService.findCash(memberDTO.getMemberId());

        return new ResponseEntity<>(mapper.cashToCashResponseDto(cash), HttpStatus.OK);
    }

}