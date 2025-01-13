package com.stocktide.stocktideserver.stock.mapper;

import com.stocktide.stocktideserver.member.entity.Member;
import com.stocktide.stocktideserver.stock.dto.StockAsBiResponseDto;
import com.stocktide.stocktideserver.stock.dto.StockInfResponseDto;
import com.stocktide.stocktideserver.stock.dto.StockMinResponseDto;
import com.stocktide.stocktideserver.stock.dto.StockOrderResponseDto;
import com.stocktide.stocktideserver.stock.entity.Company;
import com.stocktide.stocktideserver.stock.entity.StockAsBi;
import com.stocktide.stocktideserver.stock.entity.StockInf;
import com.stocktide.stocktideserver.stock.entity.StockMin;
import com.stocktide.stocktideserver.stock.entity.StockOrder;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-01-13T13:49:38+0900",
    comments = "version: 1.5.5.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.11.1.jar, environment: Java 21.0.5 (Amazon.com Inc.)"
)
@Component
public class StockMapperImpl implements StockMapper {

    @Override
    public StockInfResponseDto stockInfToStockInfResponseDto(StockInf stockInf) {
        if ( stockInf == null ) {
            return null;
        }

        StockInfResponseDto stockInfResponseDto = new StockInfResponseDto();

        stockInfResponseDto.setCompanyId( stockInfCompanyCompanyId( stockInf ) );
        stockInfResponseDto.setStockInfId( stockInf.getStockInfId() );
        stockInfResponseDto.setStck_prpr( stockInf.getStck_prpr() );
        stockInfResponseDto.setPrdy_vrss( stockInf.getPrdy_vrss() );
        stockInfResponseDto.setPrdy_ctrt( stockInf.getPrdy_ctrt() );
        stockInfResponseDto.setAcml_vol( stockInf.getAcml_vol() );
        stockInfResponseDto.setAcml_tr_pbmn( stockInf.getAcml_tr_pbmn() );

        return stockInfResponseDto;
    }

    @Override
    public StockAsBiResponseDto stockAsBiToStockAsBiResponseDto(StockAsBi stockAsBi) {
        if ( stockAsBi == null ) {
            return null;
        }

        StockAsBiResponseDto stockAsBiResponseDto = new StockAsBiResponseDto();

        stockAsBiResponseDto.setCompanyId( stockAsBiCompanyCompanyId( stockAsBi ) );
        stockAsBiResponseDto.setStockAsBiId( stockAsBi.getStockAsBiId() );
        stockAsBiResponseDto.setAskp1( stockAsBi.getAskp1() );
        stockAsBiResponseDto.setAskp2( stockAsBi.getAskp2() );
        stockAsBiResponseDto.setAskp3( stockAsBi.getAskp3() );
        stockAsBiResponseDto.setAskp4( stockAsBi.getAskp4() );
        stockAsBiResponseDto.setAskp5( stockAsBi.getAskp5() );
        stockAsBiResponseDto.setAskp6( stockAsBi.getAskp6() );
        stockAsBiResponseDto.setAskp7( stockAsBi.getAskp7() );
        stockAsBiResponseDto.setAskp8( stockAsBi.getAskp8() );
        stockAsBiResponseDto.setAskp9( stockAsBi.getAskp9() );
        stockAsBiResponseDto.setAskp10( stockAsBi.getAskp10() );
        stockAsBiResponseDto.setAskp_rsqn1( stockAsBi.getAskp_rsqn1() );
        stockAsBiResponseDto.setAskp_rsqn2( stockAsBi.getAskp_rsqn2() );
        stockAsBiResponseDto.setAskp_rsqn3( stockAsBi.getAskp_rsqn3() );
        stockAsBiResponseDto.setAskp_rsqn4( stockAsBi.getAskp_rsqn4() );
        stockAsBiResponseDto.setAskp_rsqn5( stockAsBi.getAskp_rsqn5() );
        stockAsBiResponseDto.setAskp_rsqn6( stockAsBi.getAskp_rsqn6() );
        stockAsBiResponseDto.setAskp_rsqn7( stockAsBi.getAskp_rsqn7() );
        stockAsBiResponseDto.setAskp_rsqn8( stockAsBi.getAskp_rsqn8() );
        stockAsBiResponseDto.setAskp_rsqn9( stockAsBi.getAskp_rsqn9() );
        stockAsBiResponseDto.setAskp_rsqn10( stockAsBi.getAskp_rsqn10() );
        stockAsBiResponseDto.setBidp1( stockAsBi.getBidp1() );
        stockAsBiResponseDto.setBidp2( stockAsBi.getBidp2() );
        stockAsBiResponseDto.setBidp3( stockAsBi.getBidp3() );
        stockAsBiResponseDto.setBidp4( stockAsBi.getBidp4() );
        stockAsBiResponseDto.setBidp5( stockAsBi.getBidp5() );
        stockAsBiResponseDto.setBidp6( stockAsBi.getBidp6() );
        stockAsBiResponseDto.setBidp7( stockAsBi.getBidp7() );
        stockAsBiResponseDto.setBidp8( stockAsBi.getBidp8() );
        stockAsBiResponseDto.setBidp9( stockAsBi.getBidp9() );
        stockAsBiResponseDto.setBidp10( stockAsBi.getBidp10() );
        stockAsBiResponseDto.setBidp_rsqn1( stockAsBi.getBidp_rsqn1() );
        stockAsBiResponseDto.setBidp_rsqn2( stockAsBi.getBidp_rsqn2() );
        stockAsBiResponseDto.setBidp_rsqn3( stockAsBi.getBidp_rsqn3() );
        stockAsBiResponseDto.setBidp_rsqn4( stockAsBi.getBidp_rsqn4() );
        stockAsBiResponseDto.setBidp_rsqn5( stockAsBi.getBidp_rsqn5() );
        stockAsBiResponseDto.setBidp_rsqn6( stockAsBi.getBidp_rsqn6() );
        stockAsBiResponseDto.setBidp_rsqn7( stockAsBi.getBidp_rsqn7() );
        stockAsBiResponseDto.setBidp_rsqn8( stockAsBi.getBidp_rsqn8() );
        stockAsBiResponseDto.setBidp_rsqn9( stockAsBi.getBidp_rsqn9() );
        stockAsBiResponseDto.setBidp_rsqn10( stockAsBi.getBidp_rsqn10() );

        return stockAsBiResponseDto;
    }

    @Override
    public StockMinResponseDto stockMinToStockMinResponseDto(StockMin stockMin) {
        if ( stockMin == null ) {
            return null;
        }

        StockMinResponseDto stockMinResponseDto = new StockMinResponseDto();

        stockMinResponseDto.setCompanyId( stockMinCompanyCompanyId( stockMin ) );
        stockMinResponseDto.setStockMinId( stockMin.getStockMinId() );
        stockMinResponseDto.setStockTradeTime( stockMin.getStockTradeTime() );
        stockMinResponseDto.setStck_cntg_hour( stockMin.getStck_cntg_hour() );
        stockMinResponseDto.setStck_prpr( stockMin.getStck_prpr() );
        stockMinResponseDto.setStck_oprc( stockMin.getStck_oprc() );
        stockMinResponseDto.setStck_hgpr( stockMin.getStck_hgpr() );
        stockMinResponseDto.setStck_lwpr( stockMin.getStck_lwpr() );
        stockMinResponseDto.setCntg_vol( stockMin.getCntg_vol() );

        return stockMinResponseDto;
    }

    @Override
    public StockOrderResponseDto stockOrderToStockOrderResponseDto(StockOrder stockOrder) {
        if ( stockOrder == null ) {
            return null;
        }

        StockOrderResponseDto stockOrderResponseDto = new StockOrderResponseDto();

        stockOrderResponseDto.setCompanyId( stockOrderCompanyCompanyId( stockOrder ) );
        Long memberId = stockOrderMemberMemberId( stockOrder );
        if ( memberId != null ) {
            stockOrderResponseDto.setMemberId( memberId );
        }
        stockOrderResponseDto.setStockOrderId( stockOrder.getStockOrderId() );
        stockOrderResponseDto.setStockCount( stockOrder.getStockCount() );
        stockOrderResponseDto.setOrderTypes( stockOrder.getOrderTypes() );
        stockOrderResponseDto.setOrderStates( stockOrder.getOrderStates() );
        stockOrderResponseDto.setPrice( stockOrder.getPrice() );
        stockOrderResponseDto.setModifiedAt( stockOrder.getModifiedAt() );

        return stockOrderResponseDto;
    }

    private long stockInfCompanyCompanyId(StockInf stockInf) {
        if ( stockInf == null ) {
            return 0L;
        }
        Company company = stockInf.getCompany();
        if ( company == null ) {
            return 0L;
        }
        long companyId = company.getCompanyId();
        return companyId;
    }

    private long stockAsBiCompanyCompanyId(StockAsBi stockAsBi) {
        if ( stockAsBi == null ) {
            return 0L;
        }
        Company company = stockAsBi.getCompany();
        if ( company == null ) {
            return 0L;
        }
        long companyId = company.getCompanyId();
        return companyId;
    }

    private long stockMinCompanyCompanyId(StockMin stockMin) {
        if ( stockMin == null ) {
            return 0L;
        }
        Company company = stockMin.getCompany();
        if ( company == null ) {
            return 0L;
        }
        long companyId = company.getCompanyId();
        return companyId;
    }

    private long stockOrderCompanyCompanyId(StockOrder stockOrder) {
        if ( stockOrder == null ) {
            return 0L;
        }
        Company company = stockOrder.getCompany();
        if ( company == null ) {
            return 0L;
        }
        long companyId = company.getCompanyId();
        return companyId;
    }

    private Long stockOrderMemberMemberId(StockOrder stockOrder) {
        if ( stockOrder == null ) {
            return null;
        }
        Member member = stockOrder.getMember();
        if ( member == null ) {
            return null;
        }
        Long memberId = member.getMemberId();
        if ( memberId == null ) {
            return null;
        }
        return memberId;
    }
}
