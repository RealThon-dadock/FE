import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ensureKakaoInitialized } from '../utils/kakao';
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
    let cancelled = false;
    ensureKakaoInitialized()
      .then(() => {
        const token = parseAccessTokenFromHash(window.location.hash);
        if (!token) {
          setError('엑세스 토큰을 찾을 수 없습니다.');
          return;
        }

        window.Kakao.Auth.setAccessToken(token);
        localStorage.setItem('kakao_token', token);

        window.Kakao.API.request({
          url: '/v2/user/me',
          success: (res) => {
            if (cancelled) return;
            const userInfo = {
              id: res.id,
              nickname: res?.properties?.nickname,
              profileImage: res?.properties?.profile_image,
              email: res?.kakao_account?.email || null,
            };
            localStorage.setItem('kakao_user', JSON.stringify(userInfo));
            if (typeof setAuthFromExternalLogin === 'function') {
              setAuthFromExternalLogin(token, userInfo);
            }
            navigate('/', { replace: true });
          },
          fail: (apiError) => {
            if (cancelled) return;
            console.error('사용자 정보 가져오기 실패:', apiError);
            setError('사용자 정보를 가져오지 못했습니다.');
          },
        });
      })
      .catch((e) => setError(e.message || '카카오 초기화 중 오류가 발생했습니다.'));

    return () => {
      cancelled = true;
    };
  }, [navigate, setError, setAuthFromExternalLogin]);

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


