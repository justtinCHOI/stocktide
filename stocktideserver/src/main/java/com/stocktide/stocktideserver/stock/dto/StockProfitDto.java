package com.stocktide.stocktideserver.stock.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
public class StockProfitDto {
    private List<ProfitOutput> output;
    private String rt_cd;
    private String msg_cd;
    private String msg1;

    @Getter
    @Setter
    @NoArgsConstructor
    public static class ProfitOutput {
        private String stac_yymm;            // 회계년월
        private String cptl_ntin_rate;       // 자본순이익률(ROE)
        private String self_cptl_ntin_inrt;  // 자기자본순이익률
        private String sale_ntin_rate;       // 매출액순이익률
        private String sale_totl_rate;       // 매출총이익률
    }

}