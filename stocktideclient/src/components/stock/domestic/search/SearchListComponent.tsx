import StockItem from '@components/stock/domestic/search/StockItem';
import { ContentBottom } from '@assets/css/content';
import { useState } from 'react';
import useCustomMove from '@hooks/useCustomMove';
import useCompanyData from '@hooks/useCompanyData';
import styled from 'styled-components';

function SearchListComponent() {

    const [showChangePrice, setShowChangePrice] = useState(false);
    const {moveToChart} = useCustomMove();

    const {data: companies, isLoading, isError} = useCompanyData(1, 79);

    const companiesList = companies || [];

    return (
      <SearchListContainer>
          <StockList>
              {isLoading ? (
                <div></div>
              ) : isError ? (
                <div>Error fetching data</div>
              ) : (
                companiesList.map((company) => (
                  <StockItem
                    key={company.companyId}
                    company={company}
                    setShowChangePrice={setShowChangePrice}
                    showChangePrice={showChangePrice}
                    onclick={() => moveToChart(company.companyId)}
                  />
                ))
              )}
          </StockList>
          <ContentBottom/>
      </SearchListContainer>
    );
}

export default SearchListComponent;

export const SearchListContainer = styled.div`
  height: calc(100vh - 53px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const StockList = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: auto; /* 세로 스크롤을 활성화합니다 */

  &::-webkit-scrollbar {
    display: none;
  }
`;

