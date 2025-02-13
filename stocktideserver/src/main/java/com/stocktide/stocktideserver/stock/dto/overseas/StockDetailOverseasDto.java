package com.stocktide.stocktideserver.stock.dto.overseas;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
public class StockDetailOverseasDto {
    private Output output;
    private String rt_cd;    // 응답 코드
    private String msg_cd;   // 메시지 코드
    private String msg1;     // 응답 메시지

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Output {
        private String rsym;     // 실시간조회종목코드 (예: DNASTSLA)
        private String zdiv;     // 소수점자리수 (예: 4)
        private String curr;     // 통화 (예: USD)
        private String vnit;     // 거래단위 (예: 1)
        private String open;     // 시가 (예: 401.5300)
        private String high;     // 고가 (예: 419.9900)
        private String low;      // 저가 (예: 401.3400)
        private String last;     // 종가 (예: 404.6000)
        private String base;     // 기준가 (예: 400.2800)
        private String pvol;     // 거래량 (예: 98092879)
        private String pamt;     // 거래대금 (예: 39143849900)
        private String uplp;     // 상한가 (예: 0.0000)
        private String dnlp;     // 하한가 (예: 0.0000)
        private String h52p;     // 52주 최고가 (예: 488.5399)
        private String h52d;     // 52주 최고가 일자 (예: 20241218)
        private String l52p;     // 52주 최저가 (예: 138.8025)
        private String l52d;     // 52주 최저가 일자 (예: 20240422)
        private String perx;     // PER (예: 110.84)
        private String pbrx;     // PBR (예: 18.55)
        private String epsx;     // EPS (예: 3.65)
        private String bpsx;     // BPS (예: 21.81)
        private String shar;     // 상장주식수 (예: 3210060000)
        private String mcap;     // 자본금 (단위:백만) (예: 3000000)
        private String tomv;     // 시가총액 (예: 1298790276000)
        private String t_xprc;   // 환산주가 (예: 593225)
        private String t_xdif;   // 환산주가 대비 (예: 6334)
        private String t_xrat;   // 환산주가 등락률 (예: +1.08)
        private String p_xprc;   // 환산주가(전일) (예: 0)
        private String p_xdif;   // 환산주가 대비(전일) (예: 0)
        private String p_xrat;   // 환산주가 등락률(전일) (예: 0.00)
        private String t_rate;   // 환율 (예: 1466.20)
        private String p_rate;   // 환율(전일)
        private String t_xsgn;   // 환산주가부호 (예: 2)
        private String p_xsng;   // 환산주가부호(전일) (예: 3)
        private String e_ordyn;  // 매매가능여부 (예: 매매 가능)
        private String e_hogau;  // 호가단위 (예: 0.0100)
        private String e_icod;   // 업종 (예: 자동차)
        private String e_parp;   // 액면가 (예: 0.0000)
        private String tvol;     // 당일거래량 (예: 83568219)
        private String tamt;     // 당일거래대금 (예: 34372236962)
        private String etyp_nm;  // 상장구분
    }

}