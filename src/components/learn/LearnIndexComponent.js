import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import DaySelector from './DaySelector';
import VocabularyList from './VocabularyList';
import { readVocabulary } from '../../api/learnApi';
import ProgressBarComponent from './ProgressBarComponent';
import { useLocation, useNavigate } from 'react-router-dom';

const LearnIndexComponent = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const titleId = queryParams.get('titleId');

    const [selectedDay, setSelectedDay] = useState('Day1');
    const [vocabularyData, setVocabularyData] = useState(null);
    const [grades, setGrades] = useState([]);
    const [sectionData, setSectionData] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await readVocabulary(titleId);
                setVocabularyData(data);
                setSectionData(data.vocaSectionDTOs); // 수정된 데이터 구조에 맞게 설정
                setGrades(data.vocaSectionDTOs.map(section => section.grade)); // 성적 저장
            } catch (error) {
                console.error('Error fetching vocabulary data:', error);
            }
        };

        if (titleId) {
            fetchData();
        }
    }, [titleId]);

    const maxSection = sectionData.length;

    const handleDayChange = (day) => {
        setSelectedDay(day);
    };

    const currentSection = sectionData.find(section => section.section === parseInt(selectedDay.replace('Day', ''), 10));

    const handleQuizCreation = () => {
        if (currentSection) {
            navigate(`/learn/chooseQuiz?titleId=${titleId}&sectionId=${currentSection.sectionId}`);
        } else {
            console.error('sectionId is undefined.');
        }
    };

    const handleLearnCreation = () => {
        if (currentSection) {
            navigate(`/learn/card?titleId=${titleId}&sectionNumber=${currentSection.section}&sectionId=${currentSection.sectionId}`);
        }
    };

    const totalSections = currentSection ? currentSection.vocaItemDTOS.length * 3 : 0; // 단어 수 * 3
    const progress = currentSection ? currentSection.progress : 0; // progress 값

    return (
        <Container fluid>
            <Row>
                <Col className="vocabulary-list-container">
                    <DaySelector 
                        selectedDay={selectedDay} 
                        setSelectedDay={handleDayChange} 
                        section={maxSection}
                        grades={grades}
                    />
                    {currentSection ? (
                        <VocabularyList sectionNumber={currentSection.section} vocabularyData={currentSection} />
                    ) : (
                        <div>Loading...</div>
                    )}
                    <div className="bottom-controls">
                        <ProgressBarComponent progress={progress} total={totalSections} /> 
                        <div className="dash-button-container">
                            <button onClick={handleLearnCreation} className="quiz-button learning">
                                학습하기
                            </button>
                            <button onClick={handleQuizCreation} className="quiz-button">
                                퀴즈풀기
                            </button>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default LearnIndexComponent;
