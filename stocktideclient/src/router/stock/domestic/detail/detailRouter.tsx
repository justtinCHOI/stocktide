import {lazy, Suspense} from "react";
import {Navigate} from "react-router-dom";
import {Loading} from "@router/root";

const Chart = lazy(() => import("@pages/stock/domestic/detail/chart/Chart"));
const Buy = lazy(() => import("@pages/stock/domestic/detail/buy/Buy"));
const CompanyInfo = lazy(() => import("@pages/stock/domestic/detail/info/CompanyInfo"));
const CompanyModify = lazy(() => import("@pages/stock/domestic/detail/modify/CompanyModify"));
const News = lazy(() => import("@pages/stock/domestic/detail/news/News"));
const Chat = lazy(() => import("@pages/stock/domestic/detail/chat/Chat"));

const detailRouter = () => {
    return[
        {
            path: '',
            element: <Navigate replace to='chart' />,
        },
        {
            path: 'chart/:companyId',
            element: <Suspense fallback={Loading}><Chart/></Suspense>,
        },
        {
            path: 'buy/:companyId',
            element: <Suspense fallback={Loading}><Buy/></Suspense>,
        },
        {
            path: 'info/:companyId',
            element: <Suspense fallback={Loading}><CompanyInfo/></Suspense>,
        },
        {
            path: 'modify/:companyId',
            element: <Suspense fallback={Loading}><CompanyModify/></Suspense>,
        },
        {
            path: 'news/:companyId',
            element: <Suspense fallback={Loading}><News/></Suspense>,
        },
        {
            path: 'chat/:companyId',
            element: <Suspense fallback={Loading}><Chat/></Suspense>,
        },
    ]
}

export default detailRouter
