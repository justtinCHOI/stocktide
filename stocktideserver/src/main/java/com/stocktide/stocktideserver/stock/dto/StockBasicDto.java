package com.stocktide.stocktideserver.stock.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
public class StockBasicDto {
    private Output output;
    private String rt_cd;
    private String msg_cd;
    private String msg1;

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Output {
        private String pdno;                     // 종목번호
        private String prdt_type_cd;             // 상품유형코드
        private String mket_id_cd;               // 시장구분코드
        private String scty_grp_id_cd;           // 증권그룹ID코드
        private String excg_dvsn_cd;             // 거래소구분코드
        private String setl_mmdd;                // 결제월일
        private String lstg_stqt;                // 상장주식수
        private String lstg_cptl_amt;            // 상장자본금
        private String cpta;                     // 자본금
        private String papr;                     // 액면가
        private String issu_pric;                // 발행가
        private String kospi200_item_yn;         // KOSPI200종목여부
        private String scts_mket_lstg_dt;        // 증권시장상장일자
        private String scts_mket_lstg_abol_dt;   // 증권시장상장폐지일자
        private String kosdaq_mket_lstg_dt;      // 코스닥시장상장일자
        private String kosdaq_mket_lstg_abol_dt; // 코스닥시장상장폐지일자
        private String frbd_mket_lstg_dt;        // 프리보드시장상장일자
        private String frbd_mket_lstg_abol_dt;   // 프리보드시장상장폐지일자
        private String reits_kind_cd;            // 리츠종류코드
        private String etf_dvsn_cd;              // ETF구분코드
        private String oilf_fund_yn;             // 유가펀드여부
        private String idx_bztp_lcls_cd;         // 지수업종대분류코드
        private String idx_bztp_mcls_cd;         // 지수업종중분류코드
        private String idx_bztp_scls_cd;         // 지수업종소분류코드
        private String stck_kind_cd;             // 주식종류코드
        private String mfnd_opng_dt;             // 펀드설정일자
        private String mfnd_end_dt;              // 펀드만기일자
        private String dpsi_erlm_cncl_dt;        // 예탁담보대출취소일자
        private String etf_cu_qty;               // ETF CU수량
        private String prdt_name;                // 상품명
        private String prdt_name120;             // 상품명120
        private String prdt_abrv_name;           // 상품약어명
        private String std_pdno;                 // 표준상품번호
        private String prdt_eng_name;            // 상품영문명
        private String prdt_eng_name120;         // 상품영문명120
        private String prdt_eng_abrv_name;       // 상품영문약어명
        private String dpsi_aptm_erlm_yn;        // 예탁담보대출가능여부
        private String etf_txtn_type_cd;         // ETF과세유형코드
        private String etf_type_cd;              // ETF유형코드
        private String lstg_abol_dt;             // 상장폐지일자
        private String nwst_odst_dvsn_cd;        // 신주인수권증서구분코드
        private String sbst_pric;                // 대용가격
        private String thco_sbst_pric;           // 당사대용가격
        private String thco_sbst_pric_chng_dt;   // 당사대용가격변경일자
        private String tr_stop_yn;               // 거래정지여부
        private String admn_item_yn;             // 관리종목여부
        private String thdt_clpr;                // 당일종가
        private String bfdy_clpr;                // 전일종가
        private String clpr_chng_dt;             // 종가변경일자
        private String std_idst_clsf_cd;         // 표준산업분류코드
        private String std_idst_clsf_cd_name;    // 표준산업분류코드명
        private String idx_bztp_lcls_cd_name;    // 지수업종대분류코드명
        private String idx_bztp_mcls_cd_name;    // 지수업종중분류코드명
        private String idx_bztp_scls_cd_name;    // 지수업종소분류코드명
        private String ocr_no;                   // 발생번호
        private String crfd_item_yn;             // 인증종목여부
        private String elec_scty_yn;             // 전자증권여부
    }
}