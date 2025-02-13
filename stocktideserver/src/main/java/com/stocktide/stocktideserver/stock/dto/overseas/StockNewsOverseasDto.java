package com.stocktide.stocktideserver.stock.dto.overseas;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StockNewsOverseasDto {
    private List<Outblock1> outblock1;
    private String rt_cd;
    private String msg_cd;
    private String msg1;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Outblock1 {
        private String info_gb;    // 정보 구분
        private String news_key;   // 뉴스 키
        private String data_dt;    // 데이터 날짜
        private String data_tm;    // 데이터 시간
        private String class_cd;   // 분류 코드
        private String class_name; // 분류명
        private String source;     // 출처
        private String nation_cd;  // 국가 코드
        private String exchange_cd;// 거래소 코드
        private String symb;       // 종목 코드
        private String symb_name;  // 종목명
        private String title;      // 뉴스 제목
    }
}