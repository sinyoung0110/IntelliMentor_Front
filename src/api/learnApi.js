import apiClient from './api';

const host = `${process.env.REACT_APP_API_SERVER_HOST}/api/learn`;

// voca.section이 1 이상일 때 호출하는 함수
export const readVocabulary = async (title) => {
    try {
        const response = await apiClient.get(`${host}/read/${title}`);
        return response.data;
    } catch (error) {
        console.error('Error reading vocabulary:', error);
        throw error;
    }
};

// 단어장 섹션 업데이트 함수
export const updateSection = async (title, section) => {
    try {
        const response = await apiClient.patch(`${host}/create`, { title, section });
        return response.data;
    } catch (error) {
        console.error('Error updating section:', error);
        throw error;
    }
};
