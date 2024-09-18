import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const QuizResults = ({ results }) => {
  // Default empty object and array to avoid undefined errors
  const {
    scoreMap = {},
    scoreEng = 0,
    scoreKor = 0,
    scoreSen = 'N/A',
    grade = 'N/A',
    mistakes = [],
  } = results || {}; // Ensure results is defined

  // Debug: Log the results to verify data structure
  console.log('Quiz Results:', results);

  return (
    <Container className="mt-4">
      <Row>
        {/* Display Scores */}
        <Col md={6}>
          <div style={styles.card}>
            <div style={styles.cardHeader}>My Scores</div>
            <div style={styles.cardBody}>
              <ul style={styles.list}>
                <li style={styles.scoreItem}>
                  <strong>English Score:</strong> {scoreEng}
                </li>
                <li style={styles.scoreItem}>
                  <strong>Korean Score:</strong> {scoreKor}
                </li>
                <li style={styles.scoreItem}>
                  <strong>Sentence Score:</strong> {scoreSen}
                </li>
                <li style={styles.scoreItem}>
                  <strong>Grade:</strong> <span style={styles.grade}>{grade}</span>
                </li>
                {Object.keys(scoreMap).length > 0 && (
                  <li style={styles.scoreItem}>
                    <strong>Korean Map Score:</strong>
                    <ul style={styles.nestedList}>
                      {Object.keys(scoreMap).map((key) => (
                        <li key={key}>
                          <strong>{key}:</strong> {scoreMap[key]}
                        </li>
                      ))}
                    </ul>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </Col>

        {/* Display Mistakes */}
        <Col md={6}>
          <div style={styles.card}>
            <div style={styles.cardHeader}>Mistakes</div>
            <div style={styles.cardBody}>
              {mistakes.length > 0 ? (
                <ul style={styles.list}>
                  {mistakes.map((mistake) => (
                    <li key={mistake.id} style={styles.mistakeItem}>
                      <strong>English:</strong> {mistake.eng} - <strong>Korean:</strong> {mistake.kor}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No mistakes recorded.</p>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

// Define custom styles for the card
const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
    padding: '10px'
  },
  cardHeader: {
    backgroundColor: '#f7f7f7',
    borderBottom: '1px solid #ddd',
    padding: '10px',
    fontSize: '1.25rem',
    fontWeight: 'bold',
    borderTopLeftRadius: '4px',
    borderTopRightRadius: '4px'
  },
  cardBody: {
    padding: '10px'
  },
  list: {
    listStyleType: 'none',
    padding: '0'
  },
  scoreItem: {
    marginBottom: '10px',
    fontSize: '1rem'
  },
  nestedList: {
    listStyleType: 'none',
    padding: '0',
    margin: '0'
  },
  mistakeItem: {
    marginBottom: '10px',
    fontSize: '1rem'
  },
  grade: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#007bff' // Highlight color for grade
  }
};

export default QuizResults;
