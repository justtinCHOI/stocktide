package com.stocktide.stocktideserver.stock.service;

import com.stocktide.stocktideserver.stock.dto.CompanyModifyDTO;
import com.stocktide.stocktideserver.stock.dto.StockasbiDataDto;
import com.stocktide.stocktideserver.stock.entity.Company;
import com.stocktide.stocktideserver.stock.entity.MarketType;
import com.stocktide.stocktideserver.stock.entity.StockAsBi;
import com.stocktide.stocktideserver.stock.entity.StockName;
import com.stocktide.stocktideserver.stock.mapper.ApiMapper;
import com.stocktide.stocktideserver.stock.repository.CompanyRepository;
import com.stocktide.stocktideserver.stock.repository.StockAsBiRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class CompanyService {
    private final CompanyRepository companyRepository;
    private final StockService stockService;

    // code -> Company
    public Company findCompanyByCode(String stockCode) {
        return companyRepository.findByCode(stockCode);
    }

    // autoIncrement -> Company
    public Company findCompanyById(long companyId) {
        return companyRepository.findByCompanyId(companyId);
    }

    // 모든 회사 리턴
    public List<Company> findCompanies() {
        return companyRepository.findAll();
    }

    // 특정 회사 저장
    public Company saveCompany(Company company) {
        return companyRepository.save(company);
    }

    // 모든 회사 저장
    public List<Company> saveCompanies(List<Company> companies) {
        return companyRepository.saveAll(companies);
    }

    public void fillCompany() {
        Company company = new Company();
    }

    // 회사의 korName, engName, code, stockAsBi 를 채우고 데이터베이스에 저장
    public void fillDomesticCompany() throws InterruptedException {
        String stockCode = "005930";

        Company company = new Company();
        company.setCode(stockCode);
        company.setMarketType(MarketType.DOMESTIC);

        StockName stockName = stockService.getStockNameFromApi(company);
        company.setKorName(stockName.getKorName());
        company.setEngName(stockName.getEngName());
        company.setStockAsBi(new StockAsBi());

        StockAsBi stockAsBi = stockService.getStockAsBiFromApi(company);
        company.setStockAsBi(stockAsBi);
        Thread.sleep(500);
        companyRepository.save(company);
    }

    // 회사들의 korName, engName, code, stockAsBi 를 채우고 데이터베이스에 저장
    public void fillDomesticCompanies() throws InterruptedException {
        List<String> code = List.of("005930", "005490", "068270", "086520", "247540", "013570", "192400", "323410", "069640", "001390", "051910", "005380", "066570", "000270");

        for (String currentCode : code) {
            // 기존 데이터 존재 여부 확인
            Company existingCompany = companyRepository.findByCode(currentCode);

            if (existingCompany != null) {
                log.info("Skipping company ({}) - already exists", currentCode);
                continue;
            }
            Company company = new Company();
            company.setCode(currentCode);
            company.setMarketType(MarketType.DOMESTIC);

            StockName stockName = stockService.getStockNameFromApi(company);
            company.setKorName(stockName.getKorName());
            company.setEngName(stockName.getEngName());
            company.setStockAsBi(new StockAsBi());

            StockAsBi stockAsBi = stockService.getStockAsBiFromApi(company);

            company.setStockAsBi(stockAsBi);
            companyRepository.save(company);
        }
    }

    public void fillEveryDomesticCompanies() throws InterruptedException {
        List<String> code = List.of(
                "011200", "088350", "006800", "024110", "316140",
                "000660", "088980", "015760", "034020", "055550",
                "032640", "034220", "323410", "000270", "105560",
                "047040", "003490", "005940", "138930", "030200",
                "042660", "086790", "005380", "073240", "003530",
                "003470", "020560", "175330", "003620", "028050",
                "033780", "272210", "066570", "005930", "009830",
                "085620", "010140", "047050", "139130", "415640",
                "082640", "003550", "096770", "004020", "001740",
                "029780", "000370", "030610", "000720", "064350",
                "001200", "028670", "016380", "012330", "047810",
                "005490", "000880", "078930", "094800", "036460",
                "016360", "329180", "003540", "006360", "097230",
                "168490", "000680", "051910", "009150", "000080",
                "006400", "009540", "152550", "294870", "000540",
                "000400", "071050", "030210", "012630"
        );

        int addedCount = 0;
        int skippedCount = 0;

        for(int i = 0; i < code.size(); i++) {
            String currentCode = code.get(i);

            // 기존 데이터 존재 여부 확인
            Company existingCompany = companyRepository.findByCode(currentCode);

            if (existingCompany != null) {
                log.info("Skipping company ({}) - already exists", currentCode);
                skippedCount++;
                continue;
            }

            try {
                Company company = new Company();
                company.setCode(currentCode);
                company.setMarketType(MarketType.DOMESTIC);

                StockName stockName = stockService.getStockNameFromApi(company);
                company.setKorName(stockName.getKorName());
                company.setEngName(stockName.getEngName());
                company.setStockAsBi(new StockAsBi());

                StockAsBi stockAsBi = stockService.getStockAsBiFromApi(company);

                company.setStockAsBi(stockAsBi);
                companyRepository.save(company);

                addedCount++;

                log.info("Successfully added company ({}) - {}/{}", currentCode, addedCount, code.size() - skippedCount);

                Thread.sleep(500); // API 호출 제한 고려

            } catch (Exception e) {
                log.error("Error processing company ({}): {}",
                        currentCode, e.getMessage());
            }
        }

        log.info("Company fill process completed. Added: {}, Skipped: {}, Total attempted: {}",
                addedCount, skippedCount, code.size());
    }

    public void modify(CompanyModifyDTO companyModifyDTO) {

        Optional<Company> result = companyRepository.findById(companyModifyDTO.getCompanyId());

        Company company = result.orElseThrow();

        company.setCode(companyModifyDTO.getCode());
        company.setKorName(companyModifyDTO.getKorName());
//        company.setCreatedAt(companyModifyDTO.getCreatedAt());

        companyRepository.save(company);

    }
}


