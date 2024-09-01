import { Suspense, lazy } from "react";
import React from 'react';

const Loading = <div className={'bg-red-700'}>Loading....</div>
const Index = lazy(() => import("../pages/learn/LearnIndexPage"));

const learnRouter = () => {
    return [
        {
          path: 'index',
          element: <Suspense fallback={Loading}><Index /></Suspense>
        }
    ];
};

export default learnRouter;
