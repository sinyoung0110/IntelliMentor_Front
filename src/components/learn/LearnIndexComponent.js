import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import DaySelector from './DaySelector';
import VocabularyList from './VocabularyList';
import ProgressBarComponent from './ProgressBarComponent';
import { readVocabulary } from '../../api/learnApi';
import { useLocation, useNavigate } from 'react-router-dom';

const LearnIndexComponent = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const titleId = queryParams.get('titleId');
    const [selectedDay, setSelectedDay] = useState('Day1');
    const sectionNumber = parseInt(selectedDay.replace('Day', ''), 10);
    const [vocabularyData, setVocabularyData] = useState(null);
    const [grades, setGrades] = useState([]);
    const [sectionId, setSectionId] = useState(null);
    const [topRecord, setTopRecord] = useState(0);
    const [total, setTotal] = useState(0);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await readVocabulary(titleId);
                if (data && data.data) {
                    setVocabularyData(data);

                    const matchingSection = data.data.find(section => section.section.section === sectionNumber);

                    if (matchingSection) {
                        const { section, wordList } = matchingSection;
                        setSectionId(section.id);
                        setTopRecord(section.progress);
                        setTotal(wordList.length * 3);
                        setProgress((section.progress / (wordList.length * 3)) * 100);
                    } else {
                        console.error(`No matching sectionId for sectionNumber: ${sectionNumber}`);
                    }
                } else {
                    console.error('Section data is missing from the API response.');
                }
            } catch (error) {
                console.error('Error fetching vocabulary data:', error);
                setError('문제 발생: 단어장 데이터를 불러오는 중 오류가 발생했습니다.');
            }
        };

        if (titleId) {
            fetchData();
        }
    }, [titleId, sectionNumber]);

    const handleQuizCreation = () => {
        if (sectionId) {
            navigate(`/learn/chooseQuiz?titleId=${titleId}&sectionId=${sectionId}`);
        } else {
            console.error('sectionId is undefined.');
        }
    };

    const handleLearnCreation = () => {
        navigate(`/learn/card?titleId=${titleId}&sectionNumber=${sectionNumber}&sectionId=${sectionId}`);
    };

    return (
        <Container fluid>
            <Row>
                <Col className="vocabulary-list-container">
                    <DaySelector 
                        selectedDay={selectedDay} 
                        setSelectedDay={setSelectedDay} 
                        section={vocabularyData?.sectionMax || 0}
                        grades={grades}
                    />
                    {error ? (
                        <div>{error}</div>
                    ) : vocabularyData ? (
                        <VocabularyList sectionNumber={sectionNumber} vocabularyData={vocabularyData} />
                    ) : (
                        <div>Loading...</div>
                    )}
                    <div className="bottom-controls">
                        <ProgressBarComponent 
                            progress={progress}
                            topRecord={topRecord}
                            total={total}
                            className="custom-progress-bar" 
                        />
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
