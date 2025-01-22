package com.stocktide.stocktideserver.stock.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class StockIncomeDto {
    private List<IncomeOutput> output;
    private String rt_cd;
    private String msg_cd;
    private String msg1;

    @Getter
    @Setter
    @NoArgsConstructor
    public static class IncomeOutput {
        private String stac_yymm;         // 회계년월
        private String sale_account;       // 매출액
        private String sale_cost;          // 매출원가
        private String sale_totl_prfi;     // 매출총이익
        private String depr_cost;          // 감가상각비
        private String sell_mang;          // 판매관리비
        private String bsop_prti;          // 영업이익
        private String bsop_non_ernn;      // 영업외수익
        private String bsop_non_expn;      // 영업외비용
        private String op_prfi;            // 영업이익
        private String spec_prfi;          // 특별이익
        private String spec_loss;          // 특별손실
        private String thtr_ntin;          // 당기순이익
    }
}