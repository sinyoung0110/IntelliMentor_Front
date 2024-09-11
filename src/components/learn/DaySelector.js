import React from 'react';
import PropTypes from 'prop-types';

const DaySelector = ({ selectedDay, setSelectedDay, section, grades }) => {
    // section 값에 따라 Day 버튼을 동적으로 생성
    const days = Array.from({ length: section }, (_, index) => `Day${index + 1}`);

    return (
        <div className="day-selector-container">
            <div className="day-selector">
                {days.map((day, index) => (
                    <button 
                        key={day} 
                        className={`day-button ${selectedDay === day ? 'selected' : ''}`} 
                        onClick={() => setSelectedDay(day)}
                    >
                        {day}
                        <div className="day-grade">
                            {grades[index] && grades[index] !== 'N/A' ? grades[index] : '-'}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

DaySelector.propTypes = {
    selectedDay: PropTypes.string.isRequired,
    setSelectedDay: PropTypes.func.isRequired,
    section: PropTypes.number.isRequired,
    grades: PropTypes.arrayOf(PropTypes.string).isRequired, // 성적 배열 추가
};

export default DaySelector;
