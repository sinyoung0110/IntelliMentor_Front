import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { updateBookmark } from '../../api/learnApi';
import { useNavigate, useParams } from 'react-router-dom';

const QuizResults = ({ results }) => {
  const navigate = useNavigate();
  const { sectionId, titleId } = useParams();
  
  const {
    countMap = {},
    progress = 0,
    vocaCount = 0,
    countEng = 0,
    countKor = 0,
    countSen = 0,
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
          <div style={styles.card}>
            <div style={styles.cardHeader}>퀴즈 결과</div>
            <div style={styles.gradeContainer}>
              <div style={styles.score}>
                영어 틀린 횟수: {countMap.e} / {vocaCount}
              </div>
              <div style={styles.score}>
                한국어 틀린 횟수: {countMap.k} / {vocaCount}
              </div>
              <div style={styles.score}>
                문장 틀린 횟수: {countMap.s} / {vocaCount}
              </div>
              <div style={styles.grade}>
                등급: {grade}
              </div>
              <div style={styles.progress}>
                진행률: {progress}%
              </div>
            </div>
          </div>
        </Col>

        <Col md={6}>
          <div style={styles.card}>
            <div style={styles.cardHeader}>오답 단어</div>
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
      </Row>

      <Row className="mt-4">
        <Col md={6} className="text-center">
          <Button variant="secondary" onClick={handleRetryQuiz} style={styles.button}>
            다시 풀기
          </Button>
        </Col>
        <Col md={6} className="text-center">
          <Button variant="primary" onClick={handleGoToList} style={styles.button}>
            목록으로 가기
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

// 스타일 정의
const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    height: '100%',
  },
  cardHeader: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  gradeContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1.2rem',
    flexDirection: 'column',
  },
  grade: {
    fontSize: '2rem',
    marginTop: '10px',
    color: '#333',
  },
  progress: {
    fontSize: '1.2rem',
    color: '#333',
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
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#333',
  },
  button: {
    width: '100%',
    padding: '10px 0',
    fontSize: '1.2rem',
  },
};

export default QuizResults;
