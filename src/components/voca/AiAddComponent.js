import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';


const AiAddComponent = () => {
  const [subject, setSubject] = useState('');
  const [count, setCount] = useState(1); // 기본값 1로 설정

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기에 API 호출 코드를 추가합니다.
    console.log('Subject:', subject);
    console.log('Count:', count);
  };

  return (
    <Container className="mt-4">
      <form onSubmit={handleSubmit}>
        {/* 주제 입력 */}
        <Row className="mb-3">
          <Col>
            <div className="input-container">
              <label className="input-label">주제를 입력하세요</label>
              <input
                type="text"
                placeholder="_______"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="input-field"
              />
            </div>
          </Col>
        </Row>
        {/* 단어 개수 입력 */}
        <Row className="mb-3">
          <Col>
            <div className="input-container">
              <label className="input-label">단어 개수</label>
              <input
                type="number"
                min="1"
                max="200"
                value={count}
                onChange={(e) => setCount(e.target.value)}
                className="input-field"
              />
            </div>
          </Col>
        </Row>
        <Button type="submit" className="add-button">추가</Button>
      </form>
    </Container>
  );
};

export default AiAddComponent;
