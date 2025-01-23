import { ListContainer, StockList } from '@styles/ListStyles';
import StockItem from '@components/stock/domestic/item/hold/StockItem';
import { ContentBottom } from '@styles/content';
import { useState } from 'react';
import useCustomMove from '@hooks/useCustomMove';
import useCompanyData from '@hooks/useCompanyData';
import useGetHoldingStock from '@hooks/useGetHoldingStock';
import { ProfitStockItemProps } from '@components/my/profit/StockItem';
import {
  SkeletonContent,
  SkeletonItem,
  SkeletonLogo, SkeletonPrice, SkeletonPriceMain, SkeletonPriceSub,
  SkeletonSubtitle,
  SkeletonTitle,
} from '@styles/SkeletonStockItemStyles';
import { ErrorContainer, ErrorMessage, RefreshButton } from '@styles/CustomStockTideStyles';
import { AlertTriangle } from 'lucide-react';

const HoldComponent = () => {

    const [showChangePrice, setShowChangePrice] = useState(false);
    const {moveToChart} = useCustomMove();

    const {
        holdingStockData: stockHolds,
        holdingStockLoading: isLoading,
        holdingStockError: isError,
    } = useGetHoldingStock();

    const {data: companyData, isLoading: isCompanyDataLoading, isError: isCompanyDataError, refetch
    } = useCompanyData(1, 79);

  if (isLoading || isCompanyDataLoading) {
    return (
      <ListContainer>
        <StockList>
          {[...Array(8)].map((_, index) => (
            <SkeletonItem key={index}>
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
                        company={matchedCompany}
                        setShowChangePrice={setShowChangePrice}
                        showChangePrice={showChangePrice}
                        onclick={() => moveToChart(matchedCompany.companyId)}
                      />
                    ) : null;
                })
              }
          </StockList>
          <ContentBottom/>
      </ListContainer>
    );
};

export default HoldComponent;
