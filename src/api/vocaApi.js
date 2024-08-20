import apiClient from './apiClient';

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

// 단어장 목록을 가져오는 함수 (기존 코드 유지)
export const fetchVocabularyLists = async (userId) => {
    try {
        // 쿼리 문자열 생성
        const queryString = new URLSearchParams({ userId }).toString();
        const response = await fetch(`${host}/read?${queryString}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching vocabulary lists:', error);
        throw error;
    }
};
