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
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/cash")
@RequiredArgsConstructor
public class CashController {

    private final CashMapper mapper;
    private final CashService cashService;
    private final MemberServiceImpl memberService;
    private final StockHoldService stockHoldService;
//    private final StockOrderService stockOrderService;
    private final MemberRepository memberRepository;

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

    @PostMapping
    public ResponseEntity<Object> createCash(@RequestParam long memberId){

        Cash createdCash = cashService.createCash(memberId);

        CashResponseDto responseDto = mapper.cashToCashResponseDto(createdCash);

        return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
    }

    @DeleteMapping("/{cashId}")
    public ResponseEntity<Object> deleteCash(@PathVariable("cashId") Long cashId) {

        cashService.remove(cashId);

        return new ResponseEntity<>(cashId, HttpStatus.OK);
    }


    @PutMapping("/{cashId}")
    public ResponseEntity<Object> updateCash(@PathVariable("cashId") Long cashId
            , @RequestParam long money
            , @RequestParam long dollar) {
        log.info("---PutMapping-----------cashId money : {} {} {}", cashId, money, dollar);

        Cash cash = cashService.updateCash(cashId, money, dollar);

        return new ResponseEntity<>(cash, HttpStatus.OK);
    }

    @GetMapping("/one")
    private ResponseEntity<Object> getOneCash(@AuthenticationPrincipal MemberDTO memberDTO ) {

        Cash cash = cashService.findCash(memberDTO.getMemberId());

        return new ResponseEntity<>(mapper.cashToCashResponseDto(cash), HttpStatus.OK);
    }

}