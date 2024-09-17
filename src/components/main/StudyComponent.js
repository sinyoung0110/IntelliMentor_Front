import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { FaLongArrowAltRight } from "react-icons/fa";

const StudyComponent = () => {
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

    return (
        <div className="commonContainer" style={{ backgroundColor: '#F7F9F8', color: '#000000' }}>
            <div className="col p-4 d-flex flex-column position-static">
                <h1>Study</h1>
                <strong className="text-success-emphasis">나의 스터디 그룹</strong>
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
            </div>
        </div>
    );
}

export default StudyComponent;
