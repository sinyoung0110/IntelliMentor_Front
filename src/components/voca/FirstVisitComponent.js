import React, { useState, useEffect } from 'react';
import ChooseAddComponent from "../../components/voca/ChooseAddComponent";
import ListComponent from "../../components/voca/ListComponent";
import { useSelector } from 'react-redux';
import { checkVocaExists as apiCheckVocaExists } from '../../api/vocaApi';

const FirstVisitComponent = () => {
    const [exist, setExist] = useState(false);
    const user = useSelector(state => state.loginSlice);
    const userId = user?.email; // 이메일을 userId로 사용


    useEffect(() => {
      if (userId) { // userId가 있을 때만 API 호출
        const checkVocabularyExistence = async () => {
          try {
            const vocabularyList = await apiCheckVocaExists(userId); // API 호출 함수 사용
            console.log(vocabularyList); // 응답 확인
            // 리스트가 비어있지 않으면 exist를 true로 설정
            setExist(vocabularyList.length > 0);
          } catch (error) {
            console.error('Failed to check vocabulary existence', error);
            setExist(false); // 에러 발생 시에도 목록이 없다고 가정
          }
        };
        checkVocabularyExistence();
      }
    }, [userId]); // navigate를 의존성 배열에 추가
  

  return (
    <>
      {exist ? <ListComponent /> : <ChooseAddComponent />}
    </>

  );
}

export default FirstVisitComponent;
