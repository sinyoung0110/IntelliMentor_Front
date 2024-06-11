import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import vocaRouter from "./vocaRouter";
import memberRouter from "./memberRouter";

const Loading=<div className={'bg-red-700'}>Loading....</div>

const Main=lazy(()=>import("../pages/MainPage"))
const Voca=lazy(()=>import("../pages/voca/VocaIndexPage"))
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
        path:"member",
        children: memberRouter()
    },
    {
        path: 'signup',
        element: <Suspense fallback={Loading}><Signup/></Suspense>
    }

])

export default root