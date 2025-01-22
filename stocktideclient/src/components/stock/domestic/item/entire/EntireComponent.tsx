import { useState} from 'react';
import useCustomMove from "@hooks/useCustomMove";
import {WatchListContainer, StockList} from "@assets/css/item";
import StockItem from "./StockItem";
import useCompanyData from "@hooks/useCompanyData";
import {ContentBottom} from "@assets/css/content";

function EntireComponent() {

    const [showChangePrice, setShowChangePrice] = useState(false);
    const {moveToChart} = useCustomMove();

    const {data: companies, isLoading, isError} = useCompanyData(1, 79);

    const companiesList = companies || [];

    return (
        <WatchListContainer>
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
        </WatchListContainer>
    );
}

export default EntireComponent;
