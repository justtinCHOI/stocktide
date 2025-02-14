package com.stocktide.stocktideserver.service;

import com.stocktide.stocktideserver.stock.dto.domestic.*;
import com.stocktide.stocktideserver.stock.dto.common.*;
import com.stocktide.stocktideserver.stock.entity.Company;
import com.stocktide.stocktideserver.stock.entity.StockNews;
import com.stocktide.stocktideserver.stock.mapper.StockMapper;
import com.stocktide.stocktideserver.stock.service.CompanyService;
import com.stocktide.stocktideserver.stock.service.DomesticApiService;
import com.stocktide.stocktideserver.stock.service.StockService;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

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
//    public void testGetStockNewsDataFromApi() {
//        StockNewsDomesticDto stockNewsDto = domesticApiService.getNewsDataFromApi("011200");
//
//        log.info("-------- StockNews size : {}  ", stockNewsDto.getOutput().size());
//    }
//
//    @Test
//    public void testGetStockNewsFromApi() {
//        Company company = companyService.findCompanyByCode("011200");
//        List<StockNews> stockNewsList = stockService.getStockNewsFromApi(company);
//        StockNewsResponseDto response = stockMapper.stockNewsListToStockNewsResponseDto(stockNewsList);
//
//        log.info("-------- stockNewsList getFirst getDorg : {}  ", stockNewsList.getFirst().getDorg());
//        log.info("-------- StockNewsResponseDto getOutput getFirst getDorg : {}  ", response.getOutput().getFirst().getDorg());
//    }


}
