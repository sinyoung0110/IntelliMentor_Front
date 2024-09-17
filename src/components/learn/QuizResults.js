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

  return (
    <Container className="mt-4">
      <Row>
        {/* Display Scores */}
        <Col md={6}>
          <div style={styles.card}>
            <div style={styles.cardHeader}>My Scores</div>
            <div style={styles.cardBody}>
              <ul style={styles.list}>
                <li>English Score: {scoreEng}</li>
                <li>Korean Score: {scoreKor}</li>
                <li>Sentence Score: {scoreSen}</li>
                <li>Grade: {grade}</li>
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
                    <li key={mistake.id}>
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
  }
};

export default QuizResults;
