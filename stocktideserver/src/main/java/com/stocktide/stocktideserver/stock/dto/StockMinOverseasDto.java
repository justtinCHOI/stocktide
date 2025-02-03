package com.stocktide.stocktideserver.stock.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
public class StockMinOverseasDto {
    private Output1 output1;
    private Output2[] output2;
    private String rt_cd;    // 응답 코드
    private String msg_cd;   // 메시지 코드
    private String msg1;     // 응답 메시지

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Output1 {
        private String rsym;     // 실시간종목코드
        private String zdiv;     // 소수점자리수
        private String stim;     // 장시작현지시간
        private String etim;     // 장종료현지시간
        private String sktm;     // 장시작한국시간
        private String ektm;     // 장종료한국시간
        private String next;     // 다음가능여부
        private String more;     // 추가데이터여부
        private String nrec;     // 레코드갯수
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Output2 {
        private String tymd;     // 현지영업일자
        private String xymd;     // 현지기준일자
        private String xhms;     // 현지기준시간
        private String kymd;     // 한국기준일자
        private String khms;     // 한국기준시간
        private String open;     // 시가
        private String high;     // 고가
        private String low;      // 저가
        private String last;     // 종가
        private String evol;     // 체결량
        private String eamt;     // 체결대금
    }
}