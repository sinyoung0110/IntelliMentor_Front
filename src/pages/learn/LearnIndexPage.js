import React from 'react';
import { useLocation } from 'react-router-dom';
import BasicLayout from "../../layouts/BasicLayout";
import useCustomLogin from "../../hooks/useCustomLogin";
import LearnIndexComponent from "../../components/learn/LearnIndexComponent";



const LearnIndexPage = () => {
  const {isLogin, moveToLoginReturn} = useCustomLogin()
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const title = queryParams.get('title') || ''; // 기본값으로 빈 문자열 설정

  if(!isLogin){
    return moveToLoginReturn()
    }
  return (
  <BasicLayout>
  <LearnIndexComponent title={title}/>
  </BasicLayout>
  );
}

export default LearnIndexPage;
