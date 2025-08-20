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

// 요청 인터셉터 - 토큰 자동 추가
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('kakao_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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

// 게시판 CRUD API 함수들

/**
 * 게시글 생성 (Create)
 * @param {Object} bookData - 게시글 데이터
 * @param {number} bookData.userId - 사용자 ID
 * @param {string} bookData.title - 제목
 * @param {string} bookData.content - 내용
 * @param {string} bookData.status - 상태 (CONTINUE/END)
 * @param {string} bookData.visibility - 공개 여부 (PUBLIC/PRIVATE)
 * @param {string} bookData.color - 색깔 (RED/BLUE/YELLOW 중 하나)
 * @returns {Promise<Object>} 생성된 게시글 정보
 * @returns {number} returns.id - 게시글 ID
 * @returns {number} returns.userId - 사용자 ID
 * @returns {string} returns.title - 제목
 * @returns {string} returns.content - 내용
 * @returns {string} returns.status - 상태
 * @returns {string} returns.visibility - 공개 여부
 * @returns {string} returns.color - 색깔
 * @returns {string} returns.createdAt - 생성 시간
 * @returns {string} returns.updatedAt - 수정 시간
 */
export const createBook = async (bookData) => {
  try {
    const response = await apiClient.post('/books', bookData);
    return response.data;
  } catch (error) {
    throw new Error('게시글 작성에 실패했습니다.');
  }
};

/**
 * 게시글 삭제 (Delete)
 * @param {string} bookId - 게시글 ID
 * @param {number} actorUserId - 삭제를 요청하는 사용자 ID
 * @returns {Promise<Object>} 삭제 결과
 * @returns {string} returns.message - 삭제 메시지
 * @returns {number} returns.bookId - 삭제된 게시글 ID
 */
export const deleteBook = async (bookId, actorUserId) => {
  try {
    const response = await apiClient.delete(`/books/${bookId}?actorUserId=${actorUserId}`);
    return response.data;
  } catch (error) {
    throw new Error('게시글 삭제에 실패했습니다.');
  }
};

/**
 * 게시글 수정 (Update)
 * @param {string} bookId - 게시글 ID
 * @param {number} actorUserId - 수정을 요청하는 사용자 ID
 * @param {Object} bookData - 수정할 게시글 데이터
 * @param {string} bookData.title - 제목
 * @param {string} bookData.content - 내용
 * @param {string} bookData.status - 상태 (CONTINUE/END)
 * @param {string} bookData.visibility - 공개 여부 (PUBLIC/PRIVATE)
 * @param {string} bookData.color - 색깔 (RED/BLUE/YELLOW 중 하나)
 * @returns {Promise<Object>} 수정된 게시글 정보
 * @returns {number} returns.id - 게시글 ID
 * @returns {number} returns.userId - 사용자 ID
 * @returns {string} returns.title - 제목
 * @returns {string} returns.content - 내용
 * @returns {string} returns.status - 상태
 * @returns {string} returns.visibility - 공개 여부
 * @returns {string} returns.color - 색깔
 * @returns {string} returns.createdAt - 생성 시간
 * @returns {string} returns.updatedAt - 수정 시간
 */
export const updateBook = async (bookId, actorUserId, bookData) => {
  try {
    const response = await apiClient.patch(`/books/${bookId}?actorUserId=${actorUserId}`, bookData);
    return response.data;
  } catch (error) {
    throw new Error('게시글 수정에 실패했습니다.');
  }
};

/**
 * 게시글 상세 조회 (Read)
 * @param {string} bookId - 게시글 ID
 * @returns {Promise<Object>} 게시글 정보
 * @returns {number} returns.id - 게시글 ID
 * @returns {number} returns.userId - 사용자 ID
 * @returns {string} returns.title - 제목
 * @returns {string} returns.content - 내용
 * @returns {string} returns.status - 상태
 * @returns {string} returns.visibility - 공개 여부
 * @returns {string} returns.color - 색깔
 * @returns {string} returns.createdAt - 생성 시간
 * @returns {string} returns.updatedAt - 수정 시간
 */
export const getBook = async (bookId) => {
  try {
    const response = await apiClient.get(`/books/${bookId}`);
    return response.data;
  } catch (error) {
    throw new Error('게시글을 불러오는데 실패했습니다.');
  }
};

/**
 * 게시글 목록 조회 (Read)
 * @param {Object} params - 쿼리 파라미터
 * @param {number} params.page - 페이지 번호
 * @param {number} params.limit - 페이지당 게시글 수
 * @param {string} params.search - 검색어
 * @returns {Promise<Object>} 게시글 목록
 * @returns {Array<Object>} returns.books - 게시글 배열
 * @returns {number} returns.total - 전체 게시글 수
 * @returns {number} returns.page - 현재 페이지
 * @returns {number} returns.limit - 페이지당 게시글 수
 */
export const getBooks = async (params = {}) => {
  try {
    const response = await apiClient.get('/books', { params });
    return response.data;
  } catch (error) {
    throw new Error('게시글 목록을 불러오는데 실패했습니다.');
  }
};

/**
 * 게시글 좋아요/좋아요 취소
 * @param {string} bookId - 게시글 ID
 * @returns {Promise<Object>} 좋아요 처리 결과
 */
export const toggleBookLike = async (bookId) => {
  try {
    const response = await apiClient.post(`/books/${bookId}/like`);
    return response.data;
  } catch (error) {
    throw new Error('좋아요 처리에 실패했습니다.');
  }
};

/**
 * 게시글 댓글 목록 조회
 * @param {string} bookId - 게시글 ID
 * @param {Object} params - 쿼리 파라미터
 * @param {number} params.page - 페이지 번호
 * @param {number} params.limit - 페이지당 댓글 수
 * @returns {Promise<Object>} 댓글 목록
 */
export const getBookComments = async (bookId, params = {}) => {
  try {
    const response = await apiClient.get(`/books/${bookId}/comments`, { params });
    return response.data;
  } catch (error) {
    throw new Error('댓글 목록을 불러오는데 실패했습니다.');
  }
};

/**
 * 게시글에 댓글 작성
 * @param {string} bookId - 게시글 ID
 * @param {Object} commentData - 댓글 데이터
 * @param {string} commentData.content - 댓글 내용
 * @param {string} commentData.parentId - 부모 댓글 ID (대댓글인 경우)
 * @returns {Promise<Object>} 생성된 댓글 정보
 */
export const createBookComment = async (bookId, commentData) => {
  try {
    const response = await apiClient.post(`/books/${bookId}/comments`, commentData);
    return response.data;
  } catch (error) {
    throw new Error('댓글 작성에 실패했습니다.');
  }
};

/**
 * 댓글 수정
 * @param {string} bookId - 게시글 ID
 * @param {string} commentId - 댓글 ID
 * @param {Object} commentData - 수정할 댓글 데이터
 * @param {string} commentData.content - 댓글 내용
 * @returns {Promise<Object>} 수정된 댓글 정보
 */
export const updateBookComment = async (bookId, commentId, commentData) => {
  try {
    const response = await apiClient.put(`/books/${bookId}/comments/${commentId}`, commentData);
    return response.data;
  } catch (error) {
    throw new Error('댓글 수정에 실패했습니다.');
  }
};

/**
 * 댓글 삭제
 * @param {string} bookId - 게시글 ID
 * @param {string} commentId - 댓글 ID
 * @returns {Promise<Object>} 삭제 결과
 */
export const deleteBookComment = async (bookId, commentId) => {
  try {
    const response = await apiClient.delete(`/books/${bookId}/comments/${commentId}`);
    return response.data;
  } catch (error) {
    throw new Error('댓글 삭제에 실패했습니다.');
  }
};

/**
 * 내가 작성한 게시글 목록 조회
 * @param {Object} params - 쿼리 파라미터
 * @param {number} params.page - 페이지 번호
 * @param {number} params.limit - 페이지당 게시글 수
 * @returns {Promise<Object>} 내 게시글 목록
 */
export const getMyBooks = async (params = {}) => {
  try {
    const response = await apiClient.get('/books/my', { params });
    return response.data;
  } catch (error) {
    throw new Error('내 게시글 목록을 불러오는데 실패했습니다.');
  }
};

/**
 * 내가 좋아요한 게시글 목록 조회
 * @param {Object} params - 쿼리 파라미터
 * @param {number} params.page - 페이지 번호
 * @param {number} params.limit - 페이지당 게시글 수
 * @returns {Promise<Object>} 좋아요한 게시글 목록
 */
export const getLikedBooks = async (params = {}) => {
  try {
    const response = await apiClient.get('/books/liked', { params });
    return response.data;
  } catch (error) {
    throw new Error('좋아요한 게시글 목록을 불러오는데 실패했습니다.');
  }
};

export default {
  createBook,
  deleteBook,
  updateBook,
  getBook,
  getBooks,
  toggleBookLike,
  getBookComments,
  createBookComment,
  updateBookComment,
  deleteBookComment,
  getMyBooks,
  getLikedBooks,
};
