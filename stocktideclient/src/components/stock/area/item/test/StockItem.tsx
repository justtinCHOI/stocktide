import { FC } from 'react';
import styled from 'styled-components';
import useCustomMove from '@hooks/useCustomMove';
import { TestStockItemProps } from '@typings/stock';

const StockItem: FC<TestStockItemProps> = ({ company }) => {

    const {moveToChart} = useCustomMove();

    const handleItemClick = () => {
        moveToChart(company.companyId);
    };

    return (
      <StockItemWrapper
        onClick={handleItemClick}
      >
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
