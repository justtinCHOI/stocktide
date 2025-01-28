import {useParams} from "react-router";
import BuyComponent from '@components/stock/area/detail/buy/BuyComponent';

function Buy() {

    const {companyId} = useParams()

    return (
        <BuyComponent companyId={Number(companyId)} />
    );
}

export default Buy;
