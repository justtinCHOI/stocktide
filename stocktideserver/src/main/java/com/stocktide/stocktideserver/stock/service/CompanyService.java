package com.stocktide.stocktideserver.stock.service;

import com.stocktide.stocktideserver.stock.dto.CompanyModifyDTO;
import com.stocktide.stocktideserver.stock.dto.StockasbiDataDto;
import com.stocktide.stocktideserver.stock.entity.Company;
import com.stocktide.stocktideserver.stock.entity.StockAsBi;
import com.stocktide.stocktideserver.stock.mapper.ApiMapper;
import com.stocktide.stocktideserver.stock.repository.CompanyRepository;
import com.stocktide.stocktideserver.stock.repository.StockAsBiRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
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

    //회사들의 의 korName, code 를 채우고 데이터베이스에 저장
    public void fillDomesticCompanies() throws InterruptedException {
        List<String> korName = List.of("삼성전자", "POSCO홀딩스", "셀트리온", "에코프로", "에코프로비엠", "디와이", "쿠쿠홀딩스", "카카오뱅크", "한세엠케이", "KG케미칼", "LG화학", "현대차", "LG전자", "기아");
        List<String> code = List.of("005930", "005490", "068270", "086520", "247540", "013570", "192400", "323410", "069640", "001390", "051910", "005380", "066570", "000270");

        for(int i = 0; i < code.size(); i++) {
            Company company = new Company();
            company.setCode(code.get(i));
            company.setKorName(korName.get(i));
            company.setStockAsBi(new StockAsBi());

            StockAsBi stockAsBi = stockService.getStockAsBiFromApi(company);

            company.setStockAsBi(stockAsBi);
            Thread.sleep(500);
            companyRepository.save(company);
        }
    }

    public void fillEveryDomesticCompanies() throws InterruptedException {
        List<String> korName = List.of(
                "HMM", "한화생명", "미래에셋증권", "기업은행", "우리금융지주",
                "SK하이닉스", "맥쿼리인프라", "한국전력", "두산에너빌리티", "신한지주",
                "LG유플러스", "LG디스플레이", "카카오뱅크", "기아", "KB금융",
                "대우건설", "대한항공", "NH투자증권", "BNK금융지주", "KT",
                "한화오션", "하나금융지주", "현대차", "금호타이어", "한화투자증권",
                "유안타증권", "아시아나항공", "JB금융지주", "KG모빌리티", "삼성E&A",
                "KT&G", "한화시스템", "LG전자", "삼성전자", "한화솔루션",
                "미래에셋생명", "삼성중공업", "포스코인터내셔널", "DGB금융지주", "KB발해인프라",
                "동양생명", "LG", "SK이노베이션", "현대제철", "SK네트웍스",
                "삼성카드", "한화손해보험", "교보증권", "현대건설", "현대로템",
                "유진투자증권", "팬오션", "KG스틸", "현대모비스", "한국항공우주",
                "POSCO홀딩스", "한화", "GS", "맵스리얼티1", "한국가스공사",
                "삼성증권", "HD현대중공업", "대신증권", "GS건설", "HJ중공업",
                "한국패러랠", "LS네트웍스", "LG화학", "삼성전기", "하이트진로",
                "삼성SDI", "HD한국조선해양", "한국ANKOR유전", "HDC현대산업개발", "흥국화재",
                "롯데손해보험", "한국금융지주", "다올투자증권", "HDC"
        );

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
                log.info("Skipping company {} ({}) - already exists", korName.get(i), currentCode);
                skippedCount++;
                continue;
            }

            try {
                Company company = new Company();
                company.setCode(currentCode);
                company.setKorName(korName.get(i));
                company.setStockAsBi(new StockAsBi());

                StockAsBi stockAsBi = stockService.getStockAsBiFromApi(company);

                company.setStockAsBi(stockAsBi);
                companyRepository.save(company);
                addedCount++;

                log.info("Successfully added company {} ({}) - {}/{}",
                        korName.get(i), currentCode, addedCount, code.size() - skippedCount);

                Thread.sleep(500); // API 호출 제한 고려

            } catch (Exception e) {
                log.error("Error processing company {} ({}): {}",
                        korName.get(i), currentCode, e.getMessage());
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


