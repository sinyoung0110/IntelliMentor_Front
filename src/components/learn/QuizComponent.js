import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { submitQuizResults } from '../../api/learnApi'; // API 호출 함수 불러오기
import QuizResults from './QuizResults'; // QuizResults 컴포넌트 불러오기

const QuizComponent = () => {
  const location = useLocation();
  const { quizData } = location.state || {};
  const { sectionId } = useParams(); // URL에서 sectionId 가져오기
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [results, setResults] = useState(null); // 초기값을 null로 설정
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    if (!quizData || quizData.quiz.length === 0) {
      console.log("No quiz data available");
    } else {
      console.log('Quiz data:', quizData);
    }
  }, [quizData]);

  const handleAnswerSelect = (questionIndex, answerId) => {
    const correctAnswerId = quizData.quiz[questionIndex][0].id;
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: answerId,
    }));
    if (answerId === correctAnswerId) {
      setFeedbackMessage('정답입니다!');
      setFeedbackType('correct');
    } else {
      setFeedbackMessage('틀렸습니다!');
      setFeedbackType('incorrect');
    }
    setTimeout(() => {
      if (currentQuestion < quizData.quiz.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setFeedbackMessage('');
        setFeedbackType('');
      }
    }, 1000);
  };

  const checkAnswers = async () => {
    const finalResults = quizData.quiz.map((questionSet, index) => {
      const correctAnswerId = questionSet[0].id;
      const selectedAnswerId = answers[index];
      const isCorrect = correctAnswerId === selectedAnswerId;

      // 문제의 타입을 결정하는 로직 추가 ("e", "k", "s")
      let questionType;
      if (questionSet[0].eng) {
        questionType = 'e'; // 영어
      } else if (questionSet[0].kor) {
        questionType = 'k'; // 한국어
      } else if (questionSet[0].sentence) {
        questionType = 's'; // 문장
      }

      return {
        id: correctAnswerId,
        type: questionType,
        correct: isCorrect,
      };
    });

    const dataToSend = finalResults; // 서버에 전송할 데이터 형식

    try {
      const response = await submitQuizResults(sectionId, dataToSend); // 서버로 데이터 전송
      setResults(response); // 서버 응답을 results 상태에 저장
      console.log('Quiz results submitted successfully', response);
      setQuizCompleted(true); // 퀴즈 완료 상태로 전환
    } catch (error) {
      console.error('Error submitting quiz results:', error);
    }
  };

  return (
    <Container className="mt-4">
      {quizCompleted ? (
        <QuizResults results={results} /> // QuizResults 컴포넌트 렌더링
      ) : (
        <>
          <Row className="justify-content-center">
            <Col xs="auto">
              <h2 className="main-text">퀴즈 풀기</h2>
            </Col>
          </Row>

          {quizData && quizData.quiz && quizData.quiz.length > 0 && (
            <>
              <div className="quiz-question-container text-center">
                <div className="question-number">{`문제 ${currentQuestion + 1} / ${quizData.quiz.length}`}</div>
                <p className="question-text">
                  {quizData.quiz[currentQuestion][0].eng ||
                    quizData.quiz[currentQuestion][0].kor ||
                    quizData.quiz[currentQuestion][0].sentence}
                </p>
                <div className={`feedback-message ${feedbackType}`}>
                  {feedbackMessage}
                </div>
              </div>

              <div className="quiz-answers-container">
                {quizData.quiz[currentQuestion].slice(1).map((option) => (
                  <Button
                    key={option.id}
                    onClick={() => handleAnswerSelect(currentQuestion, option.id)}
                    className={`answer-button ${
                      answers[currentQuestion] === option.id
                        ? quizData.quiz[currentQuestion][0].id === option.id
                          ? 'correct'
                          : 'incorrect'
                        : ''
                    }`}
                  >
                    {option.eng || option.kor || option.sentence}
                  </Button>
                ))}
              </div>

              {currentQuestion === quizData.quiz.length - 1 && (
                <div className="quiz-submit-container">
                  <Button onClick={checkAnswers} className="quiz-submit-button mt-3">
                    결과 제출
                  </Button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default QuizComponent;
