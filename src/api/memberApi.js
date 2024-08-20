import axios from "axios";
import apiClient from './apiClient';

const host = `${process.env.REACT_APP_API_SERVER_HOST}/api/member`;


export const loginPost = async (loginParam) => {
const header = {
  headers: { "Content-Type": "x-www-form-urlencoded" }
};
const form = new FormData();
form.append("username", loginParam.email);
form.append("password", loginParam.pw);
const res = await axios.post(`${host}/login`, form, header);

const { accessToken, refreshToken } = res.data;

// 액세스 토큰과 리프레시 토큰을 로컬 스토리지에 저장
localStorage.setItem('accessToken', accessToken);
localStorage.setItem('refreshToken', refreshToken);
return res.data;
};



export const signupPost = async (signupParam) => {
  const header = {
    headers: { "Content-Type": "application/json" }
  };

  const res = await axios.post(`${host}/signup`, signupParam, header);
  return res.data;
};

// 회원 수정 함수
export const modify = async (modifyParam) => {
  // 요청 헤더를 정의합니다.
  const header = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // `apiClient`를 사용하여 PUT 요청을 보냅니다.
  const res = await apiClient.put(`${host}/modify`, modifyParam, header);
  return res.data;
};

// 회원 삭제 함수
export const deleted = async (deleteParam) => {
  // 요청 헤더를 정의합니다.
  const header = {
    headers: {
      "Content-Type": "application/json"
    },
    data: deleteParam // DELETE 요청 시 데이터 전송
  };

  // `apiClient`를 사용하여 DELETE 요청을 보냅니다.
  const res = await apiClient.delete(`${host}/delete`, header);
  return res.data;
};

