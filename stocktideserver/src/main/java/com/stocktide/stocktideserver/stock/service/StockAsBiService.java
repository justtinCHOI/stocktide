package com.stocktide.stocktideserver.stock.service;

import com.stocktide.stocktideserver.exception.BusinessLogicException;
import com.stocktide.stocktideserver.exception.ExceptionCode;
import com.stocktide.stocktideserver.stock.dto.StockasbiDataDto;
import com.stocktide.stocktideserver.stock.entity.Company;
import com.stocktide.stocktideserver.stock.entity.StockAsBi;
import com.stocktide.stocktideserver.stock.mapper.ApiMapper;
import com.stocktide.stocktideserver.stock.repository.StockAsBiRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class StockAsBiService {

    private final StockAsBiRepository stockAsBiRepository;
    private final CompanyService companyService;
    private final StockService stockService;

    //StockAsBi 저장
    public StockAsBi saveStockAsBi(StockAsBi stockAsBi) {
        return stockAsBiRepository.save(stockAsBi);
    }

    //저장되어 있는 회사코드 -> AsBi 정보 update

    public void updateStockAsBi() throws InterruptedException {
        log.info("---------------updateStockAsBi  started----------------------------------------");
        List<Company> companyList = companyService.findCompanies(); //모든 회사
        log.info("---------------companyList {}----------------------------------------", companyList);

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
//            Thread.sleep(500);
        }
        log.info("---------------updateStockAsBi  finished----------------------------------------");
    }

    //companyId -> 회사의 StockAsBi 정보
    public StockAsBi getStockAsBi(long companyId) {
        Optional<StockAsBi> stock = stockAsBiRepository.findByCompanyCompanyId(companyId);
        stock.orElseThrow(() -> new BusinessLogicException(ExceptionCode.STOCKASBI_NOT_FOUND));
        return stock.get();
    }

}
