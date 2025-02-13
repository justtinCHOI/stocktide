package com.stocktide.stocktideserver.star.dto;

import com.stocktide.stocktideserver.stock.dto.common.CompanyResponseDto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StarResponseDto {
    private long starId;

    private long memberId;

    private CompanyResponseDto companyResponseDto;
}
