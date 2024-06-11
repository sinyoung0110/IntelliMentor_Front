import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import vocaRouter from "./vocaRouter";

const Loading=<div classNmae={'bg-red-700'}>Loading....</div>

const Main=lazy(()=>import("../pages/MainPage"))
const Voca=lazy(()=>import("../pages/voca/VocaIndexPage"))
const Login=lazy(()=>import("../pages/member/LoginPage"))
const Signup=lazy(()=>import("../pages/member/SignupPage"))


const root=createBrowserRouter([
    {
        path: '',
        element: <Suspense fallback={Loading}><Main/></Suspense>
    },
    {
        path: 'voca',
        element: <Suspense fallback={Loading}><Voca/></Suspense>,
        children: vocaRouter()
    },
    {
        path: 'login',
        element: <Suspense fallback={Loading}><Login/></Suspense>
    },
    {
        path: 'signup',
        element: <Suspense fallback={Loading}><Signup/></Suspense>
    }

])

export default root