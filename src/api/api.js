import axios from 'axios';

// 환경 변수에서 API 서버 호스트 가져오기
const host = process.env.REACT_APP_API_SERVER_HOST;

// 로그인 후 토큰 저장
function saveTokens(accessToken, refreshToken) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
}

// 오류 메시지 처리 함수
function handleTokenError(errorData) {
    let errorMessage = '';

    if (errorData.error === 'ERROR_ACCESS_TOKEN') {
        switch (errorData.cause) {
            case 'Expired':
                errorMessage = 'Access token has expired. Please log in again.';
                break;
            case 'MalFormed':
                errorMessage = 'The token format is incorrect. Please try logging in again.';
                break;
            case 'Invalid':
                errorMessage = 'Invalid token. Please try logging in again.';
                break;
            case 'JWTError':
                errorMessage = 'An error occurred while processing the token. Please try again.';
                break;
            case 'Error':
            default:
                errorMessage = 'An unexpected error occurred. Please try again.';
                break;
        }
    } else {
        errorMessage = 'An unknown error occurred. Please try again.';
    }

    // 사용자에게 알림 표시
    alert(errorMessage);
}

// Axios 인스턴스 생성 및 인터셉터 설정
const api = axios.create({
    baseURL: `${host}`,
    headers: {
        "Content-Type": "application/json"
    }
});

// 요청 인터셉터 설정
api.interceptors.request.use(
    config => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        // x-Refresh-Token 헤더를 제거하여 모든 요청에 포함되지 않도록 함
        delete config.headers['x-Refresh-Token'];
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// 응답 인터셉터 설정
api.interceptors.response.use(
    response => {
        return response;
    },
    async error => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // 토큰 갱신 요청
                const response = await axios.post(`${host}/api/member/refresh`, {}, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                        'x-Refresh-Token': localStorage.getItem('refreshToken')
                    }
                });

                if (response.status === 200) {
                    const { accessToken, refreshToken } = response.data;
                    saveTokens(accessToken, refreshToken);
                    originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                    return api(originalRequest);
                }
            } catch (refreshError) {
                if (refreshError.response && refreshError.response.data) {
                    handleTokenError(refreshError.response.data);
                } else {
                    alert('An unexpected error occurred during token refresh.');
                }
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
