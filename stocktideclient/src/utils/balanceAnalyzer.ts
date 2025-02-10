import i18next from 'i18next';

export interface BalanceData {
  date: string;
  totalAssets: number;     // 총자산
  totalLiabilities: number; // 총부채
  currentAssets: number;   // 유동자산
  currentLiabilities: number; // 유동부채
  capital: number;         // 자본금
  totalCapital: number;    // 총자본
}

export const formatBalanceData = (rawData: any[]): BalanceData[] => {
  return rawData.map(item => ({
    date: item.stac_yymm,
    totalAssets: parseFloat(item.total_aset),
    totalLiabilities: parseFloat(item.total_lblt),
    currentAssets: parseFloat(item.cras),
    currentLiabilities: parseFloat(item.flow_lblt),
    capital: parseFloat(item.cpfn),
    totalCapital: parseFloat(item.total_cptl)
  }));
};

export const formatBalanceChartData = (chartData: BalanceData[]) => {
  return chartData.map(data => ({
    date: data.date.substring(0,4) + '.' + data.date.substring(4,6), // YYYYMM 형식을 YYYY.MM로 변환, 유동비율
    currentRatio: +(((data.currentAssets / data.currentLiabilities) * 100).toFixed(2)), // 부채비율
    debtRatio: +(((data.totalLiabilities / data.totalCapital) * 100).toFixed(2)),
    equityRatio: +(((data.totalCapital / data.totalAssets) * 100).toFixed(2)) // 자기자본비율
  })).reverse(); // 시간순 정렬을 위해 reverse
};

export const analyzeBalanceData = (balanceData: BalanceData[]) => {
  if (!balanceData.length) {
    return {
      stability: 'medium',
      riskLevel: 'moderate',
      recommendations: [i18next.t('stockBalance.analysis.recommendations.noData')]
    };
  }

  const latest = balanceData[balanceData.length - 1];

  // 주요 재무비율 계산
  const currentRatio = (latest.currentAssets / latest.currentLiabilities) * 100;
  const debtRatio = (latest.totalLiabilities / latest.totalCapital) * 100;
  const equityRatio = (latest.totalCapital / latest.totalAssets) * 100;

  let stability: 'high' | 'medium' | 'low' = 'medium';
  let riskLevel: 'low' | 'moderate' | 'high' = 'moderate';
  const recommendations: string[] = [];

  // 재무안정성 평가
  if (currentRatio > 200 && debtRatio < 50 && equityRatio > 50) {
    stability = 'high';
    recommendations.push(i18next.t('stockBalance.analysis.recommendations.strongFinancials'));
    recommendations.push(i18next.t('stockBalance.analysis.recommendations.goodLiquidity'));
    riskLevel = 'low';
  } else if (currentRatio > 150 && debtRatio < 100 && equityRatio > 40) {
    stability = 'medium';
    recommendations.push(i18next.t('stockBalance.analysis.recommendations.moderateRisk'));
    if (debtRatio > 70) {
      recommendations.push(i18next.t('stockBalance.analysis.recommendations.watchDebtRatio'));
    }
    riskLevel = 'moderate';
  } else {
    stability = 'low';
    if (currentRatio < 120) {
      recommendations.push(i18next.t('stockBalance.analysis.recommendations.improveLiquidity'));
    }
    if (debtRatio > 150) {
      recommendations.push(i18next.t('stockBalance.analysis.recommendations.reduceDebt'));
    }
    if (equityRatio < 30) {
      recommendations.push(i18next.t('stockBalance.analysis.recommendations.strengthenEquity'));
    }
    recommendations.push(i18next.t('stockBalance.analysis.recommendations.highRisk'));
    riskLevel = 'high';
  }

  return {
    stability,
    riskLevel,
    recommendations,
    metrics: {
      currentRatio,
      debtRatio,
      equityRatio
    }
  };
};

