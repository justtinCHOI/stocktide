import { StockList, WatchListContainer } from '@assets/css/item';
import StockItem from '@components/stock/domestic/item/hold/StockItem';
import { ContentBottom } from '@assets/css/content';
import { useState } from 'react';
import useCustomMove from '@hooks/useCustomMove';
import useCompanyData from '@hooks/useCompanyData';
import useGetHoldingStock from '@hooks/useGetHoldingStock';
import { ProfitStockItemProps } from '@components/my/profit/StockItem';

const HoldComponent = () => {

    const [showChangePrice, setShowChangePrice] = useState(false);
    const {moveToChart} = useCustomMove();

    const {
        holdingStockData: stockHolds,
        holdingStockLoading: isLoading,
        holdingStockError: isError,
    } = useGetHoldingStock();

    const {data: companyData, isLoading: isCompanyDataLoading, isError: isCompanyDataError,
    } = useCompanyData(1, 79);

    return (
      <WatchListContainer>
          <StockList>
              {isLoading || isCompanyDataLoading ? (
                <div></div>
              ) : isError || isCompanyDataError ? (
                <div>Error fetching data</div>
              ) : (
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
              )}
          </StockList>
          <ContentBottom/>
      </WatchListContainer>
    );
};

export default HoldComponent;
