import React, { useState, useEffect } from 'react';
import { readVocabulary, updateBookmark } from '../../api/learnApi';
import Card from './Card';
import { useLocation } from 'react-router-dom';

const CardLearn = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const titleId = queryParams.get('titleId');
    const sectionNumber = parseInt(queryParams.get('sectionNumber'), 10);

    const [vocabularyData, setVocabularyData] = useState(null);
    const [isSaving, setIsSaving] = useState(false);

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

    const handleBookmarkToggle = async (wordId) => {
        try {
            const word = vocabularyData.data.flatMap(section => section.word).find(w => w.id === wordId);
            const updatedBookmark = !word.bookmark;

            setVocabularyData(prevData => ({
                ...prevData,
                data: prevData.data.map(section => ({
                    ...section,
                    word: section.word.map(w =>
                        w.id === wordId ? { ...w, bookmark: updatedBookmark } : w
                    )
                }))
            }));

            setIsSaving(true);
            await updateBookmark(
                titleId,
                updatedBookmark ? [wordId] : [],
                updatedBookmark ? [] : [wordId]
            );
            setIsSaving(false);
        } catch (error) {
            console.error('Failed to update bookmark', error);
            setIsSaving(false);
        }
    };

    const sectionData = vocabularyData?.data.find(section => section.section === sectionNumber);

    return (
        <div className="card-learn-page">
            <h1>{vocabularyData?.title} - Section {sectionNumber}</h1>
            {sectionData ? (
                <div className="card-container-wrapper">
                    <div className="card-container">
                        {sectionData.word.map(word => (
                            <Card
                                key={word.id}
                                word={word}
                                onBookmarkToggle={handleBookmarkToggle}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
            <button
                className="save-button"
                onClick={() => console.log('Save button clicked')}
                disabled={isSaving}
            >
                {isSaving ? 'Saving...' : 'Save'}
            </button>
        </div>
    );
};

export default CardLearn;
