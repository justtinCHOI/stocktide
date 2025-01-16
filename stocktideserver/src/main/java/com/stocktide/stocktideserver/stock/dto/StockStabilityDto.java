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
public class StockStabilityDto {
    private List<StockStabilityOutput> output;
    private String rt_cd;
    private String msg_cd;
    private String msg1;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class StockStabilityOutput {
        private String stac_yymm;    // 년월 (예: 202312)
        private String lblt_rate;    // 부채비율
        private String bram_depn;    // 차입금의존도
        private String crnt_rate;    // 유동비율
        private String quck_rate;    // 당좌비율
    }
}

