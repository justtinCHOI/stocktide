import {Outlet} from "react-router-dom";
import StockInfoComponent from '@components/common/StockInfoComponent';
import SearchCompanyComponent from '@components/common/SearchCompanyComponent';

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
