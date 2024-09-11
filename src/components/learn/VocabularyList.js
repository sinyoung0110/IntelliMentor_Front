import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { updateBookmark } from '../../api/learnApi';

const VocabularyList = ({ sectionNumber, vocabularyData }) => {
    const [localVocabularyData, setLocalVocabularyData] = useState(vocabularyData);
    const [modifiedIds, setModifiedIds] = useState({ trueIdList: [], falseIdList: [] });
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        setLocalVocabularyData(vocabularyData);
    }, [vocabularyData]);

    const toggleBookmark = (index, wordIndex) => {
        const updatedData = { ...localVocabularyData };
        const word = updatedData.data[sectionNumber - 1].word[wordIndex];
        word.bookmark = !word.bookmark;

        const updatedTrueIdList = word.bookmark
            ? [...modifiedIds.trueIdList, word.id]
            : modifiedIds.trueIdList.filter(id => id !== word.id);
        
        const updatedFalseIdList = !word.bookmark
            ? [...modifiedIds.falseIdList, word.id]
            : modifiedIds.falseIdList.filter(id => id !== word.id);

        setModifiedIds({ trueIdList: updatedTrueIdList, falseIdList: updatedFalseIdList });
        setLocalVocabularyData(updatedData);
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await updateBookmark(vocabularyData.titleId, modifiedIds.trueIdList, modifiedIds.falseIdList);
            // 성공적인 저장 후 상태 초기화
            setModifiedIds({ trueIdList: [], falseIdList: [] });
        } catch (error) {
            console.error('Failed to save bookmark changes', error);
        } finally {
            setIsSaving(false);
        }
    };

    if (!localVocabularyData) {
        return <div>Loading...</div>;
    }

    const { data: sections } = localVocabularyData;
    const sectionData = sections.find(section => section.section === sectionNumber);

    if (!sectionData) {
        return <div>No data for section {sectionNumber}</div>;
    }

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
    <div className="vocabulary-list-header">
        <h2 className='main-text'>{vocabularyData?.title}</h2>
       
        <button 
            className="save-button" 
            onClick={handleSave} 
            disabled={isSaving}
        >
            {isSaving ? 'Saving...' : 'Save Bookmark'}
        </button>
    </div>
    <h5 style={{color:'#BFBFBF', fontWeight:'800',}}> Day {sectionNumber} - 총 {word.length}개</h5>
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
        title: PropTypes.string.isRequired,
        data: PropTypes.arrayOf(PropTypes.shape({
            section: PropTypes.number.isRequired,
            grade: PropTypes.string.isRequired,
            word: PropTypes.arrayOf(PropTypes.shape({
                id: PropTypes.number.isRequired,
                eng: PropTypes.string.isRequired,
                kor: PropTypes.string.isRequired,
                bookmark: PropTypes.bool.isRequired,
                mistakes: PropTypes.number.isRequired,
            })).isRequired,
        })).isRequired,
    }).isRequired,
};

export default VocabularyList;
