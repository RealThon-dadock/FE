import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

const Redirect = () => {
  const code = new URL(document.location.toString()).searchParams.get('code');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('현재 URL:', window.location.href);
    console.log('VITE_REDIRECT_URI:', import.meta.env.VITE_REDIRECT_URI);
    console.log('인가코드:', code);

    // 인가코드가 없으면 에러 처리
    if (!code) {
      console.error('인가코드를 찾을 수 없습니다.');
      setError('인가코드를 찾을 수 없습니다. 다시 로그인해주세요.');
      return;
    }

    // 백엔드 URL이 없으면 에러 처리
    if (!import.meta.env.VITE_BACKEND_URL) {
      console.error('백엔드 URL이 설정되지 않았습니다.');
      setError('서버 설정 오류입니다.');
      return;
    }

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/kakao/login`, {
        code: code, // 🔥 여기! body에 담아 보냄
      })
      .then((r) => {
        console.log('성공');
        console.log(r);

        // 토큰 저장
        localStorage.setItem('accessToken', r.data.data.token.accessToken);
        localStorage.setItem('userEmail', r.data.userEmail);
        localStorage.setItem('id', r.data.data.id);
        localStorage.setItem('name', r.data.data.name);
        console.log('로컬스토리지 저장 완료');

        navigate('/');
      })
      .catch((err) => {
        console.error('로그인 실패', err.response || err);
        setError('로그인 처리에 실패했습니다.');
      });
  }, [navigate, code]);

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


