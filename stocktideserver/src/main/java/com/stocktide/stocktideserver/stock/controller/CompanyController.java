package com.stocktide.stocktideserver.stock.controller;

import com.stocktide.stocktideserver.stock.dto.*;
import com.stocktide.stocktideserver.stock.entity.Company;
import com.stocktide.stocktideserver.stock.mapper.StockMapper;
import com.stocktide.stocktideserver.stock.repository.CompanyRepository;
import com.stocktide.stocktideserver.stock.service.DomesticApiService;
import com.stocktide.stocktideserver.stock.service.CompanyService;
import com.stocktide.stocktideserver.stock.service.StockMinService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@AllArgsConstructor
@RequestMapping("/api/company")
public class CompanyController {

    private final CompanyService companyService;
    private final StockMapper stockMapper;
    private final CompanyRepository companyRepository;
    private StockMinService stockMinService;
    private DomesticApiService apiCallService;

    @GetMapping("/basic/{companyId}")
    public ResponseEntity<StockBasicDto> getStockBasic(@PathVariable Long companyId) {
        try {
            // 1. companyId로 Company 엔티티 조회
            Company company = companyService.findCompanyById(companyId);
            if (company == null) {
                log.error("Company not found with id: {}", companyId);
                return ResponseEntity.notFound().build();
            }

            // 2. Company 엔티티에서 stockCode 추출
            String stockCode = company.getCode();
            if (stockCode == null || stockCode.isEmpty()) {
                log.error("Stock code is null or empty for company id: {}", companyId);
                return ResponseEntity.badRequest().build();
            }

            // 3. stockCode를 사용하여 API 호출
            StockBasicDto response = apiCallService.getStockBasicDataFromApi(stockCode);
            if (response == null) {
                log.error("No response from API for stock code: {}", stockCode);
                return ResponseEntity.noContent().build();
            }

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            log.error("Error fetching stock basic data for company id: {}, error: {}", companyId, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/balance/{companyId}")
    public ResponseEntity<StockBalanceDto> getStockBalance(@PathVariable Long companyId) {
        try {
            // 1. companyId로 Company 엔티티 조회
            Company company = companyService.findCompanyById(companyId);
            if (company == null) {
                log.error("Company not found with id: {}", companyId);
                return ResponseEntity.notFound().build();
            }

            // 2. Company 엔티티에서 stockCode 추출
            String stockCode = company.getCode();
            if (stockCode == null || stockCode.isEmpty()) {
                log.error("Stock code is null or empty for company id: {}", companyId);
                return ResponseEntity.badRequest().build();
            }

            // 3. stockCode를 사용하여 API 호출
            StockBalanceDto response = apiCallService.getStockBalanceDataFromApi(stockCode);
            if (response == null) {
                log.error("No response from API for stock code: {}", stockCode);
                return ResponseEntity.noContent().build();
            }

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            log.error("Error fetching stock balance data for company id: {}, error: {}", companyId, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/news/{companyId}")
    public ResponseEntity<StockNewsDto> getStockNews(@PathVariable Long companyId) {
        try {
            Company company = companyService.findCompanyById(companyId);

            if (company == null) {
                return ResponseEntity.notFound().build();
            }
            log.info("Company code: {}", company.getCode());

            StockNewsDto response = apiCallService.getNewsDataFromApi(company.getCode());
            if (response == null) {
                return ResponseEntity.noContent().build();
            }

//            log.info("News from API for news size: {}", response.getOutput().size());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            log.error("Error fetching stock news for company id: {}, error: {}", companyId, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/domestic/all")
    public ResponseEntity<?> getAllDomesticCompanies() {
        try {
            StockListResponseDto response = apiCallService.getCodesDataFromApi();

            if (response == null || response.getOutput() == null) {
                return ResponseEntity
                        .status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Failed to fetch company data");
            }

            return ResponseEntity.ok(response.getOutput());
        } catch (Exception e) {
            log.error("Error fetching domestic companies: ", e);
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage());
        }
    }

    // 전체 회사 리스트
    @GetMapping("/list")
    public ResponseEntity<List<CompanyResponseDto>> getCompanyList() {

        List<Company> companyList = companyRepository.findAll();

        List<CompanyResponseDto> companyResponseDtoList = stockMapper.CompaniesToCompanyResponseDtos(companyList);

        return new ResponseEntity<>(companyResponseDtoList, HttpStatus.OK);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/{companyId}")
    public ResponseEntity<CompanyResponseDto> getCompany(@PathVariable("companyId") Long companyId) {

        Company company = companyService.findCompanyById(companyId);

        CompanyResponseDto companyResponseDto = stockMapper.companyToCompanyResponseDto(company);

        return new ResponseEntity<>(companyResponseDto, HttpStatus.OK);
    }

    // 차트 하나 호출
    @GetMapping("/charts/{companyId}")
    public ResponseEntity<List<StockMinResponseDto>> getCompanyChart(@PathVariable("companyId") long companyId) {
        List<StockMinResponseDto> stockMinList = stockMinService.getRecent420StockMin(companyId);

        return new ResponseEntity<>(stockMinList, HttpStatus.OK);
    }

    //회사 수정
    @PutMapping("/{companyId}")
    public Map<String, String> modify(@PathVariable("companyId") Long companyId,
                                      @RequestBody CompanyModifyDTO companyModifyDTO) {
        companyModifyDTO.setCompanyId(companyId);
        companyService.modify(companyModifyDTO);
        return Map.of("RESULT", "SUCCESS");
    }

}
