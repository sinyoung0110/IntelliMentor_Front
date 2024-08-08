import { Suspense, lazy } from "react";
import React from 'react';
import { Navigate } from "react-router-dom";

const Loading=<div className={'bg-red-700'}>Loading....</div>
const VocaList=lazy(()=>import("../pages/voca/VocaListPage"))
//const VocaRead=lazy(()=>import("../pages/voca/VocaReadPage"))
const VocaAdd=lazy(()=>import("../pages/voca/VocaAddPage"))
//const VocaModify = lazy(() => import("../pages/voca/VocaModifyPage"))
const DirectAdd=lazy(()=>import("../pages/voca/DirectAddPage"))
const AiAdd=lazy(()=>import("../pages/voca/AiAddPage"))
const RecommendAdd=lazy(()=>import("../pages/voca/RecommendAddPage"))

const vocaRouter = () => {
    return [
        {
          path: 'list',
          element: <Suspense fallback={Loading}><VocaList/></Suspense>
        },
        {
          path: '',
          element: <Navigate replace={true} to={'add'}/>
         
        },
        // {
        //   path: 'read/:tno',
        //   element: <Suspense fallback={Loading}><VocaRead/></Suspense>
        // },
        {
          path: 'add',
          element: <Suspense fallback={Loading}><VocaAdd/></Suspense>,
        },
        {path:'directAdd',
          element:<Suspense fallback={Loading}><DirectAdd/></Suspense>
        },{path:'aiAdd',
        element:<Suspense fallback={Loading}><AiAdd/></Suspense>
      },{
        path:'recommendAdd',
        element:<Suspense fallback={Loading}><RecommendAdd/></Suspense>
      }
        // {
        //   path: 'modify/:tno',
        //   element: <Suspense fallback={Loading}><VocaModify/></Suspense>
        // }
    
    
      ]
};

export default vocaRouter;