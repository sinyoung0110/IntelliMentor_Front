import React, { useState } from 'react';
import '../../App.css';
import { updateBookmark } from '../../api/learnApi'; // updateBookmark 함수 import

const VocaComponent = ({ vocabularies }) => {
    const [vocabData, setVocabData] = useState(vocabularies); // 단어 데이터를 상태로 관리

    const handleBookmark = async (id) => {
        try {
            await updateBookmark(id); // 북마크 업데이트 API 호출
            // 북마크 상태 업데이트
            setVocabData((prevData) =>
                prevData.map((vocabulary) =>
                    vocabulary.id === id
                        ? { ...vocabulary, bookmark: !vocabulary.bookmark } // 북마크 상태 토글
                        : vocabulary
                )
            );
            console.log('북마크 업데이트 완료!');
        } catch (error) {
            console.error('북마크 업데이트 중 오류 발생', error);
        }
    };

    return (
        <div className="commonContainer" style={{ backgroundColor: '#F4F1EC', color: '#000000' }}>
            <div className="col p-4 d-flex flex-column position-static">
                <h1>Vocabulary</h1>
                <strong className="d-inline-block mb-2 text-primary-emphasis">오늘의 학습</strong>
                {vocabData.map((vocabulary, index) => (
                    <div key={vocabulary.id} className="vocabulary-card" >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div style={{ flexGrow: 1 }}>
                                <h3 className="mb-0">{vocabulary.eng}</h3>
                                <div className="mb-1 text-body-secondary">{vocabulary.kor}</div>
                                <br />
                                <p className="card-text mb-auto">{vocabulary.sentenceEng}</p>
                                <p className="card-text mb-auto">= {vocabulary.sentenceKor}</p>
                            </div>
                            {/* 북마크 버튼 */}
                            <button 
                                onClick={() => handleBookmark(vocabulary.id)} 
                                className="bookmark"
                                style={{ color: vocabulary.bookmark ? 'gold' : 'gray', fontSize: '24px' }}>
                                {vocabulary.bookmark ? '★' : '☆'}
                            </button>
                        </div>

                        {/* 틀린 횟수 표시 */}
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                            <p style={{ margin: 0 }}>{vocabulary.mistakes} mistakes</p>
                        </div>

                        {/* 구분선 추가 */}
                        {index < vocabData.length - 1 && <hr style={{ margin: '20px 0' }} />}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VocaComponent;
