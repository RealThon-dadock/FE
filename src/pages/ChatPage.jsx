import React, { useState } from 'react';
import styled from 'styled-components';
import { MessageCircle, Send, Search, MoreVertical } from 'lucide-react';

const ChatPage = () => {
  const [message, setMessage] = useState('');
  
  const chats = [
    { id: 1, name: '부동산 투자 커뮤니티', lastMessage: '오늘 강남 시세 어때요?', time: '14:30', unread: 3 },
    { id: 2, name: '김투자님', lastMessage: '매물 정보 공유해주세요', time: '13:45', unread: 1 },
    { id: 3, name: '이분석님', lastMessage: '분석 자료 보내드릴게요', time: '12:20', unread: 0 },
    { id: 4, name: '박성공님', lastMessage: '투자 성공 사례 공유', time: '11:15', unread: 2 },
    { id: 5, name: '최법률님', lastMessage: '법률 상담 가능합니다', time: '10:30', unread: 0 },
    { id: 6, name: '정트렌드님', lastMessage: '시장 동향 분석 자료', time: '09:45', unread: 1 }
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      // 메시지 전송 로직
      setMessage('');
    }
  };

  return (
    <ChatContainer>
      <Header>
        <Title>채팅</Title>
        <Subtitle>투자자들과 소통하세요</Subtitle>
      </Header>
      
      <SearchSection>
        <SearchBar>
          <Search size={20} color="#64748b" />
          <SearchInput placeholder="채팅방 검색..." />
        </SearchBar>
      </SearchSection>
      
      <ChatList>
        {chats.map((chat) => (
          <ChatItem key={chat.id}>
            <ChatAvatar>
              <MessageCircle size={24} color="#2563eb" />
            </ChatAvatar>
            <ChatContent>
              <ChatHeader>
                <ChatName>{chat.name}</ChatName>
                <ChatTime>{chat.time}</ChatTime>
              </ChatHeader>
              <ChatMessage>{chat.lastMessage}</ChatMessage>
            </ChatContent>
            <ChatActions>
              {chat.unread > 0 && (
                <UnreadBadge>{chat.unread}</UnreadBadge>
              )}
              <MoreButton>
                <MoreVertical size={16} />
              </MoreButton>
            </ChatActions>
          </ChatItem>
        ))}
      </ChatList>
      
      <QuickActions>
        <ActionButton>
          <MessageCircle size={20} />
          <ActionText>새 채팅</ActionText>
        </ActionButton>
        <ActionButton>
          <MessageCircle size={20} />
          <ActionText>그룹 채팅</ActionText>
        </ActionButton>
      </QuickActions>
      
      <MessageInput>
        <InputWrapper>
          <MessageInputField
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="메시지를 입력하세요..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <SendButton onClick={handleSendMessage}>
            <Send size={20} />
          </SendButton>
        </InputWrapper>
      </MessageInput>
    </ChatContainer>
  );
};

export default ChatPage;

const ChatContainer = styled.div`
  padding: 20px;
  padding-bottom: 100px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 24px;
  padding: 20px;
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  border-radius: 20px;
  color: white;
  box-shadow: 0 8px 32px rgba(37, 99, 235, 0.3);
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 4px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
`;

const SearchSection = styled.div`
  margin-bottom: 20px;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background: white;
  border-radius: 16px;
  padding: 12px 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  gap: 12px;
  border: 1px solid rgba(37, 99, 235, 0.1);
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  flex: 1;
  font-size: 14px;
  
  &::placeholder {
    color: #94a3b8;
  }
`;

const ChatList = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const ChatItem = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  background: white;
  border-radius: 16px;
  margin-bottom: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(37, 99, 235, 0.1);
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 32px rgba(37, 99, 235, 0.2);
    border-color: rgba(37, 99, 235, 0.3);
  }
`;

const ChatAvatar = styled.div`
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  border: 1px solid rgba(37, 99, 235, 0.1);
`;

const ChatContent = styled.div`
  flex: 1;
`;

const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
`;

const ChatName = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
`;

const ChatTime = styled.span`
  font-size: 12px;
  color: #64748b;
`;

const ChatMessage = styled.p`
  font-size: 14px;
  color: #64748b;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ChatActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const UnreadBadge = styled.div`
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
  font-size: 12px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 10px;
  min-width: 20px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3);
`;

const MoreButton = styled.button`
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(37, 99, 235, 0.1);
    color: #2563eb;
  }
`;

const QuickActions = styled.div`
  display: flex;
  gap: 12px;
  margin: 20px 0;
`;

const ActionButton = styled.button`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  background: white;
  border: none;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(37, 99, 235, 0.1);
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 32px rgba(37, 99, 235, 0.2);
    border-color: rgba(37, 99, 235, 0.3);
  }
`;

const ActionText = styled.span`
  font-size: 12px;
  color: #64748b;
  font-weight: 500;
`;

const MessageInput = styled.div`
  position: fixed;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 40px);
  max-width: 440px;
  z-index: 100;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  background: white;
  border-radius: 24px;
  padding: 8px;
  box-shadow: 0 8px 32px rgba(37, 99, 235, 0.3);
  border: 1px solid rgba(37, 99, 235, 0.1);
`;

const MessageInputField = styled.input`
  flex: 1;
  border: none;
  outline: none;
  padding: 8px 16px;
  font-size: 14px;
  
  &::placeholder {
    color: #94a3b8;
  }
`;

const SendButton = styled.button`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
    transform: scale(1.05);
  }
`;
