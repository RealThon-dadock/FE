// Kakao JS SDK 로더 및 초기화 유틸리티
// 환경변수 VITE_KAKAO_JS_KEY 사용 (사용자가 설정)

let kakaoInitPromise = null;

export function loadKakaoSdk() {
  if (typeof window === 'undefined') return Promise.reject(new Error('Window is not available'));
  if (window.Kakao) return Promise.resolve(window.Kakao);

  return new Promise((resolve, reject) => {
    const existing = document.querySelector('script[data-kakao-sdk]');
    if (existing) {
      existing.addEventListener('load', () => resolve(window.Kakao));
      existing.addEventListener('error', () => reject(new Error('Kakao SDK load error')));
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js';
    script.async = true;
    script.defer = true;
    script.setAttribute('data-kakao-sdk', 'true');
    script.onload = () => resolve(window.Kakao);
    script.onerror = () => reject(new Error('Kakao SDK load error'));
    document.head.appendChild(script);
  });
}

export function ensureKakaoInitialized() {
  if (kakaoInitPromise) return kakaoInitPromise;

  kakaoInitPromise = loadKakaoSdk().then((Kakao) => {
    if (!Kakao.isInitialized()) {
      const appKey = import.meta?.env?.VITE_KAKAO_JS_KEY;
      if (!appKey) {
        throw new Error('VITE_KAKAO_JS_KEY 환경변수가 설정되지 않았습니다.');
      }
      Kakao.init(appKey);
    }
    return Kakao;
  });

  return kakaoInitPromise;
}

export function getRedirectUri(defaultPath = '/redirect') {
  const envUri = import.meta?.env?.VITE_KAKAO_REDIRECT_URI;
  if (envUri) return envUri;
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  return `${origin}${defaultPath}`;
}


