package com.stocktide.stocktideserver.stock.service;

import com.stocktide.stocktideserver.exception.BusinessLogicException;
import com.stocktide.stocktideserver.stock.dto.common.StockListResponseDto;
import com.stocktide.stocktideserver.stock.dto.domestic.*;
import com.stocktide.stocktideserver.stock.entity.*;
import com.stocktide.stocktideserver.stock.mapper.ApiMapper;
import com.stocktide.stocktideserver.util.Time;
import jakarta.transaction.Transactional;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.stocktide.stocktideserver.exception.ExceptionCode;


import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 국내 주식 API 서비스
 * 한국투자증권 API를 통해 국내 주식 정보를 조회합니다.
 *
 * @author StockTide Dev Team
 * @version 1.0
 * @since 2025-02-03
 */
@Service
@Transactional
@Slf4j
public class DomesticApiService extends AbstractStockApiService {
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
    @Value("${stock-url.domestic.stockasbi}")
    private String STOCKASBI_URL;

    @Getter
    @Value("${stock-url.domestic.stockhour}")
    private String STOCKHOUR_URL;

    @Getter
    @Value("${stock-url.domestic.kospi}")
    private String KOSPI_URL;

    @Getter
    @Value("${stock-url.domestic.stockBasic}")
    private String STOCKBASIC_URL;

    @Getter
    @Value("${stock-url.domestic.stockBalance}")
    private String STOCKBALANCE_URL;

    @Getter
    @Value("${stock-url.domestic.stockIncome}")
    private String STOCKINCOME_URL;

    @Getter
    @Value("${stock-url.domestic.stockFinancial}")
    private String STOCKFINANCIAL_URL;

    @Getter
    @Value("${stock-url.domestic.stockProfit}")
    private String STOCKPROFIT_URL;

    @Getter
    @Value("${stock-url.domestic.stockOther}")
    private String STOCKOTHER_URL;

    @Getter
    @Value("${stock-url.domestic.stockStability}")
    private String STOCKSTABILITY_URL;

    @Getter
    @Value("${stock-url.domestic.stockGrowth}")
    private String STOCKGROWTH_URL;

    @Getter
    @Value("${stock-url.domestic.stockCredit}")
    private String STOCKCREDIT_URL;

    @Getter
    @Value("${stock-url.domestic.stockNews}")
    private String STOCKNEWS_URL;

    /** 기타 FID 구분 코드 */
    private final String FID_ETC_CLS_CODE = "";

    /** 시장구분코드 (주식 J) */
    private final String FID_COND_MRKT_DIV_CODE = "J";

    /** 데이터 포함 여부 (Y: 이후데이터도 조회) */
    private final String FID_PW_DATA_INCU_YN = "Y";

    /** 사용자 타입 (P: 개인) */
    private final String CUST_TYPE = "P";

    /** 순위 정렬 구분 코드 (0:코드순, 1:이름순) */
    private final String FID_RANK_SORT_CLS_CODE = "1";

    /** 선택 여부	(0:신용주문가능, 1: 신용주문불가) */
    private final String FID_SLCT_YN = "0";

    /** 입력 종목코드	(2001:코스피) */
    private final String FID_INPUT_ISCD = "2001";

    /** 조건 화면 분류 코드 (Unique key(20477)) */
    private final String FID_COND_SCR_DIV_CODE = "20477";

    /** 시장구분 코드 (300: 주식, ETF, ETN, ELW, 301:선물옵션, 302 : 채권, 306 : ELS) */
    private final String PRDT_TYPE_CD= "300";

    /** 데이터 범위 (0: 년, 1: 분기) */
    private final String FID_DIV_CLS_CODE= "0"; //

    private final RestTemplate restTemplate;
    private final TokenService tokenService;
    private final ApiMapper apiMapper;

    @Autowired
    public DomesticApiService(RestTemplate restTemplate, TokenService tokenService,  ApiMapper apiMapper) {
        this.restTemplate = restTemplate;
        this.tokenService = tokenService;
        this.apiMapper = apiMapper;
    }

    /**
     * 주식 호가 데이터를 조회합니다.
     *
     * @param stockCode 종목 코드
     * @return StockAsBiDataDto 호가 데이터
     * @throws RuntimeException API 호출 실패 시
     */
    @Override
    public StockAsBiDomesticDto getStockAsBiDataFromApi(String stockCode){
        log.info("---------------getStockAsBiDataFromApi  started----------------------------------------");
        String token = tokenService.getAccessToken();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + token);
        headers.add("appkey", APP_KEY);
        headers.add("appsecret", APP_SECRET);
        headers.add("tr_id", "FHKST01010200");

        //FID_COND_MRKT_DIV_CODE : 시장 분류 코드 (J : 주식)
        //FID_INPUT_ISCD : 종목번호

        String uri = STOCKASBI_URL + "?FID_COND_MRKT_DIV_CODE=J&FID_INPUT_ISCD=" + stockCode;

        HttpEntity<String> entity = new HttpEntity<>("parameters", headers);

        log.info("---------------getStockAsBiDataFromApi  request send----------------------------------------");

        ResponseEntity<StockAsBiDomesticDto> response = restTemplate.exchange(
                uri,
                HttpMethod.GET,
                new HttpEntity<>(headers),
                StockAsBiDomesticDto.class
        );
        if (response.getStatusCode().is2xxSuccessful()) {
            StockAsBiDomesticDto stockasbiDataDto = response.getBody();
            log.info("---------------getStockAsBiDataFromApi successfully finished getOutput1 getAskp1: {}----------------------------------------", stockasbiDataDto.getOutput1().getAskp1());
            return stockasbiDataDto;
        } else {
            log.info("error");
            log.info("---------------getStockAsBiDataFromApi  error----------------------------------------");
            return null;
        }

    }


    /**
     * 주식 분봉 데이터를 조회합니다.
     *
     * @param stockCode 종목 코드
     * @param strHour 조회 시간 (HHMMSS 형식)
     * @return StockMinDto 분봉 데이터
     * @throws RuntimeException API 호출 실패 시
     */
    @Override
    public StockMinDomesticDto getStockMinDataFromApi(String stockCode, String strHour) {
        log.info("---------------getStockMinDataFromApi  started----------------------------------------");
        String token = tokenService.getAccessToken();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + token);
        headers.add("appkey", APP_KEY);
        headers.add("appsecret", APP_SECRET);
        headers.add("tr_id", "FHKST03010200");

        //FID_COND_MRKT_DIV_CODE : 시장 분류 코드 (J : 주식)
        //FID_INPUT_ISCD : 종목번호 
        //FID_ETC_CLS_CODE : 기타 구분 코드("")
        //FID_INPUT_HOUR_1 : "123000" 입력 시 12시 30분 이전부터 1분 간격으로 조회
        //FID_PW_DATA_INCU_YN : N : 당일데이터만 조회  Y : 이후데이터도 조회

        String uri = STOCKHOUR_URL + "?FID_COND_MRKT_DIV_CODE=" + FID_COND_MRKT_DIV_CODE + "&FID_INPUT_ISCD=" + stockCode +  "&FID_ETC_CLS_CODE=" + FID_ETC_CLS_CODE
                + "&FID_INPUT_HOUR_1=" + strHour + "&FID_PW_DATA_INCU_YN=" +  FID_PW_DATA_INCU_YN;

        HttpEntity<String> entity = new HttpEntity<>("parameters", headers);

        ResponseEntity<StockMinDomesticDto> response = restTemplate.exchange(
                uri,
                HttpMethod.GET,
                new HttpEntity<>(headers),
                StockMinDomesticDto.class
        );

        if (response.getStatusCode().is2xxSuccessful()) {
            StockMinDomesticDto stockMinDto = response.getBody();
            log.info("---------------getStockMinDataFromApi  finished----------------------------------------");

            return stockMinDto;

        } else {
            log.info("error");
            log.info("---------------getStockMinDataFromApi  err----------------------------------------");

            return null;
        }

    }

    /**
     * KOSPI 월간 데이터를 조회합니다.
     *
     * @return String KOSPI 월간 데이터 (JSON 형식)
     * @throws RuntimeException API 호출 실패 시
     */
    @Override
    public String getMarketMonthDataFromApi(){
        String token = tokenService.getAccessToken();

        LocalDateTime localDateTime = LocalDateTime.now();

        String strMonth = Time.strMonth(localDateTime);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + token);
        headers.add("appkey", APP_KEY);
        headers.add("appsecret", APP_SECRET);
        headers.add("tr_id", "FHKUP03500100");

        //FID_COND_MRKT_DIV_CODE : 시장 분류 코드 (U)
        //FID_INPUT_ISCD : (0001 : 종합 0002 : 대형주 )
        //FID_INPUT_DATE_1 :조회 시작일자 (ex. 20220501)
        //FID_INPUT_DATE_2 : 조회 종료일자 (ex. 20220530)
        //FID_PERIOD_DIV_CODE : D:일봉, W:주봉, M:월봉, Y:년봉

        String uri = KOSPI_URL + "?FID_COND_MRKT_DIV_CODE=U&FID_INPUT_ISCD=" + "0001" + "&FID_INPUT_DATE_1=" + "20230101"
                +"&FID_INPUT_DATE_2=" + strMonth + "&FID_PERIOD_DIV_CODE=" + "M";

        HttpEntity<String> entity = new HttpEntity<>("parameters", headers);

        ResponseEntity<String> response = restTemplate.exchange(uri, HttpMethod.GET, entity, String.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            return response.getBody();
        } else {
            log.info("error");
            return null;
        }

    }

    /**
     * 주식 기본 정보를 조회합니다.
     *
     * @param stockCode 종목 코드
     * @return StockBasicDto 기본 정보 데이터
     * @throws RuntimeException API 호출 실패나 파싱 오류 시
     */
    @Override
    public StockBasicDomesticDto getStockBasicDataFromApi(String stockCode) {
        try {
            String token = tokenService.getAccessToken();

            HttpHeaders headers = new HttpHeaders();
            headers.add("Authorization", "Bearer " + token);
            headers.add("appkey", APP_KEY);
            headers.add("appsecret", APP_SECRET);
            headers.add("tr_id", "CTPF1002R");
            headers.add("custtype", CUST_TYPE);
            headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

            String uri = STOCKBASIC_URL
                    + "?"
                    + "PRDT_TYPE_CD=" + PRDT_TYPE_CD
                    + "&PDNO=" + stockCode;

            ResponseEntity<StockBasicDomesticDto> response = restTemplate.exchange(
                    uri,
                    HttpMethod.GET,
                    new HttpEntity<>(headers),
                    StockBasicDomesticDto.class
            );

            return response.getBody();
        } catch (Exception e) {
            log.error("Error fetching stock basic data: ", e);
            throw new RuntimeException("Error parsing response: " + e.getMessage(), e);
        }
    }

    /**
     * 재무상태표 정보를 조회합니다.
     *
     * @param stockCode 종목 코드
     * @return StockBalanceDto 재무상태표 데이터
     * @throws RuntimeException API 호출 실패나 파싱 오류 시
     */
    @Override
    public StockBalanceDomesticDto getStockBalanceDataFromApi(String stockCode) {
        try {
            String token = tokenService.getAccessToken();

            HttpHeaders headers = new HttpHeaders();
            headers.add("Authorization", "Bearer " + token);
            headers.add("appkey", APP_KEY);
            headers.add("appsecret", APP_SECRET);
            headers.add("tr_id", "FHKST66430100");
            headers.add("custtype", CUST_TYPE);
            headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

            String uri = STOCKBALANCE_URL
                    + "?"
                    + "FID_DIV_CLS_CODE=" + FID_DIV_CLS_CODE
                    + "&fid_cond_mrkt_div_code=" + FID_COND_MRKT_DIV_CODE
                    + "&fid_input_iscd=" + stockCode;

            ResponseEntity<StockBalanceDomesticDto> response = restTemplate.exchange(
                    uri,
                    HttpMethod.GET,
                    new HttpEntity<>(headers),
                    StockBalanceDomesticDto.class
            );

            return response.getBody();
        } catch (Exception e) {
            log.error("Error fetching stockBalance: ", e);
            throw new RuntimeException("Error parsing response: " + e.getMessage(), e);
        }
    }

    /**
     * 손익계산서 정보를 조회합니다.
     *
     * @param stockCode 종목 코드
     * @return StockListResponseDto 손익계산서 데이터
     * @throws RuntimeException API 호출 실패나 파싱 오류 시
     */
    @Override
    public StockListResponseDto getStockIncomeDataFromApi(String stockCode) {
        try {
            String token = tokenService.getAccessToken();

            HttpHeaders headers = new HttpHeaders();
            headers.add("Authorization", "Bearer " + token);
            headers.add("appkey", APP_KEY);
            headers.add("appsecret", APP_SECRET);
            headers.add("tr_id", "FHKST66430200");
            headers.add("custtype", CUST_TYPE);
            headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

            String uri = STOCKINCOME_URL
                    + "?"
                    + "FID_DIV_CLS_CODE=" + FID_DIV_CLS_CODE
                    + "&fid_cond_mrkt_div_code=" + FID_COND_MRKT_DIV_CODE
                    + "&fid_input_iscd=" + stockCode;

            ResponseEntity<StockListResponseDto> response = restTemplate.exchange(
                    uri,
                    HttpMethod.GET,
                    new HttpEntity<>(headers),
                    StockListResponseDto.class
            );

            return response.getBody();
        } catch (Exception e) {
            log.error("Error fetching stockIncome: ", e);
            throw new RuntimeException("Error parsing response: " + e.getMessage(), e);
        }
    }

    /**
     * 재무비율 정보를 조회합니다.
     *
     * @param stockCode 종목 코드
     * @return StockFinancialDto 재무비율 데이터
     * @throws RuntimeException API 호출 실패나 파싱 오류 시
     */
    @Override
    public StockFinancialDomesticDto getStockFinancialDataFromApi(String stockCode) {
        try {
            String token = tokenService.getAccessToken();

            HttpHeaders headers = new HttpHeaders();
            headers.add("Authorization", "Bearer " + token);
            headers.add("appkey", APP_KEY);
            headers.add("appsecret", APP_SECRET);
            headers.add("tr_id", "FHKST66430300");
            headers.add("custtype", CUST_TYPE);
            headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

            String uri = STOCKFINANCIAL_URL
                    + "?"
                    + "FID_DIV_CLS_CODE=" + FID_DIV_CLS_CODE
                    + "&fid_cond_mrkt_div_code=" + FID_COND_MRKT_DIV_CODE
                    + "&fid_input_iscd=" + stockCode;

            ResponseEntity<StockFinancialDomesticDto> response = restTemplate.exchange(
                    uri,
                    HttpMethod.GET,
                    new HttpEntity<>(headers),
                    StockFinancialDomesticDto.class
            );

            return response.getBody();
        } catch (Exception e) {
            log.error("Error fetching stockFinancial: ", e);
            throw new RuntimeException("Error parsing response: " + e.getMessage(), e);
        }
    }

    @Override
    public StockProfitDomesticDto getStockProfitDataFromApi(String stockCode) {
        try {
            String token = tokenService.getAccessToken();

            HttpHeaders headers = new HttpHeaders();
            headers.add("Authorization", "Bearer " + token);
            headers.add("appkey", APP_KEY);
            headers.add("appsecret", APP_SECRET);
            headers.add("tr_id", "FHKST66430400");
            headers.add("custtype", CUST_TYPE);
            headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

            String uri = STOCKPROFIT_URL
                    + "?"
                    + "FID_DIV_CLS_CODE=" + FID_DIV_CLS_CODE
                    + "&fid_cond_mrkt_div_code=" + FID_COND_MRKT_DIV_CODE
                    + "&fid_input_iscd=" + stockCode;

            ResponseEntity<StockProfitDomesticDto> response = restTemplate.exchange(
                    uri,
                    HttpMethod.GET,
                    new HttpEntity<>(headers),
                    StockProfitDomesticDto.class
            );

            return response.getBody();
        } catch (Exception e) {
            log.error("Error fetching stockProfit: ", e);
            throw new RuntimeException("Error parsing response: " + e.getMessage(), e);
        }
    }

    @Override
    public StockOtherDomesticDto getStockOtherDataFromApi(String stockCode) {
        try {
            String token = tokenService.getAccessToken();

            HttpHeaders headers = new HttpHeaders();
            headers.add("Authorization", "Bearer " + token);
            headers.add("appkey", APP_KEY);
            headers.add("appsecret", APP_SECRET);
            headers.add("tr_id", "FHKST66430500");
            headers.add("custtype", CUST_TYPE);
            headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

            String uri = STOCKOTHER_URL
                    + "?"
                    + "FID_DIV_CLS_CODE=" + FID_DIV_CLS_CODE
                    + "&fid_cond_mrkt_div_code=" + FID_COND_MRKT_DIV_CODE
                    + "&fid_input_iscd=" + stockCode;

            ResponseEntity<StockOtherDomesticDto> response = restTemplate.exchange(
                    uri,
                    HttpMethod.GET,
                    new HttpEntity<>(headers),
                    StockOtherDomesticDto.class
            );

            return response.getBody();
        } catch (Exception e) {
            log.error("Error fetching StockOther: ", e);
            throw new RuntimeException("Error parsing response: " + e.getMessage(), e);
        }
    }

    @Override
    public StockStabilityDomesticDto getStockStabilityDataFromApi(String stockCode) {
        try {
            String token = tokenService.getAccessToken();

            HttpHeaders headers = new HttpHeaders();
            headers.add("Authorization", "Bearer " + token);
            headers.add("appkey", APP_KEY);
            headers.add("appsecret", APP_SECRET);
            headers.add("tr_id", "CTPF1002R");
            headers.add("custtype", CUST_TYPE);
            headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

            String uri = STOCKSTABILITY_URL
                    + "?"
                    + "FID_DIV_CLS_CODE=" + FID_DIV_CLS_CODE
                    + "&fid_cond_mrkt_div_code=" + FID_COND_MRKT_DIV_CODE
                    + "&fid_input_iscd=" + stockCode;

            ResponseEntity<StockStabilityDomesticDto> response = restTemplate.exchange(
                    uri,
                    HttpMethod.GET,
                    new HttpEntity<>(headers),
                    StockStabilityDomesticDto.class
            );

            return response.getBody();
        } catch (Exception e) {
            log.error("Error fetching StockStability: ", e);
            throw new RuntimeException("Error parsing response: " + e.getMessage(), e);
        }
    }

    @Override
    public StockGrowthDomesticDto getStockGrowthDataFromApi(String stockCode) {
        try {
            String token = tokenService.getAccessToken();

            HttpHeaders headers = new HttpHeaders();
            headers.add("Authorization", "Bearer " + token);
            headers.add("appkey", APP_KEY);
            headers.add("appsecret", APP_SECRET);
            headers.add("tr_id", "CTPF1002R");
            headers.add("custtype", CUST_TYPE);
            headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

            String uri = STOCKGROWTH_URL
                    + "?"
                    + "FID_DIV_CLS_CODE=" + FID_DIV_CLS_CODE
                    + "&fid_cond_mrkt_div_code=" + FID_COND_MRKT_DIV_CODE
                    + "&fid_input_iscd=" + stockCode;

            ResponseEntity<StockGrowthDomesticDto> response = restTemplate.exchange(
                    uri,
                    HttpMethod.GET,
                    new HttpEntity<>(headers),
                    StockGrowthDomesticDto.class
            );

            return response.getBody();
        } catch (Exception e) {
            log.error("Error fetching domestic companies: ", e);
            throw new RuntimeException("Error parsing response: " + e.getMessage(), e);
        }
    }

    @Override
    public StockListResponseDto getCodesDataFromApi() {
        try {
            String token = tokenService.getAccessToken();

            HttpHeaders headers = new HttpHeaders();
            headers.add("Authorization", "Bearer " + token);
            headers.add("appkey", APP_KEY);
            headers.add("appsecret", APP_SECRET);
            headers.add("tr_id", "FHPST04770000");
            headers.add("custtype", CUST_TYPE);
            headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

            String uri = STOCKCREDIT_URL
                    + "?"
                    + "fid_rank_sort_cls_code=" + FID_RANK_SORT_CLS_CODE
                    + "&fid_slct_yn=" + FID_SLCT_YN
                    + "&fid_input_iscd=" + FID_INPUT_ISCD
                    + "&fid_cond_scr_div_code=" + FID_COND_SCR_DIV_CODE
                    + "&fid_cond_mrkt_div_code=" + FID_COND_MRKT_DIV_CODE;

            ResponseEntity<StockListResponseDto> response = restTemplate.exchange(
                    uri,
                    HttpMethod.GET,
                    new HttpEntity<>(headers),
                    StockListResponseDto.class
            );

            return response.getBody();
        } catch (Exception e) {
            log.error("Error fetching domestic companies: ", e);
            throw new RuntimeException("Error parsing response: " + e.getMessage(), e);
        }
    }

    @Override
    public StockNewsDomesticDto getNewsDataFromApi(String stockCode) {
        try {
            String token = tokenService.getAccessToken();

            HttpHeaders headers = new HttpHeaders();
            headers.add("Authorization", "Bearer " + token);
            headers.add("appkey", APP_KEY);
            headers.add("appsecret", APP_SECRET);
            headers.add("tr_id", "FHKST01011800");
            headers.add("custtype", CUST_TYPE);
            headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

            String uri = STOCKNEWS_URL
                    + "?"
                    + "FID_NEWS_OFER_ENTP_CODE="
                    + "&FID_COND_MRKT_CLS_CODE="
                    + "&FID_INPUT_ISCD=" + stockCode
                    + "&FID_TITL_CNTT="
                    + "&FID_INPUT_DATE_1="
                    + "&FID_INPUT_HOUR_1="
                    + "&FID_RANK_SORT_CLS_CODE="
                    + "&FID_INPUT_SRNO=";

            ResponseEntity<StockNewsDomesticDto> response = restTemplate.exchange(
                    uri,
                    HttpMethod.GET,
                    new HttpEntity<>(headers),
                    StockNewsDomesticDto.class
            );
            if(response.getBody() != null) {
                log.info("response.getBody().getRt_cd(): {}", response.getBody().getRt_cd());
                log.info("response.getBody().getMsg_cd(): {}", response.getBody().getMsg_cd());
                log.info("response.getBody().getMsg1(): {}", response.getBody().getMsg1());
            }
            return response.getBody();
        } catch (Exception e) {
            log.error("Error fetching news: ", e);
            throw new RuntimeException("Error parsing response: " + e.getMessage(), e);
        }
    }

    /**
     * 회사 이름 정보를 조회합니다.
     *
     * @param company 회사 정보
     * @return StockName 회사 이름 정보(한글명, 영문명)
     */
    @Override
    public StockName getStockNameFromApi(Company company) {
        String stockCode = company.getCode();
        StockBasicDomesticDto stockBasicDto = getStockBasicDataFromApi(stockCode);
        StockName stockName = new StockName();
        stockName.setEngName(stockBasicDto.getOutput().getPrdt_eng_abrv_name());
        stockName.setKorName(stockBasicDto.getOutput().getPrdt_abrv_name());
        return stockName;
    }

    /**
     * 호가 정보를 조회하여 Entity로 변환합니다.
     *
     * @param company 회사 정보
     * @return StockAsBi 호가 정보 Entity
     */
    @Override
    public StockAsBi getStockAsBiFromApi(Company company) {
        String stockCode = company.getCode();
        StockAsBiDomesticDto stockasbiDataDto = getStockAsBiDataFromApi(stockCode);
        StockAsBi stockAsBi = apiMapper.stockAsBiOutput1ToStockAsBi(stockasbiDataDto.getOutput1());
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
        StockMinDomesticDto stockMinDto = getStockMinDataFromApi(stockCode, strHour);
        // dto -> entity 전환, 최신일자
        return stockMinDto.getOutput2().stream()
                .map(stockMinOutput2 -> {
                    StockMin stockMin = apiMapper.stockMinOutput2ToStockMin(stockMinOutput2);
                    stockMin.setCompany(company);
                    stockMin.setStockTradeTime(now);
                    return stockMin;
                }).sorted(Comparator.comparing(StockMin::getStockTradeTime)).collect(Collectors.toList());
    }

    /**
     * 주식 현재가 정보를 조회하여 Entity로 변환합니다.
     *
     * @param company 회사 정보
     * @param strHour 조회 시간
     * @return StockInf 주식 현재가 정보 Entity
     * @throws BusinessLogicException STOCKINF_NOT_FOUND - 주식 현재가 정보를 찾을 수 없는 경우
     */
    @Override
    public StockInf getStockInfFromApi(Company company, String strHour) {
        String stockCode = company.getCode();
        StockMinDomesticDto stockMinDto = getStockMinDataFromApi(stockCode, strHour);
        if (stockMinDto == null || stockMinDto.getOutput1() == null) {
            throw new BusinessLogicException(ExceptionCode.STOCKINF_NOT_FOUND);
        }
        StockInf stockInf = apiMapper.stockMinOutput1ToStockInf(stockMinDto.getOutput1());
        stockInf.setCompany(company);
        StockInf oldStockInf = company.getStockInf();
        if(oldStockInf != null){
            stockInf.setStockInfId(oldStockInf.getStockInfId());
        }
        return stockInf;
    }

    /**
     * 주식 기본 정보를 조회하여 Entity로 변환합니다.
     * 종목 번호, 종목명, 상장주식수, 자본금, 액면가 등의 기본 정보를 포함합니다.
     *
     * @param company 회사 정보
     * @return StockBasic 주식 기본 정보 Entity
     * @throws RuntimeException API 호출이나 데이터 파싱 실패 시
     */
    @Override
    public StockBasic getStockBasicFromApi(Company company) {
        String stockCode = company.getCode();
        StockBasicDomesticDto stockBasicDto = getStockBasicDataFromApi(stockCode);
        return apiMapper.stockBasicDtoToStockBasic(stockBasicDto.getOutput());
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

    /**
     * 국내 주식의 최신 뉴스 정보를 API로부터 조회합니다.
     * 뉴스 데이터에는 뉴스 제목, 발행 일시, 출처 등이 포함됩니다.
     *
     * @param company 뉴스를 조회할 회사 엔티티
     * @return List<StockNews> 해당 회사의 뉴스 목록
     * @throws RuntimeException API 호출 실패나 데이터 파싱 오류 시
     */
    @Override
    public List<StockNews> getStockNewsFromApi(Company company) {
        String stockCode = company.getCode();
        StockNewsDomesticDto stockNewsDto = getNewsDataFromApi(stockCode);

        if (stockNewsDto == null || stockNewsDto.getOutput() == null) {
            log.warn("No news data received for company code: {}", stockCode);
            return Collections.emptyList();
        }

        return stockNewsDto.getOutput().stream()
                .map(apiMapper::newsOutputToStockNews)
                .collect(Collectors.toList());
    }

}
