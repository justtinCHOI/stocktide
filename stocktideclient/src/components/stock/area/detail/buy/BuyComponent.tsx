import { styled } from 'styled-components';
import useGetStockInfo from '@hooks/useGetStockInfo';
import {dummyLogo, logoList} from "@utils/companyLogos"
import StockOrder from "./StockOrder";
import { FC } from 'react';
import {
    SkeletonBuyContainer,
    SkeletonInfo,
    SkeletonLogo, SkeletonPrice, SkeletonPriceValue,
    SkeletonStockHeader, SkeletonSubtitle,
    SkeletonTitle,
} from '@styles/SkeletonBuyStyles';
import { ErrorContainer, ErrorMessage, RefreshButton } from '@styles/CustomStockTideStyles';
import { AlertTriangle } from 'lucide-react';

interface BuyComponentProps {
    companyId: number;
}

const marketType = "코스피";

const BuyComponent: FC<BuyComponentProps> = ({companyId}) => {

    const {
        stockInfo,
        stockInfoLoading: isLoading,
        stockInfoError: isError,
        refetch
    } = useGetStockInfo(companyId);
    if (!stockInfo || !stockInfo.korName || !stockInfo.code || !stockInfo.stockInfResponseDto.prdy_ctrt) {
        return null;
    }

    const corpName = stockInfo.korName;
    const stockCode = stockInfo.code;
    const stockPrice = parseInt(stockInfo.stockInfResponseDto.stck_prpr, 10).toLocaleString();
    const priceChangeRate = parseFloat(stockInfo.stockInfResponseDto.prdy_ctrt);
    const changeDirection = priceChangeRate > 0 ? "▲" : "▼";
    const priceChangeAmount = Math.abs(parseInt(stockInfo.stockInfResponseDto.prdy_vrss, 10)).toLocaleString();
    const transactionVolume = parseInt(stockInfo.stockInfResponseDto.acml_vol, 10).toLocaleString();
    const logos = {
        ...logoList
    };

    const companyLogo = logos[corpName] || dummyLogo;

    if (isLoading) {
        return (
        <SkeletonBuyContainer>
              <SkeletonStockHeader>
                  <SkeletonLogo />
                  <SkeletonInfo>
                      <SkeletonTitle />
                      <SkeletonSubtitle />
                  </SkeletonInfo>
                  <SkeletonPrice>
                      <SkeletonPriceValue />
                      <SkeletonPriceValue />
                  </SkeletonPrice>
              </SkeletonStockHeader>
              {/* Add more skeleton UI components for the order section */}
          </SkeletonBuyContainer>
        );
    }

    if (isError) {
        return (
          <Container>
              <div className="mainContent">
                  <ErrorContainer>
                      <AlertTriangle size={24} />
                      <ErrorMessage>데이터를 불러올 수 없습니다.</ErrorMessage>
                      <RefreshButton onClick={() => refetch()}>
                          다시 시도
                      </RefreshButton>
                  </ErrorContainer>
              </div>
          </Container>
        );
    }

    return (
        <Container>
            <div className="mainContent">
                <StockName $priceChangeRate={priceChangeRate}>
                    <img className="CorpLogo" src={companyLogo} alt="stock logo"/>
                    <div className="NameContainer">
                        <div className="StockCode">
                            {stockCode} | {marketType}
                        </div>
                        <div className="CorpName">{corpName}</div>
                    </div>
                    <div className="StockPrice">{stockPrice}</div>
                    <div className="PriceChangeAmount">
                        <div className="changeDirection">{changeDirection}</div>
                        {priceChangeAmount}
                    </div>
                    <div className="TransactionVolume ">
                        <div className="PriceChangeRate">{priceChangeRate}%</div>
                        <TransactionVolume>
                            {transactionVolume}주
                        </TransactionVolume>
                    </div>
                </StockName>
                <BuyingDiv>
                    <StockOrder corpName={corpName}/>
                    {/*<OrderResult />*/}
                    {/*<WaitOrderIndicator />*/}
                </BuyingDiv>
            </div>
        </Container>
    );
};

export default BuyComponent;

const Container = styled.div`
    z-index: 1;
    transition: right 0.3s ease-in-out;
    display: flex;
    flex-direction: column;
    width: calc(100vw - 20px);
    //height: 100vh;
    background-color: #ffffff;

    .mainContent {
        height: 100%;
    }

    .ErrorContainer {
        width: 100%;
        height: 80%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 12px;

        .ErrorMessage {
            font-size: 20px;
            color: #999999;
        }

        .ErrorCloseButton {
            width: 35%;
            height: 32px;
            color: white;
            background-color: #2f4f4f;
            border: none;
            border-radius: 0.5rem;
        }
    }
`;

interface priceChangeRageProps{
    $priceChangeRate: number;
}

const StockName = styled.section<priceChangeRageProps>`
    border-bottom: 1px solid #ddd;
    width: calc(100vw - 20px);
    height: 64px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-top: 7px;
    padding-bottom: 8px;
    padding-left: 16px;
    gap: 9px;
    justify-content: space-evenly;
    position : fixed;
    background-color: white;
    z-index: 100;

    .CorpLogo {
        width: 28px;
        height: 28px;
        border-radius: 50%;
    }

    .NameContainer {
        height: 40px;
        display: flex;
        flex-direction: column;
    }

    .CorpName {
        font-size: 16px;
        font-weight: 500;
        color: #1c1c1c;
    }

    .StockCode {
        font-size: 12px;
        color: #999999;
    }
    .StockPrice {
        font-size: 19px;
        color: ${(props) => (props.$priceChangeRate > 0 ? "#ed2926" : props.$priceChangeRate === 0 ? "black" : "#3177d7")};
        font-weight: 550;
    }
    .PriceChangeRate{
        font-size: 19px;
        color: ${(props) => (props.$priceChangeRate > 0 ? "#ed2926" : props.$priceChangeRate === 0 ? "black" : "#3177d7")};
        display: flex;
        flex-direction: row;
        font-weight: 550;
    }
    .PriceChangeAmount {
        font-size: 14px;
        color: ${(props) => (props.$priceChangeRate > 0 ? "#ed2926" : props.$priceChangeRate === 0 ? "black" : "#3177d7")};
        display: flex;
        flex-direction: row;
        gap: 2px;
        .changeDirection {
            font-size: 8px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
`;

const TransactionVolume = styled.div`
    white-space: nowrap;
    min-width: min-content;
    font-size: 11px;
    color: #999;
    font-weight: 400;
`;

const BuyingDiv = styled.div`
    margin-top: 64px;
    //padding-bottom: 130px;
`;
