package com.stocktide.stocktideserver.stock.service;

import com.stocktide.stocktideserver.stock.entity.*;
import jakarta.transaction.Transactional;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
@Transactional
@Slf4j
public class OverseasApiService extends AbstractStockApiService {
    @Getter
    @Value("${token.app-key}")
    private String APP_KEY;

    @Getter
    @Value("${token.app-secret}")
    private String APP_SECRET;

    @Getter
    @Value("${stock-url.token}")
    private String TOKEN_URL;

    @Getter
    @Value("${stock-url.overseas.stockasbi}")
    private String STOCKASBI_URL;

    @Getter
    @Value("${stock-url.overseas.stockhour}")
    private String STOCKHOUR_URL;

    @Getter
    @Value("${stock-url.overseas.kospi}")
    private String KOSPI_URL;

    @Getter
    @Value("${stock-url.overseas.stockBasic}")
    private String STOCKBASIC_URL;

    @Getter
    @Value("${stock-url.overseas.stockBalance}")
    private String STOCKBALANCE_URL;

    @Getter
    @Value("${stock-url.overseas.stockIncome}")
    private String STOCKINCOME_URL;

    @Getter
    @Value("${stock-url.overseas.stockFinancial}")
    private String STOCKFINANCIAL_URL;

    @Getter
    @Value("${stock-url.overseas.stockProfit}")
    private String STOCKPROFIT_URL;

    @Getter
    @Value("${stock-url.overseas.stockOther}")
    private String STOCKOTHER_URL;

    @Getter
    @Value("${stock-url.overseas.stockStability}")
    private String STOCKSTABILITY_URL;

    @Getter
    @Value("${stock-url.overseas.stockGrowth}")
    private String STOCKGROWTH_URL;

    @Getter
    @Value("${stock-url.overseas.stockCredit}")
    private String STOCKCREDIT_URL;

    @Getter
    @Value("${stock-url.overseas.stockNews}")
    private String STOCKNEWS_URL;

    private final String FID_ETC_CLS_CODE = "";
    private final String FID_COND_MRKT_DIV_CODE = "J"; // 시장구분코드 (주식 J)
    // private final String FID_INPUT_HOUR_1 = "153000";
    private final String FID_PW_DATA_INCU_YN = "Y";
    private final String CUST_TYPE = "P";
    private final String FID_RANK_SORT_CLS_CODE = "1"; // 순위 정렬 구분 코드 (0:코드순, 1:이름순)
    private final String FID_SLCT_YN = "0"; // 선택 여부	(0:신용주문가능, 1: 신용주문불가)
    private final String FID_INPUT_ISCD = "2001"; // 입력 종목코드	(2001:코스피)
    private final String FID_COND_SCR_DIV_CODE = "20477"; //  조건 화면 분류 코드 (Unique key(20477))
    private final String PRDT_TYPE_CD= "300"; //  300: 주식, ETF, ETN, ELW, 301:선물옵션, 302 : 채권, 306 : ELS
    private final String FID_DIV_CLS_CODE= "0"; // 0: 년, 1: 분기

    private final RestTemplate restTemplate;
    private final TokenService tokenService;

    @Autowired
    public OverseasApiService(RestTemplate restTemplate, TokenService tokenService) {
        this.restTemplate = restTemplate;
        this.tokenService = tokenService;
    }

    @Override
    public Object getStockAsBiDataFromApi(String stockCode) {
        return null;
    }

    @Override
    public Object getStockMinDataFromApi(String stockCode, String strHour) {
        return null;
    }

    @Override
    public Object getMarketMonthDataFromApi() {
        return null;
    }

    @Override
    public Object getStockBasicDataFromApi(String stockCode) {
        return null;
    }

    @Override
    public Object getStockBalanceDataFromApi(String stockCode) {
        return null;
    }

    @Override
    public Object getStockIncomeDataFromApi(String stockCode) {
        return null;
    }

    @Override
    public Object getStockFinancialDataFromApi(String stockCode) {
        return null;
    }

    @Override
    public Object getStockProfitDataFromApi(String stockCode) {
        return null;
    }

    @Override
    public Object getStockOtherDataFromApi(String stockCode) {
        return null;
    }

    @Override
    public Object getStockStabilityDataFromApi(String stockCode) {
        return null;
    }

    @Override
    public Object getStockGrowthDataFromApi(String stockCode) {
        return null;
    }

    @Override
    public Object getCodesDataFromApi() {
        return null;
    }

    @Override
    public Object getNewsDataFromApi(String stockCode) {
        return null;
    }

    @Override
    public StockName getStockNameFromApi(Company company) {
        return null;
    }

    @Override
    public StockAsBi getStockAsBiFromApi(Company company) {
        return null;
    }

    @Override
    public List<StockMin> getStockMinFromApi(Company company, String strHour) {
        return List.of();
    }

    @Override
    public StockInf getStockInfFromApi(Company company, String strHour) {
        return null;
    }

    @Override
    public Object getStockBasicFromApi(String stockCode) {
        return null;
    }

    @Override
    public Object getStockBalanceFromApi(String stockCode) {
        return null;
    }

    @Override
    public Object getStockIncomeFromApi(String stockCode) {
        return null;
    }

    @Override
    public Object getStockFinancialFromApi(String stockCode) {
        return null;
    }

    @Override
    public Object getStockProfitFromApi(String stockCode) {
        return null;
    }

    @Override
    public Object getStockOtherFromApi(String stockCode) {
        return null;
    }

    @Override
    public Object getStockStabilityFromApi(String stockCode) {
        return null;
    }

    @Override
    public Object getStockGrowthFromApi(String stockCode) {
        return null;
    }

    @Override
    public Object getCodesFromApi() {
        return null;
    }

    @Override
    public Object getNewsFromApi(String stockCode) {
        return null;
    }
}
