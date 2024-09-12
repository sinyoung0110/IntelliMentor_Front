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
    const titleId = queryParams.get('titleId'); // 쿼리 파라미터에서 titleId 가져옴

    const [selectedDay, setSelectedDay] = useState('Day1');
    const sectionNumber = parseInt(selectedDay.replace('Day', ''), 10);
    const [vocabularyData, setVocabularyData] = useState(null);
    const [grades, setGrades] = useState([]); // 성적 데이터를 위한 상태 추가
    const [sectionId, setSectionId] = useState(null); // sectionId의 초기 상태를 null로 변경

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await readVocabulary(titleId);
                setVocabularyData(data);

                // 성적 데이터를 설정 (여기서는 data에 성적이 포함되어 있다고 가정)
                if (data && data.grades) {
                    setGrades(data.grades);
                }

                // data 배열에서 sectionId 추출
                if (data && data.data && data.data.length > 0) {
                    setSectionId(data.data[0].sectionId); // 첫 번째 항목의 sectionId를 설정
                } else {
                    console.error('sectionId is missing from the API response. Data:', data);
                }
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
        // sectionId가 유효한 경우에만 퀴즈로 이동
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
                        section={maxSection}
                        grades={grades} // 성적 데이터를 DaySelector에 전달
                    />
                    {vocabularyData ? (
                        <VocabularyList sectionNumber={sectionNumber} vocabularyData={vocabularyData} />
                    ) : (
                        <div>Loading...</div>
                    )}
                    <div className="bottom-controls">
                        <ProgressBarComponent className="custom-progress-bar" />
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
