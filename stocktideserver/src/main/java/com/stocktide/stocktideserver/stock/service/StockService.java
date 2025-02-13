package com.stocktide.stocktideserver.stock.service;

import com.stocktide.stocktideserver.stock.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * 주식 정보 조회 및 API 서비스 라우터
 *
 * 국내 및 해외 주식 API 서비스를 통합 관리하며,
 * 회사의 시장 유형(국내/해외)에 따라 적절한 API 서비스를 동적으로 선택합니다.
 *
 * @author StockTide Dev Team
 * @version 1.0
 * @since 2025-02-03
 */
@Service
@Transactional
@Lazy
public class StockService {
    private final DomesticApiService domesticApiService;
    private final OverseasApiService overseasApiService;

    /**
     * 주식 정보 서비스 생성자
     *
     * Lazy 로딩을 통해 순환 참조 문제를 방지하고
     * 서비스 초기화 시 불필요한 자원 소모를 최소화합니다.
     *
     * @param domesticApiService 국내 주식 API 서비스
     * @param overseasApiService 해외 주식 API 서비스
     */
    @Autowired
    public StockService(@Lazy DomesticApiService domesticApiService,
                        @Lazy OverseasApiService overseasApiService) {
        this.domesticApiService = domesticApiService;
        this.overseasApiService = overseasApiService;
    }

    /**
     * 회사의 주식 이름 정보를 API로부터 조회합니다.
     *
     * 회사의 시장 유형(국내/해외)에 따라 적절한 API 서비스를 선택하여
     * 주식 이름(한글명, 영문명) 정보를 가져옵니다.
     *
     * @param company 주식 정보를 조회할 회사 엔티티
     * @return StockName 주식 이름 정보 (한글명, 영문명)
     */
    public StockName getStockNameFromApi(Company company) {
        AbstractStockApiService apiService = company.getMarketType() == MarketType.DOMESTIC ?
                domesticApiService : overseasApiService;
        return apiService.getStockNameFromApi(company);
    }

    /**
     * 회사의 주식 호가(Ask-Bid) 정보를 API로부터 조회합니다.
     *
     * 회사의 시장 유형에 따라 적절한 API 서비스를 선택하여
     * 최신 호가 정보를 가져옵니다.
     *
     * @param company 주식 호가 정보를 조회할 회사 엔티티
     * @return StockAsBi 주식 호가 정보 엔티티
     */
    public StockAsBi getStockAsBiFromApi(Company company) {
        AbstractStockApiService apiService = company.getMarketType() == MarketType.DOMESTIC ?
                domesticApiService : overseasApiService;
        return apiService.getStockAsBiFromApi(company);
    }

    /**
     * 회사의 분봉(分鐘) 주식 데이터를 API로부터 조회합니다.
     *
     * 특정 시간대의 분 단위 주식 거래 정보를 가져오며,
     * 회사의 시장 유형에 따라 적절한 API 서비스를 선택합니다.
     *
     * @param company 분봉 정보를 조회할 회사 엔티티
     * @param strHour 조회할 시간 (HHMMSS 형식)
     * @return List<StockMin> 분봉 주식 데이터 엔티티 목록
     */
    public List<StockMin> getStockMinFromApi(Company company, String strHour) {
        AbstractStockApiService apiService = company.getMarketType() == MarketType.DOMESTIC ?
                domesticApiService : overseasApiService;
        return apiService.getStockMinFromApi(company, strHour);
    }

    /**
     * 회사의 현재 주식 정보를 API로부터 조회합니다.
     *
     * 특정 시간대의 주식 현재가 정보를 가져오며,
     * 회사의 시장 유형에 따라 적절한 API 서비스를 선택합니다.
     *
     * @param company 주식 정보를 조회할 회사 엔티티
     * @param strHour 조회할 시간 (HHMMSS 형식)
     * @return StockInf 주식 현재가 정보 엔티티
     */
    public StockInf getStockInfFromApi(Company company, String strHour) {
        AbstractStockApiService apiService = company.getMarketType() == MarketType.DOMESTIC ?
                domesticApiService : overseasApiService;
        return apiService.getStockInfFromApi(company, strHour);
    }

    /**
     * 회사의 기본 주식 정보를 API로부터 조회합니다.
     *
     * 주식의 기본 정보(종목번호, 상장주식수, 자본금 등)를 가져오며,
     * 회사의 시장 유형에 따라 적절한 API 서비스를 선택합니다.
     *
     * @param company 기본 정보를 조회할 회사 엔티티
     * @return StockBasic 기본 주식 정보 엔티티
     */
    public StockBasic getStockBasicFromApi(Company company) {
        AbstractStockApiService apiService = company.getMarketType() == MarketType.DOMESTIC ?
                domesticApiService : overseasApiService;
        return apiService.getStockBasicFromApi(company);
    }

    /**
     * 회사의 주식 관련 뉴스를 API로부터 조회합니다.
     * 회사의 시장 유형(국내/해외)에 따라 적절한 API 서비스를 선택하여 뉴스 데이터를 가져옵니다.
     *
     * @param company 뉴스를 조회할 회사 엔티티
     * @return List<StockNews> 주식 뉴스 데이터 엔티티 목록
     * @since 1.0
     */
    public List<StockNews> getStockNewsFromApi(Company company) {
        AbstractStockApiService apiService = company.getMarketType() == MarketType.DOMESTIC ?
                domesticApiService : overseasApiService;
        return apiService.getStockNewsFromApi(company);
    }

}