import axios from 'axios';

// 환경 변수에서 API 서버 호스트 가져오기
const host = process.env.REACT_APP_API_SERVER_HOST;

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: `${host}`, // 서버의 기본 URL 설정
  headers: {
    "Content-Type": "application/json"
  }
});

// 요청 인터셉터 설정
apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// 응답 인터셉터 설정
apiClient.interceptors.response.use(
  response => response,
  async error => {
    const { response } = error;
    
    if (response && response.status === 401 && response.data.message === "Token expired") {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        // 리프레시 토큰이 없으면 로그아웃 처리
        // 예: 로그아웃 및 로그인 페이지 리디렉션
        return Promise.reject(error);
      }
      
      try {
        // 새 액세스 토큰 요청
        const { data } = await apiClient.post(`${host}/api/refresh`, { refreshToken });
        const newAccessToken = data.accessToken;
        localStorage.setItem('accessToken', newAccessToken); // 새로운 액세스 토큰을 로컬 스토리지에 저장

        // 실패한 요청을 새 토큰으로 재시도
        error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axios(error.config);
      } catch (refreshError) {
        // 토큰 갱신 실패 처리
        // 예: 로그아웃 및 로그인 페이지 리디렉션
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error); // 다른 오류는 그대로 전달
  }
);

export default apiClient;
