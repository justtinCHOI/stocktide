package com.stocktide.stocktideserver.stock.service;

import com.stocktide.stocktideserver.stock.dto.common.CompanyModifyDto;
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
import java.util.NoSuchElementException;
import java.util.Optional;

/**
 * 회사 정보 관리 서비스
 * 회사의 기본 정보 및 주식 관련 데이터를 관리합니다.
 *
 * @author StockTide Dev Team
 * @version 1.0
 * @since 2025-02-03
 */
@Slf4j
@Service
@Transactional
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class CompanyService {
    private final CompanyRepository companyRepository;
    private final StockService stockService;
    private final StockAsBiRepository stockAsBiRepository;

    /**
     * 종목 코드로 회사 정보를 조회합니다.
     *
     * @param stockCode 종목 코드
     * @return Company 회사 정보
     */
    public Company findCompanyByCode(String stockCode) {
        return companyRepository.findByCode(stockCode);
    }

    /**
     * 회사 ID로 회사 정보를 조회합니다.
     *
     * @param companyId 회사 ID
     * @return Company 회사 정보
     */
    public Company findCompanyById(long companyId) {
        return companyRepository.findByCompanyId(companyId);
    }

    /**
     * 전체 회사 목록을 조회합니다.
     *
     * @return List<Company> 회사 목록
     */
    public List<Company> findCompanies() {
        return companyRepository.findAll();
    }

    /**
     * 회사 정보를 저장합니다.
     *
     * @param company 저장할 회사 정보
     * @return Company 저장된 회사 정보
     */
    public Company saveCompany(Company company) {
        return companyRepository.save(company);
    }

    /**
     * 여러 회사 정보를 일괄 저장합니다.
     *
     * @param companies 저장할 회사 목록
     * @return List<Company> 저장된 회사 목록
     */
    public List<Company> saveCompanies(List<Company> companies) {
        return companyRepository.saveAll(companies);
    }

    /**
     * 회사 정보(korName, engName, code, stockAsBi)를 업데이트하고 데이터베이스에 저장합니다.
     * API로부터 최신 회사 정보를 조회하여 기존 정보를 업데이트합니다.
     *
     * @param code 종목 코드 목록
     * @param marketType 시장 구분 (국내/해외)
     * @throws InterruptedException API 호출 중 인터럽트 발생 시
     */
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

    /**
     * 개별 회사 정보를 저장하고 API 데이터를 업데이트합니다.
     *
     * @param company 저장할 회사 정보
     * @param currentCode 종목 코드
     * @param marketType 시장 구분
     * @throws InterruptedException API 호출 중 인터럽트 발생 시
     */
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


    /**
     * 회사 정보를 수정합니다.
     *
     * @param companyModifyDTO 수정할 회사 정보
     * @throws NoSuchElementException 회사를 찾을 수 없는 경우
     */
    public void modify(CompanyModifyDto companyModifyDTO) {
        Optional<Company> result = companyRepository.findById(companyModifyDTO.getCompanyId());

        Company company = result.orElseThrow(() ->
                new NoSuchElementException("ID가 " + companyModifyDTO.getCompanyId() + "인 회사를 찾을 수 없습니다."));

        company.setCode(companyModifyDTO.getCode());
        company.setKorName(companyModifyDTO.getKorName());

        companyRepository.save(company);
    }
}


