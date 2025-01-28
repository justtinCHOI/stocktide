import {lazy, Suspense} from "react";
import {Navigate} from "react-router-dom";
import {Loading} from "@router/root";

const Search = lazy(() => import("@pages/stock/area/search/Search"));

const searchRouter = () => {
    return[
        {
            path: '',
            element: <Navigate replace={true} to='list' />,
        },{
            path: 'list',
            element: <Suspense fallback={Loading}><Search/></Suspense>,
        },
    ]
}

export default searchRouter
