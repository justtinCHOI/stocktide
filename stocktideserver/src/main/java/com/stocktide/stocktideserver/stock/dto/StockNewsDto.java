package com.stocktide.stocktideserver.stock.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StockNewsDto {
    private List<NewsOutput> output;
    private String rt_cd;
    private String msg_cd;
    private String msg1;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class NewsOutput {
        private String cntt_usiq_srno;      // 뉴스 고유 번호
        private String news_ofer_entp_code;  // 뉴스 제공 업체 코드
        private String data_dt;              // 데이터 날짜 (YYYYMMDD)
        private String data_tm;              // 데이터 시간 (HHMMSS)
        private String hts_pbnt_titl_cntt;   // 뉴스 제목
        private String news_lrdv_code;       // 뉴스 분류 코드
        private String dorg;                 // 언론사명

        // 관련 종목 코드 (최대 10개)
        private String iscd1;
        private String iscd2;
        private String iscd3;
        private String iscd4;
        private String iscd5;
        private String iscd6;
        private String iscd7;
        private String iscd8;
        private String iscd9;
        private String iscd10;

        // 관련 종목명 (최대 10개)
        private String kor_isnm1;
        private String kor_isnm2;
        private String kor_isnm3;
        private String kor_isnm4;
        private String kor_isnm5;
        private String kor_isnm6;
        private String kor_isnm7;
        private String kor_isnm8;
        private String kor_isnm9;
        private String kor_isnm10;
    }
}