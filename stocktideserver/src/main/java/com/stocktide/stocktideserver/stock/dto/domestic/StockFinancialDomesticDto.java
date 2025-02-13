package com.stocktide.stocktideserver.stock.dto.domestic;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class StockFinancialDomesticDto {
    private List<FinancialOutput> output;
    private String rt_cd;
    private String msg_cd;
    private String msg1;

    @Getter
    @Setter
    @NoArgsConstructor
    public static class FinancialOutput {
        private String stac_yymm;          // 회계년월
        private String grs;                // 매출액증가율
        private String bsop_prfi_inrt;     // 영업이익률
        private String ntin_inrt;          // 순이익률
        private String roe_val;            // 자기자본이익률(ROE)
        private String eps;                // 주당순이익(EPS)
        private String sps;                // 주당매출액(SPS)
        private String bps;                // 주당순자산(BPS)
        private String rsrv_rate;          // 유보율
        private String lblt_rate;          // 부채비율

    }
}