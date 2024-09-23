import React, { useState, useEffect } from 'react';
import { readVocabularyBySection, updateBookmark } from '../../api/learnApi'; 
import Card from './Card';
import { useLocation, useNavigate } from 'react-router-dom';

const CardLearn = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const titleId = queryParams.get('titleId');
    const sectionNumber = parseInt(queryParams.get('sectionNumber'), 10);
    const sectionId = queryParams.get('sectionId');

    const [vocabularyData, setVocabularyData] = useState(null);
    const [showFilters, setShowFilters] = useState(false);
    const [bookmarkOnly, setBookmarkOnly] = useState(false);
    const [showSentences, setShowSentences] = useState(false); // 문장 필터 상태 추가
    const [defaultLanguage, setDefaultLanguage] = useState('eng');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await readVocabularyBySection(sectionId);
                setVocabularyData(data);
            } catch (error) {
                console.error('Error fetching vocabulary data:', error);
            }
        };

        if (sectionId) {
            fetchData();
        }
    }, [sectionId]);

    const handleBookmarkToggle = async (wordId) => {
        try {
            const word = vocabularyData.vocaItemDTOS.find(w => w.id === wordId);
            const updatedBookmark = !word.bookmark;

            setVocabularyData(prevData => ({
                ...prevData,
                vocaItemDTOS: prevData.vocaItemDTOS.map(w =>
                    w.id === wordId ? { ...w, bookmark: updatedBookmark } : w
                )
            }));

            // Update bookmark on the server
            await updateBookmark(wordId);
        } catch (error) {
            console.error('Failed to update bookmark', error);
        }
    };

    const filteredWords = vocabularyData?.vocaItemDTOS.filter(word => 
        (!bookmarkOnly || word.bookmark) && 
        (!showSentences || (word.sentenceEng && word.sentenceKor))
    );

    const handleLanguageToggle = (lang) => {
        setDefaultLanguage(lang);
    };

    const handleList = () => {
        navigate(`/learn/index?titleId=${titleId}&sectionNumber=${sectionNumber}`);
    };

    const handleQuizCreation = () => {
        navigate(`/learn/chooseQuiz?titleId=${titleId}&sectionId=${sectionId}`);
    };

    return (
        <div className="card-learn-page">
            <h2 className='main-text'>{vocabularyData?.title}</h2>
            <h5 className='main-text' style={{ color: '#BFBFBF' }}> Day {sectionNumber}</h5>
            <div className="filter-and-button-container">
                <div className="filter-section">
                    <button onClick={() => setShowFilters(!showFilters)} className="filter-button">
                        {showFilters ? 'Hide Filters' : 'Show Filters'}
                    </button>
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
                                    type="checkbox"
                                    checked={showSentences}
                                    onChange={() => setShowSentences(!showSentences)}
                                />
                                Show sentences
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="language"
                                    checked={defaultLanguage === 'kor'}
                                    onChange={() => handleLanguageToggle('kor')}
                                />
                                Show Korean first
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="language"
                                    checked={defaultLanguage === 'eng'}
                                    onChange={() => handleLanguageToggle('eng')}
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
                            defaultLanguage={defaultLanguage}
                            showSentences={showSentences} // 문장 표시 여부 전달
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CardLearn;
