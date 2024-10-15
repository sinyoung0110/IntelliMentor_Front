import React, { useState } from 'react';
import { PiPencilSimpleLineDuotone, PiLegoSmileyDuotone } from "react-icons/pi";
import { Container, Button, Row, Col, Modal } from 'react-bootstrap';
import AiAddComponent from './AiAddComponent'; // AiAddComponent 임포트
import { useNavigate } from 'react-router-dom';
const ChooseAddComponent = () => {
  const [showAiModal, setShowAiModal] = useState(false); // 모달 상태 관리
  const navigate = useNavigate();


  const handleDirectAdd = () => {
    navigate('/voca/directAdd');

  };

  const handleAiAdd = () => {
    setShowAiModal(true); // 모달 열기
  };

  const handleCloseAiModal = () => {
    setShowAiModal(false); // 모달 닫기
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
        

        <Button type="button" className="choose-button" onClick={handleAiAdd}>
          <PiLegoSmileyDuotone color="#8FB299" />
          ai 생성
        </Button>
      </div>

      {/* AI 생성 모달 */}
      <Modal show={showAiModal} onHide={handleCloseAiModal} centered>
        <Modal.Header closeButton>
          <Modal.Title className='main-text  w-100 text-center'>AI 생성</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AiAddComponent />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAiModal}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ChooseAddComponent;
