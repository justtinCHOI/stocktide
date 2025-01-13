import { FC, useState } from 'react';
import styled from 'styled-components';
import logo from '@assets/images/StockHolmImage.png';
import useCustomMove from '@hooks/useCustomMove';
import { logoList } from '@utils/companyLogos';
import { StockItemProps } from '@typings/stock';
import { ColorProps } from '@components/my/profit/StockItem';

const StockItem: FC<StockItemProps> = ({ company }) => {

    const isPositiveChange = parseFloat(company.stockChangeRate) > 0;
    const companyLogo = logoList[company.korName] || logo;

    const priceColor1 = isPositiveChange ? "#e22926" : "#2679ed";
    const priceColor2 = isPositiveChange ? "#e22926" : "#2679ed";

    const [showChangePrice] = useState(false);
    const {moveToRead} = useCustomMove();

    const handleItemClick = () => {
        moveToRead(company.companyId);
    };

    const price = parseInt(company.stockPrice).toLocaleString();
    const changeAmount = parseInt(company.stockChangeAmount).toLocaleString();
    const priceUnit = "원";

    return (
      <StockItemWrapper
        onClick={handleItemClick}
      >
          <LogoContainer>
              <Logo src={companyLogo} alt="stock logo"/>
          </LogoContainer>
          <StockInfo>
              <StockName>{company.korName}</StockName>
              <StockCode>{company.code}</StockCode>
          </StockInfo>
          <StockPriceSection>
              <StockPrice $change={priceColor1}>
                  {price} {priceUnit}
              </StockPrice>
              <StockChange $change={priceColor2}>
                  {showChangePrice
                    ? `${changeAmount} ${priceUnit}`
                    : `${company.stockChangeRate}%`}
              </StockChange>
          </StockPriceSection>
      </StockItemWrapper>
    );
};

const StockItemWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 8px 0;
    border-bottom: 1px solid #e0e0e0;
    width: 100%;
    height: 57px;
    background-color: transparent;

    &:hover {
        background-color: #cee0ff;
        transition: background-color 0.5s ease;
    }
    cursor: pointer;
`;

const LogoContainer = styled.div`
    height: 100%;
    width: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`;


const Logo = styled.img`
    border-radius: 50%;
    width: 28px;
    height: 28px;
    margin-left: 10px;
    margin-right: 10px;
    position: absolute;
`;

// const FavoriteStar = styled.div`
//   position: absolute;
//   width: 28px;
//   height: 28px;
//   background: url(${star_icon}) no-repeat center;
//   background-size: contain;
//   cursor: pointer;
// `;

// const FavoriteStarFilled = styled(FavoriteStar)`
//   background: url(${star_filled_icon}) no-repeat center;
//   background-size: contain;
// `;

const StockInfo = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-top: 3px;
  margin-right: 16px;
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
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  padding-top: 3px;
  margin-left: auto;
  margin-right: 10px;
`;

const StockPrice = styled.span<ColorProps>`
  font-size: 15px;
  color: ${(props) => props.$change};
`;

const StockChange = styled.span<ColorProps>`
  color: ${(props) => props.$change};
  cursor: pointer;
  font-size: 13px;
`;

export default StockItem;
