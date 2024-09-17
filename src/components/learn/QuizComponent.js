// import React, { useState, useEffect } from 'react';
// import { useLocation, useParams } from 'react-router-dom'; // useParams 추가
// import { Container, Row, Col, Button } from 'react-bootstrap';
// import { submitQuizResults } from '../../api/learnApi'; // API 호출 함수 불러오기

// const QuizComponent = () => {
//   const location = useLocation();
//   const { quizData } = location.state || {};
//   const { sectionId } = useParams(); // URL에서 sectionId 가져오기
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [answers, setAnswers] = useState({});
//   const [feedbackMessage, setFeedbackMessage] = useState('');
//   const [feedbackType, setFeedbackType] = useState('');
//   const [results, setResults] = useState([]);

//   useEffect(() => {
//     if (!quizData || quizData.quiz.length === 0) {
//       console.log("No quiz data available");
//     } else {
//       console.log('Quiz data:', quizData);
//     }
//   }, [quizData]);

//   const handleAnswerSelect = (questionIndex, answerId) => {
//     const correctAnswerId = quizData.quiz[questionIndex][0].id;
//     setAnswers((prevAnswers) => ({
//       ...prevAnswers,
//       [questionIndex]: answerId,
//     }));
//     if (answerId === correctAnswerId) {
//       setFeedbackMessage('정답입니다!');
//       setFeedbackType('correct');
//     } else {
//       setFeedbackMessage('틀렸습니다!');
//       setFeedbackType('incorrect');
//     }
//     setTimeout(() => {
//       if (currentQuestion < quizData.quiz.length - 1) {
//         setCurrentQuestion((prev) => prev + 1);
//         setFeedbackMessage('');
//         setFeedbackType('');
//       }
//     }, 1000);
//   };

//   const checkAnswers = async () => {
//     const finalResults = quizData.quiz.map((questionSet, index) => {
//       const correctAnswerId = questionSet[0].id;
//       const selectedAnswerId = answers[index];
//       const isCorrect = correctAnswerId === selectedAnswerId;
//       return {
//         id: correctAnswerId,
//         type: questionSet[0].eng ? 'eng' : 'kor',
//         correct: isCorrect,
//       };
//     });

//     const dataToSend = {
//       sectionId: parseInt(sectionId, 10), // URL에서 가져온 sectionId를 포함
//       data: finalResults,
//     };

//     setResults(finalResults);
//     console.log('Quiz Results:', finalResults); // 결과를 콘솔에 출력

//     try {
//       await submitQuizResults(dataToSend); // 서버로 데이터 전송
//       console.log('Quiz results submitted successfully');
//     } catch (error) {
//       console.error('Error submitting quiz results:', error);
//     }
//   };

//   return (
//     <Container className="mt-4">
//       <Row className="justify-content-center">
//         <Col xs="auto">
//           <h2 className="main-text">퀴즈 풀기</h2>
//         </Col>
//       </Row>

//       {quizData && quizData.quiz && quizData.quiz.length > 0 && (
//         <>
//           <div className="quiz-question-container text-center">
//             <div className="question-number">{`문제 ${currentQuestion + 1} / ${quizData.quiz.length}`}</div>
//             <p className="question-text">
//               {quizData.quiz[currentQuestion][0].eng || quizData.quiz[currentQuestion][0].kor}
//             </p>
//             <div className={`feedback-message ${feedbackType}`}>
//               {feedbackMessage}
//             </div>
//           </div>

//           <div className="quiz-answers-container">
//             {quizData.quiz[currentQuestion].slice(1).map((option) => (
//               <Button
//                 key={option.id}
//                 onClick={() => handleAnswerSelect(currentQuestion, option.id)}
//                 className={`answer-button ${
//                   answers[currentQuestion] === option.id
//                     ? quizData.quiz[currentQuestion][0].id === option.id
//                       ? 'correct'
//                       : 'incorrect'
//                     : ''
//                 }`}
//               >
//                 {option.eng || option.kor}
//               </Button>
//             ))}
//           </div>

//           {currentQuestion === quizData.quiz.length - 1 && (
//             <div className="quiz-submit-container">
//               <Button onClick={checkAnswers} className="quiz-submit-button mt-3">
//                 결과 제출
//               </Button>
//             </div>
//           )}
//         </>
//       )}
//     </Container>
//   );
// };

// export default QuizComponent;

import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom'; // useParams 추가
import { Container, Row, Col, Button } from 'react-bootstrap';
import { submitQuizResults } from '../../api/learnApi'; // API 호출 함수 불러오기

const QuizComponent = () => {
  const location = useLocation();
  const { quizData } = location.state || {};
  const { sectionId } = useParams(); // URL에서 sectionId 가져오기
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [results, setResults] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false); // 퀴즈 완료 상태 추가

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
    // 최종 퀴즈 결과 데이터 구성
    const finalResults = quizData.quiz.map((questionSet, index) => {
      const correctAnswerId = questionSet[0].id;
      const selectedAnswerId = answers[index];
      const isCorrect = correctAnswerId === selectedAnswerId;
      return {
        id: correctAnswerId,
        type: questionSet[0].eng ? 'eng' : 'kor',
        correct: isCorrect,
      };
    });

    // sectionId와 함께 데이터를 전송
    const dataToSend = {
      sectionId: parseInt(sectionId, 10), // URL에서 가져온 sectionId를 포함
      data: finalResults,
    };

    setResults(finalResults);
    console.log('Quiz Results:', finalResults); // 결과를 콘솔에 출력

    try {
      const response = await submitQuizResults(dataToSend); // 서버로 데이터 전송
      console.log('Quiz results submitted successfully');
      setQuizCompleted(true); // 퀴즈 완료 상태 설정
    } catch (error) {
      console.error('Error submitting quiz results:', error);
    }
  };

  return (
    <Container className="mt-4">
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
              {quizData.quiz[currentQuestion][0].eng || quizData.quiz[currentQuestion][0].kor}
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
                {option.eng || option.kor}
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
    </Container>
  );
};

export default QuizComponent;
