import {lazy, Suspense} from "react";
import {Navigate} from "react-router-dom";
import accountRouter from "@router/my/account/accountRouter";
import {Loading} from "@router/root";

const ProfitPage = lazy(() => import("@pages/my/profit/Profit"))
const MemberInfoPage = lazy(() => import("@pages/my/info/MemberInfo"))
const MemberModifyPage = lazy(() => import("@pages/my/modify/MemberModify"))
const SettingPage = lazy(() => import("@pages/my/setting/Setting"))
const AccountPage = lazy(() => import("@pages/my/account/Account"))

const myRouter = () => {
    return[
        {
            path: '',
            element: <Navigate replace to='profit' />,
        },
        {
            path: 'profit',
            element: <Suspense fallback={Loading}><ProfitPage/></Suspense>
        },
        {
            path: 'info',
            element: <Suspense fallback={Loading}><MemberInfoPage/></Suspense>
        },
        {
            path:"modify",
            element: <Suspense fallback={Loading}><MemberModifyPage/></Suspense>,
        },
        {
            path: 'setting',
            element: <Suspense fallback={Loading}><SettingPage/></Suspense>
        },
        {
            path: "account",
            element: <Suspense fallback={Loading}><AccountPage /></Suspense>,
            children: accountRouter()
        },
    ]
}

export default myRouter
