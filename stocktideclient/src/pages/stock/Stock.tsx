import SearchCompanyComponent from "@components/common/SearchCompanyComponent";
import {Outlet} from "react-router-dom";
import StockInfoComponent from "@components/common/StockInfoComponent";

const Stock = () => {
    return (
        <>
            <StockInfoComponent/>
            <SearchCompanyComponent/>
            <Outlet />
        </>
    );
}

export default Stock;
