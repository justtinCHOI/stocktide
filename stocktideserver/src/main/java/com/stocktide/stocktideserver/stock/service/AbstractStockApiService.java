package com.stocktide.stocktideserver.stock.service;

import com.stocktide.stocktideserver.stock.entity.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public abstract class AbstractStockApiService {

    public abstract Object getStockAsBiDataFromApi(String stockCode);
    public abstract Object getStockMinDataFromApi(String stockCode, String strHour);
    public abstract Object getMarketMonthDataFromApi();
    public abstract Object getStockBasicDataFromApi(String stockCode);
    public abstract Object getStockBalanceDataFromApi(String stockCode);
    public abstract Object getStockIncomeDataFromApi(String stockCode);
    public abstract Object getStockFinancialDataFromApi(String stockCode);
    public abstract Object getStockProfitDataFromApi(String stockCode);
    public abstract Object getStockOtherDataFromApi(String stockCode);
    public abstract Object getStockStabilityDataFromApi(String stockCode);
    public abstract Object getStockGrowthDataFromApi(String stockCode);
    public abstract Object getCodesDataFromApi();
    public abstract Object getNewsDataFromApi(String stockCode);

    public abstract StockName getStockNameFromApi(Company company);
    public abstract StockAsBi getStockAsBiFromApi(Company company);
    public abstract List<StockMin> getStockMinFromApi(Company company, String strHour);
    public abstract StockInf getStockInfFromApi(Company company, String strHour);
    public abstract Object getStockBasicFromApi(String stockCode);
    public abstract Object getStockBalanceFromApi(String stockCode);
    public abstract Object getStockIncomeFromApi(String stockCode);
    public abstract Object getStockFinancialFromApi(String stockCode);
    public abstract Object getStockProfitFromApi(String stockCode);
    public abstract Object getStockOtherFromApi(String stockCode);
    public abstract Object getStockStabilityFromApi(String stockCode);
    public abstract Object getStockGrowthFromApi(String stockCode);
    public abstract Object getCodesFromApi();
    public abstract Object getNewsFromApi(String stockCode);

}