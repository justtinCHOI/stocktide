import {useParams} from "react-router";
import NewsComponent from '@components/stock/domestic/detail/news/NewsComponent';

function News() {

    const {tno} = useParams()

    return (
        <div className="p-4 w-full bg-white  ">
            <div className="text-3xl font-extrabold">
                Todo NewsPage {tno}
            </div>
            <NewsComponent tno={Number(tno)}/>
        </div>
    );
}

export default News;