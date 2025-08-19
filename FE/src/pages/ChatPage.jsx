import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ArrowLeft, Bell, Send } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoginRequired from '../components/LoginRequired';

const ChatContainer = styled.div`
  max-width: 480px;
  margin: 0 auto;
  background-color: #f8f9fa;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background-color: white;
  border-bottom: 1px solid #e9ecef;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6B7280;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const ExpertInfo = styled.div`
  margin-left: 12px;
`;

const ExpertName = styled.h1`
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0;
`;

const ExpertDate = styled.p`
  font-size: 12px;
  color: #6c757d;
  margin: 4px 0 0 0;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
`;

const NotificationButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6B7280;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const ChatContent = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const MessageBubble = styled.div`
  max-width: 70%;
  padding: 12px 16px;
  border-radius: 18px;
  font-size: 14px;
  line-height: 1.4;
  word-wrap: break-word;
  
  ${props => props.isUser ? `
    background-color: #007bff;
    color: white;
    align-self: flex-end;
    border-bottom-right-radius: 4px;
  ` : `
    background-color: white;
    color: #212529;
    align-self: flex-start;
    border-bottom-left-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  `}
`;

const MessageInput = styled.div`
  padding: 16px 20px;
  background-color: white;
  border-top: 1px solid #e9ecef;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const InputField = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #dee2e6;
  border-radius: 24px;
  font-size: 14px;
  outline: none;
  
  &:focus {
    border-color: #007bff;
  }
  
  &::placeholder {
    color: #adb5bd;
  }
`;

const SendButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #0056b3;
  }
  
  &:disabled {
    background-color: #adb5bd;
    cursor: not-allowed;
  }
`;

const EmptyChatContent = styled.div`
  padding: 20px;
  padding-top: 40px;
  text-align: center;
  color: #6c757d;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  const location = useLocation();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  
  const expert = location.state?.expert;
  const startChat = location.state?.startChat;

  // 전문가와의 채팅 시작 시 초기 메시지 추가
  useEffect(() => {
    if (startChat && expert) {
      setMessages([
        {
          id: 1,
          text: `안녕하세요, ${expert.name}입니다!`,
          isUser: false,
          timestamp: new Date()
        }
      ]);
    }
  }, [startChat, expert]);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = {
        id: Date.now(),
        text: inputMessage,
        isUser: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newMessage]);
      setInputMessage('');
      
      // 전문가 응답 시뮬레이션 (1초 후)
      setTimeout(() => {
        const expertResponse = {
          id: Date.now() + 1,
          text: '네, 말씀해주세요. 어떤 도움이 필요하신가요?',
          isUser: false,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, expertResponse]);
      }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

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

  // 전문가와의 채팅인 경우
  if (expert) {
    return (
      <ChatContainer>
        <Header>
          <HeaderLeft>
            <BackButton onClick={() => window.history.back()}>
              <ArrowLeft size={24} />
            </BackButton>
            <ExpertInfo>
              <ExpertName>{expert.name}</ExpertName>
              <ExpertDate>2025년 8월 12일 화요일</ExpertDate>
            </ExpertInfo>
          </HeaderLeft>
          <HeaderRight>
            <NotificationButton>
              <Bell size={24} />
            </NotificationButton>
          </HeaderRight>
        </Header>

        <ChatContent>
          {messages.map((message) => (
            <MessageBubble key={message.id} isUser={message.isUser}>
              {message.text}
            </MessageBubble>
          ))}
        </ChatContent>

        <MessageInput>
          <InputField
            type="text"
            placeholder="메세지 보내기"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <SendButton 
            onClick={handleSendMessage}
            disabled={!inputMessage.trim()}
          >
            <Send size={16} />
          </SendButton>
        </MessageInput>
      </ChatContainer>
    );
  }

  // 일반 채팅 페이지 (전문가 선택 전)
  return (
    <ChatContainer>
      <EmptyChatContent>
        <ChatIcon>💬</ChatIcon>
        <ChatTitle>채팅 기능</ChatTitle>
        <ChatMessage>
          전문가와 상담을 시작하려면<br />
          포스트의 댓글에서 전문가를 선택해주세요!
        </ChatMessage>
      </EmptyChatContent>
    </ChatContainer>
  );
};

export default ChatPage;
