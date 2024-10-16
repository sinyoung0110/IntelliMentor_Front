import React, { useState, useEffect } from 'react';
import { readVocabularyBySection, updateBookmark } from '../../api/learnApi'; 
import Card from './Card';
import { useLocation, useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners'; // 스피너 추가

const CardLearn = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const titleId = queryParams.get('titleId');
    const sectionNumber = parseInt(queryParams.get('sectionNumber'), 10);
    const sectionId = queryParams.get('sectionId');

    const [vocabularyData, setVocabularyData] = useState(null);
    const [loading, setLoading] = useState(true); // 로딩 상태 추가
    const [showFilters, setShowFilters] = useState(false);
    const [bookmarkOnly, setBookmarkOnly] = useState(false);
    const [showSentences, setShowSentences] = useState(false);
    const [defaultLanguage, setDefaultLanguage] = useState('eng');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await readVocabularyBySection(sectionId);
                setVocabularyData(data);
            } catch (error) {
                console.error('Error fetching vocabulary data:', error);
            } finally {
                setLoading(false); // 로딩 완료 후 상태 변경
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
        navigate(`/learn/index?titleId=${titleId}&sectionId=${sectionId}`);
    };

    const handleQuizCreation = () => {
        navigate(`/learn/chooseQuiz?titleId=${titleId}&sectionId=${sectionId}`);
    };

    if (loading) {
        return (
            <div className="spinner-container">
                <ClipLoader color="#8FB299" size={60} />
                <p>카드 만드는 중..</p>
            </div>
        );
    }

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
                                only bookmarked
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={showSentences}
                                    onChange={() => setShowSentences(!showSentences)}
                                />
                                sentences
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="language"
                                    checked={defaultLanguage === 'kor'}
                                    onChange={() => handleLanguageToggle('kor')}
                                />
                                Kor
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="language"
                                    checked={defaultLanguage === 'eng'}
                                    onChange={() => handleLanguageToggle('eng')}
                                />
                                Eng
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

            <div className="card-container-wrapper">
                <div className="card-container">
                    {filteredWords?.map(word => (
                        <Card
                            key={word.id}
                            word={word}
                            onBookmarkToggle={handleBookmarkToggle}
                            defaultLanguage={defaultLanguage}
                            showSentences={showSentences}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CardLearn;
