import {useParams} from "react-router";
import ChartComponent from '@components/stock/area/detail/chart/ChartComponent';

function Chart() {

    const {companyId} = useParams()

    return (
        <ChartComponent companyId={Number(companyId)}/>
    );
}

export default Chart;
