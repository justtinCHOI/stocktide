package com.stocktide.stocktideserver.stock.service;

import com.stocktide.stocktideserver.stock.dto.common.StockMinResponseDto;
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

/**
 * 주식 분봉(分鐘) 데이터 관리 서비스
 *
 * 주식의 시간별 세부 거래 정보를 조회, 저장, 처리하는 서비스입니다.
 * 각 회사의 분 단위 주식 거래 데이터를 API로부터 수집하고 관리합니다.
 *
 * @author StockTide Dev Team
 * @version 1.0
 * @since 2025-02-03
 */
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

    /**
     * 단일 회사의 주식 정보를 업데이트합니다.
     *
     * 주어진 회사 코드를 기반으로 API에서 최신 분봉 데이터와 주식 정보를 조회하고 저장합니다.
     * 데이터 수집 과정에서 예외 발생 시 로깅하고 false를 반환합니다.
     *
     * @param code 업데이트할 회사의 주식 코드
     * @return 업데이트 성공 여부 (true: 성공, false: 실패)
     * @throws InterruptedException API 호출 중 스레드 인터럽트 발생 시
     */
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

    /**
     * 모든 회사의 주식 정보를 업데이트합니다.
     *
     * 전체 회사 목록을 순회하며 각 회사의 주식 정보를 업데이트하고,
     * 성공/실패 통계를 로깅합니다.
     *
     * @throws InterruptedException API 호출 중 스레드 인터럽트 발생 시
     */
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

    /**
     * 데이터 저장을 위한 내부 헬퍼 메서드
     *
     * 주식 분봉 데이터와 주식 정보를 데이터베이스에 저장하고,
     * 관련 엔티티를 업데이트합니다.
     *
     * @param company 대상 회사 엔티티
     * @param stockMinList 저장할 주식 분봉 데이터 목록
     * @param stockInf 저장할 주식 정보 엔티티
     */
    private void saveStockData(Company company, List<StockMin> stockMinList, StockInf stockInf) {
        stockMinRepository.saveAll(stockMinList);
        stockInfRepository.save(stockInf);
        company.setStockInf(stockInf);
        companyService.saveCompany(company);
    }

    /**
     * 특정 회사의 주식 차트 데이터를 조회합니다.
     *
     * @param companyId 회사의 고유 식별자
     * @return 해당 회사의 StockMin 엔티티 목록
     */
    public List<StockMin> getChart(long companyId) {
        return stockMinRepository.findAllByCompanyCompanyId(companyId);
    }

    /**
     * 특정 회사의 최근 420개 분봉 데이터를 ResponseDto로 변환여 반환합니다.
     *
     * 데이터베이스에서 최신 420개의 분봉 데이터를 조회하고,
     * StockMapper를 사용하여 ResponseDto로 변환합니다.
     * 내림차순으로 정렬합니다.
     *
     * @param companyId 회사의 고유 식별자
     * @return 최근 420개의 StockMinResponseDto 목록 (오름차순 정렬)
     */
    public List<StockMinResponseDto> getRecent420StockMin(long companyId) {
        // findTop420ByCompanyIdOrderByStockMinIdDesc() : 최신 420개의 주식 분봉 데이터
        List<StockMin> stockMinList = stockMinRepository.findTop420ByCompanyIdOrderByStockMinIdDesc(companyId);

        List<StockMinResponseDto> stockMinResponseDtos = stockMinList.stream()
                .map(stockMapper::stockMinToStockMinResponseDto).collect(Collectors.toList());
        Collections.reverse(stockMinResponseDtos);
        return stockMinResponseDtos;
    }

}
