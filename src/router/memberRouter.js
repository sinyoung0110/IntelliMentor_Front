import { Suspense, lazy } from "react";

const Loading = <div>Loading....</div>
const Login = lazy(() => import("../pages/member/LoginPage"))
const LogoutPage = lazy(() => import("../pages/member/LogoutPage"))
const KakaoRedirect = lazy(() => import("../pages/member/KakaoRedirectPage"))
const SignupPage = lazy(() => import("../pages/member/SignupPage"))
const MyPage = lazy(() => import("../pages/member/MyPage"))
const memberRouter = () => {
return [
    {
    path:"login",
    element: <Suspense fallback={Loading}><Login/></Suspense>
    },
    {
        path:"logout",
        element: <Suspense fallback={Loading}><LogoutPage/></Suspense>,
    },
    {
        path:"kakao",
        element: <Suspense fallback={Loading}><KakaoRedirect/></Suspense>,
    },
    {
        path:"signup",
        element:<Suspense fallback={Loading}><SignupPage/></Suspense>,
    },
    {
        path:"mypage",
        element:<Suspense fallback={Loading}><MyPage/></Suspense>,
    }
]
}
export default memberRouter