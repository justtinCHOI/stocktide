import StockItem from '@components/stock/domestic/search/StockItem';
import { ContentBottom } from '@assets/css/content';
import useCompanyData from '@hooks/useCompanyData';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useState } from 'react';
import useCustomMove from '@hooks/useCustomMove';

function SearchListComponent() {
  const [showChangePrice, setShowChangePrice] = useState(false);
  const {moveToChart} = useCustomMove();

  const { suggestions, searchTerm} = useSelector((state: RootState) => state.searchSlice);
  const {data: companies, isLoading, isError} = useCompanyData(1, 79);
  const companiesList = companies || [];

  const displayedCompanies = searchTerm ? suggestions : companiesList || [];

    return (
      <SearchListContainer>
        {searchTerm && (
          <SearchResultHeader>
            검색결과: {suggestions.length}개
          </SearchResultHeader>
        )}
        <StockList>
          {displayedCompanies.map((company) => (
            <StockItem
              key={company.companyId}
              company={company}
              setShowChangePrice={setShowChangePrice}
              showChangePrice={showChangePrice}
              onclick={() => moveToChart(company.companyId)}
            />
          ))}
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


const SearchResultHeader = styled.div`
 padding: 12px 16px;
 font-size: 0.9rem;
 color: #666;
 background: #f5f5f5;
 border-bottom: 1px solid #eee;
`;

export const StockList = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: auto; /* 세로 스크롤을 활성화합니다 */

  &::-webkit-scrollbar {
    display: none;
  }
`;


