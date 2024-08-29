import apiClient from './api';

const host = `${process.env.REACT_APP_API_SERVER_HOST}/api/voca`;

export const directAdd = async (data) => {
    try {
        const response = await apiClient.post(`${host}/create`, data);
        return response.data;
    } catch (error) {
        console.error('Error posting data:', error);
        throw error;
    }
};

// 단어장 목록을 가져오는 함수
export const checkVocaExists = async () => {
    try {
        const response = await apiClient.get(`${host}/read`);
        console.log(response.data);
        return response.data; // 서버에서 받은 데이터를 그대로 반환
    } catch (error) {
        console.error('Error fetching vocabulary list:', error);
        throw error;
    }
};
// 단어장 데이터를 가져오는 API 함수
export const getVocabulary = async (title) => {
    try {
        const response = await apiClient.get(`${host}/read/${title}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching vocabulary data:', error);
        throw error;
    }
};

// 단어장 수정을 위한 API 함수
export const updateVocabulary = async (data) => {
    const { originalTitle, modifiedTitle, eng, kor } = data;
    try {
        const response = await apiClient.put(`${host}/update/${originalTitle}`, {
            title: modifiedTitle,
            eng: eng,
            kor: kor
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating vocabulary:', error.response ? error.response.data : error.message);
        throw error;
    }
};


// 삭제 API 요청 함수
export const deleteVocabulary = async (title) => {
    try {
        const response = await apiClient.delete(`${host}/delete/${title}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting vocabulary:', error);
        throw error;
    }
};
