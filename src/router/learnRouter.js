import { Suspense, lazy } from "react";
import React from 'react';

const Loading = <div className={'bg-red-700'}>Loading....</div>
const Index = lazy(() => import("../pages/learn/LearnIndexPage"));
const Learn = lazy(() => import("../pages/learn/CardLearnPage"));
const ChooseQuiz=lazy(()=>import("../pages/learn/ChooseQuizPage"))
const QuizSolve=lazy(()=>import("../pages/learn/QuizSolvePage"))

const learnRouter = () => {
    return [
        {
          path: 'index',
          element: <Suspense fallback={Loading}><Index /></Suspense>
        },
        {
          path: 'card',
          element: <Suspense fallback={Loading}><Learn /></Suspense>
        },
        {path:'chooseQuiz',
          element:<Suspense fallback={Loading}><ChooseQuiz/></Suspense>
        },
        {
          path: 'quiz/:selectedType/:sectionId/:titleId',
          element: <Suspense fallback={Loading}><QuizSolve /></Suspense>
      }
    ];
};

export default learnRouter;
