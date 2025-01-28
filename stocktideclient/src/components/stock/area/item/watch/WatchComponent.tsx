import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import StockItem from '@components/stock/area/item/entire/StockItem';
import { useState } from 'react';
import useCustomMove from '@hooks/useCustomMove';
import { ListContainer, StockList} from "@styles/ListStyles";

function WatchComponent() {
  const [showChangePrice, setShowChangePrice] = useState(false);
  const {moveToChart} = useCustomMove();
  const { recentSearches } = useSelector((state: RootState) => state.searchSlice);

  return (
      <ListContainer>
        <StockList>
          {recentSearches.map((company) => (
            <StockItem
              key={company.companyId}
              company={company}
              setShowChangePrice={setShowChangePrice}
              showChangePrice={showChangePrice}
              onclick={() => moveToChart(company.companyId)}
            />
          ))}
        </StockList>
      </ListContainer>
    );
}

export default WatchComponent;
