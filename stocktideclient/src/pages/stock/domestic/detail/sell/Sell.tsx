import {useParams} from "react-router";
import SellComponent from '@components/stock/domestic/detail/sell/SellComponent';

function Sell() {

    const {tno} = useParams()

    return (
        <div className="p-4 w-full bg-white  ">
            <div className="text-3xl font-extrabold">
                Todo SellPage {tno}
            </div>
            <SellComponent tno={Number(tno)}/>
        </div>
    );
}

export default Sell;