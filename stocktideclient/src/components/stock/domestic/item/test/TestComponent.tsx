import useCustomMove from "@hooks/useCustomMove";
import {WatchListContainer, StockList} from "@assets/css/item";
import StockItem from "./StockItem";
import {ContentBottom} from "@assets/css/content";
import useTestCompanyListData from '@hooks/useTestCompanyListData';

function TestComponent() {

    const {moveToRead} = useCustomMove();

    const {data: companies, isLoading, isError} = useTestCompanyListData();

    const companiesList = companies || [];

    return (
        <WatchListContainer>
            <StockList>
                {isLoading ? (
                    <div></div>
                ) : isError ? (
                    <div>Error fetching data</div>
                ) : (
                    companiesList.map((company: any) => (
                        <StockItem
                            key={company.companyId}
                            company={company}
                            onclick={() => moveToRead(company.companyId)}
                        />
                    ))
                )}
            </StockList>
            <ContentBottom/>
        </WatchListContainer>
    );
}

export default TestComponent;
