import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import todoRouter from "./todoRouter";
import vocaRouter from "./vocaRouter";
import memberRouter from "./memberRouter";

const Loading=<div className={'bg-red-700'}>Loading....</div>

const Main=lazy(()=>import("../pages/MainPage"))
const Voca=lazy(()=>import("../pages/voca/VocaIndexPage"))
const Study=lazy(()=>import("../pages/study/StudyMinePage"))
const Notice=lazy(()=>import("../pages/notice/NoticeIndexPage"))


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
        path: 'study',
        element: <Suspense fallback={Loading}><Study/></Suspense>,
        children: todoRouter()
    },
    {
        path: 'notice',
        element: <Suspense fallback={Loading}><Notice/></Suspense>,
        children: todoRouter()
    },
    {
        path: 'member',
        children: memberRouter()
    }

])

export default root;