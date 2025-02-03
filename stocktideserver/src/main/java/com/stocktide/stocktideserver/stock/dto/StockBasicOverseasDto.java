package com.stocktide.stocktideserver.stock.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
public class StockBasicOverseasDto {
    private Output output;
    private String rt_cd;    // 응답 코드
    private String msg_cd;   // 메시지 코드
    private String msg1;     // 응답 메시지

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Output {
        private String std_pdno;           // 표준 상품번호 (예: US88160R1014)
        private String prdt_eng_name;      // 상품 영문명 (예: TESLA INC)
        private String natn_cd;            // 국가 코드 (예: 840)
        private String natn_name;          // 국가명 (예: 미국)
        private String tr_mket_cd;         // 거래시장 코드 (예: 01)
        private String tr_mket_name;       // 거래시장명 (예: 나스닥)
        private String ovrs_excg_cd;       // 해외거래소 코드 (예: NASD)
        private String ovrs_excg_name;     // 해외거래소명 (예: 나스닥)
        private String tr_crcy_cd;         // 거래통화 코드 (예: USD)
        private String ovrs_papr;          // 해외증권 액면가 (예: 0.00000)
        private String crcy_name;          // 통화명 (예: 미국 달러)
        private String ovrs_stck_dvsn_cd;  // 해외주식 구분코드 (예: 01)
        private String prdt_clsf_cd;       // 상품분류 코드 (예: 101210)
        private String prdt_clsf_name;     // 상품분류명 (예: 해외주식)
        private String sll_unit_qty;       // 매도단위수량 (예: 1)
        private String buy_unit_qty;       // 매수단위수량 (예: 1)
        private String tr_unit_amt;        // 거래단위금액 (예: 0)
        private String lstg_stck_num;      // 상장주식수 (예: 3210060000)
        private String lstg_dt;            // 상장일자 (예: 00000000)
        private String ovrs_stck_tr_stop_dvsn_cd; // 해외주식거래정지구분코드 (예: 01)
        private String lstg_abol_item_yn;  // 상장폐지종목여부 (예: N)
        private String ovrs_stck_prdt_grp_no; // 해외주식상품그룹번호 (예: 36439)
        private String lstg_yn;            // 상장여부 (예: Y)
        private String tax_levy_yn;        // 과세부과여부 (예: N)
        private String ovrs_stck_erlm_rosn_cd; // 해외주식거래사유코드 (예: 00)
        private String ovrs_stck_hist_rght_dvsn_cd; // 해외주식이력권리구분코드 (예: 00)
        private String chng_bf_pdno;       // 변경전상품번호
        private String prdt_type_cd_2;     // 상품유형코드2
        private String ovrs_item_name;     // 해외종목명
        private String sedol_no;           // SEDOL 번호 (예: B616C79)
        private String blbg_tckr_text;     // Bloomberg Ticker (예: TSLA US)
        private String ovrs_stck_etf_risk_drtp_cd; // 해외주식ETF위험등급코드
        private String etp_chas_erng_rt_dbnb; // ETP추적수익률분모 (예: 0.000000)
        private String istt_usge_isin_cd;  // 기관사용ISIN코드 (예: US88160R1014)
        private String mint_svc_yn;        // 민트서비스여부 (예: Y)
        private String mint_svc_yn_chng_dt; // 민트서비스여부변경일자 (예: 20220830)
        private String prdt_name;          // 상품명 (예: 테슬라)
        private String lei_cd;             // LEI 코드 (예: 54930043XZGB27CTOV49)
        private String ovrs_stck_stop_rson_cd; // 해외주식정지사유코드
        private String lstg_abol_dt;       // 상장폐지일자
        private String mini_stk_tr_stat_dvsn_cd; // 미니주식거래상태구분코드 (예: 01)
        private String mint_frst_svc_erlm_dt; // 민트최초서비스등록일자 (예: 20220826)
        private String mint_dcpt_trad_psbl_yn; // 민트소수점거래가능여부 (예: Y)
        private String mint_fnum_trad_psbl_yn; // 민트정수거래가능여부 (예: Y)
        private String mint_cblc_cvsn_ipsb_yn; // 민트실물전환불가여부 (예: N)
        private String ptp_item_yn;        // PTP종목여부 (예: N)
        private String ptp_item_trfx_exmt_yn; // PTP종목거래세면제여부 (예: N)
        private String ptp_item_trfx_exmt_strt_dt; // PTP종목거래세면제시작일자
        private String ptp_item_trfx_exmt_end_dt;  // PTP종목거래세면제종료일자
        private String dtm_tr_psbl_yn;     // 시간외거래가능여부 (예: N)
        private String sdrf_stop_ecls_yn;  // 공매도정지해제여부 (예: N)
        private String sdrf_stop_ecls_erlm_dt; // 공매도정지해제등록일자 (예: 00000000)
        private String memo_text1;         // 메모텍스트1
        private String ovrs_now_pric1;     // 해외현재가1 (예: 404.60000)
        private String last_rcvg_dtime;    // 최종수신일시 (예: 20250201114209)
    }
}