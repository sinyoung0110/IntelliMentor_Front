import React, { useState, useEffect } from 'react';
import { updateBookmark } from '../../api/learnApi';

const VocabularyList = ({ sectionNumber, vocabularyData }) => {
    const [localVocabularyData, setLocalVocabularyData] = useState(vocabularyData);

    useEffect(() => {
        setLocalVocabularyData(vocabularyData);
    }, [vocabularyData]);

    const toggleBookmark = async (index) => {
        const updatedData = { ...localVocabularyData };
        const word = updatedData.vocaItemDTOS[index]; // `vocaItemDTOS`에서 단어 가져옴
        const updatedBookmark = !word.bookmark;
        word.bookmark = updatedBookmark;

        // 로컬 상태 업데이트
        setLocalVocabularyData(updatedData);

        // 북마크 상태 API 호출
        const updatedIdList = [word.id]; // 단어 ID 리스트

        try {
            await updateBookmark(word.id); // 단어 ID를 사용하여 API 호출
        } catch (error) {
            console.error('Failed to update bookmark', error);
        }
    };

    if (!localVocabularyData) {
        return <div>Loading...</div>; // 데이터가 없을 경우 로딩 메시지 표시
    }

    const { vocaItemDTOS } = localVocabularyData;

    // 단어 목록을 2개씩 나누기
    const wordPairs = [];
    for (let i = 0; i < vocaItemDTOS.length; i += 2) {
        wordPairs.push({
            word1: vocaItemDTOS[i],
            word2: vocaItemDTOS[i + 1] || null, // 단어가 홀수인 경우 마지막 단어만 표시
        });
    }

    return (
        <div className="vocabulary-list">
            <div className="vocabulary-list-header">
                <h2 className='main-text' style={{ textAlign: 'left' }}>
                    Day {sectionNumber} - 총 {vocaItemDTOS.length}개
                </h2>
            </div>
            <div className="table-container">
                <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 15px' }}>
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'left', paddingLeft: '15px' }}>단어 (영어)</th>
                            <th style={{ textAlign: 'left', paddingLeft: '15px' }}>단어 (한글)</th>
                            <th style={{ textAlign: 'center' }}>북마크</th>
                            <th style={{ textAlign: 'center' }}>오답횟수</th>
                            <th style={{ textAlign: 'left', paddingLeft: '15px' }}>단어 (영어)</th>
                            <th style={{ textAlign: 'left', paddingLeft: '15px' }}>단어 (한글)</th>
                            <th style={{ textAlign: 'center' }}>북마크</th>
                            <th style={{ textAlign: 'center' }}>오답횟수</th>
                        </tr>
                    </thead>
                    <tbody className="scrollable-tbody">
                        {wordPairs.map((pair, index) => (
                            <tr key={index} style={{ backgroundColor: 'white', borderRadius: '10px', padding: '10px' }}>
                                <td style={{ padding: '10px 20px' }}>{pair.word1.eng}</td>
                                <td style={{ padding: '10px 20px' }}>{pair.word1.kor}</td>
                                <td style={{ textAlign: 'center' }}>
                                    <span 
                                        style={{ fontSize: '20px', cursor: 'pointer', color: pair.word1.bookmark ? 'gold' : 'gray' }}
                                        onClick={() => toggleBookmark(index * 2)} // Bookmark index
                                    >
                                        ★
                                    </span>
                                </td>
                                <td style={{ textAlign: 'center' }}>{pair.word1.mistakes}</td>
                                {pair.word2 ? (
                                    <>
                                        <td style={{ padding: '10px 20px' }}>{pair.word2.eng}</td>
                                        <td style={{ padding: '10px 20px' }}>{pair.word2.kor}</td>
                                        <td style={{ textAlign: 'center' }}>
                                            <span 
                                                style={{ fontSize: '20px', cursor: 'pointer', color: pair.word2.bookmark ? 'gold' : 'gray' }}
                                                onClick={() => toggleBookmark(index * 2 + 1)} // Bookmark index
                                            >
                                                ★
                                            </span>
                                        </td>
                                        <td style={{ textAlign: 'center' }}>{pair.word2.mistakes}</td>
                                    </>
                                ) : (
                                    <>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default VocabularyList;
