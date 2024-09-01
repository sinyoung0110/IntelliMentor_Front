import React from 'react';

const QuizButton = () => {
  const handleQuizCreation = () => {
    // Logic to create quiz
  };

  return (
    <div className="quiz-button-container">
      <button onClick={handleQuizCreation} className="quiz-button">
        퀴즈 생성
      </button>
    </div>
  );
};

export default QuizButton;
