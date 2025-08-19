import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ensureKakaoInitialized, getRedirectUri } from '../utils/kakao';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 40px 20px;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #212529;
  margin: 0 0 12px 0;
`;

const Message = styled.p`
  font-size: 16px;
  color: #6c757d;
  margin: 0 0 32px 0;
  line-height: 1.5;
`;

const KakaoButton = styled.button`
  background: linear-gradient(135deg, #FEE500 0%, #FFD700 100%);
  color: #000000;
  border: none;
  border-radius: 12px;
  padding: 16px 32px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(254, 229, 0, 0.3);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(254, 229, 0, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const SmallButton = styled.button`
  margin-top: 12px;
  background: transparent;
  color: #6c757d;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 12px;
  cursor: pointer;
`;

const KakaoLoginPage = () => {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setAuthFromExternalLogin } = useAuth();

  useEffect(() => {
    ensureKakaoInitialized()
      .then(() => setReady(true))
      .catch((e) => setError(e.message || '카카오 초기화 중 오류가 발생했습니다.'));
  }, []);

  const handleKakaoLogin = useCallback(() => {
    const redirectUri = getRedirectUri('/redirect');
    const restKey = import.meta?.env?.VITE_KAKAO_REST_KEY;

    if (restKey) {
      const params = new URLSearchParams({
        client_id: restKey,
        redirect_uri: redirectUri,
        response_type: 'token',
        scope: 'profile_nickname account_email',
      });
      window.location.href = `https://kauth.kakao.com/oauth/authorize?${params.toString()}`;
      return;
    }

    if (!window.Kakao) return;
    window.Kakao.Auth.authorize({
      redirectUri,
      scope: 'profile_nickname, account_email',
    });
  }, []);

  const handleMockLogin = useCallback(() => {
    const mockUser = {
      id: 'mock-uid',
      nickname: '개발용 사용자',
      profileImage: 'https://via.placeholder.com/100',
      email: 'dev@example.com',
    };
    const token = 'mock_token';
    try {
      localStorage.setItem('kakao_token', token);
      localStorage.setItem('kakao_user', JSON.stringify(mockUser));
    } catch {}
    if (typeof setAuthFromExternalLogin === 'function') {
      setAuthFromExternalLogin(token, mockUser);
    }
    navigate('/', { replace: true });
  }, [navigate, setAuthFromExternalLogin]);

  return (
    <Container>
      <Title>카카오 로그인</Title>
      <Message>카카오 계정으로 간편하게 로그인하세요.</Message>
      {error ? (
        <Message style={{ color: '#dc3545' }}>{error}</Message>
      ) : (
        <KakaoButton onClick={handleKakaoLogin} disabled={!ready}>
          카카오로 로그인하기
        </KakaoButton>
      )}
      <SmallButton onClick={handleMockLogin}>개발용 바로 로그인</SmallButton>
    </Container>
  );
};

export default KakaoLoginPage;


