import axios from "axios";
import { API_SERVER_HOST } from "./todoApi";

const host = `${API_SERVER_HOST}/api/voca`;

export const directAdd = async (data) => {
    try {
        const header = {
            headers: { "Content-Type": "application/json" }
          };
        const response = await axios.post(`${host}/create`, data,header);
        return response.data;
    } catch (error) {
        console.error('Error posting data:', error);
        throw error;
    }
};
// 단어장 목록을 가져오는 함수
export const checkVocaExists = async (data) => {
    try {
        const header = {
            headers: { "Content-Type": "application/json" }
          };
        const response = await axios.get(`${host}/list`, data,header);
        return response.data; // 서버에서 받은 데이터를 그대로 반환
    } catch (error) {
        console.error('Error fetching vocabulary list:', error);
        throw error;
    }
};

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