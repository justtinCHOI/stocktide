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
public class StockGrowthDto {
    private List<StockGrowthOutput> output;
    private String rt_cd;
    private String msg_cd;
    private String msg1;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class StockGrowthOutput {
        private String stac_yymm;        // 년월 (예: 202312)
        private String grs;              // 매출액 증가율(Growth Rate of Sales)
        private String bsop_prfi_inrt;   // 영업이익 증가율(Business Operating Profit Increase Rate)
        private String equt_inrt;        // 자기자본 증가율(Equity Increase Rate)
        private String totl_aset_inrt;   // 총자산 증가율(Total Asset Increase Rate)
    }
}

