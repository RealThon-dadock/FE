import React from 'react';
import styled from 'styled-components';
import { MessageCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import LoginRequired from '../components/LoginRequired';

const ChatContainer = styled.div`
  max-width: 480px;
  margin: 0 auto;
  background-color: #f8f9fa;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const ChatContent = styled.div`
  padding: 20px;
  padding-top: 40px;
  text-align: center;
  color: #6c757d;
`;

const ChatIcon = styled.div`
  font-size: 64px;
  margin-bottom: 16px;
  opacity: 0.6;
`;

const ChatTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #212529;
  margin: 0 0 8px 0;
`;

const ChatMessage = styled.p`
  font-size: 16px;
  margin: 0;
  line-height: 1.5;
`;

const ChatPage = () => {
  const { isLoggedIn, isLoading } = useAuth();

  // 로딩 중인 경우
  if (isLoading) {
    return (
      <ChatContainer>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          로딩 중...
        </div>
      </ChatContainer>
    );
  }

  // 로그인하지 않은 경우
  if (!isLoggedIn) {
    return (
      <ChatContainer>
        <LoginRequired 
          title="로그인이 필요합니다"
          message="로그인 후 채팅 기능을 사용할 수 있습니다!"
        />
      </ChatContainer>
    );
  }

  // 로그인한 경우 (채팅 기능 구현 예정)
  return (
    <ChatContainer>
      <ChatContent>
        <ChatIcon>💬</ChatIcon>
        <ChatTitle>채팅 기능</ChatTitle>
        <ChatMessage>
          채팅 기능은 현재 개발 중입니다.<br />
          곧 만나보실 수 있어요!
        </ChatMessage>
      </ChatContent>
    </ChatContainer>
  );
};

export default ChatPage;
