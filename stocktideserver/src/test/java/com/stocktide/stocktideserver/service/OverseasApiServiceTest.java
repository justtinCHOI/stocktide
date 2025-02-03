package com.stocktide.stocktideserver.service;

import com.stocktide.stocktideserver.stock.dto.StockAsBiOverseasDataDto;
import com.stocktide.stocktideserver.stock.dto.StockInfOverseasDataDto;
import com.stocktide.stocktideserver.stock.service.OverseasApiService;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Log4j2
//@ActiveProfiles("test")
@ActiveProfiles("dev")
public class OverseasApiServiceTest {

    @Autowired
    OverseasApiService overseasApiService;

    @Test
    @Transactional
    public void testGetStockInfFromApi() {
        StockInfOverseasDataDto stockInfOverseasDataDto = overseasApiService.getStockInfDataFromApi("TSLA");
        log.info("-------- 현재가 {} : ", stockInfOverseasDataDto.getOutput().getLast());
    }
    @Test
    @Transactional
    public void testGetStockAsBiDataFromApi() {
        StockAsBiOverseasDataDto stockAsBiOverseasDataDto = overseasApiService.getStockAsBiDataFromApi("TSLA");
        log.info("-------- 매수호가가격 {} : ", stockAsBiOverseasDataDto.getOutput2().getPbid1());
    }


}
