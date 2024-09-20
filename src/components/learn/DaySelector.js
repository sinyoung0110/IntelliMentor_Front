import React from 'react';


const DaySelector = ({ selectedDay, setSelectedDay, section, grades }) => {
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
                            {grades[index] && grades[index] !== '-' ? grades[index] : '-'}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};


export default DaySelector;
