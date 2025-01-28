import { FC, useMemo, useState } from 'react';
import useGetStockBalance from '@hooks/companyInfo/useStockBalance';
import { SkeletonBox } from '@styles/SkeletonStyles';
import { RefreshCw, AlertTriangle } from 'lucide-react';
import { useMediaQuery } from '@hooks/useMediaQuery';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import {
  Section, TitleRow, Title, InfoContainer, InfoRow,
  Label, Value, ErrorContainer, ErrorMessage, RefreshButton,
  AnalysisContainer, AnalysisItem, AnalysisGrid, AnalysisTitle,
  RecommendationItem, RecommendationList, ChartContainer,
  StatusBadge, LoadingContainer, NoDataMessage
} from '@styles/CustomStockTideStyles';
import { analyzeBalanceData, formatBalanceChartData, formatBalanceData } from '@utils/balanceAnalyzer';

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



export default StockBalanceComponent;