import React from 'react';
import { Container, Row, Col, Table, Card } from 'react-bootstrap';

const QuizResults = ({ results }) => {
  const { scoreMap, scoreEng, scoreKor, scoreSen, grade, mistakes } = results;

  return (
    <Container className="mt-4">
      <Row>
        {/* Left Column: Mistakes */}
        <Col md={6}>
          <h3>오답 단어</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>영어</th>
                <th>한국어</th>
              </tr>
            </thead>
            <tbody>
              {mistakes.length > 0 ? (
                mistakes.map((word, index) => (
                  <tr key={word.id}>
                    <td>{index + 1}</td>
                    <td>{word.eng}</td>
                    <td>{word.kor}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center">
                    오답이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>

        {/* Right Column: Scores & Rank */}
        <Col md={6}>
          <h3>나의 랭크</h3>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>성적: {grade}</Card.Title>
              <Card.Text>
                <strong>English 점수: </strong> {scoreMap.e} <br />
                <strong>Korean 점수: </strong> {scoreMap.k}
              </Card.Text>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <Card.Title>저장된 점수</Card.Title>
              <Card.Text>
                <strong>영어 점수 (scoreEng):</strong> {scoreEng} <br />
                <strong>한국어 점수 (scoreKor):</strong> {scoreKor} <br />
                <strong>문장 점수 (scoreSen):</strong> {scoreSen}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default QuizResults;
