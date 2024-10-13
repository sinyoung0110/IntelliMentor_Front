import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { FaLongArrowAltRight } from "react-icons/fa";
import { useSelector } from 'react-redux'; // 로그인 상태 확인을 위한 useSelector import

const StudyComponent = () => {
    const loginState = useSelector(state => state.loginSlice); // 로그인 상태 가져오기

    const studyGroups = [
        {
            name: "영어 회화 모임",
            description: "매주 화요일, 원어민과 함께하는 영어 회화 연습."
        },
        {
            name: "문법 스터디",
            description: "매주 목요일, 영어 문법을 함께 공부하는 그룹."
        },
        {
            name: "어휘 확장 그룹",
            description: "매주 금요일, 새로운 단어와 표현을 배우는 모임."
        }
    ];

    // 로그인 버튼 클릭 시 처리할 함수
    const handleLogin = () => {
        console.log("로그인 버튼 클릭");
        // 로그인 페이지로 이동하거나, 로그인 처리 로직 추가
    };

    return (
        <div
            className="commonContainer"
            style={{
                backgroundColor: '#F7F9F8',
                color: '#000000',
                position: 'relative',
                minHeight: '400px', // 최소 높이 설정
                maxHeight: '600px', // 최대 높이 설정
                overflowY: 'auto', // 내용이 길면 스크롤 가능
                padding: '20px',
                borderRadius: '10px'
            }}
        >
            <div className="col p-4 d-flex flex-column position-static">
                <h1>Study</h1>
                <strong className="text-success-emphasis">나의 스터디 그룹</strong>

                {/* 로그인 여부에 따라 스터디 그룹 또는 로그인 요청 메시지 표시 */}
                {loginState.email ? (
                    <ListGroup className="mt-3" style={{ backgroundColor: '#F7F9F8', borderRadius: '8px' }}>
                        {studyGroups.map((group, index) => (
                            <ListGroup.Item 
                                key={index} 
                                className="d-flex justify-content-between align-items-center" 
                                style={{ border: '1px solid #E0E0E0', borderRadius: '8px', marginBottom: '10px' }}
                            >
                                <div>
                                    <h5>{group.name}</h5>
                                    <p>{group.description}</p>
                                </div>
                                <button 
                                    className="btn" 
                                    style={{ backgroundColor: '#8FB299', color: '#FFFFFF', border: 'none' }}
                                >
                                   <FaLongArrowAltRight />
                                </button>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                ) : (
                    // 로그인되지 않았을 때 표시할 메시지
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
                        onClick={handleLogin} // 클릭 시 로그인 함수 실행
                    >
                        로그인이 필요합니다. 로그인을 해주세요.
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudyComponent;
