package com.stocktide.stocktideserver.stock.dto.common;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StockListResponseDto {
    private List<StockItem> output;
    private String rt_cd;
    private String msg_cd;
    private String msg1;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class StockItem {
        private String stck_shrn_iscd;    // 주식 단축 종목코드
        private String hts_kor_isnm;      // 한글 종목명
        private String crdt_rate;         // 신용비율
    }
}