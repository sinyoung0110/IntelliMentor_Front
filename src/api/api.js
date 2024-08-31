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
        // x-Refresh-Token 헤더를 요청에서 제외함
        delete config.headers['X-Refresh-Token'];
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// 응답 인터셉터 설정
api.interceptors.response.use(
    async response => {
        return response; // 정상적인 응답일 경우 그냥 반환
    },
    async error => {
        const originalRequest = error.config;
        const errorData = error.response?.data;

        if (errorData?.cause === 'Expired' && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                // 토큰 갱신 요청
                const refreshToken = localStorage.getItem('refreshToken');
                const tokenRefreshResponse = await axios.post(`${host}/api/member/refresh`, {}, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                        'X-Refresh-Token': refreshToken
                    }
                });

                // 응답에서 새로운 토큰을 저장
                if (tokenRefreshResponse.status === 200) {
                    const { accessToken, refreshToken } = tokenRefreshResponse.data;
                    saveTokens(accessToken, refreshToken);
                    originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                    console.log('Access token refreshed successfully.');
                    return api(originalRequest);
                } else {
                    console.log('Failed to refresh access token.');
                    handleTokenError(tokenRefreshResponse.data);
                }
            } catch (refreshError) {
                console.error('Error refreshing access token:', refreshError);
                handleTokenError(refreshError.response?.data || {});
                return Promise.reject(refreshError);
            }
        } else {
            handleTokenError(errorData);
        }

        return Promise.reject(error);
    }
);

export default api;
