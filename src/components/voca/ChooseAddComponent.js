import React, { useState, useEffect } from 'react';
import { PiPencilSimpleLineDuotone, PiSmileyDuotone, PiLegoSmileyDuotone } from "react-icons/pi";
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ChooseAddComponent = () => {
  const [exist, setExist] = useState(false);
  const navigate = useNavigate();

  const handleDirectAdd = () => {
    navigate('/voca/directAdd');
  };

  const handleRecommendAdd = () => {
    navigate('/voca/recommendAdd');
  };

  const handleAitAdd = () => {
    navigate('/voca/aiAdd');
  };

  useEffect(() => {
    // 여기서 API 호출을 통해 목록의 존재 여부를 확인할 수 있습니다.
    setExist(false); // 예제로 존재하지 않음으로 설정
  }, []);

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
            <Button type="button" className="choose-button" onClick={handleAitAdd}>
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
