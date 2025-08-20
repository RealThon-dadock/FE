import React, { createContext, useContext, useState, useEffect } from 'react';
import { getMyProfile } from '../utils/profilesApi';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [isProfileLoaded, setIsProfileLoaded] = useState(false);

  // 초기 로그인 상태 확인
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('kakao_token');
      const userInfo = localStorage.getItem('kakao_user');
      
      if (token && userInfo) {
        setIsLoggedIn(true);
        setUser(JSON.parse(userInfo));
      }
      setIsLoading(false);
    };

    checkLoginStatus();
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function loadProfile() {
      if (!isLoggedIn) {
        setProfile(null);
        setIsProfileLoaded(true);
        return;
      }
      setIsProfileLoaded(false);
      try {
        const result = await getMyProfile();
        if (cancelled) return;
        setProfile(result.exists ? result.data : null);
      } catch (e) {
        if (cancelled) return;
        console.error('프로필 조회 실패:', e);
        setProfile(null);
      } finally {
        if (!cancelled) setIsProfileLoaded(true);
      }
    }
    loadProfile();
    return () => { cancelled = true; };
  }, [isLoggedIn]);

  // 카카오 로그인
  const login = async () => {
    try {
      // 카카오 SDK 초기화 (실제 구현 시에는 카카오 SDK를 추가해야 함)
      if (window.Kakao) {
        window.Kakao.Auth.login({
          success: (authObj) => {
            // 액세스 토큰 저장
            localStorage.setItem('kakao_token', authObj.access_token);
            
            // 사용자 정보 가져오기
            window.Kakao.API.request({
              url: '/v2/user/me',
              success: (res) => {
                const userInfo = {
                  id: res.id,
                  nickname: res.properties.nickname,
                  profileImage: res.properties.profile_image,
                  email: res.kakao_account.email
                };
                
                localStorage.setItem('kakao_user', JSON.stringify(userInfo));
                setUser(userInfo);
                setIsLoggedIn(true);
              },
              fail: (error) => {
                console.error('사용자 정보 가져오기 실패:', error);
              }
            });
          },
          fail: (error) => {
            console.error('카카오 로그인 실패:', error);
          }
        });
      } else {
        // 카카오 SDK가 없는 경우 임시 로그인 (개발용)
        const mockUser = {
          id: '12345',
          nickname: '테스트 사용자',
          profileImage: 'https://via.placeholder.com/100',
          email: 'test@example.com'
        };
        
        localStorage.setItem('kakao_token', 'mock_token');
        localStorage.setItem('kakao_user', JSON.stringify(mockUser));
        setUser(mockUser);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('로그인 오류:', error);
    }
  };

  // 로그아웃
  const logout = () => {
    localStorage.removeItem('kakao_token');
    localStorage.removeItem('kakao_user');
    setIsLoggedIn(false);
    setUser(null);
    
    // 카카오 로그아웃 (실제 구현 시)
    if (window.Kakao) {
      window.Kakao.Auth.logout();
    }
  };

  // 리다이렉트 기반 외부 로그인(카카오) 완료 시 컨텍스트 갱신용
  const setAuthFromExternalLogin = (token, userInfo) => {
    if (token) {
      localStorage.setItem('kakao_token', token);
    }
    if (userInfo) {
      localStorage.setItem('kakao_user', JSON.stringify(userInfo));
      setUser(userInfo);
    }
    setIsLoggedIn(Boolean(token && userInfo));
  };

  const refreshProfile = async () => {
    try {
      setIsProfileLoaded(false);
      const result = await getMyProfile();
      setProfile(result.exists ? result.data : null);
    } finally {
      setIsProfileLoaded(true);
    }
  };

  const updateProfile = async (updatedProfileData) => {
    try {
      // 프로필 업데이트 (실제로는 API 호출)
      localStorage.setItem('user_profile', JSON.stringify(updatedProfileData));
      
      // 프로필 상태 업데이트
      setProfile(updatedProfileData);
      
      // 닉네임이 변경된 경우 user 정보도 업데이트
      if (updatedProfileData.nickname && updatedProfileData.nickname !== user?.nickname) {
        const updatedUser = { ...user, nickname: updatedProfileData.nickname };
        setUser(updatedUser);
        localStorage.setItem('kakao_user', JSON.stringify(updatedUser));
      }
      
      return true;
    } catch (error) {
      console.error('프로필 업데이트 실패:', error);
      return false;
    }
  };

  const value = {
    isLoggedIn,
    user,
    isLoading,
    profile,
    isProfileLoaded,
    login,
    logout,
    setAuthFromExternalLogin,
    setProfile,
    refreshProfile,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
