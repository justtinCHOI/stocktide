package com.stocktide.stocktideserver.stock.service;

import com.stocktide.stocktideserver.stock.dto.StockMinResponseDto;
import com.stocktide.stocktideserver.stock.entity.Company;
import com.stocktide.stocktideserver.stock.entity.StockInf;
import com.stocktide.stocktideserver.stock.entity.StockMin;
import com.stocktide.stocktideserver.stock.mapper.StockMapper;
import com.stocktide.stocktideserver.stock.repository.CompanyRepository;
import com.stocktide.stocktideserver.stock.repository.StockInfRepository;
import com.stocktide.stocktideserver.stock.repository.StockMinRepository;
import com.stocktide.stocktideserver.util.Time;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class StockMinService {

    private final CompanyService companyService;
    private final CompanyRepository companyRepository;
    private final StockMinRepository stockMinRepository;
    private final StockMapper stockMapper;
    private final StockInfRepository stockInfRepository;
    private final StockService stockService;

    // 단일 회사의 주식 정보 업데이트 메서드
    public boolean updateOneStockMin(String code) throws InterruptedException {
        log.info("Updating stock info for company: {}", code);

        Optional<Company> company = Optional.ofNullable(companyRepository.findByCode(code));

        if(company.isEmpty()) {
            log.error("Company not found with code: {}", code);
            return false;
        }

        Company targetCompany = company.get();
        LocalDateTime now = LocalDateTime.now();
        String strHour = Time.strHour(now);

        try {
            // 1. 분봉 데이터 가져오기
            List<StockMin> stockMinList = stockService.getStockMinFromApi(targetCompany, strHour);
            if (stockMinList == null || stockMinList.isEmpty()) {
                log.warn("No stock min data received for company: {}", code);
                return false;
            }

            Thread.sleep(50); // API 호출 간격 조절
            // 2. 주식 정보 가져오기
            StockInf stockInf = stockService.getStockInfFromApi(targetCompany, strHour);
            if (stockInf == null) {
                log.warn("No stock info data received for company: {}", code);
                return false;
            }

            // 3. 데이터 저장
            saveStockData(targetCompany, stockMinList, stockInf);

            Thread.sleep(50); // API 호출 간격 조절
            return true;

        } catch (Exception e) {
            log.error("Error updating stock info for company {}: {}", code, e.getMessage());
            return false;
        }
    }

    // 모든 회사의 주식 정보 업데이트 메서드
    public void updateStockMin() throws InterruptedException {
        log.info("---------------updateStockMin started----------------------------------------");

        List<Company> companyList = companyService.findCompanies();

        int successCount = 0;
        int totalCount = companyList.size();

        for (Company company : companyList) {
            if (updateOneStockMin(company.getCode())) {
                successCount++;
            }
        }

        log.info("---------------updateStockMin finished. Success: {}/{} companies----------------------------------------",
                successCount, totalCount);
    }

    // 데이터 저장을 위한 private 헬퍼 메서드
    private void saveStockData(Company company, List<StockMin> stockMinList, StockInf stockInf) {
        stockMinRepository.saveAll(stockMinList);
        stockInfRepository.save(stockInf);
        company.setStockInf(stockInf);
        companyService.saveCompany(company);
    }

    // companyId -> List<StockMin>
    public List<StockMin> getChart(long companyId) {
        return stockMinRepository.findAllByCompanyCompanyId(companyId);
    }

    //StockMin 420개 리스트 -> StockMinResponseDto 420개 리스트 , 내림차순 -> 오름차순
    public List<StockMinResponseDto> getRecent420StockMin(long companyId) {
        // findTop420ByCompanyIdOrderByStockMinIdDesc() : 최신 420개의 주식 분봉 데이터
        List<StockMin> stockMinList = stockMinRepository.findTop420ByCompanyIdOrderByStockMinIdDesc(companyId);

        List<StockMinResponseDto> stockMinResponseDtos = stockMinList.stream()
                .map(stockMapper::stockMinToStockMinResponseDto).collect(Collectors.toList());
        Collections.reverse(stockMinResponseDtos);
        return stockMinResponseDtos;
    }

}
