package com.stocktide.stocktideserver.stock.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.stocktide.stocktideserver.stock.dto.*;
import com.stocktide.stocktideserver.stock.repository.CompanyRepository;
import com.stocktide.stocktideserver.util.Time;
import jakarta.transaction.Transactional;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.Collections;


@Service
@Transactional
@Slf4j
public class ApiCallService {
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
    @Value("${stock-url.stockasbi}")
    private String STOCKASBI_URL;

    @Getter
    @Value("${stock-url.stockhour}")
    private String STOCKHOUR_URL;

    @Getter
    @Value("${stock-url.kospi}")
    private String KOSPI_URL;

    @Getter
    @Value("${stock-url.stockBasic}")
    private String STOCKBASIC_URL;

    @Getter
    @Value("${stock-url.stockBalance}")
    private String STOCKBALANCE_URL;

    @Getter
    @Value("${stock-url.stockIncome}")
    private String STOCKINCOME_URL;

    @Getter
    @Value("${stock-url.stockFinancial}")
    private String STOCKFINANCIAL_URL;

    @Getter
    @Value("${stock-url.stockProfit}")
    private String STOCKPROFIT_URL;

    @Getter
    @Value("${stock-url.stockOther}")
    private String STOCKOTHER_URL;

    @Getter
    @Value("${stock-url.stockStability}")
    private String STOCKSTABILITY_URL;

    @Getter
    @Value("${stock-url.stockGrowth}")
    private String STOCKGROWTH_URL;

    @Getter
    @Value("${stock-url.stockCredit}")
    private String STOCKCREDIT_URL;

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

    public ApiCallService(RestTemplate restTemplate, TokenService tokenService) {
        this.restTemplate = restTemplate;
        this.tokenService = tokenService;
    }


    public StockasbiDataDto getStockasbiDataFromApi(String stockCode){
        log.info("---------------getStockasbiDataFromApi  started----------------------------------------");
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

        log.info("---------------getStockasbiDataFromApi  request send----------------------------------------");

        ResponseEntity<StockasbiDataDto> response = restTemplate.exchange(uri, HttpMethod.GET, entity, new ParameterizedTypeReference<StockasbiDataDto>() {});

        if (response.getStatusCode().is2xxSuccessful()) {
            StockasbiDataDto stockasbiDataDto = response.getBody();
            log.info("---------------getStockasbiDataFromApi successfully finished getOutput1 getAskp1: {}----------------------------------------", stockasbiDataDto.getOutput1().getAskp1());
            return stockasbiDataDto;
        } else {
            log.info("error");
            log.info("---------------getStockasbiDataFromApi  error----------------------------------------");
            return null;
        }

    }

    public StockMinDto getStockMinDataFromApi(String stockCode, String strHour) {
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

        ResponseEntity<StockMinDto> response = restTemplate.exchange(uri, HttpMethod.GET, entity, new ParameterizedTypeReference<StockMinDto>() {});

        if (response.getStatusCode().is2xxSuccessful()) {
            StockMinDto stockMinDto = response.getBody();
            log.info("---------------getStockMinDataFromApi  finished----------------------------------------");

            return stockMinDto;

        } else {
            log.info("error");
            log.info("---------------getStockMinDataFromApi  err----------------------------------------");

            return null;
        }

    }

    public String getKospiMonthFromApi(){
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

    public StockBasicDto getStockBasicFromApi(String stockCode) {
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

            ResponseEntity<StockBasicDto> response = restTemplate.exchange(
                    uri,
                    HttpMethod.GET,
                    new HttpEntity<>(headers),
                    StockBasicDto.class
            );

            return response.getBody();
        } catch (Exception e) {
            log.error("Error fetching stockBasic: ", e);
            log.error("Error details: ", e);
            throw new RuntimeException("Error parsing response: " + e.getMessage(), e);
        }
    }

    public StockBalanceDto getStockBalanceFromApi(String stockCode) {
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

            ResponseEntity<StockBalanceDto> response = restTemplate.exchange(
                    uri,
                    HttpMethod.GET,
                    new HttpEntity<>(headers),
                    StockBalanceDto.class
            );

            return response.getBody();
        } catch (Exception e) {
            log.error("Error fetching stockBalance: ", e);
            log.error("Error details: ", e);
            throw new RuntimeException("Error parsing response: " + e.getMessage(), e);
        }
    }


    public StockListResponseDto getStockIncomeFromApi(String stockCode) {
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
            log.error("Error details: ", e);
            throw new RuntimeException("Error parsing response: " + e.getMessage(), e);
        }
    }

    public StockFinancialDto getStockFinancialFromApi(String stockCode) {
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

            ResponseEntity<StockFinancialDto> response = restTemplate.exchange(
                    uri,
                    HttpMethod.GET,
                    new HttpEntity<>(headers),
                    StockFinancialDto.class
            );

            return response.getBody();
        } catch (Exception e) {
            log.error("Error fetching stockFinancial: ", e);
            log.error("Error details: ", e);
            throw new RuntimeException("Error parsing response: " + e.getMessage(), e);
        }
    }

    public StockProfitDto getStockProfitFromApi(String stockCode) {
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

            ResponseEntity<StockProfitDto> response = restTemplate.exchange(
                    uri,
                    HttpMethod.GET,
                    new HttpEntity<>(headers),
                    StockProfitDto.class
            );

            return response.getBody();
        } catch (Exception e) {
            log.error("Error fetching stockProfit: ", e);
            log.error("Error details: ", e);
            throw new RuntimeException("Error parsing response: " + e.getMessage(), e);
        }
    }

    public StockOtherDto getStockOtherFromApi(String stockCode) {
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

            ResponseEntity<StockOtherDto> response = restTemplate.exchange(
                    uri,
                    HttpMethod.GET,
                    new HttpEntity<>(headers),
                    StockOtherDto.class
            );

            return response.getBody();
        } catch (Exception e) {
            log.error("Error fetching StockOther: ", e);
            log.error("Error details: ", e);
            throw new RuntimeException("Error parsing response: " + e.getMessage(), e);
        }
    }

    public StockStabilityDto getStockStabilityFromApi(String stockCode) {
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

            ResponseEntity<StockStabilityDto> response = restTemplate.exchange(
                    uri,
                    HttpMethod.GET,
                    new HttpEntity<>(headers),
                    StockStabilityDto.class
            );

            return response.getBody();
        } catch (Exception e) {
            log.error("Error fetching StockStability: ", e);
            log.error("Error details: ", e);
            throw new RuntimeException("Error parsing response: " + e.getMessage(), e);
        }
    }

    public StockGrowthDto getStockGrowthFromApi(String stockCode) {
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

            ResponseEntity<StockGrowthDto> response = restTemplate.exchange(
                    uri,
                    HttpMethod.GET,
                    new HttpEntity<>(headers),
                    StockGrowthDto.class
            );

            return response.getBody();
        } catch (Exception e) {
            log.error("Error fetching domestic companies: ", e);
            log.error("Error details: ", e);
            throw new RuntimeException("Error parsing response: " + e.getMessage(), e);
        }
    }

    public StockListResponseDto getCodesFromApi() {
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
            log.error("Error details: ", e);
            throw new RuntimeException("Error parsing response: " + e.getMessage(), e);
        }
    }


}
