import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { updateBookmark } from '../../api/learnApi';

const VocabularyList = ({ sectionNumber, vocabularyData }) => {
    const [localVocabularyData, setLocalVocabularyData] = useState(vocabularyData);

    useEffect(() => {
        setLocalVocabularyData(vocabularyData);
    }, [vocabularyData]);

    const toggleBookmark = async (index, wordIndex) => {
        const updatedData = { ...localVocabularyData };
        const word = updatedData.data[sectionNumber - 1].wordList[wordIndex];
        const updatedBookmark = !word.bookmark;
        word.bookmark = updatedBookmark;

        // Update local state
        setLocalVocabularyData(updatedData);

        // Prepare the lists for the API call
        const updatedTrueIdList = updatedBookmark
            ? [word.id]
            : [];
        
        const updatedFalseIdList = !updatedBookmark
            ? [word.id]
            : [];

        try {
            // Update the bookmark status on the server
            await updateBookmark(vocabularyData.title.id, updatedTrueIdList, updatedFalseIdList);
        } catch (error) {
            console.error('Failed to update bookmark', error);
        }
    };

    if (!localVocabularyData) {
        return <div>Loading...</div>;
    }

    const { data: sections } = localVocabularyData;
    const sectionData = sections.find(section => section.section.id === sectionNumber);

    if (!sectionData) {
        return <div>No data for section {sectionNumber}</div>;
    }

    const wordPairs = [];
    const { wordList } = sectionData;
    for (let i = 0; i < wordList.length; i += 2) {
        wordPairs.push({
            word1: wordList[i],
            word2: wordList[i + 1] || null, // Handle odd number of words
        });
    }

    return (
        <div className="vocabulary-list">
            <div className="vocabulary-list-header">
                <h2 className='main-text' style={{textAlign: 'left'}}>{vocabularyData?.title.title}</h2>
                <h5 style={{ color: '#BFBFBF', fontWeight: '800' }}> Day {sectionNumber} - 총 {wordList.length}개</h5>
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

VocabularyList.propTypes = {
    sectionNumber: PropTypes.number.isRequired,
    vocabularyData: PropTypes.shape({
        title: PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
        }).isRequired,
        data: PropTypes.arrayOf(PropTypes.shape({
            section: PropTypes.shape({
                id: PropTypes.number.isRequired,
                section: PropTypes.number.isRequired,
                vocaCount: PropTypes.number.isRequired,
                grade: PropTypes.string.isRequired,
                engScore: PropTypes.number,
                korScore: PropTypes.number,
                senScore: PropTypes.number,
                progress: PropTypes.number.isRequired,
            }).isRequired,
            wordList: PropTypes.arrayOf(PropTypes.shape({
                id: PropTypes.number.isRequired,
                eng: PropTypes.string.isRequired,
                kor: PropTypes.string.isRequired,
                bookmark: PropTypes.bool.isRequired,
                mistakes: PropTypes.number.isRequired,
                sentence: PropTypes.string,
            })).isRequired,
        })).isRequired,
    }).isRequired,
};

export default VocabularyList;
