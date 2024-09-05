import React from 'react';
import PropTypes from 'prop-types';

const DaySelector = ({ selectedDay, setSelectedDay, section }) => {
    // section 값에 따라 Day 버튼을 동적으로 생성
    const days = Array.from({ length: section }, (_, index) => `Day${index + 1}`);

    return (
        <div className="day-selector-container">
            <div className="day-selector">
                {days.map((day) => (
                    <button 
                        key={day} 
                        className={`day-button ${selectedDay === day ? 'selected' : ''}`} 
                        onClick={() => setSelectedDay(day)}
                    >
                        {day}
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
};

export default DaySelector;
