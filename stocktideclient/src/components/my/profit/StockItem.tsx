import { FC, useState } from 'react';
import styled from 'styled-components';
import { logoList } from '@utils/companyLogos';
import logo from '@assets/images/StockTideImage.jpg';
import useCustomMove from '@hooks/useCustomMove';
import { extractedCompanyData } from '@typings/hooks';
import { StockHoldResponseDto } from '@typings/dto';
import { useTranslation } from 'react-i18next';

export type ProfitStockItemProps = {
    stockData: StockHoldResponseDto;
    companyData?: extractedCompanyData;
};

const StockItem: FC<ProfitStockItemProps> = ({ companyData, stockData }) => {
    const { t, i18n } = useTranslation();
    const priceUnit = t('unit.currency.krw');

    const company = companyData ? companyData : undefined;
    const companyLogo = company ? (logoList[company.korName] || logo) : logo;
    const {moveToChart} = useCustomMove();

    const [showChangePrice, setShowChangePrice] = useState(false);
    const {
        stockCount,
        reserveSellStockCount,
        totalPrice,
        percentage,
        stockReturn,
    } = stockData;
    const totalStocksHeld = stockCount + reserveSellStockCount;

    const {
        code = "",
        korName = "",
        engName = "",
        stockPrice = "",
        stockChangeAmount = "",
        stockChangeRate = "",
    } = company || {};
    const price = parseInt(stockPrice);
    const priceChangeAmount = parseInt(stockChangeAmount);

    // Format percentage to two decimal places
    const formattedPercentage = parseFloat(percentage.toFixed(2));

    const handleItemClick = () => {
        company && moveToChart(company.companyId);
    };

    return (
      <EntireContainer>
          <ItemContainer
            onClick={handleItemClick}
            onMouseEnter={() => {
                setShowChangePrice(true);
            }}
            onMouseLeave={() => {
                setShowChangePrice(false);
            }}
          >
              <LogoContainer>
                  <Logo src={companyLogo} alt="stock logo"/>
              </LogoContainer>
              <StockInfo>
                  <StockName>{i18n.language === 'ko' ? korName : engName}</StockName>
                  <StockCode>{code}</StockCode>
              </StockInfo>
              <StockPriceSection>
                  <StockPrice priceChangeAmount={priceChangeAmount}>
                      {price.toLocaleString()} {priceUnit}
                  </StockPrice>
                  <StockChange
                    priceChangeAmount={priceChangeAmount}
                    onMouseEnter={() => setShowChangePrice(true)}
                    onMouseLeave={() => setShowChangePrice(false)}
                  >
                      {showChangePrice
                        ? `${priceChangeAmount.toLocaleString()} 원`
                        : `${stockChangeRate}%`}
                  </StockChange>
              </StockPriceSection>
          </ItemContainer>
          <StockDetails>
              <DetailSection01>
                  <DetailTitle>{t('profit.holdings.profit')}</DetailTitle>
                  <DetailTitle>{t('profit.holdings.holdings')}</DetailTitle>
              </DetailSection01>
              <DetailSection02>
                  <ColoredDetailData priceChangeAmount={priceChangeAmount}>
                      {stockReturn.toLocaleString()} {priceUnit}
                  </ColoredDetailData>
                  <DetailData>{totalPrice.toLocaleString()} {priceUnit}</DetailData>
              </DetailSection02>
              <DetailSection03>
                  <ColoredDetailData priceChangeAmount={priceChangeAmount}>
                      {formattedPercentage}%
                  </ColoredDetailData>
                  <DetailTitle>{totalStocksHeld}{t('unit.shares')}</DetailTitle>
              </DetailSection03>
          </StockDetails>
      </EntireContainer>
    );
};

export default StockItem;



export const EntireContainer = styled.div`
  &:hover {
    background-color: #d9e6ff;
    transition: background-color 0.5s ease;

    cursor: pointer;
  }
`;

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  /* gap: 8px; */
  width: 100%;
  padding: 12px 0;
  border-bottom: 1px solid #e0e0e0; // Holdings에서의 스타일 추가
`;

const LogoContainer = styled.div`
  flex: 1 0 0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin: 10px; */
  padding-left: 12px;
  /* padding-right: 5px/; */
`;

const Logo = styled.img`
  border-radius: 50%;
  width: 28px;
  height: 28px;
  position: absolute;
`;

const StockInfo = styled.div`
  flex: 5 0 0;
  height: 100%;
  padding-top: 3px;
  padding-left: 6px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const StockName = styled.span`
  font-size: 15px;
  font-weight: 400;
`;

const StockCode = styled.span`
  color: darkgray;
  font-weight: 400;
  font-size: 13px;
`;

const StockPriceSection = styled.div`
  flex: 5 0 0;
  padding-top: 3px;
  margin-left: auto; /* 자동으로 왼쪽 여백 추가 */
  /* margin-right: 10px; */
  padding-right: 12px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

// const getColorByChange = (change: string) => {
//   if (change.startsWith("")) return "red";
//   if (change.startsWith("-")) return "blue";
//   return "black";
// };

const StockPrice = styled.span<{ priceChangeAmount: number }>`
  color: ${(props) => (props.priceChangeAmount > 0 ? "#e22926" : "#2679ed")};
  font-size: 15px;
`;

const StockChange = styled.span<{ priceChangeAmount: number }>`
  color: ${(props) => (props.priceChangeAmount > 0 ? "#e22926" : "#2679ed")};
  font-size: 13px;
  cursor: pointer;
`;

const StockDetails = styled.div`
  display: flex;
  /* justify-content: space-between; */
  /* gap: 15px; */
  /* padding: 8px 0; */
  align-items: center;
  padding-top: 11px;
  padding-bottom: 11px;
  border-bottom: 1px solid darkgray;
  width: 100%;
`;

const DetailSection01 = styled.div`
  flex: 1.4 0 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 12px;
  gap: 2px;
  /* padding-right: 10px; */
`;

const DetailSection02 = styled.div`
  flex: 4 0 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  /* align-items: center; */
  justify-content: center;
  gap: 2px;
  padding-left: 3px;
  /* padding-right: 10px; */
`;

const DetailSection03 = styled.div`
  flex: 4 0 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
  padding-left: 10px;
  padding-right: 12px;
`;

const DetailTitle = styled.span`
  font-weight: lighter;
  /* font-weight: 420; */
  font-size: 14px;
`;

const DetailData = styled.span`
  font-size: 14px; // Setting standardized font size for all data
`;

const ColoredDetailData = styled.span<{ priceChangeAmount: number }>`
  color: ${(props) => (props.priceChangeAmount > 0 ? "#e22926" : "#2679ed")};
  font-size: 14px;
`;

