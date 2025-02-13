package com.stocktide.stocktideserver.stock.service;

import com.stocktide.stocktideserver.exception.BusinessLogicException;
import com.stocktide.stocktideserver.exception.ExceptionCode;
import com.stocktide.stocktideserver.stock.dto.overseas.*;
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

/**
 * 해외 주식 API 서비스
 * 한국투자증권 API를 통해 해외 주식 정보를 조회합니다.
 * 현재는 나스닥 시장 데이터만 지원합니다.
 *
 * @author StockTide Dev Team
 * @version 1.0
 * @since 2025-02-03
 */
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

    /** 기본 인증 토큰 */
    private final String AUTH = "";

    /** 나스닥 시장 코드 */
    private final String EXCD = "NAS";

    /** 사용자 타입 (P: 개인) */
    private final String CUST_TYPE = "P";

    /** 입력 종목코드	(512: 나스닥) */
    private final String PRDT_TYPE_CD= "512"; //

    private final RestTemplate restTemplate;
    private final TokenService tokenService;
    private final ApiMapper apiMapper;

    @Autowired
    public OverseasApiService(RestTemplate restTemplate, TokenService tokenService,  ApiMapper apiMapper) {
        this.restTemplate = restTemplate;
        this.tokenService = tokenService;
        this.apiMapper = apiMapper;
    }

    /**
     * 주식 현재가 정보를 조회합니다.
     *
     * @param stockCode 종목 코드
     * @return StockInfOverseasDataDto 현재가 정보
     * @throws RuntimeException API 호출 실패 시
     */
    public StockInfOverseasDto getStockInfDataFromApi(String stockCode){
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

        ResponseEntity<StockInfOverseasDto> response = restTemplate.exchange(
                uri,
                HttpMethod.GET,
                new HttpEntity<>(headers),
                StockInfOverseasDto.class
        );
        if (response.getStatusCode().is2xxSuccessful()) {
            StockInfOverseasDto stockInfOverseasDataDto = response.getBody();
            log.info("---------------getStockInfDataFromApi successfully finished----------------------------------------");
            return stockInfOverseasDataDto;
        } else {
            log.info("error");
            log.info("---------------getStockInfDataFromApi  error----------------------------------------");
            return null;
        }

    }

    @Override
    public StockAsBiOverseasDto getStockAsBiDataFromApi(String stockCode){
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

        ResponseEntity<StockAsBiOverseasDto> response = restTemplate.exchange(
                uri,
                HttpMethod.GET,
                new HttpEntity<>(headers),
                StockAsBiOverseasDto.class
        );
        if (response.getStatusCode().is2xxSuccessful()) {
            StockAsBiOverseasDto StockAsBiOverseasDataDto = response.getBody();
            assert StockAsBiOverseasDataDto != null;
            log.info("---------------getStockAsBiDataFromApi successfully finished----------------------------------------, {}", StockAsBiOverseasDataDto.getOutput2().getPbid1());
            return StockAsBiOverseasDataDto;
        } else {
            log.info("error");
            log.info("---------------getStockAsBiDataFromApi  error----------------------------------------");
            return null;
        }
    }

    /**
     * 해외 주식 분봉 데이터를 조회합니다.
     *
     * @param stockCode 종목 코드
     * @param strHour 조회 시간 (HHMMSS 형식)
     * @return StockMinOverseasDto 분봉 데이터
     * @throws RuntimeException API 호출 실패 시
     */
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

    /**
     * 해외 주식 기본 정보를 조회합니다.
     *
     * @param stockCode 종목 코드
     * @return StockBasicOverseasDto 기본 정보
     * @throws RuntimeException API 호출이나 파싱 오류 시
     */
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

    /**
     * 해외 주식 상세 정보를 조회합니다.
     *
     * @param stockCode 종목 코드
     * @return StockDetailOverseasDto 상세 정보
     * @throws RuntimeException API 호출이나 파싱 오류 시
     */
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


    /**
     * 회사 이름 정보를 조회합니다.
     *
     * @param company 회사 정보
     * @return StockName 회사 이름 정보(영문명, 한글명)
     */
    @Override
    public StockName getStockNameFromApi(Company company) {
        String stockCode = company.getCode();
        StockBasicOverseasDto stockBasicOverseasDto = getStockBasicDataFromApi(stockCode);
        StockName stockName = new StockName();
        stockName.setEngName(stockBasicOverseasDto.getOutput().getPrdt_eng_name());
        stockName.setKorName(stockBasicOverseasDto.getOutput().getPrdt_name());
        return stockName;
    }

    /**
     * 해외 주식 호가 정보를 조회하여 Entity로 변환합니다.
     *
     * @param company 회사 정보
     * @return StockAsBi 호가 정보 Entity
     */
    @Override
    public StockAsBi getStockAsBiFromApi(Company company) {
        String stockCode = company.getCode();
        StockAsBiOverseasDto stockAsBiOverseasDataDto = getStockAsBiDataFromApi(stockCode);
        StockAsBi stockAsBi = apiMapper.stockAsBiOverseasDtoToStockAsBi(stockAsBiOverseasDataDto.getOutput2());
        stockAsBi.setCompany(company);
        StockAsBi oldStockAsBi = company.getStockAsBi();
        if(oldStockAsBi != null){
            stockAsBi.setStockAsBiId(oldStockAsBi.getStockAsBiId());
        }
        return stockAsBi;
    }

    /**
     * 분봉 데이터를 조회하여 Entity 리스트로 변환합니다.
     *
     * @param company 회사 정보
     * @param strHour 조회 시간
     * @return List<StockMin> 분봉 데이터 Entity 리스트
     */
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

    /**
     * 현재가 정보를 조회하여 Entity로 변환합니다.
     *
     * @param company 회사 정보
     * @param strHour 조회 시간
     * @return StockInf 현재가 정보 Entity
     * @throws BusinessLogicException STOCKINF_NOT_FOUND - 주식 현재가 정보를 찾을 수 없는 경우
     */
    @Override
    public StockInf getStockInfFromApi(Company company, String strHour) {
        String stockCode = company.getCode();
        StockInfOverseasDto stockInfOverseasDataDto = getStockInfDataFromApi(stockCode);
        if (stockInfOverseasDataDto == null || stockInfOverseasDataDto.getOutput() == null) {
            throw new BusinessLogicException(ExceptionCode.STOCKINF_NOT_FOUND);
        }
        StockInf stockInf = apiMapper.stockInfOverseasDtoToStockInf(stockInfOverseasDataDto.getOutput());
        stockInf.setCompany(company);
        StockInf oldStockInf = company.getStockInf();
        if(oldStockInf != null){
            stockInf.setStockInfId(oldStockInf.getStockInfId());
        }
        return stockInf;
    }

    /**
     * 주식 기본 정보를 조회하여 Entity로 변환합니다.
     *
     * @param company 회사 정보
     * @return StockBasic 기본 정보 Entity
     * @throws RuntimeException API 호출이나 데이터 파싱 실패 시
     */
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
    public List<StockNews> getStockNewsFromApi(Company company) {
        return null;
    }
}
