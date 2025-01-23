import { useState} from 'react';
import useCustomMove from "@hooks/useCustomMove";
import { ListContainer, StockList} from "@styles/ListStyles";
import StockItem from "./StockItem";
import useCompanyData from "@hooks/useCompanyData";
import {ContentBottom} from "@styles/content";
import {
  SkeletonContent,
  SkeletonItem,
  SkeletonLogo, SkeletonPrice, SkeletonPriceMain, SkeletonPriceSub,
  SkeletonSubtitle,
  SkeletonTitle,
} from '@styles/SkeletonStockItemStyles';
import { ErrorContainer, ErrorMessage, RefreshButton } from '@styles/CustomStockTideStyles';
import { AlertTriangle } from 'lucide-react';


function EntireComponent() {

  const [showChangePrice, setShowChangePrice] = useState(false);
  const {moveToChart} = useCustomMove();

  const {data: companies, isLoading, isError, refetch} = useCompanyData(1, 79);

  const companiesList = companies || [];

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
        </ListContainer>
    );
}

export default EntireComponent;
