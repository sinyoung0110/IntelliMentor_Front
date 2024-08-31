import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import learnRouter from "./learnRouter";
import vocaRouter from "./vocaRouter";
import memberRouter from "./memberRouter";

const Loading=<div className={'bg-red-700'}>Loading....</div>

const Main=lazy(()=>import("../pages/MainPage"))

const root=createBrowserRouter([
    {
        path: '',
        element: <Suspense fallback={Loading}><Main/></Suspense>
    },
    {
        path: 'member',
        children: memberRouter()
    },
    {
        path: 'voca',
        children: vocaRouter()
    },
    {
        path: 'learn',
        children: learnRouter()
    }

])

export default root;