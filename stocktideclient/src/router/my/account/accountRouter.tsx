import {Suspense, lazy} from "react";
import {Navigate} from "react-router-dom";
import {Loading} from "@router/root";

const Manage = lazy(() => import("@pages/my/account/manage/Manage"))
const Exchange = lazy(() => import("@pages/my/account/exchange/Exchange"))
const Charge = lazy(() => import("@pages/my/account/charge/Charge"))

const accountRouter = () => {

    return [
        {
            path: '',
            element: <Navigate replace to='manage' />,
        },
        {
            path: "manage",
            element: <Suspense fallback={Loading}><Manage/></Suspense>,
        },
        {
            path: "exchange/:cashId",
            element: <Suspense fallback={Loading}><Exchange/></Suspense>
        },
        {
            path: "charge/:cashId",
            element: <Suspense fallback={Loading}><Charge/></Suspense>,
        },
    ]
}

export default accountRouter;
