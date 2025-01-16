package com.stocktide.stocktideserver.stock.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class StockIncomeDto {
    private List<IncomeOutput> output;
    private String rt_cd;
    private String msg_cd;
    private String msg1;

    @Getter
    @Setter
    @NoArgsConstructor
    public static class IncomeOutput {
        private String stac_yymm;         // 회계년월
        private String sale_account;       // 매출액
        private String sale_cost;          // 매출원가
        private String sale_totl_prfi;     // 매출총이익
        private String depr_cost;          // 감가상각비
        private String sell_mang;          // 판매관리비
        private String bsop_prti;          // 영업이익
        private String bsop_non_ernn;      // 영업외수익
        private String bsop_non_expn;      // 영업외비용
        private String op_prfi;            // 영업이익
        private String spec_prfi;          // 특별이익
        private String spec_loss;          // 특별손실
        private String thtr_ntin;          // 당기순이익

        // 숫자 데이터 변환을 위한 편의 메서드들
        public double getSaleAccountAsDouble() {
            return Double.parseDouble(sale_account);
        }

        public double getSaleCostAsDouble() {
            return Double.parseDouble(sale_cost);
        }

        public double getSaleTotalProfitAsDouble() {
            return Double.parseDouble(sale_totl_prfi);
        }

        public double getOperatingProfitAsDouble() {
            return Double.parseDouble(op_prfi);
        }

        public double getNetIncomeAsDouble() {
            return Double.parseDouble(thtr_ntin);
        }

        // 수익성 지표 계산 메서드들
        public double getGrossProfitMargin() {
            // 매출총이익률 = (매출총이익 / 매출액) * 100
            return getSaleTotalProfitAsDouble() / getSaleAccountAsDouble() * 100;
        }

        public double getOperatingProfitMargin() {
            // 영업이익률 = (영업이익 / 매출액) * 100
            return getOperatingProfitAsDouble() / getSaleAccountAsDouble() * 100;
        }

        public double getNetProfitMargin() {
            // 순이익률 = (당기순이익 / 매출액) * 100
            return getNetIncomeAsDouble() / getSaleAccountAsDouble() * 100;
        }
    }

    // 전체 데이터에 대한 편의 메서드들
    public IncomeOutput getLatestIncome() {
        if (output == null || output.isEmpty()) {
            return null;
        }
        return output.get(0);  // 가장 최근 데이터 반환
    }

    public IncomeOutput getIncomeByYearMonth(String yearMonth) {
        if (output == null) {
            return null;
        }
        return output.stream()
                .filter(income -> income.getStac_yymm().equals(yearMonth))
                .findFirst()
                .orElse(null);
    }

    public List<IncomeOutput> getIncomesByYear(String year) {
        if (output == null) {
            return null;
        }
        return output.stream()
                .filter(income -> income.getStac_yymm().startsWith(year))
                .toList();
    }

    // 성장성 분석 메서드들
    public double calculateRevenueGrowth(String baseYearMonth, String compareYearMonth) {
        IncomeOutput baseIncome = getIncomeByYearMonth(baseYearMonth);
        IncomeOutput compareIncome = getIncomeByYearMonth(compareYearMonth);

        if (baseIncome == null || compareIncome == null) {
            return 0.0;
        }

        double baseRevenue = baseIncome.getSaleAccountAsDouble();
        double compareRevenue = compareIncome.getSaleAccountAsDouble();

        return ((baseRevenue - compareRevenue) / compareRevenue) * 100;
    }

    public double calculateOperatingProfitGrowth(String baseYearMonth, String compareYearMonth) {
        IncomeOutput baseIncome = getIncomeByYearMonth(baseYearMonth);
        IncomeOutput compareIncome = getIncomeByYearMonth(compareYearMonth);

        if (baseIncome == null || compareIncome == null) {
            return 0.0;
        }

        double baseProfit = baseIncome.getOperatingProfitAsDouble();
        double compareProfit = compareIncome.getOperatingProfitAsDouble();

        return ((baseProfit - compareProfit) / compareProfit) * 100;
    }

    // YoY(Year over Year) 성장률 계산
    public double calculateYoYGrowth(String currentYearMonth) {
        String previousYearMonth = String.format("%d%02d",
                Integer.parseInt(currentYearMonth.substring(0, 4)) - 1,
                Integer.parseInt(currentYearMonth.substring(4, 6)));

        return calculateRevenueGrowth(currentYearMonth, previousYearMonth);
    }
}