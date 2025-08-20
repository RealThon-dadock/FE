import axios from 'axios';

// API 기본 설정
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 응답 인터셉터 - 에러 처리
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 인증 에러 시 로그인 페이지로 리다이렉트
      localStorage.removeItem('kakao_token');
      localStorage.removeItem('kakao_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

/**
 * 카카오 인가코드를 백엔드로 전송하여 토큰과 사용자 정보를 받아옴
 * @param {string} authorizeCode - 카카오에서 받은 인가코드
 * @returns {Promise<Object>} 인증 결과
 * @returns {string} returns.accessToken - 액세스 토큰
 * @returns {Object} returns.user - 사용자 정보
 * @returns {number} returns.user.id - 사용자 ID
 * @returns {string} returns.user.nickname - 사용자 닉네임
 * @returns {string} returns.user.profileImage - 프로필 이미지 URL
 * @returns {string} returns.user.email - 이메일
 */
export const sendKakaoAuthCode = async (authorizeCode) => {
  try {
    const response = await apiClient.post('/auth/kakao', {
      authorize: authorizeCode
    });
    return response.data;
  } catch (error) {
    throw new Error('카카오 로그인 처리에 실패했습니다.');
  }
};

/**
 * 토큰 갱신
 * @param {string} refreshToken - 리프레시 토큰
 * @returns {Promise<Object>} 갱신된 토큰 정보
 * @returns {string} returns.accessToken - 새로운 액세스 토큰
 * @returns {string} returns.refreshToken - 새로운 리프레시 토큰
 */
export const refreshToken = async (refreshToken) => {
  try {
    const response = await apiClient.post('/auth/refresh', {
      refreshToken
    });
    return response.data;
  } catch (error) {
    throw new Error('토큰 갱신에 실패했습니다.');
  }
};

/**
 * 로그아웃
 * @returns {Promise<Object>} 로그아웃 결과
 */
export const logout = async () => {
  try {
    const response = await apiClient.post('/auth/logout');
    return response.data;
  } catch (error) {
    throw new Error('로그아웃 처리에 실패했습니다.');
  }
};

export default {
  sendKakaoAuthCode,
  refreshToken,
  logout,
};
