import {Outlet} from "react-router-dom";
import StockInfoComponent from '@components/common/StockInfoComponent';

const Domestic = () => {
    return (
        <>
            <StockInfoComponent/>
            <Outlet />
        </>
    );
}

export default Domestic;
