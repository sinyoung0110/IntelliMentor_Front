import apiClient from './api';

const host = `${process.env.REACT_APP_API_SERVER_HOST}/api/learn`;

// 단어장 데이터를 가져오는 API 함수
export const readVocabulary = async (titleId) => {
    try {
        const response = await apiClient.get(`${host}/read/${titleId}`);
        console.log('API response data:', response.data); // API 응답 데이터 확인
        return response.data;
    } catch (error) {
        console.error('Error reading vocabulary:', error); // 에러 로그 출력
        throw error;
    }
};


// 단어장 섹션 업데이트 함수
export const updateSection = async (titleId, section) => {
    try {
        const response = await apiClient.patch(`${host}/set/${titleId}`, { section });
        return response.data;
    } catch (error) {
        console.error('Error updating section:', error);
        throw error;
    }
};
