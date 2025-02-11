package com.stocktide.stocktideserver.service;

import com.stocktide.stocktideserver.stock.dto.*;
import com.stocktide.stocktideserver.stock.service.OverseasApiService;
import com.stocktide.stocktideserver.util.Time;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@SpringBootTest
@Log4j2
@ActiveProfiles("test")
//@ActiveProfiles("dev")
public class OverseasApiServiceTest {

    @Autowired
    OverseasApiService overseasApiService;

//    @Test
//    @Transactional
//    public void testGetStockInfDataFromApi() {
//        StockInfOverseasDataDto stockInfOverseasDataDto = overseasApiService.getStockInfDataFromApi("TSLA");
//        log.info("-------- 현재가 : {} ", stockInfOverseasDataDto.getOutput().getLast());
//    }
//
//    @Test
//    @Transactional
//    public void testGetStockAsBiDataFromApi() {
//        StockAsBiOverseasDataDto stockAsBiOverseasDataDto = overseasApiService.getStockAsBiDataFromApi("TSLA");
//        log.info("-------- 매수호가가격  : {}", stockAsBiOverseasDataDto.getOutput2().getPbid1());
//    }
//
//    @Test
//    @Transactional
//    public void testGetStockMinDataFromApi() {
//        LocalDateTime now = LocalDateTime.now();
//        String strHour = Time.strHour(now);
//        StockMinOverseasDto stockMinOverseasDto = overseasApiService.getStockMinDataFromApi("TSLA", strHour);
//        log.info("-------- stockMinOverseasDto 개수 : {}  ", stockMinOverseasDto.getOutput2().length);
//    }
//
//    @Test
//    @Transactional
//    public void testGetStockBasicDataFromApi() {
//        StockBasicOverseasDto stockBasicOverseasDto = overseasApiService.getStockBasicDataFromApi("TSLA");
//        log.info("-------- stockBasicOverseasDto 이름 : {}  ", stockBasicOverseasDto.getOutput().getPrdt_name());
//    }
//
//    @Test
//    @Transactional
//    public void testGetStockDetailDataFromApi() {
//        StockDetailOverseasDto stockDetailOverseasDto = overseasApiService.getStockDetailDataFromApi("TSLA");
//        log.info("-------- stockBasicOverseasDto 실시간조회종목코드 : {}  ", stockDetailOverseasDto.getOutput().getRsym());
//    }


}
