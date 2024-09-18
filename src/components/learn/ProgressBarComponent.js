import React from 'react';

const ProgressBarComponent = ({ progress, topRecord, total }) => {
  return (
    <div className="progress-bar-container">
      <div className="progress-info">
        <span>진행률</span>
        <span>Top record {topRecord} of {total}</span>
      </div>
      <div className="progress-bar">
        <div 
          className="progress" 
          style={{ width: `${progress}%` }}
        >
        </div>
      </div>
    </div>
  );
};

export default ProgressBarComponent;
