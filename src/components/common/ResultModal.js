

import React from 'react';

function ResultModal({ result, onClose }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full">
                <div className="text-lg font-bold mb-2">Result</div>
                <div className="mb-4">{result}</div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                    onClick={onClose}
                    
                    style={{
                        backgroundColor: '#8FB299', // 버튼 배경색을 #8FB299로 설정
                        color: 'white', // 글자색을 흰색으로 설정
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '20px',
                        cursor: 'pointer',
       
                    }}
                >
                    Close
                </button></div>
            </div>
        </div>
    );
}

export default ResultModal;


