import {Outlet} from "react-router-dom";
import StockInfoComponent from '@components/common/StockInfoComponent';
import SearchCompanyComponent from '@components/stock/domestic/search/SearchCompanyComponent';

const Domestic = () => {
    return (
        <>
            <StockInfoComponent/>
            <SearchCompanyComponent area={'domestic'}/>
            <Outlet />
        </>
    );
}

export default Domestic;
