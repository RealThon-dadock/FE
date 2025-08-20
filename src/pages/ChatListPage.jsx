import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ArrowLeft, MessageCircle, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import LoginRequired from '../components/LoginRequired';
import { useNavigate } from 'react-router-dom';
import { getWritingBooks, getCompletedBooks } from '../utils/bookData';
import { getChatRooms } from '../utils/chatData';

const ChatListContainer = styled.div`
  max-width: 480px;
  margin: 0 auto;
  background-color: #f8f9fa;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: #fff;
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
  color: #6B7280;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;

const HeaderTitle = styled.h1`
  font-size: 18px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 0 12px;
`;

const Content = styled.div`
  padding: 20px;
  padding-bottom: 120px;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
`;

const EmptyIcon = styled.div`
  font-size: 64px;
  margin-bottom: 16px;
  opacity: 0.6;
`;

const EmptyTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #212529;
  margin: 0 0 8px 0;
`;

const EmptyMessage = styled.p`
  font-size: 16px;
  margin: 0;
  line-height: 1.5;
  color: #6c757d;
`;

const ChatRoomList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ChatRoomItem = styled.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const ChatRoomHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const ExpertAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 16px;
`;

const ChatRoomInfo = styled.div`
  flex: 1;
`;

const ExpertName = styled.h3`
  margin: 0 0 4px 0;
  font-size: 16px;
  font-weight: 600;
  color: #212529;
`;

const LastMessage = styled.p`
  margin: 0;
  font-size: 14px;
  color: #6c757d;
  line-height: 1.4;
`;

const ChatTime = styled.span`
  font-size: 12px;
  color: #adb5bd;
`;

const PostPreview = styled.div`
  background: #f8f9fa;
  border-radius: 8px;
  padding: 12px;
  margin-top: 12px;
  border-left: 3px solid #007bff;
`;

const PostTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #495057;
  margin-bottom: 4px;
`;

const PostContent = styled.div`
  font-size: 13px;
  color: #6c757d;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ChatListPage = () => {
  const { isLoggedIn, isLoading, profile } = useAuth();
  const navigate = useNavigate();
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    // 실제 채팅방 데이터 로드
    const loadChatRooms = () => {
      const rooms = getChatRooms();
      setChatRooms(rooms);
    };

    if (isLoggedIn) {
      loadChatRooms();
    }
  }, [isLoggedIn]);

  const handleChatRoomClick = (chatRoom) => {
    navigate(`/chatting?postId=${chatRoom.postId}&name=${encodeURIComponent(chatRoom.expertName)}`);
  };

  // 로딩 중인 경우
  if (isLoading) {
    return (
      <ChatListContainer>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          로딩 중...
        </div>
      </ChatListContainer>
    );
  }

  // 로그인하지 않은 경우
  if (!isLoggedIn) {
    return (
      <ChatListContainer>
        <LoginRequired 
          title="로그인이 필요합니다"
          message="로그인 후 채팅 기능을 사용할 수 있습니다!"
        />
      </ChatListContainer>
    );
  }

  return (
    <ChatListContainer>
      <Header>
        <HeaderLeft>
          <BackButton onClick={() => navigate(-1)}>
            <ArrowLeft size={24} />
          </BackButton>
          <HeaderTitle>채팅</HeaderTitle>
        </HeaderLeft>
      </Header>

      <Content>
        {chatRooms.length === 0 ? (
          <EmptyState>
            <EmptyIcon>💬</EmptyIcon>
            <EmptyTitle>채팅방이 없습니다</EmptyTitle>
            <EmptyMessage>
              {profile?.role === 'expert' 
                ? '상담 요청이 들어오면 여기에 표시됩니다.'
                : '포스트에서 전문가와 상담을 시작해보세요.'
              }
            </EmptyMessage>
          </EmptyState>
        ) : (
          <ChatRoomList>
            {chatRooms.map((room) => (
              <ChatRoomItem key={room.id} onClick={() => handleChatRoomClick(room)}>
                <ChatRoomHeader>
                  <ExpertAvatar>
                    {room.expertName.charAt(0)}
                  </ExpertAvatar>
                  <ChatRoomInfo>
                    <ExpertName>{room.expertName}</ExpertName>
                    <LastMessage>{room.lastMessage}</LastMessage>
                  </ChatRoomInfo>
                                     <ChatTime>
                     {new Date(room.lastMessageTime).toLocaleString('ko-KR', {
                       month: '2-digit',
                       day: '2-digit',
                       hour: '2-digit',
                       minute: '2-digit'
                     })}
                   </ChatTime>
                </ChatRoomHeader>
                <PostPreview>
                  <PostTitle>{room.postTitle}</PostTitle>
                  <PostContent>{room.postContent}</PostContent>
                </PostPreview>
              </ChatRoomItem>
            ))}
          </ChatRoomList>
        )}
      </Content>
    </ChatListContainer>
  );
};

export default ChatListPage;
