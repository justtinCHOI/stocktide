package com.stocktide.stocktideserver.stock.mapper;

import com.stocktide.stocktideserver.stock.dto.StockMinDto;
import com.stocktide.stocktideserver.stock.dto.StockasbiDataDto;
import com.stocktide.stocktideserver.stock.entity.StockAsBi;
import com.stocktide.stocktideserver.stock.entity.StockInf;
import com.stocktide.stocktideserver.stock.entity.StockMin;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-01-13T13:49:38+0900",
    comments = "version: 1.5.5.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.11.1.jar, environment: Java 21.0.5 (Amazon.com Inc.)"
)
@Component
public class ApiMapperImpl implements ApiMapper {

    @Override
    public StockAsBi stockAsBiOutput1ToStockAsBi(StockasbiDataDto.StockAsBiOutput1 stock) {
        if ( stock == null ) {
            return null;
        }

        StockAsBi stockAsBi = new StockAsBi();

        stockAsBi.setAskp1( stock.getAskp1() );
        stockAsBi.setAskp2( stock.getAskp2() );
        stockAsBi.setAskp3( stock.getAskp3() );
        stockAsBi.setAskp4( stock.getAskp4() );
        stockAsBi.setAskp5( stock.getAskp5() );
        stockAsBi.setAskp6( stock.getAskp6() );
        stockAsBi.setAskp7( stock.getAskp7() );
        stockAsBi.setAskp8( stock.getAskp8() );
        stockAsBi.setAskp9( stock.getAskp9() );
        stockAsBi.setAskp10( stock.getAskp10() );
        stockAsBi.setAskp_rsqn1( stock.getAskp_rsqn1() );
        stockAsBi.setAskp_rsqn2( stock.getAskp_rsqn2() );
        stockAsBi.setAskp_rsqn3( stock.getAskp_rsqn3() );
        stockAsBi.setAskp_rsqn4( stock.getAskp_rsqn4() );
        stockAsBi.setAskp_rsqn5( stock.getAskp_rsqn5() );
        stockAsBi.setAskp_rsqn6( stock.getAskp_rsqn6() );
        stockAsBi.setAskp_rsqn7( stock.getAskp_rsqn7() );
        stockAsBi.setAskp_rsqn8( stock.getAskp_rsqn8() );
        stockAsBi.setAskp_rsqn9( stock.getAskp_rsqn9() );
        stockAsBi.setAskp_rsqn10( stock.getAskp_rsqn10() );
        stockAsBi.setBidp1( stock.getBidp1() );
        stockAsBi.setBidp2( stock.getBidp2() );
        stockAsBi.setBidp3( stock.getBidp3() );
        stockAsBi.setBidp4( stock.getBidp4() );
        stockAsBi.setBidp5( stock.getBidp5() );
        stockAsBi.setBidp6( stock.getBidp6() );
        stockAsBi.setBidp7( stock.getBidp7() );
        stockAsBi.setBidp8( stock.getBidp8() );
        stockAsBi.setBidp9( stock.getBidp9() );
        stockAsBi.setBidp10( stock.getBidp10() );
        stockAsBi.setBidp_rsqn1( stock.getBidp_rsqn1() );
        stockAsBi.setBidp_rsqn2( stock.getBidp_rsqn2() );
        stockAsBi.setBidp_rsqn3( stock.getBidp_rsqn3() );
        stockAsBi.setBidp_rsqn4( stock.getBidp_rsqn4() );
        stockAsBi.setBidp_rsqn5( stock.getBidp_rsqn5() );
        stockAsBi.setBidp_rsqn6( stock.getBidp_rsqn6() );
        stockAsBi.setBidp_rsqn7( stock.getBidp_rsqn7() );
        stockAsBi.setBidp_rsqn8( stock.getBidp_rsqn8() );
        stockAsBi.setBidp_rsqn9( stock.getBidp_rsqn9() );
        stockAsBi.setBidp_rsqn10( stock.getBidp_rsqn10() );

        return stockAsBi;
    }

    @Override
    public StockInf stockMinOutput1ToStockInf(StockMinDto.StockMinOutput1 stock) {
        if ( stock == null ) {
            return null;
        }

        StockInf stockInf = new StockInf();

        stockInf.setStck_prpr( stock.getStck_prpr() );
        stockInf.setPrdy_vrss( stock.getPrdy_vrss() );
        stockInf.setPrdy_ctrt( stock.getPrdy_ctrt() );
        stockInf.setAcml_vol( stock.getAcml_vol() );
        stockInf.setAcml_tr_pbmn( stock.getAcml_tr_pbmn() );

        return stockInf;
    }

    @Override
    public StockMin stockMinOutput2ToStockMin(StockMinDto.StockMinOutput2 stock) {
        if ( stock == null ) {
            return null;
        }

        StockMin stockMin = new StockMin();

        stockMin.setStck_cntg_hour( stock.getStck_cntg_hour() );
        stockMin.setStck_prpr( stock.getStck_prpr() );
        stockMin.setStck_oprc( stock.getStck_oprc() );
        stockMin.setStck_hgpr( stock.getStck_hgpr() );
        stockMin.setStck_lwpr( stock.getStck_lwpr() );
        stockMin.setCntg_vol( stock.getCntg_vol() );

        return stockMin;
    }
}
