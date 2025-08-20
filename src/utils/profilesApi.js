import { apiFetch } from './apiClient';

const PROFILE_ME_PATH = import.meta?.env?.VITE_PROFILE_ME_PATH || '/api/profiles/me';
const PROFILE_CREATE_PATH = import.meta?.env?.VITE_PROFILE_CREATE_PATH || '/api/profiles';

export async function getMyProfile() {
  try {
    const data = await apiFetch(PROFILE_ME_PATH, { method: 'GET' });
    return { exists: true, data };
  } catch (error) {
    if (error?.status === 404 || error?.status === 204) {
      return { exists: false, data: null };
    }
    throw error;
  }
}

export async function createMyProfile(payload) {
  // payload can be { role } or { name, birth, email, role }
  const data = await apiFetch(PROFILE_CREATE_PATH, { method: 'POST', body: payload });
  return data;
}


