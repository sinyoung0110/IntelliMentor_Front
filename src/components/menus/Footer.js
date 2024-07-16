import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-5 p-4">
      <Container>
        <Row>
          <Col md="4">
            <h5>About Us</h5>
            <p>
              학습 도구와 플랫폼으로, 사용자가 플래시카드, 테스트, 학습 게임 등을 통해 다양한 주제를 공부할 수 있게 해줍니다. 
            </p>
            <p>
              IntelliMentor을 통해 학생들은 단어, 개념, 정의 등을 효과적으로 외울 수 있으며, 퀴즈와 테스트를 통해 학습한 내용을 확인할 수 있습니다
            </p>
          </Col>
          <Col md="4">
            <h5>Contact</h5>
            <p>
              Email: example@example.com<br />
              Phone: +123 456 7890
            </p>
          </Col>
          <Col md="4">
            <h5>Follow Us</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-white">Facebook</a>
              </li>
              <li>
                <a href="#" className="text-white">Twitter</a>
              </li>
              <li>
                <a href="#" className="text-white">Instagram</a>
              </li>
            </ul>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="text-center">
            <p className="mb-0">&copy; 2024 Your Company. All Rights Reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
