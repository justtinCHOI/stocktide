package com.stocktide.stocktideserver.stock.service;

import com.stocktide.stocktideserver.stock.dto.*;
import com.stocktide.stocktideserver.stock.entity.*;
import com.stocktide.stocktideserver.stock.mapper.ApiMapper;
import com.stocktide.stocktideserver.util.Time;
import jakarta.transaction.Transactional;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;


@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
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
    private final ApiMapper apiMapper;

    @Override
    public StockasbiDataDto getStockAsBiDataFromApi(String stockCode){
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

        ResponseEntity<StockasbiDataDto> response = restTemplate.exchange(
                uri,
                HttpMethod.GET,
                new HttpEntity<>(headers),
                StockasbiDataDto.class
        );
        if (response.getStatusCode().is2xxSuccessful()) {
            StockasbiDataDto stockasbiDataDto = response.getBody();
            log.info("---------------getStockAsBiDataFromApi successfully finished getOutput1 getAskp1: {}----------------------------------------", stockasbiDataDto.getOutput1().getAskp1());
            return stockasbiDataDto;
        } else {
            log.info("error");
            log.info("---------------getStockAsBiDataFromApi  error----------------------------------------");
            return null;
        }

    }

    @Override
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

        ResponseEntity<StockMinDto> response = restTemplate.exchange(
                uri,
                HttpMethod.GET,
                new HttpEntity<>(headers),
                StockMinDto.class
        );

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

    @Override
    public StockBasicDto getStockBasicDataFromApi(String stockCode) {
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
            log.error("Error fetching stock basic data: ", e);
            throw new RuntimeException("Error parsing response: " + e.getMessage(), e);
        }
    }

    @Override
    public StockBalanceDto getStockBalanceDataFromApi(String stockCode) {
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
            throw new RuntimeException("Error parsing response: " + e.getMessage(), e);
        }
    }

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

    @Override
    public StockFinancialDto getStockFinancialDataFromApi(String stockCode) {
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
            throw new RuntimeException("Error parsing response: " + e.getMessage(), e);
        }
    }

    @Override
    public StockProfitDto getStockProfitDataFromApi(String stockCode) {
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
            throw new RuntimeException("Error parsing response: " + e.getMessage(), e);
        }
    }

    @Override
    public StockOtherDto getStockOtherDataFromApi(String stockCode) {
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
            throw new RuntimeException("Error parsing response: " + e.getMessage(), e);
        }
    }

    @Override
    public StockStabilityDto getStockStabilityDataFromApi(String stockCode) {
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
            throw new RuntimeException("Error parsing response: " + e.getMessage(), e);
        }
    }

    @Override
    public StockGrowthDto getStockGrowthDataFromApi(String stockCode) {
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
    public StockNewsDto getNewsDataFromApi(String stockCode) {
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

            ResponseEntity<StockNewsDto> response = restTemplate.exchange(
                    uri,
                    HttpMethod.GET,
                    new HttpEntity<>(headers),
                    StockNewsDto.class
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

    @Override
    public StockName getStockNameFromApi(Company company) {
        String stockCode = company.getCode();
        StockBasicDto stockBasicDto = getStockBasicDataFromApi(stockCode);
        StockName stockName = new StockName();
        stockName.setEngName(stockBasicDto.getOutput().getPrdt_eng_abrv_name());
        stockName.setKorName(stockBasicDto.getOutput().getPrdt_abrv_name());
        return stockName;
    }

    @Override
    public StockAsBi getStockAsBiFromApi(Company company) {
        String stockCode = company.getCode();
        StockasbiDataDto stockasbiDataDto = getStockAsBiDataFromApi(stockCode);
        StockAsBi stockAsBi = apiMapper.stockAsBiOutput1ToStockAsBi(stockasbiDataDto.getOutput1());
        // 새로운 stockAsBi의 회사 등록
        stockAsBi.setCompany(company);
        // 호가 컬럼을 새로운 호가 컬럼으로 변경
        StockAsBi oldStockAsBi = company.getStockAsBi();
        // 기존의 Id
        if(oldStockAsBi != null){
            stockAsBi.setStockAsBiId(oldStockAsBi.getStockAsBiId());
        }
        return apiMapper.stockAsBiOutput1ToStockAsBi(stockasbiDataDto.getOutput1());
    }

    @Override
    public List<StockMin> getStockMinFromApi(Company company, String strHour) {
        String stockCode = company.getCode();
        LocalDateTime now = LocalDateTime.now();
        StockMinDto stockMinDto = getStockMinDataFromApi(stockCode, strHour);
        // dto -> entity 전환, 최신일자
        return stockMinDto.getOutput2().stream()
                .map(stockMinOutput2 -> {
                    StockMin stockMin = apiMapper.stockMinOutput2ToStockMin(stockMinOutput2);
                    stockMin.setCompany(company);
                    stockMin.setStockTradeTime(now);
                    return stockMin;
                }).sorted(Comparator.comparing(StockMin::getStockTradeTime)).collect(Collectors.toList());
    }

    @Override
    public StockInf getStockInfFromApi(Company company, String strHour) {
        String stockCode = company.getCode();
        StockMinDto stockMinDto = getStockMinDataFromApi(stockCode, strHour);
        StockInf stockInf = apiMapper.stockMinOutput1ToStockInf(stockMinDto.getOutput1());
        stockInf.setCompany(company);
        StockInf oldStockInf = company.getStockInf();
        if(oldStockInf != null){
            stockInf.setStockInfId(oldStockInf.getStockInfId());
        }
        return oldStockInf;
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
