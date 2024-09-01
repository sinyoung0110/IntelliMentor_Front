import React, { useState, useEffect } from 'react';
import DaySelector from './DaySelector'; // 일(day) 선택 컴포넌트
import VocabularyList from './VocabularyList'; // 단어 리스트 컴포넌트
import { readVocabulary } from '../../api/learnApi';

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
        <div>
            <DaySelector selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
            {/* VocabularyList에 sectionNumber와 vocabularyData를 전달합니다 */}
            <VocabularyList sectionNumber={sectionNumber} vocabularyData={vocabularyData} />
        </div>
    );
};

export default LearnIndex;
