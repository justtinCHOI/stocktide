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
import { useTranslation } from 'react-i18next';

interface StockBalanceComponentProps {
  companyId: number;
}

const StockBalanceComponent: FC<StockBalanceComponentProps> = ({ companyId }) => {
  const { t } = useTranslation();

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
          <Title>{t('stockBalance.title')}</Title>
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
          {error?.message || t('error.data.loadFail')}
        </ErrorMessage>
        <RefreshButton onClick={handleRefresh}>
          <RefreshCw size={16} />
          {t('error.data.retry')}
        </RefreshButton>
      </ErrorContainer>
    );
  }

  return (
    <Section>
      <TitleRow>
        <Title>{t('stockBalance.title')}</Title>
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
                labelFormatter={(label) => `${label} ${t('chart.tooltip.basis')}`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="currentRatio"
                stroke="#8884d8"
                dot={false}
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="debtRatio"
                stroke="#82ca9d"
                dot={false}
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="equityRatio"
                stroke="#ffc658"
                dot={false}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      ) : (
      <NoDataMessage>{t('stockBalance.noData')}</NoDataMessage>
      )}

      <AnalysisContainer>
        <AnalysisTitle>{t('stockBalance.analysis.title')}</AnalysisTitle>
        <AnalysisGrid>
          <AnalysisItem>
            <Label>{t('stockBalance.analysis.stability.label')}</Label>
            <StatusBadge $status={analysis?.stability || 'medium'}>
              {t(`stockBalance.analysis.stability.${analysis?.stability || 'medium'}`)}
            </StatusBadge>
          </AnalysisItem>
          <AnalysisItem>
            <Label>{t('stockBalance.analysis.risk.label')}</Label>
            <StatusBadge $status={analysis?.riskLevel || 'moderate'}>
              {t(`stockBalance.analysis.risk.${analysis?.riskLevel || 'moderate'}`)}
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
              <Label>{t('stockBalance.metrics.currentRatio')}</Label>
              <Value>
                {((chartData[chartData.length - 1].currentAssets /
                  chartData[chartData.length - 1].currentLiabilities) * 100).toFixed(2)}%
              </Value>
            </InfoRow>
            <InfoRow $isMobile={isMobile}>
              <Label>{t('stockBalance.metrics.debtRatio')}</Label>
              <Value>
                {((chartData[chartData.length - 1].totalLiabilities /
                  chartData[chartData.length - 1].totalCapital) * 100).toFixed(2)}%
              </Value>
            </InfoRow>
            <InfoRow $isMobile={isMobile}>
              <Label>{t('stockBalance.metrics.equityRatio')}</Label>
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