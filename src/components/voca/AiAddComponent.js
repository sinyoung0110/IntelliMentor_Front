import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { aiAdd } from '../../api/vocaApi'; // aiAdd 함수 임포트
import { useNavigate } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader'; // ClipLoader 임포트


const AiAddComponent = () => {
  const [title, setTitle] = useState(''); // 단어장 제목
  const [subject, setSubject] = useState(''); // AI 생성 주제
  const [count, setCount] = useState(1); // 단어 개수 (기본값 1로 설정)
  const [level, setLevel] = useState('상'); // 난이도 (기본값 '상'으로 설정)
  const [loading, setLoading] = useState(false); // 로딩 상태
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // 폼 제출 시 페이지 리로드 방지
    if (!title || !subject || count < 1) {
      alert('모든 필드를 올바르게 입력하세요.');
      return;
    }

    setLoading(true); // 로딩 시작

    try {
      const response = await aiAdd(title, subject, count, level); // level 추가
      console.log('서버 응답:', response); // 서버 응답 확인
      navigate('/voca/list');
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error);
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  const handleCountChange = (e) => {
    const value = Number(e.target.value);
    // count가 1보다 작으면 1로 설정, 그렇지 않으면 입력값으로 설정
    setCount(value < 1 ? 1 : value);
  };

  // 로딩 상태일 때 스피너와 메시지 표시
  if (loading) {
    return (
      <div className="spinner-container">
        <ClipLoader color="#8FB299" size={60} />
        <p>단어장 만드는 중..</p>
      </div>
    );
  }

  return (
    <Container className="ai-container">
      <form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col>
            <div className="input-container">
              <label className="input-label">단어장 제목</label>
              <input
                type="text"
                placeholder="제목을 입력하세요."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input-field"
                required // 필수 입력
              />
            </div>
          </Col>
        </Row>
        {/* 주제 입력 */}
        <Row className="mb-3">
          <Col>
            <div className="input-container">
              <label className="input-label">단어장 주제</label>
              <input
                type="text"
                placeholder="주제를 입력하세요."
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="input-field"
                required // 필수 입력
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
                onChange={handleCountChange} // 수정된 함수 사용
                className="input-field"
                required // 필수 입력
              />
            </div>
          </Col>
        </Row>
        {/* 난이도 선택 */}
        <Row className="mb-3">
          <Col>
            <div className="input-container">
              <label className="input-label">난이도 선택</label>
              <div>
                <label>
                  <input
                    type="radio"
                    value="상"
                    checked={level === '상'}
                    onChange={(e) => setLevel(e.target.value)}
                  />
                   상
                </label>
                <label className="ml-3">
                  <input
                    type="radio"
                    value="중"
                    checked={level === '중'}
                    onChange={(e) => setLevel(e.target.value)}
                  />
                   중
                </label>
                <label className="ml-3">
                  <input
                    type="radio"
                    value="하"
                    checked={level === '하'}
                    onChange={(e) => setLevel(e.target.value)}
                  />
                  하
                </label>
              </div>
            </div>
          </Col>
        </Row>
        <Button type="submit" className="add-button">
          추가
        </Button>
      </form>
    </Container>
  );
};

export default AiAddComponent;
