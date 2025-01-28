package com.stocktide.stocktideserver.stock.service;

import com.stocktide.stocktideserver.stock.entity.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class StockService {
    private final DomesticApiService domesticApiService;
    private final OverseasApiService overseasApiService;


    public StockName getStockNameFromApi(Company company) {
        AbstractStockApiService apiService = company.getMarketType() == MarketType.DOMESTIC ?
                domesticApiService : overseasApiService;
        return apiService.getStockNameFromApi(company);
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