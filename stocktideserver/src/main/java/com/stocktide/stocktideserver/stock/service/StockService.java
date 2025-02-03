package com.stocktide.stocktideserver.stock.service;

import com.stocktide.stocktideserver.stock.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@Lazy
public class StockService {
    private final DomesticApiService domesticApiService;
    private final OverseasApiService overseasApiService;

    @Autowired
    public StockService(@Lazy DomesticApiService domesticApiService,
                        @Lazy OverseasApiService overseasApiService) {
        this.domesticApiService = domesticApiService;
        this.overseasApiService = overseasApiService;
    }

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

    public StockBasic getStockBasicResponseFromApi(Company company) {
        AbstractStockApiService apiService = company.getMarketType() == MarketType.DOMESTIC ?
                domesticApiService : overseasApiService;
        return apiService.getStockBasicFromApi(company);
    }


}