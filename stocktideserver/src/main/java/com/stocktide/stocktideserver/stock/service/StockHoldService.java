package com.stocktide.stocktideserver.stock.service;

import com.stocktide.stocktideserver.exception.BusinessLogicException;
import com.stocktide.stocktideserver.exception.ExceptionCode;
import com.stocktide.stocktideserver.member.repository.MemberRepository;
import com.stocktide.stocktideserver.stock.dto.common.StockHoldResponseDto;
import com.stocktide.stocktideserver.stock.entity.Company;
import com.stocktide.stocktideserver.stock.entity.StockHold;
import com.stocktide.stocktideserver.stock.mapper.StockMapper;
import com.stocktide.stocktideserver.stock.repository.CompanyRepository;
import com.stocktide.stocktideserver.stock.repository.StockHoldRepository;
import com.stocktide.stocktideserver.stock.repository.StockOrderRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 주식 보유 정보 관리 서비스
 *
 * 사용자의 주식 보유 현황을 추적하고, 주식 매수/매도 시 보유 정보를 업데이트합니다.
 * 주식 보유량, 투자 금액, 수익률 등을 계산하고 관리하는 핵심 서비스입니다.
 *
 * @author StockTide Dev Team
 * @version 1.0
 * @since 2025-02-03
 */
@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class StockHoldService {
    private final StockHoldRepository stockHoldRepository;
    private final MemberRepository memberRepository;
    private final CompanyRepository companyRepository;
    private final StockOrderRepository stockOrderRepository;
    private final StockMapper stockMapper;

    /**
     * 특정 회사의 주식 보유 정보를 확인하거나 생성합니다.
     *
     * 회원과 회사 ID를 기반으로 기존 주식 보유 정보를 조회하고,
     * 존재하지 않을 경우 새로운 StockHold 엔티티를 생성합니다.
     *
     * @param companyId 회사의 고유 식별자
     * @param memberId 회원의 고유 식별자
     * @return 조회되거나 새로 생성된 StockHold 엔티티
     */
    public StockHold checkStockHold(long companyId, long memberId) {
        StockHold stockHold = stockHoldRepository.findByCompanyCompanyIdAndMemberMemberId(companyId, memberId);
        if(stockHold == null) {
//            log.info("checkStockHold is null");
            StockHold newStockHold = new StockHold();
            newStockHold.setMember(memberRepository.findById(memberId).get());
            newStockHold.setCompany(companyRepository.findById(companyId).get());
            return newStockHold;
        }
//        log.info("checkStockHold is exist");
        return stockHold;
    }

    /**
     * 특정 회원의 모든 주식 보유 정보를 조회합니다.
     *
     * @param memberId 회원의 고유 식별자
     * @return 해당 회원의 모든 StockHold 엔티티 목록
     */
    public StockHold findStockHold(long companyId, long memberId) {
        StockHold stockHold = stockHoldRepository.findByCompanyCompanyIdAndMemberMemberId(companyId, memberId);
        if(stockHold == null)
            throw new BusinessLogicException(ExceptionCode.STOCKHOLD_NOT_FOUND);
        else
            return stockHold;
    }

    /**
     * 회원의 주식 보유 정보를 DTO로 변환하여 반환합니다.
     *
     * 회원 ID를 기반으로 보유 주식 목록을 조회하고,
     * StockMapper를 사용하여 StockHoldResponseDto로 변환합니다.
     *
     * @param memberId 회원의 고유 식별자
     * @return StockHoldResponseDto 목록
     */
     public List<StockHold> getMemberStockHolds(long memberId) {
         return stockHoldRepository.findAllByMember_MemberId(memberId);
    }

    /**
     * 회원의 주식 보유 정보를 DTO로 변환하여 반환합니다.
     *
     * 회원 ID를 기반으로 보유 주식 목록을 조회하고,
     * StockMapper를 사용하여 StockHoldResponseDto로 변환합니다.
     *
     * @param memberId 회원의 고유 식별자
     * @return StockHoldResponseDto 목록
     */
    public List<StockHoldResponseDto> findStockHolds(Long memberId) {
        List<StockHold> stockHoldList = stockHoldRepository.findAllByMember_MemberId(memberId);
        List<StockHoldResponseDto> stockHoldResponseDtos = stockMapper.stockHoldToStockHoldResponseDto(stockHoldList);
        // 특정 조건의 예약된 주식 수량을 설정하는 로직
//        for(StockHoldResponseDto stockHold : stockHoldResponseDtos) {
//
//            List<StockOrder> stockOrders =  stockOrderRepository
//                    .findAllByMember_MemberIdAndCompany_CompanyIdAndOrderStatesAndOrderTypes(
//                            stockHold.getMemberId(),
//                            stockHold.getCompanyId(),
//                            StockOrder.OrderStates.ORDER_WAIT,
//                            StockOrder.OrderTypes.SELL
//                    );
//            int orderWaitCount = stockOrders.stream().mapToInt(StockOrder::getStockCount).sum();
//            stockHold.setReserveSellStockCount(orderWaitCount);
//        }

        return stockHoldResponseDtos;
    }

    /**
     * 주식 보유 정보의 수익률과 수익금을 계산합니다.
     *
     * 각 주식 보유 정보에 대해 현재 시장 가격을 기반으로
     * 총 수익금과 수익률을 계산하여 DTO를 업데이트합니다.
     * stockHoldResponseDto -> company -> nowPrice -> totalRevenue -> percentage -> stockHoldResponseDto
     *
     * @param stockHoldResponseDtos 수익 정보를 계산할 StockHoldResponseDto 목록
     * @return 수익 정보가 업데이트된 StockHoldResponseDto 목록
     */
    public List<StockHoldResponseDto> setPercentage(List<StockHoldResponseDto> stockHoldResponseDtos) {
        for(StockHoldResponseDto stockHoldResponseDto : stockHoldResponseDtos) {
            // 이름으로 회사를 불러온다
            Company company = companyRepository.findByCompanyId(stockHoldResponseDto.getCompanyId());
            // 주식 현재가를 불러온다
            String nowPrice = company.getStockInf().getStck_prpr();
            // 주식 수익 = 전체 주식 가치 - 전체 투자 금액
            double totalRevenue =
                    Double.parseDouble(nowPrice)
                            * (stockHoldResponseDto.getStockCount()+stockHoldResponseDto.getReserveSellStockCount())
                            - stockHoldResponseDto.getTotalPrice();
            // 주식 수익률(%) = (주식 수익 / 전체 투자 금액) × 100
            double percentage = (totalRevenue / (double)stockHoldResponseDto.getTotalPrice()) * 100;

            stockHoldResponseDto.setPercentage(percentage);
            stockHoldResponseDto.setStockReturn((long) totalRevenue);
        }
        return stockHoldResponseDtos;
    }

    /**
     * 특정 회원의 모든 주식 보유 정보를 삭제합니다.
     *
     * @param memberId 회원의 고유 식별자
     */
    public void deleteStockHolds(long memberId) {
        List<StockHold> stockHolds = getMemberStockHolds(memberId);
        stockHoldRepository.deleteAll(stockHolds);
    }
}
