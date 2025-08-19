import React, { createContext, useContext, useState, useEffect } from 'react';

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
  const [userMode, setUserMode] = useState('general'); // 'general' 또는 'expert'

  // 초기 로그인 상태 확인
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('kakao_token');
      const userInfo = localStorage.getItem('kakao_user');
      const savedUserMode = localStorage.getItem('userMode');
      
      if (token && userInfo) {
        setIsLoggedIn(true);
        setUser(JSON.parse(userInfo));
      }
      
      if (savedUserMode) {
        setUserMode(savedUserMode);
      }
      
      setIsLoading(false);
    };

    checkLoginStatus();
  }, []);

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

  // 사용자 모드 업데이트
  const updateUserMode = (mode) => {
    setUserMode(mode);
    localStorage.setItem('userMode', mode);
  };

  const value = {
    isLoggedIn,
    user,
    userMode,
    isLoading,
    login,
    logout,
    setAuthFromExternalLogin,
    updateUserMode
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
