package com.stocktide.stocktideserver.stock.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StockNews {
    private String data_dt;
    private String data_tm;
    private String hts_pbnt_titl_cntt;
    private String dorg;
}