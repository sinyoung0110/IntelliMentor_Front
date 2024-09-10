import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import DaySelector from './DaySelector';
import VocabularyList from './VocabularyList';
import { readVocabulary } from '../../api/learnApi';
import ProgressBarComponent from './ProgressBarComponent'
import { useLocation,useNavigate } from 'react-router-dom';

const LearnIndexComponent = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const titleId = queryParams.get('titleId'); // 쿼리 파라미터에서 titleId 가져옴

    const [selectedDay, setSelectedDay] = useState('Day1');
    const sectionNumber = parseInt(selectedDay.replace('Day', ''), 10);
    const [vocabularyData, setVocabularyData] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await readVocabulary(titleId);
                setVocabularyData(data);
            } catch (error) {
                console.error('Error fetching vocabulary data:', error);
            }
        };

        if (titleId) {
            fetchData();
        }
    }, [titleId]);

    const maxSection = vocabularyData?.maxSection || 0;

    const handleQuizCreation = () => {
          // Logic to create quiz
    };
    const handleLearnCreation = () => {
        navigate(`/learn/card?titleId=${titleId}&sectionNumber=${sectionNumber}`);
    };



    return (
        <Container fluid>
            <Row>
                <Col className="vocabulary-list-container">
                    <DaySelector 
                        selectedDay={selectedDay} 
                        setSelectedDay={setSelectedDay} 
                        section={maxSection}
                    />
                    {vocabularyData ? (
                        <VocabularyList sectionNumber={sectionNumber} vocabularyData={vocabularyData} />
                    ) : (
                        <div>Loading...</div>
                    )}
                   <div className="bottom-controls">
                    <ProgressBarComponent className="custom-progress-bar" />
                    <div className="quiz-button-container">
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
