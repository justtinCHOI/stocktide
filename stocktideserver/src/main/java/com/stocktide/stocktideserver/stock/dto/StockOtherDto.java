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
public class StockOtherDto {
    private List<StockOtherOutput> output;
    private String rt_cd;
    private String msg_cd;
    private String msg1;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class StockOtherOutput {
        private String stac_yymm;      // 년월 (예: 202309)
        private String payout_rate;     // 배당률
        private String eva;             // EVA(Economic Value Added)
        private String ebitda;          // EBITDA(영업이익 + 감가상각비 + 무형자산상각비)
        private String ev_ebitda;       // EV/EBITDA 비율
    }
}

