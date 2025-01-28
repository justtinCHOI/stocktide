package com.stocktide.stocktideserver.stock.service;

import com.stocktide.stocktideserver.stock.entity.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StockService {
    private final DomesticApiService domesticApiService;
    private final OverseasApiService overseasApiService;

    public StockService(DomesticApiService domesticApiService, OverseasApiService overseasApiService) {
        this.domesticApiService = domesticApiService;
        this.overseasApiService = overseasApiService;
    }

    public StockAsBi getStockAsBiFromApi(Company company) {
        AbstractStockApiService apiService = company.getMarketType() == MarketType.DOMESTIC ?
                domesticApiService : overseasApiService;
        return apiService.getStockAsBiFromApi(company);
    }

    public List<StockMin> getStockMinFromApi(Company company, String strHour) {
        AbstractStockApiService apiService = company.getMarketType() == MarketType.DOMESTIC ?
                domesticApiService : overseasApiService;
        return apiService.getStockMinFromApi(company, strHour);
    }

    public StockInf getStockInfFromApi(Company company, String strHour) {
        AbstractStockApiService apiService = company.getMarketType() == MarketType.DOMESTIC ?
                domesticApiService : overseasApiService;
        return apiService.getStockInfFromApi(company, strHour);
    }

}