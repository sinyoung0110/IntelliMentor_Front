import React, { useState, useEffect } from 'react';
import '../../App.css';
import { updateBookmark } from '../../api/learnApi';
import { mainrandom } from '../../api/vocaApi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const VocaComponent = () => {
    const [vocabData, setVocabData] = useState([]);
    const loginState = useSelector(state => state.loginSlice);
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate(`/member/login`);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data1 = await mainrandom();
                const data2 = await mainrandom();
                setVocabData([data1, data2]);
            } catch (error) {
                console.error('Failed to fetch vocabulary', error);
            }
        };

        if (loginState.email) {
            fetchData();
        }
    }, [loginState.email]);

    const handleBookmark = async (id) => {
        try {
            await updateBookmark(id);
            setVocabData((prevData) =>
                prevData.map((vocabulary) =>
                    vocabulary.id === id
                        ? { ...vocabulary, bookmark: !vocabulary.bookmark }
                        : vocabulary
                )
            );
            console.log('북마크 업데이트 완료!');
        } catch (error) {
            console.error('북마크 업데이트 중 오류 발생', error);
        }
    };

    return (
        <div
            className="commonContainer"
            style={{
                backgroundColor: 'rgba(244, 241, 236, 0.8)',
                color: '#000000',
                position: 'relative',
                transition: 'background-color 0.3s ease',
                
            }}
        >
            {!loginState.email && (
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 10,
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        padding: '20px',
                        borderRadius: '10px',
                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                        color: '#8FB299',
                        fontSize: '20px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                
                    }}
                    onClick={handleLogin}
                >
                    로그인이 필요합니다. 로그인을 해주세요.
                </div>
            )}
            
            <div className="col p-4 d-flex flex-column position-static">
                <h1>Vocabulary</h1>
                <strong className="d-inline-block mb-2 text-primary-emphasis">오늘의 학습</strong>

                {loginState.email && vocabData.length === 0 ? (
                    <p>오늘의 학습을 위한 틀린 단어가 없습니다.</p>
                ) : (
                    vocabData.map((vocabulary, index) => (
                        <div key={vocabulary.id} className="vocabulary-card">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div style={{ flexGrow: 1 }}>
                                    <h3 className="mb-0">{vocabulary.eng}</h3>
                                    <div className="mb-1 text-body-secondary">{vocabulary.kor}</div>
                                    <br />
                                    <p className="card-text mb-auto">{vocabulary.sentenceEng}</p>
                                    <p className="card-text mb-auto">= {vocabulary.sentenceKor}</p>
                                </div>
                                <button
                                    onClick={() => handleBookmark(vocabulary.id)}
                                    className="bookmark"
                                    style={{ color: vocabulary.bookmark ? 'gold' : 'gray', fontSize: '24px' }}
                                >
                                    {vocabulary.bookmark ? '★' : '☆'}
                                </button>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                                <p style={{ margin: 0 }}>{vocabulary.mistakes} mistakes</p>
                            </div>
                            {index < vocabData.length - 1 && <hr style={{ margin: '20px 0' }} />}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default VocaComponent;
