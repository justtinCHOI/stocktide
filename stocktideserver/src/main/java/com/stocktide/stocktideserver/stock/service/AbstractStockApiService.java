package com.stocktide.stocktideserver.stock.service;

import com.stocktide.stocktideserver.stock.entity.*;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 주식 API 서비스 추상 클래스
 * 국내/해외 주식 정보 조회를 위한 공통 인터페이스를 정의합니다.
 * DomesticApiService와 OverseasApiService의 상위 클래스입니다.
 *
 * @author StockTide Dev Team
 * @version 1.0
 * @since 2025-02-03
 */
@Service
public abstract class AbstractStockApiService {

    /**
     * 주식 호가 데이터를 API로부터 조회합니다.
     *
     * @param stockCode 종목 코드
     * @return Object 호가 데이터 (DomesticApiService: StockAsBiDataDto, OverseasApiService: StockAsBiOverseasDataDto)
     */
    public abstract Object getStockAsBiDataFromApi(String stockCode);

    /**
     * 주식 분봉 데이터를 API로부터 조회합니다.
     *
     * @param stockCode 종목 코드
     * @param strHour 조회 시간 (HHMMSS 형식)
     * @return Object 분봉 데이터 (DomesticApiService: StockMinDto, OverseasApiService: StockMinOverseasDto)
     */
    public abstract Object getStockMinDataFromApi(String stockCode, String strHour);

    /**
     * 시장 월간 데이터를 API로부터 조회합니다.
     *
     * @return Object 시장 데이터
     */
    public abstract Object getMarketMonthDataFromApi();

    /**
     * 주식 기본 정보를 API로부터 조회합니다.
     *
     * @param stockCode 종목 코드
     * @return Object 기본 정보 데이터
     */
    public abstract Object getStockBasicDataFromApi(String stockCode);

    /**
     * 재무상태표 정보를 API로부터 조회합니다.
     *
     * @param stockCode 종목 코드
     * @return Object 재무상태표 데이터 (StockBalanceDto)
     */
    public abstract Object getStockBalanceDataFromApi(String stockCode);

    /**
     * 손익계산서 정보를 API로부터 조회합니다.
     *
     * @param stockCode 종목 코드
     * @return Object 손익계산서 데이터 (StockIncomeDto)
     */
    public abstract Object getStockIncomeDataFromApi(String stockCode);

    /**
     * 주요 재무비율을 API로부터 조회합니다.
     *
     * @param stockCode 종목 코드
     * @return Object 재무비율 데이터 (StockFinancialDto)
     */
    public abstract Object getStockFinancialDataFromApi(String stockCode);

    /**
     * 수익성 지표를 API로부터 조회합니다.
     *
     * @param stockCode 종목 코드
     * @return Object 수익성 지표 데이터 (StockProfitDto)
     */
    public abstract Object getStockProfitDataFromApi(String stockCode);

    /**
     * 기타 주요 지표를 API로부터 조회합니다.
     *
     * @param stockCode 종목 코드
     * @return Object 기타 지표 데이터 (StockOtherDto)
     */
    public abstract Object getStockOtherDataFromApi(String stockCode);

    /**
     * 안정성 지표를 API로부터 조회합니다.
     *
     * @param stockCode 종목 코드
     * @return Object 안정성 지표 데이터 (StockStabilityDto)
     */
    public abstract Object getStockStabilityDataFromApi(String stockCode);

    /**
     * 성장성 지표를 API로부터 조회합니다.
     *
     * @param stockCode 종목 코드
     * @return Object 성장성 지표 데이터 (StockGrowthDto)
     */
    public abstract Object getStockGrowthDataFromApi(String stockCode);

    /**
     * 전체 종목 코드 목록을 API로부터 조회합니다.
     *
     * @return Object 종목 코드 목록 데이터
     */
    public abstract Object getCodesDataFromApi();

    /**
     * 종목 관련 뉴스를 API로부터 조회합니다.
     *
     * @param stockCode 종목 코드
     * @return Object 뉴스 데이터 (StockNewsDto)
     */
    public abstract Object getNewsDataFromApi(String stockCode);

    // Entity 변환 메서드들
    public abstract StockName getStockNameFromApi(Company company);
    public abstract StockAsBi getStockAsBiFromApi(Company company);
    public abstract List<StockMin> getStockMinFromApi(Company company, String strHour);
    public abstract StockInf getStockInfFromApi(Company company, String strHour);
    public abstract StockBasic getStockBasicFromApi(Company company);
    public abstract Object getStockBalanceFromApi(String stockCode);
    public abstract Object getStockIncomeFromApi(String stockCode);
    public abstract Object getStockFinancialFromApi(String stockCode);
    public abstract Object getStockProfitFromApi(String stockCode);
    public abstract Object getStockOtherFromApi(String stockCode);
    public abstract Object getStockStabilityFromApi(String stockCode);
    public abstract Object getStockGrowthFromApi(String stockCode);
    public abstract Object getCodesFromApi();
    public abstract List<StockNews> getStockNewsFromApi(Company company);

}