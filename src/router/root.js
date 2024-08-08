import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import todoRouter from "./todoRouter";
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
        path: 'voca',
        children: vocaRouter()
    },
    {
        path: 'member',
        children: memberRouter()
    }

])

export default root;