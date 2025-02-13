package com.stocktide.stocktideserver.service;

import com.stocktide.stocktideserver.stock.dto.StockNewsDto;
import com.stocktide.stocktideserver.stock.dto.StockNewsResponseDto;
import com.stocktide.stocktideserver.stock.entity.Company;
import com.stocktide.stocktideserver.stock.entity.StockNews;
import com.stocktide.stocktideserver.stock.mapper.StockMapper;
import com.stocktide.stocktideserver.stock.service.CompanyService;
import com.stocktide.stocktideserver.stock.service.DomesticApiService;
import com.stocktide.stocktideserver.stock.service.OverseasApiService;
import com.stocktide.stocktideserver.stock.service.StockService;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;

@SpringBootTest
@Log4j2
//@ActiveProfiles("test")
//@ActiveProfiles("dev")
//@ActiveProfiles("prod")
public class DemesticApiServiceTest {

    @Autowired
    private CompanyService companyService;
    @Autowired
    private StockService stockService;
    @Autowired
    private DomesticApiService domesticApiService;
    @Autowired
    private StockMapper stockMapper;

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

    @Test
    public void testGetStockNewsDataFromApi() {
        StockNewsDto stockNewsDto = domesticApiService.getNewsDataFromApi("011200");

        log.info("-------- StockNews size : {}  ", stockNewsDto.getOutput().size());
    }

    @Test
    public void testGetStockNewsFromApi() {
        Company company = companyService.findCompanyByCode("011200");
        List<StockNews> stockNewsList = stockService.getStockNewsFromApi(company);
        StockNewsResponseDto response = stockMapper.stockNewsListToStockNewsResponseDto(stockNewsList);

        log.info("-------- stockNewsList getFirst getDorg : {}  ", stockNewsList.getFirst().getDorg());
        log.info("-------- StockNewsResponseDto getOutput getFirst getDorg : {}  ", response.getOutput().getFirst().getDorg());
    }


}
