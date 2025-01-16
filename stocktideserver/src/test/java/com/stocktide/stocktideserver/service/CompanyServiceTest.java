package com.stocktide.stocktideserver.service;

import com.stocktide.stocktideserver.stock.entity.Company;
import com.stocktide.stocktideserver.stock.repository.CompanyRepository;
import com.stocktide.stocktideserver.stock.service.CompanyService;
import com.stocktide.stocktideserver.stock.service.StockMinService;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

@SpringBootTest
@Log4j2
@TestPropertySource("classpath:application-test.yml")
@ActiveProfiles("test")
//@ActiveProfiles("dev")
public class CompanyServiceTest {

    @Autowired
    CompanyService companyService;

    @Autowired
    StockMinService stockMinService;

    @Autowired
    private CompanyRepository companyRepository;
    // testRegister 회사 1개 추가 ->
    // testfillDomesticCompanies  회사 2 ~ 15 Company + StockAsBi 추가 ->
    // testupdateDomesticStockMin 회사 2 ~ 15 StockMin 추가

    // Create first company
    // If you finished with updating, remove comment on @Transactional
    @Test
    @Transactional
    public void testRegister() {
        Company company = Company.builder()
                .code("Code123")
                .korName("Korean Name")
//                .created_at(LocalDate.of(2024, 5, 4))
                .build();
        Company savedCompany = companyService.saveCompany(company);
        log.info("savedCompany {}", savedCompany);
    }

    // Update Company + StockAsBi
    // If you finished with updating, remove comment on @Transactional
    @Test
    @Transactional
    public void testFillDomesticCompanies() throws InterruptedException {
        companyService.fillDomesticCompanies();
    }

    @Test
    @Transactional
    public void testFillEveryDomesticCompanies() throws InterruptedException {
        companyService.fillEveryDomesticCompanies();
    }

    // build.gradle 할 때 실행 되므로 만료되지 않는 accessToken 을 계속 요청
    // 403 Forbidden: "{"error_description":"접근토큰 발급 잠시 후 다시 시도하세요(1분당 1회)","error_code":"EGW00133"}"
    // update StockMin
    // If you finished with updating, remove comment on @Transactional
//    @Test
//    @Transactional
//    public void testupdateDomesticStockMin() throws InterruptedException {
//        stockMinService.updateDomesticStockMin();
//    }

    @Test
//    @Transactional
    public void testUpdateDomesticStockMin() throws InterruptedException {
        stockMinService.updateDomesticStockMin();
    }

    @Test
//    @Transactional
    public void testFindCompanies()  {
        companyService.findCompanies();
    }

    @Test
    @Transactional
    public void testGetCompanyId() {
        long companyId = 2L;
        Company company = companyRepository.findByCompanyId(companyId);
        log.info(company.getCompanyId());
    }



//    @Test
//    public void testGetList() {
//        PageRequestDTO pageRequestDTO = PageRequestDTO.builder().page(11).build();
//        log.info(companyService.getList(pageRequestDTO));
//    }
}
