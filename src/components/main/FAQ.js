import React, { useState } from 'react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      question: "첫 페이지의 오늘의 단어는 어떤 기준으로 표시되나요?",
      answer: "틀린 기록이 한 번이라도 있는 단어 위주로 표시됩니다.<br />틀린 횟수가 많을수록 해당 단어가 더 자주 노출될 수 있습니다."
    },
    {
      question: "출석 체크 기준은 무엇인가요?",
      answer: `로그인 시 자동으로 출석 체크가 됩니다.<br />
      - 매일 자정 1분 전(23:59)까지 로그인해야 해당 날의 출석이 인정됩니다.<br />
      - 자정 1분 전까지 로그인 기록이 없으면 그날은 출석 실패로 처리됩니다.<br />
      - 출석 체크는 일주일 단위로 관리되며, 매주 월요일에 초기화됩니다.`
    },
    {
      question: "Quiz 결과의 학점은 어떻게 매겨지나요?",
      answer: `학점은 A, B, C, D, F로 구분되며, 영어와 한글 점수의 합산으로 결정됩니다.<br />
      - A: 최대 점수의 90% 이상<br />
      - B: 최대 점수의 80% 이상<br />
      - C: 최대 점수의 65% 이상<br />
      - D: 최대 점수의 45% 이상<br />
      - F: 그 외 점수<br />
      Sentence 점수에 따라 학점에 "+"가 추가될 수 있습니다.<br />
      - 예: A 학점일 때 Sentence 점수가 90% 이상이면 A+ 학점이 부여됩니다.`
    },
    {
      question: "섹션을 최대보다 더 많이 설정할 수 있나요?",
      answer: "불가능합니다. 학습 기능에 포함된 퀴즈 기능이 정상적으로 작동하려면 섹션 수가 정해진 최대치를 초과할 수 없습니다."
    },
    {
      question: "단어장을 삭제하고 싶어요.",
      answer: "단어장 Edit 화면에 들어가서 삭제할 수 있습니다."
    },
    {
      question: "섹션을 다시 설정할 수 있나요?",
      answer: "단어장을 임의로 수정하면 학습 기록이 초기화됩니다. 해당 기능은 “학습 초기화” 버튼을 통해 초기화할 수 있도록 개발 예정입니다."
    },
    {
      question: "학습 진행 중에 오타를 발견했어요.",
      answer: "단어에 오타가 있을 경우 문장 퀴즈에 차질이 생길 수 있습니다. 추후 단어장 생성 시 오타 점검 기능을 개발할 예정입니다."
    }
  ];

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h2 className='main-text mb-5'>Frequently Asked Questions</h2>
      <div className="faq-list" style={{ marginTop: '20px' }}>
        {faqData.map((faq, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question" onClick={() => handleToggle(index)}>
              {faq.question}
            </div>
            {activeIndex === index && (
              <div className="faq-answer" dangerouslySetInnerHTML={{ __html: faq.answer }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
