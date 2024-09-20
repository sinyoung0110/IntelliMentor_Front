import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Card = ({ word, onBookmarkToggle, defaultLanguage }) => {
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
                            style={{ color: word.bookmark ? 'gold' : 'gray' }} // 별 색상 적용
                        >
                            {word.bookmark ? '★' : '☆'}
                        </span>
                        <span className="mistakes">{word.mistakes} mistakes</span>
                    </div>
                    <h3>{word.eng}</h3>
                </div>
                <div className="card-back">
                    <div className="card-header">
                        <span
                            className="bookmark-icon"
                            onClick={(e) => {
                                e.stopPropagation();
                                onBookmarkToggle(word.id);
                            }}
                            style={{ color: word.bookmark ? 'gold' : 'gray' }} // 별 색상 적용
                        >
                            {word.bookmark ? '★' : '☆'}
                        </span>
                        <span className="mistakes">{word.mistakes} mistakes</span>
                    </div>
                    <h3>{word.kor}</h3>
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
    }).isRequired,
    onBookmarkToggle: PropTypes.func.isRequired,
    defaultLanguage: PropTypes.string.isRequired,
};

export default Card;
