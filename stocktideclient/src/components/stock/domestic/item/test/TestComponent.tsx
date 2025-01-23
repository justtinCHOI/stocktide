import { FC } from 'react';
import useCustomMove from "@hooks/useCustomMove";
import { ListContainer, StockList } from "@styles/ListStyles";
import StockItem from "./StockItem";
import { ContentBottom } from "@styles/content";
import useTestCompanyListData from '@hooks/useTestCompanyListData';
import {
  SkeletonContent,
  SkeletonItem,
  SkeletonLogo, SkeletonPrice, SkeletonPriceMain, SkeletonPriceSub,
  SkeletonSubtitle,
  SkeletonTitle,
} from '@styles/SkeletonStockItemStyles';
import { ErrorContainer, ErrorMessage, RefreshButton } from '@styles/CustomStockTideStyles';
import { AlertTriangle } from 'lucide-react';

const TestComponent: FC = () => {
  const { moveToChart } = useCustomMove();
  const { data: companies, isLoading, isError, refetch } = useTestCompanyListData();

  if (isLoading) {
    return (
      <ListContainer>
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
      </ListContainer>
    );
  }

  if (isError) {
    return (
      <ListContainer>
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
      </ListContainer>
    );
  }

  return (
    <ListContainer>
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
    </ListContainer>
  );
}

export default TestComponent;