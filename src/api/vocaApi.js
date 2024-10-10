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
        console.log("단어장 목록 확인: ", response.data.data); // 수정된 부분
        return response.data.data; // 서버에서 받은 'data' 배열을 반환
    } catch (error) {
        console.error('Error fetching vocabulary list:', error);
        throw error;
    }
};
// 단어장 데이터를 가져오는 API 함수
export const getVocabulary = async (titleId) => {
    try {
        const response = await apiClient.get(`${host}/read/${titleId}`);
        return response.data; // 데이터는 서버에서 지정한 형식으로 반환
    } catch (error) {
        console.error('Error fetching vocabulary data:', error);
        throw error;
    }
};

// 단어장 수정을 위한 API 함수
export const updateVocabulary = async (data) => {
    const { titleId, modifiedTitle, modifiedWord, deleteId, addWord } = data;
    try {
        const response = await apiClient.patch(`${host}/update/${titleId}`, {
            modifiedTitle,
            modifiedWord,
            deleteId,
            addWord
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating vocabulary:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// 삭제 API 요청 함수
export const deleteVocabulary = async (titleId) => {
    try {
        const response = await apiClient.delete(`${host}/delete/${titleId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting vocabulary:', error);
        throw error;
    }
};
//메인페이지 단어장 오답 랜덤
export const mainrandom = async () => {
    try {
        const response = await apiClient.get(`${host}/`);
        console.log('API response data:', response.data); // API 응답 데이터 확인
        return response.data;
    } catch (error) {
        console.error('Error reading vocabulary:', error); // 에러 로그 출력
        throw error;
    }
  };

  export const aiAdd = async (title, subject, count, level) => {
    try {
        const requestBody = {
            title: title,   // 단어장 제목
            subject: subject, // AI 생성 주제
            count: count,    // 단어 개수
            level: level     // 난이도 추가
        };

        // POST 요청에 데이터 전달
        const response = await apiClient.post(`${host}/ai`, requestBody);

        return response.data; // 응답 데이터 반환
    } catch (error) {
        console.error('Error submitting AI vocabulary request:', error); // 에러 로그
        throw error; // 에러를 상위로 전달
    }
};
