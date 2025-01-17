import { FC, useMemo, useState } from 'react';
import useGetStockBalance from '@hooks/companyInfo/useStockBalance';
import { SkeletonBox } from '@components/common/Skeleton';
import { RefreshCw, AlertTriangle } from 'lucide-react';
import { useMediaQuery } from '@hooks/useMediaQuery';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import {
  Section, TitleRow, Title, InfoContainer, InfoRow,
  Label, Value, ErrorContainer, ErrorMessage, RefreshButton
} from '@assets/css/SkeletonStyles';
import { analyzeBalanceData, formatBalanceChartData, formatBalanceData } from '@utils/balanceAnalyzer';
import styled from 'styled-components';

interface StockBalanceComponentProps {
  companyId: number;
}

const StockBalanceComponent: FC<StockBalanceComponentProps> = ({ companyId }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { data, isLoading, isError, error, refetch } = useGetStockBalance(companyId);

  const { chartData, processedData, analysis } = useMemo(() => {
    if (!data?.output || !Array.isArray(data.output)) {
      return { chartData: [], analysis: null };
    }

    const formattedData = formatBalanceData(data.output);
    const formattedChartData = formatBalanceChartData(formattedData);
    return {
      chartData: formattedData,
      processedData: formattedChartData,
      analysis: analyzeBalanceData(formattedData)
    };
  }, [data]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  if (isLoading) {
    return (
      <Section>
        <TitleRow>
          <Title>재무상태표 분석</Title>
        </TitleRow>
        <LoadingContainer>
          {[...Array(4)].map((_, index) => (
            <SkeletonBox key={index} $height="24px" $width="100%" />
          ))}
        </LoadingContainer>
      </Section>
    );
  }

  if (isError || !data) {
    return (
      <ErrorContainer>
        <AlertTriangle size={24} />
        <ErrorMessage>
          {error?.message || '데이터를 불러올 수 없습니다.'}
        </ErrorMessage>
        <RefreshButton onClick={handleRefresh}>
          <RefreshCw size={16} />
          다시 시도
        </RefreshButton>
      </ErrorContainer>
    );
  }

  return (
    <Section>
      <TitleRow>
        <Title>재무상태표 분석</Title>
        <RefreshButton
          onClick={handleRefresh}
          disabled={isRefreshing}
          $isRefreshing={isRefreshing}
        >
          <RefreshCw size={16} />
        </RefreshButton>
      </TitleRow>

      {chartData.length > 0 ? (
        <ChartContainer>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={processedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(value) => value}
                interval={isMobile ? 3 : 1}  // 모바일에서는 3개 간격으로 표시
              />
              <YAxis domain={[0, 'auto']} />
              <Tooltip
                formatter={(value: number) => `${value.toFixed(2)}%`}
                labelFormatter={(label) => `${label} 기준`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="유동비율"
                stroke="#8884d8"
                dot={false}
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="부채비율"
                stroke="#82ca9d"
                dot={false}
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="자기자본비율"
                stroke="#ffc658"
                dot={false}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      ) : (
      <NoDataMessage>차트 데이터가 없습니다.</NoDataMessage>
      )}

      <AnalysisContainer>
        <AnalysisTitle>재무 분석 결과</AnalysisTitle>
        <AnalysisGrid>
          <AnalysisItem>
            <Label>재무안정성</Label>
            <StatusBadge $status={analysis?.stability || 'medium'}>
              {analysis?.stability === 'high' ? '높음' :
                analysis?.stability === 'medium' ? '보통' : '낮음'}
            </StatusBadge>
          </AnalysisItem>
          <AnalysisItem>
            <Label>리스크 수준</Label>
            <StatusBadge $status={analysis?.riskLevel || 'moderate'}>
              {analysis?.riskLevel === 'low' ? '낮음' :
                analysis?.riskLevel === 'moderate' ? '보통' : '높음'}
            </StatusBadge>
          </AnalysisItem>
        </AnalysisGrid>

        <RecommendationList>
          {analysis?.recommendations.map((rec, index) => (
            <RecommendationItem key={index}>
              • {rec}
            </RecommendationItem>
          ))}
        </RecommendationList>
      </AnalysisContainer>

      <InfoContainer $isMobile={isMobile}>
        {chartData.length > 0 && (
          <>
            <InfoRow $isMobile={isMobile}>
              <Label>유동비율</Label>
              <Value>
                {((chartData[chartData.length - 1].currentAssets /
                  chartData[chartData.length - 1].currentLiabilities) * 100).toFixed(2)}%
              </Value>
            </InfoRow>
            <InfoRow $isMobile={isMobile}>
              <Label>부채비율</Label>
              <Value>
                {((chartData[chartData.length - 1].totalLiabilities /
                  chartData[chartData.length - 1].totalCapital) * 100).toFixed(2)}%
              </Value>
            </InfoRow>
            <InfoRow $isMobile={isMobile}>
              <Label>자기자본비율</Label>
              <Value>
                {((chartData[chartData.length - 1].totalCapital /
                  chartData[chartData.length - 1].totalAssets) * 100).toFixed(2)}%
              </Value>
            </InfoRow>
          </>
        )}
      </InfoContainer>
    </Section>
  );
};

const ChartContainer = styled.div`
  margin: 20px 0;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 8px;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
`;

const AnalysisContainer = styled.div`
  margin-top: 20px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
`;

const AnalysisTitle = styled.h3`
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 12px;
`;

const AnalysisGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
  margin-bottom: 16px;
`;

const AnalysisItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StatusBadge = styled.span<{ $status: string }>`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
  text-align: center;
  background-color: ${({ $status }) =>
  $status === 'high' ? '#e6ffe6' :
    $status === 'medium' ? '#fff3e6' :
      $status === 'low' ? '#ffe6e6' : '#f8f9fa'};
  color: ${({ $status }) =>
  $status === 'high' ? '#2e7d32' :
    $status === 'medium' ? '#ed6c02' :
      $status === 'low' ? '#d32f2f' : '#666'};
`;

const RecommendationList = styled.div`
  margin-top: 16px;
`;

const RecommendationItem = styled.div`
  padding: 8px 0;
  color: #666;
  font-size: 0.9rem;
  line-height: 1.4;
`;

const NoDataMessage = styled.div`
  text-align: center;
  padding: 20px;
  color: #666;
  background: #f8f9fa;
  border-radius: 8px;
  margin: 20px 0;
`;

export default StockBalanceComponent;