import React from 'react';
import { MdOutlineArrowForward,MdOutlineQuestionMark } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { Container, Button, Row, Col } from 'react-bootstrap';

const ChooseQuiz = () => {
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
          <div className="arrow-container">
            <span>A</span>
            <MdOutlineArrowForward color="#8FB299"/>
            <span>가</span>
            </div>
            영어 - 한글
          </Button>
          <Button type="button" className="choose-button" onClick={handleRecommendAdd}>
          <div className="arrow-container">
            <span>가</span>
            <MdOutlineArrowForward color="#8FB299"/>
            <span>A</span>
            </div>
            한글 - 영어
          </Button>
          <Button type="button" className="choose-button " onClick={handleAiAdd}>
          <MdOutlineQuestionMark color="#8FB299" />
            빈칸 맞추기
          </Button>
        </div>
    </Container>
  );
};

export default ChooseQuiz;
