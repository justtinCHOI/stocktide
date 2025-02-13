package com.stocktide.stocktideserver.stock.mapper;

import com.stocktide.stocktideserver.stock.dto.domestic.StockAsBiDomesticDto;
import com.stocktide.stocktideserver.stock.dto.domestic.StockBasicDomesticDto;
import com.stocktide.stocktideserver.stock.dto.domestic.StockMinDomesticDto;
import com.stocktide.stocktideserver.stock.dto.domestic.StockNewsDomesticDto;
import com.stocktide.stocktideserver.stock.dto.overseas.StockAsBiOverseasDto;
import com.stocktide.stocktideserver.stock.dto.overseas.StockInfOverseasDto;
import com.stocktide.stocktideserver.stock.dto.overseas.StockMinOverseasDto;
import com.stocktide.stocktideserver.stock.dto.overseas.StockNewsOverseasDto;
import com.stocktide.stocktideserver.stock.entity.StockAsBi;
import com.stocktide.stocktideserver.stock.entity.StockBasic;
import com.stocktide.stocktideserver.stock.entity.StockInf;
import com.stocktide.stocktideserver.stock.entity.StockMin;
import com.stocktide.stocktideserver.stock.entity.StockNews;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ApiMapper {
    @Mapping(target = "stockAsBiId", ignore = true) // 데이터베이스에서 생성되므로 무시
    @Mapping(target = "company", ignore = true) //  필요한 경우 적절히 처리
    StockAsBi stockAsBiOutput1ToStockAsBi(StockAsBiDomesticDto.StockAsBiOutput1 stock);
    @Mapping(target = "stockInfId", ignore = true) // 데이터베이스에서 생성되므로 무시
    @Mapping(target = "company", ignore = true) // 필요시 적절히 처리
    StockInf stockMinOutput1ToStockInf(StockMinDomesticDto.StockMinOutput1 stock);
    @Mapping(target = "stockMinId", ignore = true) // 데이터베이스에서 생성되므로 무시
    @Mapping(target = "company", ignore = true) // 필요시 적절히 처리
    @Mapping(target = "stockTradeTime", ignore = true) // 필요시 적절히 처리
    StockMin stockMinOutput2ToStockMin(StockMinDomesticDto.StockMinOutput2 stock);


    @Mapping(target = "stockAsBiId", ignore = true)  // DB에서 자동생성되므로 무시
    @Mapping(target = "company", ignore = true)      // company는 별도로 설정하므로 무시

    // Output2의 매도호가 매핑
    @Mapping(source = "pask1", target = "askp1")
    @Mapping(source = "pask2", target = "askp2")
    @Mapping(source = "pask3", target = "askp3")
    @Mapping(source = "pask4", target = "askp4")
    @Mapping(source = "pask5", target = "askp5")
    @Mapping(source = "pask6", target = "askp6")
    @Mapping(source = "pask7", target = "askp7")
    @Mapping(source = "pask8", target = "askp8")
    @Mapping(source = "pask9", target = "askp9")
    @Mapping(source = "pask10", target = "askp10")

    // Output2의 매도호가잔량 매핑
    @Mapping(source = "vask1", target = "askp_rsqn1")
    @Mapping(source = "vask2", target = "askp_rsqn2")
    @Mapping(source = "vask3", target = "askp_rsqn3")
    @Mapping(source = "vask4", target = "askp_rsqn4")
    @Mapping(source = "vask5", target = "askp_rsqn5")
    @Mapping(source = "vask6", target = "askp_rsqn6")
    @Mapping(source = "vask7", target = "askp_rsqn7")
    @Mapping(source = "vask8", target = "askp_rsqn8")
    @Mapping(source = "vask9", target = "askp_rsqn9")
    @Mapping(source = "vask10", target = "askp_rsqn10")

    // Output2의 매수호가 매핑
    @Mapping(source = "pbid1", target = "bidp1")
    @Mapping(source = "pbid2", target = "bidp2")
    @Mapping(source = "pbid3", target = "bidp3")
    @Mapping(source = "pbid4", target = "bidp4")
    @Mapping(source = "pbid5", target = "bidp5")
    @Mapping(source = "pbid6", target = "bidp6")
    @Mapping(source = "pbid7", target = "bidp7")
    @Mapping(source = "pbid8", target = "bidp8")
    @Mapping(source = "pbid9", target = "bidp9")
    @Mapping(source = "pbid10", target = "bidp10")

    // Output2의 매수호가잔량 매핑
    @Mapping(source = "vbid1", target = "bidp_rsqn1")
    @Mapping(source = "vbid2", target = "bidp_rsqn2")
    @Mapping(source = "vbid3", target = "bidp_rsqn3")
    @Mapping(source = "vbid4", target = "bidp_rsqn4")
    @Mapping(source = "vbid5", target = "bidp_rsqn5")
    @Mapping(source = "vbid6", target = "bidp_rsqn6")
    @Mapping(source = "vbid7", target = "bidp_rsqn7")
    @Mapping(source = "vbid8", target = "bidp_rsqn8")
    @Mapping(source = "vbid9", target = "bidp_rsqn9")
    @Mapping(source = "vbid10", target = "bidp_rsqn10")
    StockAsBi stockAsBiOverseasDtoToStockAsBi(StockAsBiOverseasDto.Output2 output2);

    @Mapping(target = "stockInfId", ignore = true)   // DB에서 자동생성되므로 무시
    @Mapping(target = "company", ignore = true)      // company는 별도로 설정하므로 무시
    @Mapping(source = "last", target = "stck_prpr")      // 현재가
    @Mapping(source = "diff", target = "prdy_vrss")      // 전일대비
    @Mapping(source = "rate", target = "prdy_ctrt")    // 전일대비율
    @Mapping(source = "tvol", target = "acml_vol")       // 누적거래량
    @Mapping(source = "tamt", target = "acml_tr_pbmn")   // 누적거래대금
    StockInf stockInfOverseasDtoToStockInf(StockInfOverseasDto.Output output);

    @Mapping(source = "pdno", target = "pdno")
    @Mapping(source = "prdt_abrv_name", target = "prdt_abrv_name")
    @Mapping(source = "prdt_eng_abrv_name", target = "prdt_eng_abrv_name")
    @Mapping(source = "lstg_stqt", target = "lstg_stqt")
    @Mapping(source = "cpta", target = "cpta")
    @Mapping(source = "papr", target = "papr")
    StockBasic stockBasicDtoToStockBasic(StockBasicDomesticDto.Output ouput);


    @Mapping(target = "stockMinId", ignore = true)  // DB에서 자동 생성
    @Mapping(target = "company", ignore = true)     // 외부에서 설정
    @Mapping(target = "stockTradeTime", ignore = true) // 외부에서 계산
    @Mapping(source = "khms", target = "stck_cntg_hour")  // 현지기준시간
    @Mapping(source = "last", target = "stck_prpr")      // 종가 -> 현재가
    @Mapping(source = "open", target = "stck_oprc")      // 시가
    @Mapping(source = "high", target = "stck_hgpr")      // 고가
    @Mapping(source = "low", target = "stck_lwpr")       // 저가
    @Mapping(source = "evol", target = "cntg_vol")       // 체결량
    StockMin stockMinOverseasOutput2ToStockMin(StockMinOverseasDto.Output2 output);

    StockNews newsOutputToStockNews(StockNewsDomesticDto.NewsOutput newsOutput);

    @Mapping(source = "data_dt", target = "data_dt")
    @Mapping(source = "data_tm", target = "data_tm")
    @Mapping(source = "title", target = "hts_pbnt_titl_cntt")
    @Mapping(source = "source", target = "dorg")
    StockNews newsOutblock1ToStockNews(StockNewsOverseasDto.Outblock1 newsOutput);

}
