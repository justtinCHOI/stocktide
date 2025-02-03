package com.stocktide.stocktideserver.stock.service;

import com.stocktide.stocktideserver.stock.dto.*;
import com.stocktide.stocktideserver.stock.entity.*;
import com.stocktide.stocktideserver.stock.mapper.ApiMapper;
import jakarta.transaction.Transactional;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

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
    @Value("${stock-url.overseas.stockInf}")
    private String STOCKINF_URL;

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
    @Value("${stock-url.overseas.stockDetail}")
    private String STOCKDETAIL_URL;

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

    private final String AUTH = "";
    private final String EXCD = "NAS"; // 나스닥



    private final String FID_ETC_CLS_CODE = "";
    private final String FID_COND_MRKT_DIV_CODE = "J"; // 시장구분코드 (주식 J)
    // private final String FID_INPUT_HOUR_1 = "153000";
    private final String FID_PW_DATA_INCU_YN = "Y";
    private final String CUST_TYPE = "P";
    private final String PRDT_TYPE_CD= "512"; //  512: 나스닥

    private final RestTemplate restTemplate;
    private final TokenService tokenService;
    private final ApiMapper apiMapper;

    @Autowired
    public OverseasApiService(RestTemplate restTemplate, TokenService tokenService,  ApiMapper apiMapper) {
        this.restTemplate = restTemplate;
        this.tokenService = tokenService;
        this.apiMapper = apiMapper;
    }

    public StockInfOverseasDataDto getStockInfDataFromApi(String stockCode){
        log.info("---------------getStockInfDataFromApi  started----------------------------------------");
        String token = tokenService.getAccessToken();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + token);
        headers.add("appkey", APP_KEY);
        headers.add("appsecret", APP_SECRET);
        headers.add("tr_id", "HHDFS00000300");
        headers.add("custtype", CUST_TYPE);

        // AUTH: 공백
        // EXCD: 시장 (NAS: 나스닥)
        // SYMB: 종목코드

        String uri = STOCKINF_URL + "?" +
                "AUTH=" + AUTH +
                "&" + "EXCD=" + EXCD +
                "&" + "SYMB=" + stockCode;

        log.info("---------------getStockInfDataFromApi  request send----------------------------------------");

        ResponseEntity<StockInfOverseasDataDto> response = restTemplate.exchange(
                uri,
                HttpMethod.GET,
                new HttpEntity<>(headers),
                StockInfOverseasDataDto.class
        );
        if (response.getStatusCode().is2xxSuccessful()) {
            StockInfOverseasDataDto stockInfOverseasDataDto = response.getBody();
            log.info("---------------getStockInfDataFromApi successfully finished----------------------------------------");
            return stockInfOverseasDataDto;
        } else {
            log.info("error");
            log.info("---------------getStockInfDataFromApi  error----------------------------------------");
            return null;
        }

    }

    @Override
    public StockAsBiOverseasDataDto getStockAsBiDataFromApi(String stockCode){
        log.info("---------------getStockAsBiDataFromApi  started----------------------------------------");
        String token = tokenService.getAccessToken();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + token);
        headers.add("appkey", APP_KEY);
        headers.add("appsecret", APP_SECRET);
        headers.add("tr_id", "HHDFS76200100");
        headers.add("custtype", CUST_TYPE);

        // AUTH: 공백
        // EXCD: 시장 (NAS: 나스닥)
        // SYMB: 종목코드

        String uri = STOCKASBI_URL + "?" +
                "AUTH=" + AUTH +
                "&" + "EXCD=" + EXCD +
                "&" + "SYMB=" + stockCode;

        log.info("---------------getStockAsBiDataFromApi  request send----------------------------------------");

        ResponseEntity<StockAsBiOverseasDataDto> response = restTemplate.exchange(
                uri,
                HttpMethod.GET,
                new HttpEntity<>(headers),
                StockAsBiOverseasDataDto.class
        );
        if (response.getStatusCode().is2xxSuccessful()) {
            StockAsBiOverseasDataDto StockAsBiOverseasDataDto = response.getBody();
            assert StockAsBiOverseasDataDto != null;
            log.info("---------------getStockAsBiDataFromApi successfully finished----------------------------------------, {}", StockAsBiOverseasDataDto.getOutput2().getPbid1());
            return StockAsBiOverseasDataDto;
        } else {
            log.info("error");
            log.info("---------------getStockAsBiDataFromApi  error----------------------------------------");
            return null;
        }
    }

    @Override
    public StockMinOverseasDto getStockMinDataFromApi(String stockCode, String strHour) {
        log.info("---------------getStockMinDataFromApi  started----------------------------------------");
        String token = tokenService.getAccessToken();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + token);
        headers.add("appkey", APP_KEY);
        headers.add("appsecret", APP_SECRET);
        headers.add("tr_id", "HHDFS76950200");
        headers.add("custtype", CUST_TYPE);

        // AUTH: 공백
        // EXCD: 시장 (NAS: 나스닥)
        // SYMB: 종목코드
        // NMIN:
        // PINC:
        // NEXT:
        // NREC:
        // FILL:
        // KEYB:

        String uri = STOCKASBI_URL + "?" +
                "AUTH=" + AUTH +
                "&" + "EXCD=" + EXCD +
                "&" + "SYMB=" + stockCode +
                "&" + "NMIN=" + 1 +
                "&" + "PINC=" + 1 +
                "&" + "NEXT=" +
                "&" + "NREC=" + 120 +
                "&" + "FILL=" + 1 +
                "&" + "KEYB=";

        ResponseEntity<StockMinOverseasDto> response = restTemplate.exchange(
                uri,
                HttpMethod.GET,
                new HttpEntity<>(headers),
                StockMinOverseasDto.class
        );

        if (response.getStatusCode().is2xxSuccessful()) {
            StockMinOverseasDto stockMinOverseasDto = response.getBody();
            log.info("---------------getStockMinDataFromApi  finished----------------------------------------");

            return stockMinOverseasDto;

        } else {
            log.info("error");
            log.info("---------------getStockMinDataFromApi  err----------------------------------------");

            return null;
        }
    }

    @Override
    public Object getMarketMonthDataFromApi() {
        return null;
    }

    @Override
    public StockBasicOverseasDto getStockBasicDataFromApi(String stockCode) {
        log.info("---------------getStockBasicDataFromApi  started----------------------------------------");
        try {
            String token = tokenService.getAccessToken();

            HttpHeaders headers = new HttpHeaders();
            headers.add("Authorization", "Bearer " + token);
            headers.add("appkey", APP_KEY);
            headers.add("appsecret", APP_SECRET);
            headers.add("tr_id", "CTPF1702R");
            headers.add("custtype", CUST_TYPE);
            headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

            String uri = STOCKBASIC_URL + "?" +
                    "PRDT_TYPE_CD=" + PRDT_TYPE_CD +
                    "&" + "PDNO=" + stockCode;

            ResponseEntity<StockBasicOverseasDto> response = restTemplate.exchange(
                    uri,
                    HttpMethod.GET,
                    new HttpEntity<>(headers),
                    StockBasicOverseasDto.class
            );
            log.info("---------------getStockBasicDataFromApi  finished----------------------------------------");
            return response.getBody();
        } catch (Exception e) {
            log.info("---------------getStockBasicDataFromApi  err----------------------------------------");
            throw new RuntimeException("Error parsing response: " + e.getMessage(), e);
        }
    }

    public StockDetailOverseasDto getStockDetailDataFromApi(String stockCode) {
        log.info("---------------getStockDetailDataFromApi  started----------------------------------------");
        try {
            String token = tokenService.getAccessToken();

            HttpHeaders headers = new HttpHeaders();
            headers.add("Authorization", "Bearer " + token);
            headers.add("appkey", APP_KEY);
            headers.add("appsecret", APP_SECRET);
            headers.add("tr_id", "HHDFS76200200");
            headers.add("custtype", CUST_TYPE);
            headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

            String uri = STOCKDETAIL_URL + "?" +
                    "AUTH=" + AUTH +
                    "&" + "EXCD=" + EXCD +
                    "&" + "SYMB=" + stockCode;

            ResponseEntity<StockDetailOverseasDto> response = restTemplate.exchange(
                    uri,
                    HttpMethod.GET,
                    new HttpEntity<>(headers),
                    StockDetailOverseasDto.class
            );
            log.info("---------------getStockDetailDataFromApi  finished----------------------------------------");
            return response.getBody();
        } catch (Exception e) {
            log.info("---------------getStockDetailDataFromApi  err----------------------------------------");
            throw new RuntimeException("Error parsing response: " + e.getMessage(), e);
        }
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
        String stockCode = company.getCode();
        StockBasicOverseasDto stockBasicOverseasDto = getStockBasicDataFromApi(stockCode);
        StockName stockName = new StockName();
        stockName.setEngName(stockBasicOverseasDto.getOutput().getPrdt_eng_name());
        stockName.setKorName(stockBasicOverseasDto.getOutput().getPrdt_name());
        return stockName;
    }

    @Override
    public StockAsBi getStockAsBiFromApi(Company company) {
        String stockCode = company.getCode();
        StockAsBiOverseasDataDto stockAsBiOverseasDataDto = getStockAsBiDataFromApi(stockCode);
        StockAsBi stockAsBi = apiMapper.stockAsBiOverseasDtoToStockAsBi(stockAsBiOverseasDataDto.getOutput2());
        stockAsBi.setCompany(company);
        StockAsBi oldStockAsBi = company.getStockAsBi();
        if(oldStockAsBi != null){
            stockAsBi.setStockAsBiId(oldStockAsBi.getStockAsBiId());
        }
        return stockAsBi;
    }

    @Override
    public List<StockMin> getStockMinFromApi(Company company, String strHour) {
        String stockCode = company.getCode();
        LocalDateTime now = LocalDateTime.now();
        StockMinOverseasDto stockMinOverseasDto = getStockMinDataFromApi(stockCode, strHour);
        // dto -> entity 전환, 최신일자
        return Arrays.stream(stockMinOverseasDto.getOutput2())
                .map(stockMinOutput2 -> {
                    StockMin stockMin = apiMapper.stockMinOverseasOutput2ToStockMin(stockMinOutput2);
                    stockMin.setCompany(company);
                    stockMin.setStockTradeTime(now);
                    return stockMin;
                }).sorted(Comparator.comparing(StockMin::getStockTradeTime)).collect(Collectors.toList());
    }

    @Override
    public StockInf getStockInfFromApi(Company company, String strHour) {
        String stockCode = company.getCode();
        StockInfOverseasDataDto stockInfOverseasDataDto = getStockInfDataFromApi(stockCode);
        StockInf stockInf = apiMapper.stockInfOverseasDtoToStockInf(stockInfOverseasDataDto.getOutput());
        stockInf.setCompany(company);
        StockInf oldStockInf = company.getStockInf();
        if(oldStockInf != null){
            stockInf.setStockInfId(oldStockInf.getStockInfId());
        }
        return stockInf;
    }

    @Override
    public StockBasic getStockBasicFromApi(Company company) {
        String stockCode = company.getCode();
        StockBasicOverseasDto stockBasicOverseasDto = getStockBasicDataFromApi(stockCode);
        StockDetailOverseasDto stockDetailOverseasDto =  getStockDetailDataFromApi(stockCode);

        StockBasic stockBasic = new StockBasic();
        stockBasic.setPdno(stockBasicOverseasDto.getOutput().getStd_pdno());
        stockBasic.setPrdt_abrv_name(stockBasicOverseasDto.getOutput().getPrdt_name());
        stockBasic.setPrdt_eng_abrv_name(stockBasicOverseasDto.getOutput().getPrdt_eng_name());
        stockBasic.setLstg_stqt(stockDetailOverseasDto.getOutput().getShar());
        stockBasic.setCpta(stockDetailOverseasDto.getOutput().getMcap());
        stockBasic.setPapr(stockDetailOverseasDto.getOutput().getE_parp());

        return stockBasic;
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
