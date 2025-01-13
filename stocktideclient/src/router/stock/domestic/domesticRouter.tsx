import {lazy, Suspense} from "react";
import {Navigate} from "react-router";

import detailRouter from "@router/stock/domestic/detail/detailRouter";
import itemRouter from "@router/stock/domestic/item/itemRouter";
import searchRouter from "@router/stock/domestic/search/searchRouter";

const Loading = <div style={{background:'#F00'}}>Loading.........</div>

const Item = lazy(() => import("@pages/stock/domestic/item/Item"));
const Search = lazy(() => import("@pages/stock/domestic/search/Search"));
const Detail = lazy(() => import("@pages/stock/domestic/detail/Detail"));

const domesticRouter = () => {
    return[
        {
            path: '',
            element: <Navigate replace={true} to='item' />,
        },{
            path: 'item',
            element: <Suspense fallback={Loading}><Item/></Suspense>,
            children: itemRouter()
        },{
            path: 'search',
            element: <Suspense fallback={Loading}><Search/></Suspense>,
            children: searchRouter()
        },{
            path: 'detail',
            element: <Suspense fallback={Loading}><Detail/></Suspense>,
            children: detailRouter()
        },
    ]
}

export default domesticRouter
