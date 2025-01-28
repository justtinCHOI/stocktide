package com.stocktide.stocktideserver.stock.service;

import com.stocktide.stocktideserver.stock.dto.StockMinDto;
import com.stocktide.stocktideserver.stock.dto.StockMinResponseDto;
import com.stocktide.stocktideserver.stock.entity.Company;
import com.stocktide.stocktideserver.stock.entity.StockAsBi;
import com.stocktide.stocktideserver.stock.entity.StockInf;
import com.stocktide.stocktideserver.stock.entity.StockMin;
import com.stocktide.stocktideserver.stock.mapper.ApiMapper;
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
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class StockMinService {

    private final CompanyService companyService;
    private final StockMinRepository stockMinRepository;
    private final StockMapper stockMapper;
    private final StockInfRepository stockInfRepository;
    private final StockService stockService;

    // 모든 회사의 정호, 주식(StockInf, StockMin) with API -> 데이터베이스에 저장
    public void updateStockMin() throws InterruptedException {
        log.info("---------------updateStockMin  started----------------------------------------");
        List<Company> companyList = companyService.findCompanies();
        LocalDateTime now = LocalDateTime.now();
        String strHour = Time.strHour(now);

        int count = 0;

        //Company -> code + strHour -> StockMinDto ->  List<StockMinOutput2> -> List<StockMin> -> 정렬 -> 저장
        //Company -> code + strHour -> StockMinDto ->  StockMinOutput1 -> StockInf 저장 -> Company
        for (Company value : companyList) {
            // 주식 코드로 회사 불러오기
            Company company = companyService.findCompanyByCode(value.getCode());
            // 분봉, 회사 정보 호출하기
            List<StockMin> stockMinList = stockService.getStockMinFromApi(company, strHour);
            StockInf stockInf = stockService.getStockInfFromApi(company, strHour);
            // 저장
            stockMinRepository.saveAll(stockMinList);
            stockInfRepository.save(stockInf);
            company.setStockInf(stockInf);
            companyService.saveCompany(company);

            Thread.sleep(500);
            log.info("---------------updateStockMin  finished----------------------------------------");
        }
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
