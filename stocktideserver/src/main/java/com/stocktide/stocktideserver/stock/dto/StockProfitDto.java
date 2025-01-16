package com.stocktide.stocktideserver.stock.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
public class StockProfitDto {
    private List<ProfitOutput> output;
    private String rt_cd;
    private String msg_cd;
    private String msg1;

    @Getter
    @Setter
    @NoArgsConstructor
    public static class ProfitOutput {
        private String stac_yymm;            // 회계년월
        private String cptl_ntin_rate;       // 자본순이익률(ROE)
        private String self_cptl_ntin_inrt;  // 자기자본순이익률
        private String sale_ntin_rate;       // 매출액순이익률
        private String sale_totl_rate;       // 매출총이익률

        // 숫자 데이터 변환을 위한 편의 메서드들
        public double getCapitalNetIncomeRate() {
            return Double.parseDouble(cptl_ntin_rate);
        }

        public double getSelfCapitalNetIncomeRate() {
            return Double.parseDouble(self_cptl_ntin_inrt);
        }

        public double getSaleNetIncomeRate() {
            return Double.parseDouble(sale_ntin_rate);
        }

        public double getSaleTotalRate() {
            return Double.parseDouble(sale_totl_rate);
        }

        // 수익성 분석 메서드들
        public boolean isHighProfitability() {
            // ROE가 15% 이상이면 높은 수익성으로 판단
            return getCapitalNetIncomeRate() >= 15.0;
        }

        public boolean isImprovingProfitability(ProfitOutput previousQuarter) {
            if (previousQuarter == null) return false;
            // 전분기 대비 수익성 개선 여부
            return getCapitalNetIncomeRate() > previousQuarter.getCapitalNetIncomeRate();
        }

        public ProfitabilityLevel getProfitabilityLevel() {
            double roe = getCapitalNetIncomeRate();
            if (roe >= 20.0) return ProfitabilityLevel.EXCELLENT;
            if (roe >= 15.0) return ProfitabilityLevel.GOOD;
            if (roe >= 10.0) return ProfitabilityLevel.AVERAGE;
            if (roe >= 5.0) return ProfitabilityLevel.BELOW_AVERAGE;
            return ProfitabilityLevel.POOR;
        }
    }

    public enum ProfitabilityLevel {
        EXCELLENT("매우 우수", 5),
        GOOD("우수", 4),
        AVERAGE("보통", 3),
        BELOW_AVERAGE("미흡", 2),
        POOR("저조", 1);

        private final String description;
        private final int score;

        ProfitabilityLevel(String description, int score) {
            this.description = description;
            this.score = score;
        }

        public String getDescription() {
            return description;
        }

        public int getScore() {
            return score;
        }
    }

    // 전체 데이터에 대한 편의 메서드들
    public ProfitOutput getLatestProfit() {
        if (output == null || output.isEmpty()) {
            return null;
        }
        return output.get(0);
    }

    public ProfitOutput getProfitByYearMonth(String yearMonth) {
        if (output == null) {
            return null;
        }
        return output.stream()
                .filter(profit -> profit.getStac_yymm().equals(yearMonth))
                .findFirst()
                .orElse(null);
    }

    public List<ProfitOutput> getProfitsByYear(String year) {
        if (output == null) {
            return null;
        }
        return output.stream()
                .filter(profit -> profit.getStac_yymm().startsWith(year))
                .collect(Collectors.toList());
    }

    // 수익성 분석 메서드들
    public ProfitAnalysis analyzeProfitTrend() {
        if (output == null || output.isEmpty()) {
            return null;
        }

        // 최근 4분기 데이터
        List<ProfitOutput> recentQuarters = output.stream()
                .limit(4)
                .collect(Collectors.toList());

        // 평균 ROE 계산
        double averageRoe = recentQuarters.stream()
                .mapToDouble(ProfitOutput::getCapitalNetIncomeRate)
                .average()
                .orElse(0.0);

        // 수익성 개선 추세 분석
        boolean improvingTrend = true;
        for (int i = 0; i < recentQuarters.size() - 1; i++) {
            if (!recentQuarters.get(i).isImprovingProfitability(recentQuarters.get(i + 1))) {
                improvingTrend = false;
                break;
            }
        }

        return new ProfitAnalysis(
                averageRoe,
                improvingTrend,
                recentQuarters.get(0).getProfitabilityLevel(),
                calculateStability(recentQuarters)
        );
    }

    private double calculateStability(List<ProfitOutput> profits) {
        // 수익성 지표의 안정성 계산 (표준편차 사용)
        double mean = profits.stream()
                .mapToDouble(ProfitOutput::getCapitalNetIncomeRate)
                .average()
                .orElse(0.0);

        double variance = profits.stream()
                .mapToDouble(p -> Math.pow(p.getCapitalNetIncomeRate() - mean, 2))
                .average()
                .orElse(0.0);

        return Math.sqrt(variance);
    }

    @Getter
    public static class ProfitAnalysis {
        private final double averageRoe;
        private final boolean improvingTrend;
        private final ProfitabilityLevel profitabilityLevel;
        private final double stability;

        public ProfitAnalysis(
                double averageRoe,
                boolean improvingTrend,
                ProfitabilityLevel profitabilityLevel,
                double stability
        ) {
            this.averageRoe = averageRoe;
            this.improvingTrend = improvingTrend;
            this.profitabilityLevel = profitabilityLevel;
            this.stability = stability;
        }

        public String getInvestmentOpinion() {
            StringBuilder opinion = new StringBuilder();
            opinion.append("수익성 분석: ").append(profitabilityLevel.getDescription());
            opinion.append("\n평균 ROE: ").append(String.format("%.2f%%", averageRoe));
            opinion.append("\n추세: ").append(improvingTrend ? "개선 추세" : "악화 또는 정체");
            opinion.append("\n안정성: ").append(stability < 5.0 ? "안정적" : "변동성 높음");

            if (profitabilityLevel.getScore() >= 4 && improvingTrend && stability < 5.0) {
                opinion.append("\n\n투자의견: 매우 긍정적 - 높은 수익성과 안정적인 성장세");
            } else if (profitabilityLevel.getScore() >= 3 && stability < 7.0) {
                opinion.append("\n\n투자의견: 긍정적 - 양호한 수익성");
            } else if (profitabilityLevel.getScore() >= 2) {
                opinion.append("\n\n투자의견: 중립적 - 개선 여부 모니터링 필요");
            } else {
                opinion.append("\n\n투자의견: 부정적 - 수익성 개선 필요");
            }

            return opinion.toString();
        }
    }
}