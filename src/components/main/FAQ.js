import React, { useState } from 'react';


const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      question: "How can I bookmark words?",
      answer: "You can bookmark words by clicking the star icon next to each word card."
    },
    {
      question: "How do I switch between English and Korean?",
      answer: "Click on the word card to toggle between English and Korean translations."
    },
    {
      question: "Can I view only bookmarked words?",
      answer: "Yes, use the filter option in the top-left corner to view only your bookmarked words."
    },
    {
      question: "How does the quiz work?",
      answer: "Each quiz question presents a word in either English or Korean, and you need to choose the correct translation from four options."
    },
    {
      question: "How is my quiz score calculated?",
      answer: `There are three types of quizzes: English, Korean, and Sentence (Fill-in-the-Blank).
      You must complete both the English and Korean quizzes to receive a grade from A to D.
      The Sentence quiz will be unlocked only after you've completed both the English and Korean quizzes.
      Completing the Sentence quiz will add bonus points to your final grade.
      Your progress is measured based on achieving a perfect score in all three quizzes, with the total progress being calculated as a percentage out of 100.`
    },
    {
      question: "How can I reset my progress?",
      answer: "You can reset your learning progress in the settings menu."
    }
  ];
  
  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h2 className='main-text'>Frequently Asked Questions</h2>
      <div className="faq-list" style={{marginTop:'20px'}}>
        {faqData.map((faq, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question" onClick={() => handleToggle(index)}>
              {faq.question}
            </div>
            {activeIndex === index && (
              <div className="faq-answer">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
