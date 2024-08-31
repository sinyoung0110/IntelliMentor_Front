import axios from 'axios';

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
                errorMessage = 'Access token has expired. Refreshing...';
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

    // 사용자에게 알림 표시 (예: 토스트 메시지)
    alert(errorMessage);
}

// Axios 인스턴스 생성
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

        // Refresh 요청 시 X-Refresh-Token 헤더 추가
        if (config.url.includes("/refresh")) {
            const refreshToken = localStorage.getItem('refreshToken');
            if (refreshToken) {
                config.headers['X-Refresh-Token'] = refreshToken;
            }
        }

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
        const errorData = error.response?.data;

        // Access Token이 만료된 경우
        if (errorData?.error === 'ERROR_ACCESS_TOKEN' && errorData.cause === 'Expired' && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem('refreshToken');
                const accessToken = localStorage.getItem('accessToken');

                // Refresh 요청 시 기존 Axios 인스턴스가 아닌 기본 Axios 사용
                const tokenRefreshResponse = await axios.post(`${host}/api/member/refresh`, {}, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'X-Refresh-Token': refreshToken
                    }
                });

                if (tokenRefreshResponse.status === 200) {
                    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = tokenRefreshResponse.data;
                    saveTokens(newAccessToken, newRefreshToken);
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return api(originalRequest);
                } else {
                    handleTokenError(tokenRefreshResponse.data);
                }
            } catch (refreshError) {
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
