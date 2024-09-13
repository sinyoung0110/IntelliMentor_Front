import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

const QuizComponent = () => {
  const location = useLocation();
  const { quizData } = location.state || {}; // quizData를 location.state로부터 가져옴

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [quizResult, setQuizResult] = useState([]);

  // quizData가 유효하지 않을 경우 초기 상태를 설정
  useEffect(() => {
    if (!quizData || quizData.length === 0) {
      console.log("No quiz data available"); // 디버깅용
    } else {
      console.log('Quiz data:', quizData); // quizData 확인
    }
  }, [quizData]);

  const handleAnswerSelect = (questionIndex, answerId) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: answerId,
    }));
  };

  const checkAnswers = () => {
    const result = quizData.map((questionSet, index) => {
      const correctAnswerId = questionSet[0].id; // 문제의 ID
      const selectedAnswerId = answers[index];   // 사용자가 선택한 답변의 ID
      return correctAnswerId === selectedAnswerId; // 정답 여부 확인
    });
    setQuizResult(result);
    console.log('Quiz Results:', result); // 정답 여부 결과를 콘솔에 출력
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-center mb-4">
        <Col xs="auto">
          <h2 className="main-text">퀴즈 풀기</h2>
        </Col>
      </Row>

      {quizData.length > 0 ? (
        <>
          <div className="quiz-question-container">
            <h4>문제 {currentQuestion + 1} / {quizData.length}</h4>
            <p>{quizData[currentQuestion][0].eng || quizData[currentQuestion][0].kor}</p>
          </div>
          
          <div className="quiz-answers-container">
            {quizData[currentQuestion].slice(1).map((option, idx) => (
              <Button
                key={idx}
                onClick={() => handleAnswerSelect(currentQuestion, option.id)}
                className={`answer-button ${answers[currentQuestion] === option.id ? 'selected' : ''}`}
              >
                {option.eng || option.kor}
              </Button>
            ))}
          </div>

          <div className="quiz-navigation-container">
            {currentQuestion > 0 && (
              <Button onClick={() => setCurrentQuestion((prev) => prev - 1)}>
                이전 문제
              </Button>
            )}
            {currentQuestion < quizData.length - 1 && (
              <Button onClick={() => setCurrentQuestion((prev) => prev + 1)}>
                다음 문제
              </Button>
            )}
          </div>

          {currentQuestion === quizData.length - 1 && (
            <Button onClick={checkAnswers} className="quiz-submit-button">
              결과 제출
            </Button>
          )}
        </>
      ) : (
        <div>퀴즈 데이터를 불러오는 중...</div>
      )}
    </Container>
  );
};

export default QuizComponent;
