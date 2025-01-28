import {Outlet} from "react-router-dom";
import StockInfoComponent from '@components/common/StockInfoComponent';

const Area = () => {
    return (
        <>
            <StockInfoComponent/>
            <Outlet />
        </>
    );
}

export default Area;
