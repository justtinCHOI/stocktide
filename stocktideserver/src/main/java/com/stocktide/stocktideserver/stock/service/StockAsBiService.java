package com.stocktide.stocktideserver.stock.service;

import com.stocktide.stocktideserver.exception.BusinessLogicException;
import com.stocktide.stocktideserver.exception.ExceptionCode;
import com.stocktide.stocktideserver.stock.entity.Company;
import com.stocktide.stocktideserver.stock.entity.StockAsBi;
import com.stocktide.stocktideserver.stock.repository.StockAsBiRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * 주식 호가(Ask-Bid) 정보 관리 서비스
 * 주식의 매수/매도 호가 데이터를 저장하고 조회하는 기능을 제공합니다.
 *
 * @author StockTide Dev Team
 * @version 1.0
 * @since 2025-02-03
 */
@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class StockAsBiService {

    private final StockAsBiRepository stockAsBiRepository;
    private final CompanyService companyService;
    private final StockService stockService;

    /**
     * 주식 호가 정보를 저장합니다.
     *
     * @param stockAsBi 저장할 주식 호가 정보 엔티티
     * @return 저장된 StockAsBi 엔티티
     */
    public StockAsBi saveStockAsBi(StockAsBi stockAsBi) {
        return stockAsBiRepository.save(stockAsBi);
    }

    /**
     * 모든 회사의 주식 호가 정보를 업데이트합니다.
     * API를 통해 각 회사의 최신 호가 정보를 조회하고 데이터베이스에 저장합니다.
     *
     * @throws InterruptedException API 호출 중 스레드 인터럽트 발생 시
     */
    public void updateStockAsBi() throws InterruptedException {
        log.info("---------------updateStockAsBi  started----------------------------------------");
        List<Company> companyList = companyService.findCompanies(); //모든 회사

        for(int i = 0; i < companyList.size(); i++) {
            log.info("---------------{}st company  started----------------------------------------", (i + 1));
            // 주식 코드로 회사 불러오기
            Company company = companyService.findCompanyByCode(companyList.get(i).getCode());
            // 해당 회사의 asbi api호출하기
            StockAsBi stockAsBi = stockService.getStockAsBiFromApi(company);
            stockAsBiRepository.save(stockAsBi);
            company.setStockAsBi(stockAsBi);
            companyService.saveCompany(company);
            log.info("---------------companyService.saveCompany {} ----------------------------------------", company.getStockAsBi().getAskp1());
            Thread.sleep(500);
        }
        log.info("---------------updateStockAsBi  finished----------------------------------------");
    }

    /**
     * 특정 회사의 주식 호가 정보를 조회합니다.
     *
     * @param companyId 호가 정보를 조회할 회사의 고유 식별자
     * @return 해당 회사의 StockAsBi 엔티티
     * @throws BusinessLogicException 호가 정보를 찾을 수 없는 경우
     */
    public StockAsBi getStockAsBi(long companyId) {
        Optional<StockAsBi> stock = stockAsBiRepository.findByCompanyCompanyId(companyId);
        stock.orElseThrow(() -> new BusinessLogicException(ExceptionCode.STOCKASBI_NOT_FOUND));
        return stock.get();
    }

}
