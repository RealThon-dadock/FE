import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { MoreVertical, Send } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import LoginRequired from '../components/LoginRequired';
import { useLocation, useNavigate } from 'react-router-dom';
import { getWritingBooks, getCompletedBooks } from '../utils/bookData';
import { getChatMessages, addMessage, createChatRoom, markAsRead, deleteChatRoom } from '../utils/chatData';

const ChatContainer = styled.div`
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

const HeaderTitle = styled.h1`
  font-size: 18px; 
  font-weight: 700; 
  color: #111827; 
  margin: 0;
`;

const MenuButton = styled.button`
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
  position: relative;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const MenuDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 10;
  min-width: 120px;
  overflow: hidden;
  margin-top: 4px;
`;

const MenuItem = styled.button`
  width: 100%;
  padding: 12px 16px;
  background: none;
  border: none;
  text-align: left;
  font-size: 14px;
  color: #212529;
  cursor: pointer;
  
  &:hover {
    background-color: #f8f9fa;
  }
  
  &:not(:last-child) {
    border-bottom: 1px solid #e9ecef;
  }
`;

const Content = styled.div`
  padding: 12px;
  padding-bottom: 140px;
`;

const DateLabel = styled.div`
  text-align: center; 
  color: #adb5bd; 
  font-size: 12px; 
  margin: 8px 0 12px;
`;

const Bubble = styled.div`
  display: inline-block; 
  max-width: 80%; 
  padding: 14px 16px; 
  border-radius: 12px;
  background: #e9ecef; 
  color: #111827; 
  margin: 6px 0;
`;

const BubbleMe = styled(Bubble)`
  background: #d7e3ff; 
  align-self: flex-end;
`;

const Row = styled.div`
  display: flex; 
  flex-direction: column; 
  align-items: flex-start; 
  margin: 6px 8px;
`;

const RowMe = styled(Row)`
  align-items: flex-end;
`;

const PostPreview = styled.div`
  background: #e9ecef; 
  border-radius: 12px; 
  padding: 14px; 
  margin: 8px; 
  color: #6c757d;
`;

const PostButton = styled.button`
  width: 100%; 
  margin-top: 10px; 
  padding: 10px; 
  border: none; 
  border-radius: 8px; 
  background: #dee2e6; 
  color: #6c757d; 
  cursor: pointer; 
  transition: all 0.2s ease;
  
  &:hover {
    background: #ced4da;
  }
`;

const InputBar = styled.form`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 90px;
  width: calc(100% - 24px);
  max-width: 456px;
  display: flex; 
  gap: 12px;
  background: white;
  padding: 12px 16px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  border: 1px solid #e9ecef;
  z-index: 1000;
`;

const Input = styled.input`
  flex: 1; 
  border: none; 
  background: transparent; 
  padding: 8px 0; 
  font-size: 15px;
  font-family: inherit;
  color: #212529;
  
  &::placeholder {
    color: #adb5bd;
  }
  
  &:focus {
    outline: none;
  }
  
  &:disabled {
    color: #6c757d;
  }
`;

const SendButton = styled.button`
  width: 36px; 
  height: 36px; 
  border-radius: 50%; 
  border: none; 
  background: #007bff; 
  color: white;
  display: flex; 
  align-items: center; 
  justify-content: center;
  transition: all 0.2s ease;
  cursor: pointer;
  flex-shrink: 0;
  
  &:hover:not(:disabled) {
    background: #0056b3;
    transform: scale(1.05);
  }
  
  &:disabled {
    background: #e9ecef;
    color: #6c757d;
    cursor: not-allowed;
    transform: none;
  }
`;

const ChatRoomPage = () => {
  const { isLoggedIn, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const expert = useMemo(() => ({
    name: params.get('name') || '심리상담가 너구리'
  }), [location.search]);
  
  const postId = params.get('postId');
  const [messages, setMessages] = useState([]);
  const [chatRoomId, setChatRoomId] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [input, setInput] = useState('');
  const endRef = useRef(null);
  
  useEffect(() => {
    if (postId) {
      const writingBooks = getWritingBooks();
      const completedBooks = getCompletedBooks();
      const allBooks = [...writingBooks, ...completedBooks];
      const foundPost = allBooks.find(book => book.id === parseInt(postId));
      
      if (foundPost) {
        const roomId = `chat_${postId}`;
        setChatRoomId(roomId);
        
        const existingMessages = getChatMessages(roomId);
        if (existingMessages.length > 0) {
          setMessages(existingMessages);
        } else {
          createChatRoom(postId, foundPost.title, foundPost.content, expert.name);
          const initialMessages = getChatMessages(roomId);
          setMessages(initialMessages);
        }
        
        markAsRead(roomId);
      }
    }
  }, [postId, expert.name]);

  useEffect(() => { 
    endRef.current?.scrollIntoView({ behavior: 'smooth' }); 
  }, [messages]);

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };

  const handleCloseMenu = () => {
    setShowMenu(false);
  };

  const handleLeaveChat = () => {
    if (window.confirm('채팅방을 나가시겠습니까? 채팅 기록이 삭제됩니다.')) {
      if (chatRoomId) {
        deleteChatRoom(chatRoomId);
      }
      navigate('/chat');
    }
    setShowMenu(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    
    const userMessage = { 
      id: String(Date.now()), 
      from: 'me', 
      text,
      timestamp: new Date().toISOString()
    };
    
    if (chatRoomId) {
      addMessage(chatRoomId, userMessage);
      setMessages((prev) => [...prev, userMessage]);
    }
    setInput('');
  };

  if (isLoading) {
    return (
      <ChatContainer>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          로딩 중...
        </div>
      </ChatContainer>
    );
  }

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

  return (
    <ChatContainer onClick={handleCloseMenu}>
      <Header>
        <HeaderTitle>{expert.name}</HeaderTitle>
        <MenuButton onClick={(e) => {
          e.stopPropagation();
          handleMenuClick();
        }}>
          <MoreVertical size={22} />
          {showMenu && (
            <MenuDropdown onClick={(e) => e.stopPropagation()}>
              <MenuItem onClick={handleLeaveChat}>
                나가기
              </MenuItem>
            </MenuDropdown>
          )}
        </MenuButton>
      </Header>

      <Content>
        {messages.map((m) => {
          if (m.type === 'date') return <DateLabel key={m.id}>{m.text}</DateLabel>;
          if (m.type === 'post') return (
            <PostPreview key={m.id}>
              <div style={{ fontWeight: 700, color: '#495057', marginBottom: 6 }}>{m.title}</div>
              <div>{m.preview}</div>
              <PostButton onClick={() => navigate(`/post/${postId || '1'}`)}>게시물 바로가기</PostButton>
            </PostPreview>
          );
          if (m.from === 'other') return (
            <Row key={m.id}><Bubble>{m.text}</Bubble></Row>
          );
          return (
            <RowMe key={m.id}><BubbleMe>{m.text}</BubbleMe></RowMe>
          );
        })}
        <div ref={endRef} />
      </Content>

      <InputBar onSubmit={handleSubmit}>
        <Input 
          placeholder="메시지를 입력하세요..." 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
        />
        <SendButton 
          type="submit" 
          disabled={!input.trim()}
        >
          <Send size={18} color="white" />
        </SendButton>
      </InputBar>
    </ChatContainer>
  );
};

export default ChatRoomPage;
