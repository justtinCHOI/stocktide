package com.stocktide.stocktideserver.stock.dto.common;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StockBasicResponseDto {
    private String pdno;                     // 종목번호
    private String prdt_abrv_name;           // 상품약어명
    private String prdt_eng_abrv_name;       // 상품영문약어명
    private String lstg_stqt;                // 상장주식수
    private String cpta;                     // 자본금
    private String papr;                     // 액면가
}
