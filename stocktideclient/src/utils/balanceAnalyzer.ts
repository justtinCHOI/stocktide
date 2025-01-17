export interface BalanceData {
  date: string;
  totalAssets: number;     // 총자산
  totalLiabilities: number; // 총부채
  currentAssets: number;   // 유동자산
  currentLiabilities: number; // 유동부채
  capital: number;         // 자본금
  totalCapital: number;    // 총자본
}

export interface BalanceAnalysis {
  stability: 'high' | 'medium' | 'low';
  riskLevel: 'low' | 'moderate' | 'high';
  recommendations: string[];
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
    date: data.date.substring(0,4) + '.' + data.date.substring(4,6), // YYYYMM 형식을 YYYY.MM로 변환
    유동비율: +(((data.currentAssets / data.currentLiabilities) * 100).toFixed(2)),
    부채비율: +(((data.totalLiabilities / data.totalCapital) * 100).toFixed(2)),
    자기자본비율: +(((data.totalCapital / data.totalAssets) * 100).toFixed(2))
  })).reverse(); // 시간순 정렬을 위해 reverse
};

export const analyzeBalanceData = (balanceData: BalanceData[]): BalanceAnalysis => {
  if (!balanceData.length) {
    return {
      stability: 'medium',
      riskLevel: 'moderate',
      recommendations: ['데이터가 충분하지 않습니다.']
    };
  }

  const latest = balanceData[balanceData.length - 1];

  // 주요 재무비율 계산
  const currentRatio = (latest.currentAssets / latest.currentLiabilities) * 100;
  const debtRatio = (latest.totalLiabilities / latest.totalCapital) * 100;
  const equityRatio = (latest.totalCapital / latest.totalAssets) * 100;

  // 재무안정성 분석
  const stability = getStabilityLevel(currentRatio, debtRatio, equityRatio);

  // 리스크 레벨 분석
  const riskLevel = getRiskLevel(debtRatio, equityRatio);

  // 추천사항 생성
  const recommendations = generateRecommendations(currentRatio, debtRatio, equityRatio);

  return {
    stability,
    riskLevel,
    recommendations
  };
};

const getStabilityLevel = (currentRatio: number, debtRatio: number, equityRatio: number): 'high' | 'medium' | 'low' => {
  // 유동비율 150% 이상, 부채비율 100% 이하, 자기자본비율 50% 이상이면 높음
  if (currentRatio >= 150 && debtRatio <= 100 && equityRatio >= 50) return 'high';

  // 유동비율 100% 이상, 부채비율 200% 이하면 보통
  if (currentRatio >= 100 && debtRatio <= 200) return 'medium';

  return 'low';
};

const getRiskLevel = (debtRatio: number, equityRatio: number): 'low' | 'moderate' | 'high' => {
  // 부채비율 100% 이하, 자기자본비율 50% 이상이면 낮음
  if (debtRatio <= 100 && equityRatio >= 50) return 'low';

  // 부채비율 200% 이하면 보통
  if (debtRatio <= 200) return 'moderate';

  return 'high';
};

const generateRecommendations = (currentRatio: number, debtRatio: number, equityRatio: number): string[] => {
  const recommendations: string[] = [];

  if (currentRatio < 100) {
    recommendations.push('단기 유동성 개선이 시급합니다. 운전자본 확충을 검토하세요.');
  }

  if (debtRatio > 200) {
    recommendations.push('부채비율이 높습니다. 재무구조 개선이 필요합니다.');
  }

  if (equityRatio < 30) {
    recommendations.push('자기자본비율이 낮습니다. 증자 등 자본확충을 고려하세요.');
  }

  if (recommendations.length === 0) {
    recommendations.push('전반적으로 양호한 재무상태를 보입니다.');
  }

  return recommendations;
};