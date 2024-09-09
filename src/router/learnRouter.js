import { Suspense, lazy } from "react";
import React from 'react';

const Loading = <div className={'bg-red-700'}>Loading....</div>
const Index = lazy(() => import("../pages/learn/LearnIndexPage"));
const Learn = lazy(() => import("../pages/learn/CardLearnPage"));

const learnRouter = () => {
    return [
        {
          path: 'index',
          element: <Suspense fallback={Loading}><Index /></Suspense>
        },
        {
          path: 'card',
          element: <Suspense fallback={Loading}><Learn /></Suspense>
        }
    ];
};

export default learnRouter;
