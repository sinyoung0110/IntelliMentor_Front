import React from 'react';

const ProgressBar = ({ progress, topRecord, total }) => {
  return (
    <div className="progress-bar-container">
      <h4>학습 정보</h4>
      <div className="progress-info">
        <span>진행률</span>
        <span>Top record {topRecord} of {total}</span>
      </div>
      <div className="progress-bar">
        <div 
          className="progress" 
          style={{ width: `${progress}%` }}>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
