import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import DaySelector from './DaySelector'; // 일(day) 선택 컴포넌트
import VocabularyList from './VocabularyList'; // 단어 리스트 컴포넌트
import { readVocabulary } from '../../api/learnApi';
import { ProgressBar } from 'react-bootstrap';
import QuizButton from './QuizButton';

const LearnIndex = ({ title }) => {
    const [selectedDay, setSelectedDay] = useState('Day1');
    const sectionNumber = parseInt(selectedDay.replace('Day', ''), 10); // Day1 -> 1, Day2 -> 2
    const [vocabularyData, setVocabularyData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await readVocabulary(title);
                setVocabularyData(data);
            } catch (error) {
                console.error('Error fetching vocabulary data:', error);
            }
        };

        if (title) {
            fetchData();
        }
    }, [title]);

    return (
      <Container fluid>
      <Row>
        <Col className="vocabulary-list-container">
        
            <DaySelector selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
            {vocabularyData ? (
                <VocabularyList sectionNumber={sectionNumber} vocabularyData={vocabularyData} />
            ) : (
                <div>Loading...</div>
            )}
          
        <div className="bottom-controls">
        <ProgressBar className="custom-progress-bar" now={60} label="60%" />
        <QuizButton />
      </div>
      </Col>
      </Row>
      </Container>
    );
};

export default LearnIndex;
