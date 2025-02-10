import { FC } from 'react';
import useGetHoldingStock from '@hooks/useGetHoldingStock';
import useCompanyData from '@hooks/useCompanyData';
import styled from "styled-components";
import {ListContainer, StockList} from "@styles/ListStyles";

import StockItem, { EntireContainer, ProfitStockItemProps } from '@components/my/profit/StockItem';
import {
  SkeletonContent,
  SkeletonDetails,
  SkeletonDetailData,
  SkeletonDetailSection01,
  SkeletonDetailSection02,
  SkeletonDetailSection03,
  SkeletonItem,
  SkeletonLogo,
  SkeletonPrice,
  SkeletonPriceMain,
  SkeletonPriceSub,
  SkeletonSubtitle,
  SkeletonTitle, SkeletonSection, SkeletonEvaluationProfit, SkeletonProfitText,
} from '@styles/SkeletonStockItemStyles';
import { ContentBottom } from '@styles/content';
import { ErrorContainer, ErrorMessage, RefreshButton, Section, Title } from '@styles/CustomStockTideStyles';
import { AlertTriangle } from 'lucide-react';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { useTranslation } from 'react-i18next';

const ProfitComponent: FC =() => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const priceUnit = t('unit.currency.krw');

  const {
    holdingStockData: stockHolds,
    holdingStockLoading: isLoading,
    holdingStockError: isError,
  } = useGetHoldingStock();

  const {data: companyData, isLoading: isCompanyDataLoading, isError: isCompanyDataError, refetch
  } = useCompanyData(1, 79);

  // 모든 stockReturn의 합을 계산합니다.
  let totalEvaluationProfit = 0;

  if (Array.isArray(stockHolds) && stockHolds.length > 0) {
    totalEvaluationProfit = stockHolds.reduce(
      (sum: number, stockHold: ProfitStockItemProps["stockData"]) =>
        sum + stockHold.stockReturn,
      0
    );
  }

  if (isLoading || isCompanyDataLoading) {
    return (
      <ListContainer>
        <SkeletonSection>
          <SkeletonEvaluationProfit>
            <SkeletonProfitText />
            <SkeletonProfitText />
          </SkeletonEvaluationProfit>
        </SkeletonSection>
        <StockList>
          {[...Array(2)].map((_, index) => (
            <EntireContainer key={index}>
              <SkeletonItem  $isMobile={isMobile}>
                <SkeletonLogo />
                <SkeletonContent>
                  <SkeletonTitle />
                  <SkeletonSubtitle />
                </SkeletonContent>
                <SkeletonPrice>
                  <SkeletonPriceMain />
                  <SkeletonPriceSub />
                </SkeletonPrice>
              </SkeletonItem>
              <SkeletonDetails>
                <SkeletonDetailSection01>
                  <SkeletonDetailData />
                  <SkeletonDetailData />
                </SkeletonDetailSection01>
                <SkeletonDetailSection02>
                  <SkeletonDetailData />
                  <SkeletonDetailData />
                </SkeletonDetailSection02>
                <SkeletonDetailSection03>
                  <SkeletonDetailData />
                  <SkeletonDetailData />
                </SkeletonDetailSection03>
              </SkeletonDetails>
            </EntireContainer>
          ))}
        </StockList>
        <ContentBottom/>
      </ListContainer>
    );
  }

  if (isError || isCompanyDataError) {
    return (
      <ListContainer>
        <StockList>
          <ErrorContainer>
            <AlertTriangle size={24} />
            <ErrorMessage>데이터를 불러올 수 없습니다.</ErrorMessage>
            <RefreshButton onClick={() => refetch()}>
              다시 시도
            </RefreshButton>
          </ErrorContainer>
        </StockList>
        <ContentBottom/>
      </ListContainer>
    );
  }

  return (
    <ListContainer>
      <Section>
        <EvaluationProfit profit={totalEvaluationProfit}>
          <Title className="profitText">
            {t('profit.evaluation.title')}
          </Title>
          <Title className="profit">
            {totalEvaluationProfit.toLocaleString()} {priceUnit}
          </Title>
        </EvaluationProfit>
      </Section>

      <StockList>
        {
          Array.isArray(stockHolds) &&
          stockHolds.length > 0 && // 여기에 조건을 추가합니다
          stockHolds.map((stockHold: ProfitStockItemProps["stockData"]) => {
            const matchedCompany = companyData
              ? companyData.find(
                (company) => company.companyId === stockHold.companyId
              )
              : undefined;

            return matchedCompany ? (
              <StockItem
                key={stockHold.companyId}
                stockData={stockHold}
                companyData={matchedCompany}
              />
            ) : null;
          })
        }
      </StockList>
    </ListContainer>
  );
}

export default ProfitComponent;

const EvaluationProfit = styled.div<{ profit: number }>`
    display: flex;
    flex-direction: row;
    align-items: center;
  font-weight: bold;
  gap: 6px;
  text-align: center;
  color: ${(props) =>
  props.profit === 0 ? "#333" : props.profit > 0 ? "#e22926" : "#2679ed"};

  .profitText {
    color: black;
      font-size: 1.2rem;
  }

  .profit {
    color: #2f4f4f;
      font-size: 0.9rem;

  }
`;

