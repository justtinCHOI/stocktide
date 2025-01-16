package com.stocktide.stocktideserver.stock.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import java.util.List;
import java.util.Comparator;

@Getter
@Setter
@NoArgsConstructor
public class StockFinancialDto {
    private List<FinancialOutput> output;
    private String rt_cd;
    private String msg_cd;
    private String msg1;

    @Getter
    @Setter
    @NoArgsConstructor
    public static class FinancialOutput {
        private String stac_yymm;          // 회계년월
        private String grs;                // 매출액증가율
        private String bsop_prfi_inrt;     // 영업이익률
        private String ntin_inrt;          // 순이익률
        private String roe_val;            // 자기자본이익률(ROE)
        private String eps;                // 주당순이익(EPS)
        private String sps;                // 주당매출액(SPS)
        private String bps;                // 주당순자산(BPS)
        private String rsrv_rate;          // 유보율
        private String lblt_rate;          // 부채비율

        // 숫자 데이터 변환을 위한 편의 메서드들
        public double getGrowthRateAsDouble() {
            return Double.parseDouble(grs);
        }

        public double getOperatingMarginAsDouble() {
            return Double.parseDouble(bsop_prfi_inrt);
        }

        public double getNetMarginAsDouble() {
            return Double.parseDouble(ntin_inrt);
        }

        public double getRoeAsDouble() {
            return Double.parseDouble(roe_val);
        }

        public double getEpsAsDouble() {
            return Double.parseDouble(eps);
        }

        public double getSpsAsDouble() {
            return Double.parseDouble(sps);
        }

        public double getBpsAsDouble() {
            return Double.parseDouble(bps);
        }

        public double getReserveRateAsDouble() {
            return Double.parseDouble(rsrv_rate);
        }

        public double getDebtRatioAsDouble() {
            return Double.parseDouble(lblt_rate);
        }

        // 재무비율 분석 메서드들
        public boolean isHealthyGrowth() {
            return getGrowthRateAsDouble() > 0;
        }

        public boolean isHighProfitability() {
            return getOperatingMarginAsDouble() > 10.0;  // 10% 이상을 높은 수익성으로 가정
        }

        public boolean isStableDebtRatio() {
            return getDebtRatioAsDouble() < 200.0;  // 200% 미만을 안정적인 부채비율로 가정
        }
    }

    // 전체 데이터에 대한 편의 메서드들
    public FinancialOutput getLatestFinancial() {
        if (output == null || output.isEmpty()) {
            return null;
        }
        return output.get(0);  // 가장 최근 데이터 반환
    }

    public FinancialOutput getFinancialByYearMonth(String yearMonth) {
        if (output == null) {
            return null;
        }
        return output.stream()
                .filter(financial -> financial.getStac_yymm().equals(yearMonth))
                .findFirst()
                .orElse(null);
    }

    public List<FinancialOutput> getFinancialsByYear(String year) {
        if (output == null) {
            return null;
        }
        return output.stream()
                .filter(financial -> financial.getStac_yymm().startsWith(year))
                .toList();
    }

    // 재무분석 메서드들
    public double getAverageRoe(int recentQuarters) {
        if (output == null || output.isEmpty() || recentQuarters <= 0) {
            return 0.0;
        }

        return output.stream()
                .limit(recentQuarters)
                .mapToDouble(FinancialOutput::getRoeAsDouble)
                .average()
                .orElse(0.0);
    }

    public double getMaximumEps() {
        if (output == null || output.isEmpty()) {
            return 0.0;
        }

        return output.stream()
                .mapToDouble(FinancialOutput::getEpsAsDouble)
                .max()
                .orElse(0.0);
    }

    public FinancialAnalysis analyzeFinancialTrend() {
        if (output == null || output.isEmpty()) {
            return null;
        }

        FinancialOutput latest = output.get(0);
        double avgRoe = getAverageRoe(4);  // 최근 4분기 평균 ROE

        return new FinancialAnalysis(
                latest.isHealthyGrowth(),
                latest.isHighProfitability(),
                latest.isStableDebtRatio(),
                avgRoe,
                latest.getEpsAsDouble(),
                latest.getBpsAsDouble()
        );
    }

    @Getter
    public static class FinancialAnalysis {
        private final boolean healthyGrowth;
        private final boolean highProfitability;
        private final boolean stableDebtRatio;
        private final double averageRoe;
        private final double latestEps;
        private final double latestBps;

        public FinancialAnalysis(
                boolean healthyGrowth,
                boolean highProfitability,
                boolean stableDebtRatio,
                double averageRoe,
                double latestEps,
                double latestBps
        ) {
            this.healthyGrowth = healthyGrowth;
            this.highProfitability = highProfitability;
            this.stableDebtRatio = stableDebtRatio;
            this.averageRoe = averageRoe;
            this.latestEps = latestEps;
            this.latestBps = latestBps;
        }

        public String getInvestmentOpinion() {
            if (healthyGrowth && highProfitability && stableDebtRatio && averageRoe > 15) {
                return "매우 긍정적: 성장성, 수익성, 안정성이 모두 우수함";
            } else if (highProfitability && stableDebtRatio) {
                return "긍정적: 수익성과 안정성이 양호함";
            } else if (stableDebtRatio) {
                return "중립적: 재무안정성은 양호하나 수익성 개선 필요";
            } else {
                return "주의 필요: 재무구조 개선이 필요함";
            }
        }
    }
}