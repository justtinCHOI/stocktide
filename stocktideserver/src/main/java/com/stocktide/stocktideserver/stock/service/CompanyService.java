package com.stocktide.stocktideserver.stock.service;

import com.stocktide.stocktideserver.stock.dto.CompanyModifyDTO;
import com.stocktide.stocktideserver.stock.entity.Company;
import com.stocktide.stocktideserver.stock.entity.MarketType;
import com.stocktide.stocktideserver.stock.entity.StockAsBi;
import com.stocktide.stocktideserver.stock.entity.StockName;
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
    private final StockAsBiRepository stockAsBiRepository;
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

    // 회사들의 korName, engName, code, stockAsBi 를 채우고 데이터베이스에 저장
    public void fillCompanies(List<String> code, MarketType marketType) throws InterruptedException {

        int updatedCount = 0;
        int addedCount = 0;

        for(int i = 0; i < code.size(); i++) {
            String currentCode = code.get(i);
            Company existingCompany = companyRepository.findByCode(currentCode);

            try {
                if (existingCompany != null) {
                    log.info("company ({}) - already exists", currentCode);
                    saveCompany(existingCompany, currentCode, marketType);
                    updatedCount++;
                    log.info("Successfully updated company ({}) - {}/{}", currentCode, updatedCount, code.size());
                }else{
                    Company company = new Company();
                    company.setStockAsBi(new StockAsBi());
                    saveCompany(company, currentCode, marketType);
                    addedCount++;

                    log.info("Successfully added company ({}) - {}/{}", currentCode, addedCount, code.size());
                }
            } catch (Exception e) {
                log.error("Error processing company ({}): {}",
                        currentCode, e.getMessage());
            }
        }

        log.info("Company fill process completed. Added: {}, updated: {}, Total attempted: {}",
                addedCount, updatedCount, code.size());
    }

    public void saveCompany(Company company, String currentCode, MarketType marketType) throws InterruptedException {
        company.setCode(currentCode);
        company.setMarketType(marketType);

        StockName stockName = stockService.getStockNameFromApi(company);
        company.setKorName(stockName.getKorName());
        company.setEngName(stockName.getEngName());
        Thread.sleep(50); // API 호출 제한 고려

        StockAsBi stockAsBi = stockService.getStockAsBiFromApi(company);
        Thread.sleep(50); // API 호출 제한 고려
        stockAsBiRepository.save(stockAsBi);
        company.setStockAsBi(stockAsBi);
        companyRepository.save(company);
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


