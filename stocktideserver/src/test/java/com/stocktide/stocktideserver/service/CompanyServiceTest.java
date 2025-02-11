package com.stocktide.stocktideserver.service;

import com.stocktide.stocktideserver.stock.entity.MarketType;
import com.stocktide.stocktideserver.stock.repository.CompanyRepository;
import com.stocktide.stocktideserver.stock.service.CompanyService;
import com.stocktide.stocktideserver.stock.service.StockMinService;
import com.stocktide.stocktideserver.stock.service.StockOrderService;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@SpringBootTest
@Log4j2
//@ActiveProfiles("test")
@ActiveProfiles("dev")
public class CompanyServiceTest {

    @Autowired
    CompanyService companyService;

    @Autowired
    StockMinService stockMinService;

    @Autowired
    StockOrderService stockOrderService;

    @Autowired
    private CompanyRepository companyRepository;

    // 주의사항
    // @Transactional 추가하기
    // 초당 Api 호출 수 제한하기
    // 분당 Api 호출 수 제한하기 (1분, 1회) 403 Forbidden: "{"error_description":"접근토큰 발급 잠시 후 다시 시도하세요()","error_code":"EGW00133"}"
    // Active Profile 변경하기

    // 1-1. ActiveProfiles test -> dev
    // 1-2. @Transactional 주석
    // 2. testFillEveryDomesticCompanies(): Company + StockAsBi 추가
    // 3. updateStockMin(): StockMin 추가
    // 4. testCheckOrder(): StockOrder -> StockHold
    // 5-1. @Transactional 주석 풀기
    // 5-2. ActiveProfiles dev -> test
    // 5-3. 함수 1개 제외하고 전부 주석 (token 발급 주기)

    // Update Company + StockAsBi
    // If you finished with updating, remove comment on @Transactional



      // ------------------------------------------------------------------------------
//    @Test
//    @Transactional
//    public void testFillCompactDomesticCompanies() throws InterruptedException {
//        List<String> code = List.of("005930", "005490", "068270", "086520", "247540", "013570", "192400", "323410", "069640", "001390", "051910", "005380", "066570", "000270");
//        companyService.fillCompanies(code, MarketType.DOMESTIC);
//    }

    // Update Company + StockAsBi
//    @Test
//    @Transactional
//    public void testFillDomesticCompanies() throws InterruptedException {
//        List<String> code = List.of(
//                "011200", "088350", "006800", "024110", "316140",
//                "000660", "088980", "015760", "034020", "055550",
//                "032640", "034220", "323410", "000270", "105560",
//                "047040", "003490", "005940", "138930", "030200",
//                "042660", "086790", "005380", "073240", "003530",
//                "003470", "020560", "175330", "003620", "028050",
//                "033780", "272210", "066570", "005930", "009830",
//                "085620", "010140", "047050", "139130", "415640",
//                "082640", "003550", "096770", "004020", "001740",
//                "029780", "000370", "030610", "000720", "064350",
//                "001200", "028670", "016380", "012330", "047810",
//                "005490", "000880", "078930", "094800", "036460",
//                "016360", "329180", "003540", "006360", "097230",
//                "168490", "000680", "051910", "009150", "000080",
//                "006400", "009540", "152550", "294870", "000540",
//                "000400", "071050", "030210", "012630"
//        );
//        companyService.fillCompanies(code, MarketType.DOMESTIC);
//    }
//
//    @Test
//    @Transactional
//    public void testFillOverseasCompanies() throws InterruptedException {
//        List<String> code = List.of( "TSLA");
//        companyService.fillCompanies(code, MarketType.OVERSEAS);
//    }
//
//    // update StockMin + StockInf
//    @Test
//    @Transactional
//    public void testUpdateEveryStockMin() throws InterruptedException {
//        stockMinService.updateStockMin();
//    }

//    @Test
////    @Transactional
//    public void updateOneStockMin() throws InterruptedException {
//        stockMinService.updateOneStockMin("TSLA");
//    }
    //------------------------------------------------------------------------------

//    @Test
//    @Transactional
//    public void testCheckOrder() {
//        stockOrderService.checkOrder();
//    }
//
//    @Test
//    @Transactional
//    public void testFindCompanies()  {
//        companyService.findCompanies();
//    }
//
//    @Test
//    @Transactional
//    public void testGetCompanyId() {
//        long companyId = 2L;
//        Company company = companyRepository.findByCompanyId(companyId);
//        log.info(company.getCompanyId());
//    }



    // Create first company
    // If you finished with updating, remove comment on @Transactional
//    @Test
//    @Transactional
//    public void testRegister() {
//        Company company = Company.builder()
//                .code("Code123")
//                .korName("Korean Name")
////                .created_at(LocalDate.of(2024, 5, 4))
//                .build();
//        Company savedCompany = companyService.saveCompany(company);
//        log.info("savedCompany {}", savedCompany);
//    }


//    @Test
//    public void testGetList() {
//        PageRequestDTO pageRequestDTO = PageRequestDTO.builder().page(11).build();
//        log.info(companyService.getList(pageRequestDTO));
//    }
}
