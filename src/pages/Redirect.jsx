import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

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

function parseAccessTokenFromHash(hashString) {
  if (!hashString) return null;
  const params = new URLSearchParams(hashString.replace(/^#/, ''));
  return params.get('access_token');
}

const Redirect = () => {
  const navigate = useNavigate();
  const { setAuthFromExternalLogin } = useAuth();
  const [error, setError] = useState('');

  useEffect(() => {
    const token = parseAccessTokenFromHash(window.location.hash);
    if (!token) {
      setError('엑세스 토큰을 찾을 수 없습니다.');
      return;
    }

    // 토큰을 로컬스토리지에 저장
    localStorage.setItem('kakao_token', token);

    // 간단한 사용자 정보 생성 (실제로는 서버에서 토큰을 검증하고 사용자 정보를 가져와야 함)
    const userInfo = {
      id: 'temp-user-id',
      nickname: '카카오 사용자',
      profileImage: null,
      email: null,
    };

    localStorage.setItem('kakao_user', JSON.stringify(userInfo));
    
    if (typeof setAuthFromExternalLogin === 'function') {
      setAuthFromExternalLogin(token, userInfo);
    }
    
    navigate('/', { replace: true });
  }, [navigate, setAuthFromExternalLogin]);

  return (
    <Container>
      <Title>로그인 처리 중...</Title>
      {error ? (
        <Message style={{ color: '#dc3545' }}>{error}</Message>
      ) : (
        <Message>잠시만 기다려 주세요.</Message>
      )}
    </Container>
  );
};

export default Redirect;


