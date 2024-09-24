import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { updateBookmark } from '../../api/learnApi';
import { useNavigate, useParams } from 'react-router-dom';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

const QuizResults = ({ results }) => {
  const navigate = useNavigate();
  const { sectionId, titleId } = useParams();
  
  const {
    countMap = {},
    progress = 0,
    vocaCount = 0,
    grade = 'N/A',
    mistakes = [],
  } = results || {};

  const [bookmarkStatus, setBookmarkStatus] = useState(
    mistakes.reduce((acc, mistake) => ({ ...acc, [mistake.id]: false }), {})
  );

  const handleBookmarkToggle = async (wordId) => {
    try {
      setBookmarkStatus((prevStatus) => ({
        ...prevStatus,
        [wordId]: !prevStatus[wordId],
      }));
      await updateBookmark(wordId);
    } catch (error) {
      console.error('Failed to update bookmark', error);
    }
  };

  const handleRetryQuiz = () => {
    navigate(-1);
  };

  const handleGoToList = () => {
    navigate(`/learn/index?titleId=${titleId}&sectionId=${sectionId}`);
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={6}>
          <div style={{...styles.card, backgroundColor:'#F7F9F8', border:'solid 1px #ddd'}}>
            <div style={styles.cardHeader}>
              오답 단어
            </div>
            <div style={styles.cardBody}>
              <ul style={styles.list}>
                {mistakes.map((mistake) => (
                  <li key={mistake.id} style={styles.mistakeItem}>
                    <span>{mistake.eng} - {mistake.kor}</span>
                    <span
                      style={styles.bookmarkIcon}
                      onClick={() => handleBookmarkToggle(mistake.id)}
                    >
                      {bookmarkStatus[mistake.id] ? (
                        <FaStar color="gold" />
                      ) : (
                        <FaRegStar />
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Col>
        <Col md={6}>
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              퀴즈 결과
              {results && (
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip
                      id={`tooltip-top`}
                      style={styles.customTooltip}
                    >
                      A : 90% 
                      B : 80% 
                      C : 65% 
                      D : 40% 
                      F : 40% 
                    </Tooltip>
                  }
                >
                  <span style={styles.infoIcon}>?</span>
                </OverlayTrigger>
              )}
            </div>
            <div style={styles.progress}>
                {progress} / {vocaCount * 3}
              </div>
            <div style={styles.gradeContainer}>
              
              <div style={styles.grade}>
                {grade}
              </div>
            </div>
            <div className='text-end'>
              <div style={styles.score}>
                English: {countMap.e} / {vocaCount}
              </div>
              <div style={styles.score}>
                Korean: {countMap.k} / {vocaCount}
              </div>
              <div style={styles.score}>
                Sentence: {countMap.s} / {vocaCount}
              </div>
            </div>
          </div>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col className='text-end'>
          <Button className='quiz-button learning' onClick={handleRetryQuiz}>
            다시 풀기
          </Button>
          <Button className='quiz-button ms-2' onClick={handleGoToList}>
            목록으로
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

// 스타일 정의
const styles = {
  card: {
    border:'1px solid #ddd',
    borderRadius: '20px',
    padding: '50px',
    height: '100%',
  },
  cardHeader: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '20px',   
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoIcon: {
    marginLeft: '10px',
    cursor: 'pointer',
    fontSize: '1.2rem',
    color: '#8FB299', // 아이콘 색상
  },
  customTooltip: {
    backgroundColor: '#8FB299', // 툴팁 배경을 녹색으로 변경
    color: '#fff', // 텍스트 색상을 흰색으로 설정
    borderRadius: '8px',
    padding: '5px 10px',
    fontSize: '0.9rem',
  },
  gradeContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  grade: {
    fontSize: '15rem',
    color: '#333',
    marginTop:'-30px',
    marginBottom:'-30px',
  },
  progress: {
    fontSize: '2.0rem',
    color: '#333',
    fontWeight: 'bold',
  },
  list: {
    listStyleType: 'none',
    padding: '0',
    maxHeight: '300px',
    overflowY: 'auto',
  },
  mistakeItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 0',
    fontSize: '1.2rem',
    borderBottom: '1px solid #eee',
  },
  bookmarkIcon: {
    cursor: 'pointer',
  },
  score: {
    fontSize: '1.0rem',
    fontWeight: 'bold',
    color: '#333',
  }
};

export default QuizResults;
