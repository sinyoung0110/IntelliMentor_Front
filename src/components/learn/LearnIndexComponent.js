import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ProgressBar } from 'react-bootstrap';
import DaySelector from './DaySelector';
import VocabularyList from './VocabularyList';
import { readVocabulary } from '../../api/learnApi';
import QuizButton from './QuizButton';

const LearnIndex = ({ titleId }) => {
    const [selectedDay, setSelectedDay] = useState('Day1');
    const sectionNumber = parseInt(selectedDay.replace('Day', ''), 10);
    const [vocabularyData, setVocabularyData] = useState(null);

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

    const totalSections = vocabularyData?.data.length || 0;

    return (
        <Container fluid>
            <Row>
                <Col className="vocabulary-list-container">
                    <DaySelector 
                        selectedDay={selectedDay} 
                        setSelectedDay={setSelectedDay} 
                        section={totalSections} 
                    />
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
