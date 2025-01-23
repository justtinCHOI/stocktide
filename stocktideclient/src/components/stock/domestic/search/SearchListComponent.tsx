import StockItem from '@components/stock/domestic/search/StockItem';
import { ContentBottom } from '@assets/css/content';
import useCompanyData from '@hooks/useCompanyData';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useState } from 'react';
import useCustomMove from '@hooks/useCustomMove';
import { SkeletonBox } from '@assets/css/SkeletonStyles';
import { InfoRow } from '@assets/css/CustomStockTideStyles';
import styled from 'styled-components';
import { AlertTriangle } from 'lucide-react';
import {
  ErrorContainer,
  ErrorMessage,
  RefreshButton
} from '@assets/css/CustomStockTideStyles';

import {
  SkeletonItem,
  SkeletonLogo,
  SkeletonContent,
  SkeletonTitle,
  SkeletonSubtitle,
  SkeletonPrice,
  SkeletonPriceMain,
  SkeletonPriceSub
} from '@assets/css/SkeletonStockItemStyles';

function SearchListComponent() {
  const [showChangePrice, setShowChangePrice] = useState(false);
  const {moveToChart} = useCustomMove();

  const { suggestions, searchTerm} = useSelector((state: RootState) => state.searchSlice);
  const {data: companies, isLoading, isError, refetch} = useCompanyData(1, 79);
  const companiesList = companies || [];

  const displayedCompanies = searchTerm ? suggestions : companiesList || [];

  if (isLoading) {
    return (
      <SearchListContainer>
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
      </SearchListContainer>
    );
  }

  if (isError) {
    return (
      <SearchListContainer>
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
      </SearchListContainer>
    );
  }

  return (

    <SearchListContainer>
      {searchTerm && (
        <SearchResultHeader>
          검색결과: {suggestions.length}개
        </SearchResultHeader>
      )}
      <StockList>

        {
          isLoading ? (
              [...Array(5)].map((_, index) => (
                <InfoRow key={index}>
                  <SkeletonBox $height="24px" $width="30%" />
                  <SkeletonBox $height="24px" $width="60%" />
                </InfoRow>
              ))
          ) :
          displayedCompanies.map((company) => (
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
  margin: 10px 14px;
  padding: 8px 10px;
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


