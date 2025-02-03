package com.stocktide.stocktideserver.stock.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
public class StockAsBiOverseasDataDto {
    private Output1 output1;
    private Output2 output2;
    private Output3 output3;
    private String rt_cd;    // 응답 코드
    private String msg_cd;   // 메시지 코드
    private String msg1;     // 응답 메시지

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Output1 {
        private String rsym;     // 실시간조회종목코드
        private String zdiv;     // 소수점자리수
        private String curr;     // 통화
        private String base;     // 전일종가
        private String open;     // 시가
        private String high;     // 고가
        private String low;      // 저가
        private String last;     // 현재가
        private String dymd;     // 호가일자
        private String dhms;     // 호가시간
        private String bvol;     // 매수호가총잔량
        private String avol;     // 매도호가총잔량
        private String bdvl;     // 매수호가총잔량대비
        private String advl;     // 매도호가총잔량대비
        private String code;     // 종목코드
        private String ropen;    // 시가율
        private String rhigh;    // 고가율
        private String rlow;     // 저가율
        private String rclose;   // 현재가율
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Output2 {
        // 매수/매도 호가 정보 (1-10)
        private String pbid1;    // 매수호가가격1
        private String pask1;    // 매도호가가격1
        private String vbid1;    // 매수호가잔량1
        private String vask1;    // 매도호가잔량1
        private String dbid1;    // 매수호가대비1
        private String dask1;    // 매도호가대비1

        private String pbid2;
        private String pask2;
        private String vbid2;
        private String vask2;
        private String dbid2;
        private String dask2;

        private String pbid3;
        private String pask3;
        private String vbid3;
        private String vask3;
        private String dbid3;
        private String dask3;

        private String pbid4;
        private String pask4;
        private String vbid4;
        private String vask4;
        private String dbid4;
        private String dask4;

        private String pbid5;
        private String pask5;
        private String vbid5;
        private String vask5;
        private String dbid5;
        private String dask5;

        private String pbid6;
        private String pask6;
        private String vbid6;
        private String vask6;
        private String dbid6;
        private String dask6;

        private String pbid7;
        private String pask7;
        private String vbid7;
        private String vask7;
        private String dbid7;
        private String dask7;

        private String pbid8;
        private String pask8;
        private String vbid8;
        private String vask8;
        private String dbid8;
        private String dask8;

        private String pbid9;
        private String pask9;
        private String vbid9;
        private String vask9;
        private String dbid9;
        private String dask9;

        private String pbid10;
        private String pask10;
        private String vbid10;
        private String vask10;
        private String dbid10;
        private String dask10;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Output3 {
        private String vstm;     // VCMStart시간
        private String vetm;     // VCMEnd시간
        private String csbp;     // CAS/VCM기준가
        private String cshi;     // CAS/VCMHighprice
        private String cslo;     // CAS/VCMLowprice
        private String iep;      // IEP
        private String iev;      // IEV
    }
}