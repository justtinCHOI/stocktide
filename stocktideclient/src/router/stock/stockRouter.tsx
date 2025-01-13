import {lazy, Suspense} from "react";
import {Navigate} from "react-router";
import domesticRouter from "@router/stock/domestic/domesticRouter";
import {Loading} from "@router/root";

const Domestic = lazy(() => import("@pages/stock/domestic/Domestic"));

const stockRouter = () => {
    return[
        {
            path: '',
            element: <Navigate replace={true} to='domestic' />,
        },{
            path: 'domestic',
            element: <Suspense fallback={Loading}><Domestic/></Suspense>,
            children: domesticRouter()
        },{
            // path: 'overseas',
            // element: <Suspense fallback={Loading}><OverseasPage/></Suspense>,
            // children: overseasRouter()
        },
    ]
}

export default stockRouter;
