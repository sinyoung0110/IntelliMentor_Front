import apiClient from './api';

// 토큰 갱신 API
export const refreshToken = async (refreshToken) => {
  return apiClient.post('/api/member/refresh', { refreshToken });
};
