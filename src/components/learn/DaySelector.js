import React from 'react';

const DaySelector = ({ selectedDay, setSelectedDay }) => {
    const days = ['Day1', 'Day2', 'Day3', 'Day4', 'Day5', 'Day6', 'Day7']; // 예시로 더 많은 버튼 추가

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

export default DaySelector;
