package com.stocktide.stocktideserver.stock.controller;

import com.stocktide.stocktideserver.stock.dto.common.*;
import com.stocktide.stocktideserver.stock.dto.domestic.StockBalanceDomesticDto;
import com.stocktide.stocktideserver.stock.entity.Company;
import com.stocktide.stocktideserver.stock.entity.StockBasic;
import com.stocktide.stocktideserver.stock.entity.StockNews;
import com.stocktide.stocktideserver.stock.mapper.StockMapper;
import com.stocktide.stocktideserver.stock.repository.CompanyRepository;
import com.stocktide.stocktideserver.stock.service.DomesticApiService;
import com.stocktide.stocktideserver.stock.service.CompanyService;
import com.stocktide.stocktideserver.stock.service.StockMinService;
import com.stocktide.stocktideserver.stock.service.StockService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@AllArgsConstructor
@RequestMapping("/api/company")
@Tag(name = "Company", description = "회사 정보 관리 API")
public class CompanyController {

    private final CompanyService companyService;
    private final StockMapper stockMapper;
    private final CompanyRepository companyRepository;
    private final StockService stockService;
    private StockMinService stockMinService;
    private DomesticApiService apiCallService;

    /**
     * 회사의 기본 주식 정보를 조회합니다.
     *
     * @param companyId 회사 ID
     * @return 기본 주식 정보
     */
    @Operation(summary = "기본 주식 정보 조회", description = "회사의 기본 주식 정보를 조회합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "조회 성공"),
            @ApiResponse(responseCode = "404", description = "회사 정보 없음")
    })
    @GetMapping("/basic/{companyId}")
    public ResponseEntity<StockBasicResponseDto> getStockBasic(@PathVariable Long companyId) {
        try {

            Company company = companyService.findCompanyById(companyId);
            if (company == null) {
                log.error("Company not found with id: {}", companyId);
                return ResponseEntity.notFound().build();
            }

            StockBasic stockBasic = stockService.getStockBasicFromApi(company);
            if (stockBasic == null) {
                log.error("No response from API for stock code: {}", companyId);
                return ResponseEntity.noContent().build();
            }
            StockBasicResponseDto StockBasicResponseDto = stockMapper.stockBasicToStockBasicResponseDto(stockBasic);

            return ResponseEntity.ok(StockBasicResponseDto);

        } catch (Exception e) {
            log.error("Error fetching stock basic data for company id: {}, error: {}", companyId, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    /**
     * 회사의 재무상태표 정보를 조회합니다.
     *
     * @param companyId 회사 ID
     * @return 재무상태표 정보
     */
    @Operation(summary = "재무상태표 조회", description = "회사의 재무상태표 정보를 조회합니다.")
    @GetMapping("/balance/{companyId}")
    public ResponseEntity<StockBalanceDomesticDto> getStockBalance(@PathVariable Long companyId) {
        try {
            Company company = companyService.findCompanyById(companyId);
            if (company == null) {
                log.error("Company not found with id: {}", companyId);
                return ResponseEntity.notFound().build();
            }

            String stockCode = company.getCode();
            if (stockCode == null || stockCode.isEmpty()) {
                log.error("Stock code is null or empty for company id: {}", companyId);
                return ResponseEntity.badRequest().build();
            }

            StockBalanceDomesticDto response = apiCallService.getStockBalanceDataFromApi(stockCode);
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

    /**
     * 회사 관련 뉴스를 조회합니다.
     *
     * @param companyId 회사 ID
     * @return 회사 관련 뉴스
     */
    @Operation(summary = "회사 뉴스 조회", description = "회사 관련 뉴스를 조회합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "조회 성공"),
            @ApiResponse(responseCode = "404", description = "회사를 찾을 수 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    @GetMapping("/news/{companyId}")
    public ResponseEntity<StockNewsResponseDto> getStockNews(@PathVariable Long companyId) {
        try {
            Company company = companyService.findCompanyById(companyId);
            if (company == null) {
                return ResponseEntity.notFound().build();
            }

            List<StockNews> stockNewsList = stockService.getStockNewsFromApi(company);
            StockNewsResponseDto response = stockMapper.stockNewsListToStockNewsResponseDto(stockNewsList);

            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (Exception e) {
            log.error("Error fetching news: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * 국내 전체 상장사 목록을 조회합니다.
     *
     * @return 국내 상장사 목록
     */
    @Operation(summary = "국내 상장사 목록", description = "국내 전체 상장사 목록을 조회합니다.")
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

    /**
     * 전체 회사 목록을 조회합니다.
     *
     * @return 전체 회사 목록
     */
    @Operation(summary = "전체 회사 목록 조회",
            description = "시스템에 등록된 모든 회사의 정보를 조회합니다.")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "조회 성공",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = CompanyResponseDto.class)
                    )
            )
    })
    @GetMapping("/list")
    public ResponseEntity<List<CompanyResponseDto>> getCompanyList() {

        List<Company> companyList = companyRepository.findAll();

        List<CompanyResponseDto> companyResponseDtoList = stockMapper.CompaniesToCompanyResponseDtos(companyList);

        return new ResponseEntity<>(companyResponseDtoList, HttpStatus.OK);
    }

    /**
     * 특정 회사의 상세 정보를 조회합니다.
     *
     * @param companyId 조회할 회사의 ID
     * @return 회사 상세 정보
     */
    @Operation(summary = "회사 상세 정보 조회",
            description = "특정 회사의 상세 정보를 조회합니다.")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "조회 성공",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = CompanyResponseDto.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "회사를 찾을 수 없음"
            )
    })
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/{companyId}")
    public ResponseEntity<CompanyResponseDto> getCompany(@PathVariable("companyId") Long companyId) {

        Company company = companyService.findCompanyById(companyId);

        CompanyResponseDto companyResponseDto = stockMapper.companyToCompanyResponseDto(company);

        return new ResponseEntity<>(companyResponseDto, HttpStatus.OK);
    }

    /**
     * 특정 회사의 차트 데이터를 조회합니다.
     *
     * @param companyId 회사 ID
     * @return 주가 차트 데이터
     */
    @Operation(summary = "주가 차트 조회", description = "회사의 주가 차트 데이터를 조회합니다.")
    @GetMapping("/charts/{companyId}")
    public ResponseEntity<List<StockMinResponseDto>> getCompanyChart(@PathVariable("companyId") long companyId) {
        List<StockMinResponseDto> stockMinList = stockMinService.getRecent420StockMin(companyId);

        return new ResponseEntity<>(stockMinList, HttpStatus.OK);
    }

    /**
     * 회사 정보를 수정합니다.
     *
     * @param companyId 수정할 회사의 ID
     * @param companyModifyDTO 수정할 회사 정보
     * @return 수정 결과
     */
    @Operation(summary = "회사 정보 수정",
            description = "특정 회사의 정보를 수정합니다.")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "수정 성공",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = Map.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "회사를 찾을 수 없음"
            )
    })
    @PutMapping("/{companyId}")
    public Map<String, String> modify(@PathVariable("companyId") Long companyId,
                                      @RequestBody CompanyModifyDto companyModifyDTO) {
        companyModifyDTO.setCompanyId(companyId);
        companyService.modify(companyModifyDTO);
        return Map.of("RESULT", "SUCCESS");
    }

}
