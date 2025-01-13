import {Suspense, lazy} from "react";
import {Navigate} from "react-router-dom";
import {Loading} from "@router/root";

const memberRouter = () => {

const Login = lazy(() => import("@pages/member/login/Login"))
const KakaoRedirect = lazy(() => import("@pages/member/kakao/KakaoRedirect"))

    return [
        {
            path: '',
            element: <Navigate replace={true} to='login' />,
        },
        {
            path: "login",
            element: <Suspense fallback={Loading}><Login/></Suspense>
        },
        {
            path: "kakao",
            element: <Suspense fallback={Loading}><KakaoRedirect/></Suspense>,
        },
    ]
}

export default memberRouter
