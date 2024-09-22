import React, { useState } from 'react';
import { MdOutlineArrowForward, MdOutlineQuestionMark,MdOutlineMinimize } from "react-icons/md";
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { submitQuizSelection } from '../../api/learnApi'; // 퀴즈 데이터를 불러오는 API 함수


const ChooseQuiz = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const titleId = queryParams.get('titleId');
  const sectionId = queryParams.get('sectionId');

  const [selectedQuizzes, setSelectedQuizzes] = useState({
    e: false,
    k: false,
    s: false,
  });

  const handleSelect = (type) => {
    setSelectedQuizzes((prevSelected) => ({
      ...prevSelected,
      [type]: !prevSelected[type],  // 토글 방식으로 선택 상태를 변경
    }));
  };

  const handleSubmit = async () => {
    try {
      const selectedTypes = Object.keys(selectedQuizzes)
        .filter((key) => selectedQuizzes[key])
        .join('');
  
      const quizData = await submitQuizSelection(sectionId, selectedTypes);
      console.log('Quiz data received:', quizData);
  
      navigate(`/learn/quiz/${selectedTypes}/${sectionId}/${titleId}`, { // titleId 추가
        state: { titleId, sectionId, selectedTypes, quizData }
      });
    } catch (error) {
      console.error('Error during quiz submission:', error);
    }
  };

  
  return (
    <Container className="mt-4">
      <Row className="justify-content-center mb-4">
        <Col xs="auto">
          <h2 className="main-text">VOCA CREATE</h2>
        </Col>
      </Row>

      <div className="choose-container">
        <Button 
          type="button" 
          className={`choose-button ${selectedQuizzes.e ? 'selected' : ''}`} 
          onClick={() => handleSelect('e')}
        >
          <div className="arrow-container">
            <span>A</span>
            <MdOutlineArrowForward color="#8FB299" />
            <span style={{ fontSize: '70px' }}>가</span>
          </div>
          영어 - 한글
        </Button>
        <Button 
          type="button" 
          className={`choose-button ${selectedQuizzes.k ? 'selected' : ''}`} 
          onClick={() => handleSelect('k')}
        >
          <div className="arrow-container">
            <span style={{ fontSize: '70px' }}>가</span>
            <MdOutlineArrowForward color="#8FB299" />
            <span>A</span>
          </div>
          한글 - 영어
        </Button>
        <Button 
          type="button" 
          className={`choose-button ${selectedQuizzes.s ? 'selected' : ''}`} 
          onClick={() => handleSelect('s')}
        ><div className="question-container">

          <MdOutlineQuestionMark color="#8FB299" />

          </div>
          빈칸 맞추기
        </Button>
      </div>

      <div className="quiz-button-container" style={{display :'flex', alignItems: 'center',justifyContent:'center'}}>
        <Button onClick={handleSubmit} className="quiz-button" style={{display :'flex', alignItems: 'center',justifyContent:'center'}}>
          선택 완료
        </Button>
      </div>
    </Container>
  );
};

export default ChooseQuiz;
