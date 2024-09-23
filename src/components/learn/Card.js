import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Card = ({ word, onBookmarkToggle, defaultLanguage, showSentences }) => {
    const [isFlipped, setIsFlipped] = useState(defaultLanguage === 'kor');

    useEffect(() => {
        setIsFlipped(defaultLanguage === 'kor');
    }, [defaultLanguage]);

    const handleCardClick = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={handleCardClick}>
            <div className="card-content">
                <div className="card-front">
                    <div className="card-header">
                        <span
                            className="bookmark-icon"
                            onClick={(e) => {
                                e.stopPropagation();
                                onBookmarkToggle(word.id);
                            }}
                            style={{ color: word.bookmark ? 'gold' : 'gray' }}
                        >
                            {word.bookmark ? '★' : '☆'}
                        </span>
                        <span className="mistakes">{word.mistakes} mistakes</span>
                    </div>
                    <div className='dash-button-container'>
                    <h3>{word.eng}</h3>
                    {showSentences && <p>{word.sentenceEng}</p>} {/* 영어 문장 조건부 표시 */}
                    </div>
                </div>
                <div className="card-back">
                    <div className="card-header">
                        <span
                            className="bookmark-icon"
                            onClick={(e) => {
                                e.stopPropagation();
                                onBookmarkToggle(word.id);
                            }}
                            style={{ color: word.bookmark ? 'gold' : 'gray' }}
                        >
                            {word.bookmark ? '★' : '☆'}
                        </span>
                        <span className="mistakes">{word.mistakes} mistakes</span>
                    </div>
                    <h3>{word.kor}</h3>
                    {showSentences && <p>{word.sentenceKor}</p>} {/* 한국어 문장 조건부 표시 */}
                </div>
            </div>
        </div>
    );
};

Card.propTypes = {
    word: PropTypes.shape({
        id: PropTypes.number.isRequired,
        eng: PropTypes.string.isRequired,
        kor: PropTypes.string.isRequired,
        bookmark: PropTypes.bool.isRequired,
        mistakes: PropTypes.number.isRequired,
        sentenceEng: PropTypes.string.isRequired,
        sentenceKor: PropTypes.string.isRequired,
    }).isRequired,
    onBookmarkToggle: PropTypes.func.isRequired,
    defaultLanguage: PropTypes.string.isRequired,
    showSentences: PropTypes.bool.isRequired, // 추가된 prop
};

export default Card;
