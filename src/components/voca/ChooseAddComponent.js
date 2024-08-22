import React from 'react';
import { PiPencilSimpleLineDuotone, PiSmileyDuotone, PiLegoSmileyDuotone } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';
import { Container, Button, Row, Col } from 'react-bootstrap';

const ChooseAddComponent = () => {
  const navigate = useNavigate();

  const handleDirectAdd = () => {
    navigate('/voca/directAdd');
  };

  const handleRecommendAdd = () => {
    navigate('/voca/recommendAdd');
  };

  const handleAiAdd = () => {
    navigate('/voca/aiAdd');
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-center mb-4">
        <Col xs="auto">
        <h2 className="main-text">VOCA CREATE</h2>
        </Col>
      </Row>
      
        <div className="choose-container">
          <Button type="button" className="choose-button" onClick={handleDirectAdd}>
          <PiPencilSimpleLineDuotone color="#8FB299" />
            직접 생성
          </Button>
          <Button type="button" className="choose-button" onClick={handleRecommendAdd}>
          <PiSmileyDuotone color="#8FB299" />
            사용자 추천
          </Button>
          <Button type="button" className="choose-button" onClick={handleAiAdd}>
          <PiLegoSmileyDuotone color="#8FB299" />
            ai 생성
          </Button>
        </div>
    </Container>
  );
};

export default ChooseAddComponent;
