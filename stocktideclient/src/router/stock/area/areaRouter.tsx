import {lazy, Suspense} from "react";
import {Navigate} from "react-router";

import detailRouter from "@router/stock/area/detail/detailRouter";
import itemRouter from "@router/stock/area/item/itemRouter";
import searchRouter from "@router/stock/area/search/searchRouter";

const Loading = <div style={{background:'#F00'}}>Loading.........</div>

const Item = lazy(() => import("@pages/stock/area/item/Item"));
const Search = lazy(() => import("@pages/stock/area/search/Search"));
const Detail = lazy(() => import("@pages/stock/area/detail/Detail"));

const areaRouter = () => {
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

export default areaRouter
