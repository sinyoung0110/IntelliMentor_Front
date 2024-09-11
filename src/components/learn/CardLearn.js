import React, { useState, useEffect } from 'react';
import { readVocabulary, updateBookmark } from '../../api/learnApi';
import Card from './Card';
import { useLocation, useNavigate } from 'react-router-dom';


const CardLearn = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const titleId = queryParams.get('titleId');
    const sectionNumber = parseInt(queryParams.get('sectionNumber'), 10);

    const [vocabularyData, setVocabularyData] = useState(null);
    const [showFilters, setShowFilters] = useState(false);
    const [bookmarkOnly, setBookmarkOnly] = useState(false);
    const [defaultLanguage, setDefaultLanguage] = useState('eng'); // Default to English

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

            await updateBookmark(
                titleId,
                updatedBookmark ? [wordId] : [],
                updatedBookmark ? [] : [wordId]
            );
        } catch (error) {
            console.error('Failed to update bookmark', error);
        }
    };

    const filteredWords = bookmarkOnly
        ? vocabularyData?.data.find(section => section.section === sectionNumber).word.filter(word => word.bookmark)
        : vocabularyData?.data.find(section => section.section === sectionNumber).word;

    // Handler to change the language filter (Korean or English)
    const handleLanguageToggle = (lang) => {
        setDefaultLanguage(lang); // Set the default language for all cards
    };
    const handleList = () => {
        navigate(`/learn/index?titleId=${titleId}&sectionNumber=${sectionNumber}`);
    };
    const handleQuizCreation = () => {
        navigate(`/learn/chooseQuiz?titleId=${titleId}&sectionNumber=${sectionNumber}`);
    };


    return (
        <div className="card-learn-page">
            <h2 className='main-text'>{vocabularyData?.title}</h2>
            <h5 className='main-text' style={{color:'#BFBFBF'}}> Day {sectionNumber}</h5>
    <div className="filter-and-button-container">
        {/* Filter Toggle Button */}
        <div className="filter-section">
            <button onClick={() => setShowFilters(!showFilters)} className="filter-button">
                {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>

            {/* Filter Options */}
            {showFilters && (
                <div className="filter-options">
                    <label>
                        <input
                            type="checkbox"
                            checked={bookmarkOnly}
                            onChange={() => setBookmarkOnly(!bookmarkOnly)}
                        />
                        Show only bookmarked
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="language"
                            checked={defaultLanguage === 'kor'}
                            onChange={() => handleLanguageToggle('kor')} // Show Korean first
                        />
                        Show Korean first
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="language"
                            checked={defaultLanguage === 'eng'}
                            onChange={() => handleLanguageToggle('eng')} // Show English first
                        />
                        Show English first
                    </label>
                </div>
            )}
        </div>

        <div className="button-section">
            <button onClick={handleList} className="quiz-button learning">
                목록으로
            </button>
            <button onClick={handleQuizCreation} className="quiz-button">
                퀴즈풀기
            </button>
        </div>
    </div>

    {/* Cards */}
    <div className="card-container-wrapper">
        <div className="card-container">
            {filteredWords?.map(word => (
                <Card
                    key={word.id}
                    word={word}
                    onBookmarkToggle={handleBookmarkToggle}
                    defaultLanguage={defaultLanguage} // Pass the default language to each card
                />
            ))}
        </div>
    </div>
</div>

    );
};

export default CardLearn;
