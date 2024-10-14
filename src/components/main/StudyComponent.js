import React, { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { FaLongArrowAltRight } from "react-icons/fa";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';

const StudyComponent = () => {
    const loginState = useSelector(state => state.loginSlice);
    const [showModal, setShowModal] = useState(false); // 모달 상태 관리

    const studyGroups = [
        { name: "영어 회화 모임", description: "매주 화요일, 원어민과 함께하는 영어 회화 연습." },
        { name: "문법 스터디", description: "매주 목요일, 영어 문법을 함께 공부하는 그룹." },
        { name: "어휘 확장 그룹", description: "매주 금요일, 새로운 단어와 표현을 배우는 모임." }
    ];

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleLogin = () => {
        console.log("로그인 버튼 클릭");
    };

    return (
        <div
            className="commonContainer"
            style={{
                backgroundColor: '#F7F9F8',
                color: '#000000',
                position: 'relative',
                minHeight: '400px',
                maxHeight: '600px',
                overflowY: 'auto',
                padding: '20px',
                borderRadius: '10px'
            }}
        >
            <div className="col p-4 d-flex flex-column position-static">
                <h1>Study</h1>
                <strong className="text-primary-emphasis">나의 스터디 그룹</strong>

                {loginState.email ? (
                    <ListGroup className="mt-3" style={{ backgroundColor: '#F7F9F8', borderRadius: '8px' }}>
                        {studyGroups.map((group, index) => (
                            <ListGroup.Item 
                                key={index} 
                                className="d-flex justify-content-between align-items-center" 
                                style={{ border: '1px solid #E0E0E0', borderRadius: '8px', padding:'11px',marginTop: '20px' }}
                            >
                                <div>
                                    <h5>{group.name}</h5>
                                    <p>{group.description}</p>
                                </div>
                                <button 
                                    className="btn" 
                                    style={{ backgroundColor: '#8FB299', color: '#FFFFFF', border: 'none' }}
                                    onClick={handleShowModal} // 모달 띄우기
                                >
                                   <FaLongArrowAltRight />
                                </button>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                ) : (
                    <div
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            zIndex: 10,
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            padding: '20px',
                            borderRadius: '10px',
                            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                            color: '#8FB299',
                            fontSize: '20px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                        }}
                        onClick={handleLogin}
                    >
                        로그인이 필요합니다. 로그인을 해주세요.
                    </div>
                )}
            </div>

            {/* 모달 컴포넌트 */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>개발 중</Modal.Title>
                </Modal.Header>
                <Modal.Body>해당 스터디는 현재 개발 중입니다. 곧 제공될 예정입니다!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        닫기
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default StudyComponent;
