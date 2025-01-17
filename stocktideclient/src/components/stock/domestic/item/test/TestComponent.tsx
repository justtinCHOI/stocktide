import { FC } from 'react';
import useCustomMove from "@hooks/useCustomMove";
import { WatchListContainer, StockList } from "@assets/css/item";
import StockItem from "./StockItem";
import { ContentBottom } from "@assets/css/content";
import useTestCompanyListData from '@hooks/useTestCompanyListData';

const TestComponent: FC = () => {
  const { moveToChart } = useCustomMove();
  const { data: companies, isLoading, isError } = useTestCompanyListData();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading companies</div>;
  }

  return (
    <WatchListContainer>
      <StockList>
        {companies?.map((company) => (
          <StockItem
            key={company.companyId}
            company={company}
            onclick={() => moveToChart(company.companyId)}
          />
        ))}
      </StockList>
      <ContentBottom/>
    </WatchListContainer>
  );
}

export default TestComponent;