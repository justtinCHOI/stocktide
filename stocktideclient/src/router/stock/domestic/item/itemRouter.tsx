import {lazy, Suspense} from "react";
import {Navigate} from "react-router-dom";
import {Loading} from "@router/root";

const EntirePage = lazy(() => import("@pages/stock/domestic/item/entire/Entire"));
const HoldPage = lazy(() => import("@pages/stock/domestic/item/hold/Hold"));
const WatchPage = lazy(() => import("@pages/stock/domestic/item/watch/Watch"));
const TestPage = lazy(() => import("@pages/stock/domestic/item/test/Test"));

const itemRouter = () => {
    return[
        {
            path: '',
            element: <Navigate replace={true} to='entire' />,
        },{
            path: 'entire',
            element: <Suspense fallback={Loading}><EntirePage/></Suspense>,
        },{
            path: 'hold',
            element: <Suspense fallback={Loading}><HoldPage/></Suspense>,
        },{
            path: 'watch',
            element: <Suspense fallback={Loading}><WatchPage/></Suspense>,
        },{
            path: 'test',
            element: <Suspense fallback={Loading}><TestPage/></Suspense>,
        },
    ]
}

export default itemRouter
