// 로컬 스토리지에서 액세스 토큰을 가져오는 함수
export const getAccessToken = () => {
    return localStorage.getItem('accessToken');
  };
  
  // 로컬 스토리지에 액세스 토큰을 저장하는 함수
  export const setAccessToken = (token) => {
    localStorage.setItem('accessToken', token);
  };
  
  // 로컬 스토리지에서 리프레시 토큰을 가져오는 함수
  export const getRefreshToken = () => {
    return localStorage.getItem('refreshToken');
  };
  