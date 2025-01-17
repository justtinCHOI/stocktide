package com.stocktide.stocktideserver.stock.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class StockBalanceDto {
    private List<BalanceOutput> output;
    private String rt_cd;
    private String msg_cd;
    private String msg1;

    @Getter
    @Setter
    @NoArgsConstructor
    public static class BalanceOutput {
        private String stac_yymm;      // 회계년월
        private String cras;           // 유동자산
        private String fxas;           // 고정자산
        private String total_aset;     // 총자산
        private String flow_lblt;      // 유동부채
        private String fix_lblt;       // 고정부채
        private String total_lblt;     // 총부채
        private String cpfn;           // 자본금
        private String cfp_surp;       // 자본잉여금
        private String prfi_surp;      // 이익잉여금
        private String total_cptl;     // 총자본

    }
}