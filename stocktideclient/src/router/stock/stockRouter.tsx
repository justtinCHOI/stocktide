import {lazy, Suspense} from "react";
import {Navigate} from "react-router";
import areaRouter from "@router/stock/area/areaRouter";
import {Loading} from "@router/root";

const Domestic = lazy(() => import("@pages/stock/area/Area"));

const stockRouter = () => {
    return[
        {
            path: '',
            element: <Navigate replace={true} to='domestic' />,
        },{
            path: ':area',
            element: <Suspense fallback={Loading}><Domestic/></Suspense>,
            children: areaRouter()
        }
    ]
}

export default stockRouter;
