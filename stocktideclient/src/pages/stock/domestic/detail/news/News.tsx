import {useParams} from "react-router";
import NewsComponent from '@components/stock/domestic/detail/news/NewsComponent';

function News() {

    const {companyId} = useParams()

    return (
          <NewsComponent companyId={Number(companyId)}/>
    );
}

export default News;