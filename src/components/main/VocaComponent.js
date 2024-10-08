import React, { useState, useEffect } from 'react';
import '../../App.css';
import { updateBookmark } from '../../api/learnApi'; // updateBookmark 함수 import
import { mainrandom } from '../../api/vocaApi'; // 단어 데이터를 가져올 API import
import { useSelector } from 'react-redux'; // 로그인 상태 확인을 위한 useSelector import
import { useNavigate } from 'react-router-dom';

const VocaComponent = () => {
    const [vocabData, setVocabData] = useState([]); // 단어 데이터를 상태로 관리
    const loginState = useSelector(state => state.loginSlice); // 로그인 슬라이스에서 로그인 상태 가져오기
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate(`/member/login`);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data1 = await mainrandom(); // 첫 번째 단어 데이터 가져오기
                const data2 = await mainrandom(); // 두 번째 단어 데이터 가져오기
                setVocabData([data1, data2]); // 두 단어 데이터를 배열로 상태에 저장
            } catch (error) {
                console.error('Failed to fetch vocabulary', error);
            }
        };

        if (loginState.email) { // 로그인 상태일 때만 데이터 fetch
            fetchData();
        }
    }, [loginState.email]);

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
        <div
            className="commonContainer"
            style={{
                backgroundColor: 'rgba(244, 241, 236, 0.8)', // 배경색 설정
                color: '#000000',
                position: 'relative', // 포지셔닝을 위한 설정
                transition: 'background-color 0.3s ease',
                filter: loginState.email ? 'none' : 'blur(5px)', // 로그인 안 된 경우 흐림 효과
            }}
        >
            <div className="col p-4 d-flex flex-column position-static">
                <h1>Vocabulary</h1>
                <strong className="d-inline-block mb-2 text-primary-emphasis">오늘의 학습</strong>

                {!loginState.email ? (
                    <>
                        {/* 로그인 문구를 가운데에 위치시키고 선명하게 표시 */}
                        <div
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)', // 중앙 정렬
                                zIndex: 10,
                                backgroundColor: 'rgba(255, 255, 255, 0.8)', // 약간 투명한 배경
                                padding: '20px',
                                borderRadius: '10px',
                                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', // 약간의 그림자 효과
                                color: '#8FB299',
                                fontSize: '20px',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                filter: 'none', // 흐림 효과 제거
                            }}
                            onClick={handleLogin}
                        >
                            로그인이 필요합니다. 로그인을 해주세요.
                        </div>
                    </>
                ) : vocabData.length === 0 ? (
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
                                {/* 북마크 버튼 */}
                                <button
                                    onClick={() => handleBookmark(vocabulary.id)}
                                    className="bookmark"
                                    style={{ color: vocabulary.bookmark ? 'gold' : 'gray', fontSize: '24px' }}
                                >
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
                    ))
                )}
            </div>
        </div>
    );
};

export default VocaComponent;
