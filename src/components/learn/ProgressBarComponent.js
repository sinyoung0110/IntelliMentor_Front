import React from 'react';


const ProgressBarComponent = ({ progress, total }) => {
  const topRecord = progress; // progress 배열에서 최대값 추출

  return (
    <div className="progress-bar-container">
      <div className="progress-info">
        <span>진행률</span>
        <span>Top record {topRecord} of {total}</span>
      </div>
      <div className="progress-bar">
        <div 
          className="progress" 
          style={{ width: `${(topRecord / total) * 100}%` }} // 최대 기록을 기준으로 진행률 계산
        >
        </div>
      </div>
    </div>
  );
};


export default ProgressBarComponent;
