import {Outlet} from "react-router-dom";
import StockInfoComponent from "@components/common/StockInfoComponent";

const Stock = () => {
    return (
        <>
            <StockInfoComponent/>
            <Outlet />
        </>
    );
}

export default Stock;
