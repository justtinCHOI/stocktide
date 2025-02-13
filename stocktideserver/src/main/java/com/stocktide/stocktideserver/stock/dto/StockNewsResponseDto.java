package com.stocktide.stocktideserver.stock.dto;

import com.stocktide.stocktideserver.stock.entity.StockNews;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class StockNewsResponseDto {
    private List<StockNews> output;
    private String message;
    private String status;

    public static StockNewsResponseDto of(List<StockNews> news) {
        StockNewsResponseDto dto = new StockNewsResponseDto();
        dto.setOutput(news);
        dto.setStatus("SUCCESS");
        return dto;
    }
}