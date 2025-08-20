import { apiFetch } from './apiClient';

const PROFILE_ME_PATH = import.meta?.env?.VITE_PROFILE_ME_PATH || '/api/profiles/me';
const PROFILE_CREATE_PATH = import.meta?.env?.VITE_PROFILE_CREATE_PATH || '/api/profiles';

export async function getMyProfile() {
  try {
    const data = await apiFetch(PROFILE_ME_PATH, { method: 'GET' });
    return { exists: true, data };
  } catch (error) {
    if (error?.status === 404 || error?.status === 204 || error?.status === 'NO_BACKEND') {
      // Backend not available, fallback to localStorage
      console.warn('Backend not available, using localStorage fallback:', error.message);
      try {
        const stored = localStorage.getItem('user_profile');
        if (stored) {
          return { exists: true, data: JSON.parse(stored) };
        }
        return { exists: false, data: null };
      } catch {
        return { exists: false, data: null };
      }
    }
    throw error;
  }
}

export async function createMyProfile(payload) {
  // payload can be { role } or { name, birth, email, role }
  try {
    const data = await apiFetch(PROFILE_CREATE_PATH, { method: 'POST', body: payload });
    return data;
  } catch (error) {
    if (error?.status === 'NO_BACKEND') {
      // Backend not available, fallback to localStorage
      console.warn('Backend not available, using localStorage fallback:', error.message);
      const profile = {
        id: Date.now(),
        ...payload,
        createdAt: new Date().toISOString()
      };
      localStorage.setItem('user_profile', JSON.stringify(profile));
      return profile;
    }
    throw error;
  }
}


