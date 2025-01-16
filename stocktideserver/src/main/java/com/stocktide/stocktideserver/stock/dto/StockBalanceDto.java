package com.stocktide.stocktideserver.stock.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class StockBalanceDto {
    private List<BalanceOutput> output;
    private String rt_cd;
    private String msg_cd;
    private String msg1;

    @Getter
    @Setter
    @NoArgsConstructor
    public static class BalanceOutput {
        private String stac_yymm;      // 회계년월
        private String cras;           // 유동자산
        private String fxas;           // 고정자산
        private String total_aset;     // 총자산
        private String flow_lblt;      // 유동부채
        private String fix_lblt;       // 고정부채
        private String total_lblt;     // 총부채
        private String cpfn;           // 자본금
        private String cfp_surp;       // 자본잉여금
        private String prfi_surp;      // 이익잉여금
        private String total_cptl;     // 총자본

        // 숫자 데이터 변환을 위한 편의 메서드들
        public double getCrasAsDouble() {
            return Double.parseDouble(cras);
        }

        public double getFxasAsDouble() {
            return Double.parseDouble(fxas);
        }

        public double getTotalAsetAsDouble() {
            return Double.parseDouble(total_aset);
        }

        public double getFlowLbltAsDouble() {
            return Double.parseDouble(flow_lblt);
        }

        public double getFixLbltAsDouble() {
            return Double.parseDouble(fix_lblt);
        }

        public double getTotalLbltAsDouble() {
            return Double.parseDouble(total_lblt);
        }

        public double getCpfnAsDouble() {
            return Double.parseDouble(cpfn);
        }

        public double getCfpSurpAsDouble() {
            return Double.parseDouble(cfp_surp);
        }

        public double getPrfiSurpAsDouble() {
            return Double.parseDouble(prfi_surp);
        }

        public double getTotalCptlAsDouble() {
            return Double.parseDouble(total_cptl);
        }

        // 재무비율 계산을 위한 편의 메서드들
        public double getCurrentRatio() {
            // 유동비율 = 유동자산 / 유동부채 * 100
            return getCrasAsDouble() / getFlowLbltAsDouble() * 100;
        }

        public double getDebtRatio() {
            // 부채비율 = 총부채 / 총자본 * 100
            return getTotalLbltAsDouble() / getTotalCptlAsDouble() * 100;
        }

        public double getEquityRatio() {
            // 자기자본비율 = 총자본 / 총자산 * 100
            return getTotalCptlAsDouble() / getTotalAsetAsDouble() * 100;
        }
    }

    // 전체 데이터에 대한 편의 메서드들
    public BalanceOutput getLatestBalance() {
        if (output == null || output.isEmpty()) {
            return null;
        }
        return output.get(0);  // 가장 최근 데이터 반환
    }

    public BalanceOutput getBalanceByYearMonth(String yearMonth) {
        if (output == null) {
            return null;
        }
        return output.stream()
                .filter(balance -> balance.getStac_yymm().equals(yearMonth))
                .findFirst()
                .orElse(null);
    }

    public List<BalanceOutput> getBalancesByYear(String year) {
        if (output == null) {
            return null;
        }
        return output.stream()
                .filter(balance -> balance.getStac_yymm().startsWith(year))
                .toList();
    }
}