import React, { useState, useEffect } from 'react';

const VocabularyList = ({ sectionNumber, vocabularyData }) => {
    const [localVocabularyData, setLocalVocabularyData] = useState(vocabularyData);

    useEffect(() => {
        setLocalVocabularyData(vocabularyData);
    }, [vocabularyData]);

    // 북마크 토글 함수
    const toggleBookmark = (index, wordIndex) => {
        const updatedData = { ...localVocabularyData };
        updatedData.data[sectionNumber - 1].word[wordIndex].bookmark = !updatedData.data[sectionNumber - 1].word[wordIndex].bookmark;
        setLocalVocabularyData(updatedData);
    };

    if (!localVocabularyData) {
        return <div>Loading...</div>;
    }

    const { title, data: sections } = localVocabularyData;
    const sectionData = sections.find(section => section.section === sectionNumber);

    if (!sectionData) {
        return <div>No data for section {sectionNumber}</div>;
    }

    // Flatten the data into a list of word pairs
    const wordPairs = [];
    const { word } = sectionData;
    for (let i = 0; i < word.length; i += 2) {
        wordPairs.push({
            word1: word[i],
            word2: word[i + 1] || null, // Handle odd number of words
        });
    }

    return (
        <div className="vocabulary-list">
            <h3>{title} - Section {sectionNumber} (총 {word.length}개)</h3>
            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 15px' }}>
                <thead>
                    <tr>
                        <th style={{ textAlign: 'left' }}>단어 (영어)</th>
                        <th style={{ textAlign: 'left' }}>단어 (한글)</th>
                        <th>북마크</th>
                        <th>오답횟수</th>
                        <th style={{ textAlign: 'left' }}>단어 (영어)</th>
                        <th style={{ textAlign: 'left' }}>단어 (한글)</th>
                        <th>북마크</th>
                        <th>오답횟수</th>
                    </tr>
                </thead>
                <tbody>
                    {wordPairs.map((pair, index) => (
                        <tr key={index} style={{ backgroundColor: 'white', borderRadius: '10px', padding: '10px' }}>
                            <td style={{ padding: '10px 20px' }}>{pair.word1.eng}</td>
                            <td style={{ padding: '10px 20px' }}>{pair.word1.kor}</td>
                            <td style={{ textAlign: 'center' }}>
                                <span 
                                    style={{ fontSize: '20px', cursor: 'pointer', color: pair.word1.bookmark ? 'gold' : 'gray' }}
                                    onClick={() => toggleBookmark(index, index * 2)} // Bookmark index
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
                                            onClick={() => toggleBookmark(index, index * 2 + 1)} // Bookmark index
                                        >
                                            ★
                                        </span>
                                    </td>
                                    <td style={{ textAlign: 'center' }}>{pair.word2.mistakes}</td>
                                </>
                            ) : (
                                <>
                                    <td style={{ padding: '10px 20px' }}></td>
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
    );
};

export default VocabularyList;
