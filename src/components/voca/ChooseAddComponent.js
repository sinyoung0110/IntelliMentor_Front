import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { checkVocaExists as apiCheckVocaExists } from '../../api/vocaApi'; // 실제 경로에 맞게 수정
import { PiPencilSimpleLineDuotone, PiSmileyDuotone, PiLegoSmileyDuotone } from "react-icons/pi";
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ChooseAddComponent = () => {
  const [exist, setExist] = useState(false);
  const navigate = useNavigate();
  const user = useSelector(state => state.loginSlice);
  const userId = user?.email; // 이메일을 userId로 사용

  const handleDirectAdd = () => {
    navigate('/voca/directAdd');
  };

  const handleRecommendAdd = () => {
    navigate('/voca/recommendAdd');
  };

  const handleAiAdd = () => {
    navigate('/voca/aiAdd');
  };

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
  }, [userId]);

  return (
    <div>
      {exist ? (
        <div>목록이 존재합니다.</div>
      ) : (
        <>
          <div className="main-text">단어장 생성하기</div>
          <div className="choose-container">
            <Button type="button" className="choose-button" onClick={handleDirectAdd}>
              <PiPencilSimpleLineDuotone color="#8FB299" />
              직접 생성
            </Button>
            <Button type="button" className="choose-button" onClick={handleRecommendAdd}>
              <PiSmileyDuotone color="#8FB299" />
              사용자 추천
            </Button>
            <Button type="button" className="choose-button" onClick={handleAiAdd}>
              <PiLegoSmileyDuotone color="#8FB299" />
              ai 생성
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ChooseAddComponent;
