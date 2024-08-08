import React, { useState, useEffect } from 'react';
import { PiPencilSimpleLineDuotone,PiSmileyDuotone,PiLegoSmileyDuotone} from "react-icons/pi";
import { Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 임포트

const ChooseAddComponent = () => {
  const [exist, setExist] = useState(false);
  const navigate = useNavigate();
  const handleDirectAdd = () => {
    navigate('/voca/directAdd'); // 회원가입 페이지로 이동
  };
  const handleRecommendAdd = () => {
    navigate('/voca/recommendAdd'); // 회원가입 페이지로 이동
  };
  const handleAitAdd = () => {
    navigate('/voca/aiAdd'); // 회원가입 페이지로 이동
  };

  useEffect(() => {
    // 여기서 API 호출을 통해 목록의 존재 여부를 확인할 수 있습니다.
    // 예를 들어:
    // const fetchData = async () => {
    //   const response = await fetch('/api/checkVocaList');
    //   const data = await response.json();
    //   setExist(data.exist);
    // };
    // fetchData();

    // 현재는 예제로 목록이 존재하지 않는다고 설정합니다.
    setExist(false); // 존재하지 않음으로 설정
  }, []);


  return (
    <div>
      {exist ? (
        <div>목록이 존재합니다.</div> // 목록을 표시하는 부분
      ) : (<>
      <div className="main-text">단어장 생성하기</div>
        <div className="choose-container">
          <Button type="button" className="choose-button" onClick={handleDirectAdd}>
          <PiPencilSimpleLineDuotone size="200" color="#8FB299"/>
                직접 생성
          </Button>
          <Button type="button" className="choose-button" onClick={handleRecommendAdd}>
          <PiSmileyDuotone size="200" color="#8FB299"/>
                사용자 추천
          </Button>
          <Button type="button" className="choose-button" onClick={handleAitAdd}>
          <PiLegoSmileyDuotone size="200" color="#8FB299"/>
                ai 생성
          </Button>
        </div>
        </>
      )}
    </div>
  );
};

export default ChooseAddComponent;
