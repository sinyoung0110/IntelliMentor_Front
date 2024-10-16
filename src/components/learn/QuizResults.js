import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { updateBookmark } from '../../api/learnApi';
import { useNavigate, useParams } from 'react-router-dom';

const QuizResults = ({ results }) => {
  const navigate = useNavigate();
  const { sectionId, titleId } = useParams();

  const {
    countEng=0,
    countKor=0,
    countSen=0,
    progress = 0,
    vocaCount = 0,
    grade = 'N/A',
    mistakes = [],
  } = results || {};

  const [bookmarkStatus, setBookmarkStatus] = useState({});

  useEffect(() => {
    if (results) {
      const initialBookmarkStatus = mistakes.reduce((acc, mistake) => {
        acc[mistake.id] = mistake.bookmark || false;
        return acc;
      }, {});
      setBookmarkStatus(initialBookmarkStatus);
    }
  }, [results, mistakes]);

  const handleBookmarkToggle = async (wordId) => {
    try {
      const currentStatus = bookmarkStatus[wordId];
      const newStatus = !currentStatus;

      setBookmarkStatus((prevStatus) => ({
        ...prevStatus,
        [wordId]: newStatus,
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
          <div style={{ ...styles.card, backgroundColor: '#F7F9F8', border: 'solid 1px #ddd' }}>
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
        <Col md={6}>
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              퀴즈 결과
              {results && (
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip styleName="tooltip">
                      A : 90% <br/>
                      B : 80% <br/>
                      C : 65% <br/>
                      D : 40% <br/>
                      F : Others
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
              <div style={styles.grade}>{grade}</div>
            </div>
            <div className="text-end">
              <div style={styles.score}>
                English: {countEng} / {vocaCount}
              </div>
              <div style={styles.score}>
                Korean: {countKor} / {vocaCount}
              </div>
              <div style={styles.score}>
                Sentence: {countSen} / {vocaCount}<br/>
                <span style={{color: '#bbb'}}>To get a "+", you need to check the sentence.</span>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col className="text-end">
          <Button className="quiz-button learning" onClick={handleRetryQuiz}>
            다시 풀기
          </Button>
          <Button className="quiz-button ms-2" onClick={handleGoToList}>
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
    border: '1px solid #ddd',
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
    color: '#8FB299',
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
    marginTop: '-30px',
    marginBottom: '-30px',
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
  },
};

export default QuizResults;
