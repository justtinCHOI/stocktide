import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import StockItem from '@components/stock/domestic/item/entire/StockItem';
import { useState } from 'react';
import useCustomMove from '@hooks/useCustomMove';

function WatchComponent() {
  const [showChangePrice, setShowChangePrice] = useState(false);
  const {moveToChart} = useCustomMove();
  const { recentSearches} = useSelector((state: RootState) => state.searchSlice);

    return (
          <RecentSearches>
            <RecentTitle>최근 검색어</RecentTitle>
            {recentSearches.map((company) => (
              <StockItem
                key={company.companyId}
                company={company}
                setShowChangePrice={setShowChangePrice}
                showChangePrice={showChangePrice}
                onclick={() => moveToChart(company.companyId)}
              />
            ))}
          </RecentSearches>
    );
}

export default WatchComponent;

const RecentSearches = styled.div`
 position: absolute;
 top: 100%;
 left: 0;
 right: 0;
 background: white;
 border-radius: 0 0 8px 8px;
 box-shadow: 0 4px 6px rgba(0,0,0,0.1);
 padding: 8px 0;
 z-index: 10;
`;

const RecentTitle = styled.div`
 padding: 8px 16px;
 color: #666;
 font-size: 0.9rem;
 font-weight: 500;
 border-bottom: 1px solid #eee;
`;

