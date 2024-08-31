import { Suspense, lazy } from "react";
import React from 'react';
import { Navigate } from "react-router-dom";

const Loading=<div className={'bg-red-700'}>Loading....</div>
const VocaList=lazy(()=>import("../pages/voca/VocaListPage"))
const VocaModify = lazy(() => import("../pages/voca/VocaEditPage"))
const ChooseAdd=lazy(()=>import("../pages/voca/ChooseAddPage"))
const DirectAdd=lazy(()=>import("../pages/voca/DirectAddPage"))
const AiAdd=lazy(()=>import("../pages/voca/AiAddPage"))
const RecommendAdd=lazy(()=>import("../pages/voca/RecommendAddPage"))
const Index=lazy(()=>import("../pages/voca/VocaIndexPage"))
const vocaRouter = () => {
    return [
        {
          path: 'list',
          element: <Suspense fallback={Loading}><VocaList/></Suspense>
        },
        {
          path: 'index',
          element: <Suspense fallback={Loading}><Index/></Suspense>
        },
        {
          path: '',
          element: <Navigate replace={true} to={'index'}/>
         
        },
        {path:'chooseAdd',
          element:<Suspense fallback={Loading}><ChooseAdd/></Suspense>
        },

        {path:'directAdd',
          element:<Suspense fallback={Loading}><DirectAdd/></Suspense>
        },
        {path:'aiAdd',
        element:<Suspense fallback={Loading}><AiAdd/></Suspense>
        },
        {
        path:'recommendAdd',
        element:<Suspense fallback={Loading}><RecommendAdd/></Suspense>
        },
        {
          path: 'read/:title',
          element: <Suspense fallback={Loading}><VocaModify/></Suspense>
        }
      ]
};

export default vocaRouter;