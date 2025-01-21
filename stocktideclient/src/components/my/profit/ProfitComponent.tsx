import { FC } from 'react';
import useGetHoldingStock from '@hooks/useGetHoldingStock';
import useCompanyData from '@hooks/useCompanyData';
import styled from "styled-components";
import StockItem, { ProfitStockItemProps } from '@components/my/profit/StockItem';
import { useParams } from 'react-router';

const evaluationProfitText = "평가 수익금";
const profitUnit = "원";

const ProfitComponent: FC =() => {

  const {companyId} = useParams();
  const companyIdNumber = Number(companyId)

    const {
      holdingStockLoading: stockHolds,
      holdingStockLoading: isLoading,
      holdingStockError: isError,
    } = useGetHoldingStock(companyIdNumber);


    const {data: companyData, isLoading: isCompanyDataLoading, isError: isCompanyDataError,
    } = useCompanyData(2, 87);

  // 모든 stockReturn의 합을 계산합니다.
    let totalEvaluationProfit = 0;

    if (Array.isArray(stockHolds) && stockHolds.length > 0) {
        totalEvaluationProfit = stockHolds.reduce(
          (sum: number, stockHold: ProfitStockItemProps["stockData"]) =>
            sum + stockHold.stockReturn,
          0
        );
    }


    return (
      <WatchListContainer>
          <Header2Container>
              <EvaluationProfit profit={totalEvaluationProfit}>
                  <div className="profitText">{evaluationProfitText}</div>
                  <div className="profit">
                      {totalEvaluationProfit.toLocaleString()} {profitUnit}
                  </div>
              </EvaluationProfit>
          </Header2Container>
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
                        stockData={stockHold}
                        companyData={matchedCompany}
                      />
                    ) : null;
                })
              )}
          </StockList>
      </WatchListContainer>
    );
}

export default ProfitComponent;


const WatchListContainer = styled.div`
  width: 100%;
  height: calc(100vh - 53px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Header2Container = styled.div`
  width: 100%;
  height: 43.5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// const Divider = styled.div`
//   width: 100%;
//   display: flex;
//   flex-direction: row;
//   border-bottom: 1px solid #2f4f4f;
// `;
const EvaluationProfit = styled.div<{ profit: number }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 0.95em;
  font-weight: 570;
  gap: 6.5px;
  padding-left: 14px;
  text-align: center;
  color: ${(props) =>
  props.profit === 0 ? "#000" : props.profit > 0 ? "#e22926" : "#2679ed"};
  border-bottom: 1px solid black;

  .profitText {
    color: black;
  }

  .profit {
    color: #2f4f4f;
  }
`;

const StockList = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: auto; /* 세로 스크롤을 활성화합니다 */

  &::-webkit-scrollbar {
    display: none;
  }
`;
