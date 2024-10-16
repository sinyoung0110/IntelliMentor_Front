import apiClient from './api';

const host = `${process.env.REACT_APP_API_SERVER_HOST}/api/learn`;

// 전체 단어장 데이터를 가져오는 API 함수
export const readVocabulary = async (titleId) => {
    try {
        const response = await apiClient.get(`${host}/read/${titleId}`);
        return response.data;
    } catch (error) {
        console.error('Error reading vocabulary:', error); // 에러 로그 출력
        throw error;
    }
};
// 섹션별 api/learnApi.js
export const readVocabularyBySection = async (sectionId) => {
    try {
        const response = await apiClient.get(`${host}/read/section/${sectionId}`);
        return response.data;
    } catch (error) {
        console.error('Error reading vocabulary by section:', error); // 에러 로그 출력
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

// 북마크를 업데이트하는 API 함수
export const updateBookmark = async (vocaId) => {
    try {
        const response = await apiClient.patch(`${host}/bookmark/${vocaId}`);
        console.log('Update response data:', response.data);
    } catch (error) {
        console.error('Error updating bookmarks:', error);
        throw error;
    }
};

// Send selected quiz type to the server (e.g., ek, ks, es)
export const submitQuizSelection = async (sectionId, selectedTypes) => {
    try {
        const response = await apiClient.get(`${host}/quiz/${selectedTypes}/${sectionId}`);
        return response.data;
    } catch (error) {
        console.error('Error submitting quiz selection:', error);
        throw error;
    }
};

export const submitQuizResults = async (sectionId, quizResults) => {
    try {
        // quizResults를 data 속성으로 감싸서 요청 본문에 포함
        const response = await apiClient.patch(`${host}/quiz/mark/${sectionId}`, { data: quizResults });
        return response.data;
    } catch (error) {
        console.error('Error submitting quiz results:', error);
        throw error;
    }
};
