import axios from "axios";
import apiClient from './api'; // 이미 만들어진 Axios 인스턴스를 사용한다면 여기에 해당합니다.

const host = `${process.env.REACT_APP_API_SERVER_HOST}/api/member`;

// 토큰 저장 함수 추가
function saveTokens(accessToken, refreshToken) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
}

export const loginPost = async (loginParam, credentials) => {
    const header = {
        headers: { "Content-Type": "x-www-form-urlencoded" }
    };
    const form = new FormData();
    form.append("username", loginParam.email);
    form.append("password", loginParam.pw);

    // 로그인 요청
    const res = await axios.post(`${host}/login`, form, header, credentials);

    const { accessToken, refreshToken } = res.data;

    // 토큰을 로컬 스토리지에 저장
    saveTokens(accessToken, refreshToken);
    console.log('Access Token:', localStorage.getItem('accessToken'));
    console.log('Refresh Token:', localStorage.getItem('refreshToken'));

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

