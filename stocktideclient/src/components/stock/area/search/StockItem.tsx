import { FC } from 'react';
import styled from 'styled-components';
import logo from '@assets/images/StockTideImage.jpg';
import useCustomMove from '@hooks/useCustomMove';
import { logoList } from '@utils/companyLogos';
import { MoveStockItemProps } from '@typings/stock';
import { useDispatch } from 'react-redux';
import { addRecentSearch } from '@slices/searchSlice';

const StockItem: FC<MoveStockItemProps> = ({ company }) => {
    const dispatch = useDispatch();
    const companyLogo = logoList[company.korName] || logo;

    const {moveToChart} = useCustomMove();

    const handleItemClick = () => {
        moveToChart(company.companyId);
        dispatch(addRecentSearch(company));
    };

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

export default StockItem;
