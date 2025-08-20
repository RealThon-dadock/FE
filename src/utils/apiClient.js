import axios from 'axios';

const API_BASE_URL = import.meta?.env?.VITE_API_BASE_URL || '';

export function getCurrentUserId() {
  try {
    const raw = typeof window !== 'undefined' ? localStorage.getItem('kakao_user') : null;
    if (!raw) return undefined;
    const user = JSON.parse(raw);
    return user?.id;
  } catch {
    return undefined;
  }
}

const api = axios.create({
  baseURL: API_BASE_URL || undefined,
  withCredentials: true,
  headers: { Accept: 'application/json' }
});

api.interceptors.request.use((config) => {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('kakao_token') : null;
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch {}
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error?.response?.status;
    const data = error?.response?.data;
    const message = data?.message || error.message || 'API request failed';
    const wrapped = new Error(message);
    wrapped.status = status;
    wrapped.data = data;
    return Promise.reject(wrapped);
  }
);

export async function apiFetch(path, { method = 'GET', query, body, headers } = {}) {
  // If no API_BASE_URL is configured, throw a specific error for fallback handling
  if (!API_BASE_URL) {
    const error = new Error('Backend not configured');
    error.status = 'NO_BACKEND';
    throw error;
  }
  
  const res = await api.request({ url: path, method, params: query, data: body, headers });
  return res.data;
}

export default api;


