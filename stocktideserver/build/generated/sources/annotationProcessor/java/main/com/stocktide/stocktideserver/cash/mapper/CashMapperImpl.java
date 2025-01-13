package com.stocktide.stocktideserver.cash.mapper;

import com.stocktide.stocktideserver.cash.dto.CashResponseDto;
import com.stocktide.stocktideserver.cash.entity.Cash;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-01-13T13:49:38+0900",
    comments = "version: 1.5.5.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.11.1.jar, environment: Java 21.0.5 (Amazon.com Inc.)"
)
@Component
public class CashMapperImpl implements CashMapper {

    @Override
    public CashResponseDto cashToCashResponseDto(Cash cash) {
        if ( cash == null ) {
            return null;
        }

        CashResponseDto cashResponseDto = new CashResponseDto();

        if ( cash.getCashId() != null ) {
            cashResponseDto.setCashId( cash.getCashId() );
        }
        cashResponseDto.setAccountNumber( cash.getAccountNumber() );
        cashResponseDto.setMoney( cash.getMoney() );
        cashResponseDto.setDollar( cash.getDollar() );

        return cashResponseDto;
    }
}
