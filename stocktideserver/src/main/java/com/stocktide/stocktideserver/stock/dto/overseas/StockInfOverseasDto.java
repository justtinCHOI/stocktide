package com.stocktide.stocktideserver.stock.dto.overseas;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
public class StockInfOverseasDto {
    private Output output;
    private String rt_cd;    // 응답 코드
    private String msg_cd;   // 메시지 코드
    private String msg1;     // 응답 메시지

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Output {
        private String rsym;     // 종목 심볼 (예: DNASTSLA)
        private String zdiv;     // 구분코드
        private String base;     // 전일의 종가
        private String pvol;     // 전일 거래량
        private String last;     // 현재가
        private String sign;     // 전일대비구분 (상승/하락 등)
        private String diff;     // 전일대비
        private String rate;     // 등락률
        private String tvol;     // 전체 거래량
        private String tamt;     // 전체 거래금액
        private String ordy;     // 주문가능여부
    }
}