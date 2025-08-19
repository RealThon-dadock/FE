import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';

const LoginRequiredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 40px 20px;
  text-align: center;
`;

const LoginIcon = styled.div`
  font-size: 64px;
  margin-bottom: 24px;
  opacity: 0.6;
`;

const LoginTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #212529;
  margin: 0 0 12px 0;
`;

const LoginMessage = styled.p`
  font-size: 16px;
  color: #6c757d;
  margin: 0 0 32px 0;
  line-height: 1.5;
`;

const LoginButton = styled.button`
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

const LoginRequired = ({ title = "로그인이 필요합니다", message = "로그인 후 사용해 주세요!" }) => {
  const { login } = useAuth();

  return (
    <LoginRequiredContainer>
      <LoginIcon>🔐</LoginIcon>
      <LoginTitle>{title}</LoginTitle>
      <LoginMessage>{message}</LoginMessage>
      <LoginButton onClick={login}>
        카카오로 로그인하기
      </LoginButton>
    </LoginRequiredContainer>
  );
};

export default LoginRequired;
