import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { ArrowLeft, Bell, Send } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import LoginRequired from '../components/LoginRequired';
import { useLocation, useNavigate } from 'react-router-dom';

const ChatContainer = styled.div`
  max-width: 480px;
  margin: 0 auto;
  background-color: #f8f9fa;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const Header = styled.header`
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px 20px; background: #fff; border-bottom: 1px solid #e9ecef;
  position: sticky; top: 0; z-index: 1000;
`;

const HeaderLeft = styled.div`
  display: flex; align-items: center;
`;

const BackButton = styled.button`
  background: none; border: none; padding: 8px; border-radius: 8px; cursor: pointer;
  color: #6B7280; display: flex; align-items: center; justify-content: center;
  &:hover { background: rgba(0,0,0,0.05); }
`;

const HeaderTitle = styled.h1`
  font-size: 18px; font-weight: 700; color: #111827; margin: 0 0 0 12px;
`;

const Content = styled.div`
  padding: 12px 12px 84px 12px;
`;

const DateLabel = styled.div`
  text-align: center; color: #adb5bd; font-size: 12px; margin: 8px 0 12px;
`;

const Bubble = styled.div`
  display: inline-block; max-width: 80%; padding: 14px 16px; border-radius: 12px;
  background: #e9ecef; color: #111827; margin: 6px 0;
`;

const BubbleMe = styled(Bubble)`
  background: #d7e3ff; align-self: flex-end;
`;

const Row = styled.div`
  display: flex; flex-direction: column; align-items: flex-start; margin: 6px 8px;
`;

const RowMe = styled(Row)`
  align-items: flex-end;
`;

const PostPreview = styled.div`
  background: #e9ecef; border-radius: 12px; padding: 14px; margin: 8px; color: #6c757d;
`;

const PostButton = styled.button`
  width: 100%; margin-top: 10px; padding: 10px; border: none; border-radius: 8px; background: #dee2e6; color: #6c757d;
`;

const InputBar = styled.form`
  position: fixed; left: 50%; transform: translateX(-50%);
  bottom: 16px; width: calc(100% - 32px); max-width: 480px; display: flex; gap: 8px;
`;

const Input = styled.input`
  flex: 1; border: none; background: #fff; padding: 14px 16px; border-radius: 24px; box-shadow: 0 2px 6px rgba(0,0,0,0.08);
  font-size: 14px;
`;

const SendButton = styled.button`
  width: 44px; height: 44px; border-radius: 50%; border: none; background: #e9ecef; display: flex; align-items: center; justify-content: center;
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
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const expert = useMemo(() => ({
    name: params.get('name') || '심리상담가 너구리'
  }), [location.search]);
  const [messages, setMessages] = useState([
    { id: 'date', type: 'date', text: '2025년 8월 12일 화요일' },
    { id: 'post', type: 'post', title: '심리적압박감이 심해요', preview: '내용 .. 내용' },
    { id: 'bot1', from: 'other', text: '안녕하세요, 너구리입니다!' }
  ]);
  const [input, setInput] = useState('');
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

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

  return (
    <ChatContainer>
      <Header>
        <HeaderLeft>
          <BackButton onClick={() => navigate(-1)}><ArrowLeft size={24} /></BackButton>
          <HeaderTitle>{expert.name}</HeaderTitle>
        </HeaderLeft>
        <Bell size={22} color="#6B7280" />
      </Header>

      <Content>
        {messages.map((m) => {
          if (m.type === 'date') return <DateLabel key={m.id}>{m.text}</DateLabel>;
          if (m.type === 'post') return (
            <PostPreview key={m.id}>
              <div style={{ fontWeight: 700, color: '#495057', marginBottom: 6 }}>심리적압박감이 심해요</div>
              <div>내용 .. 내용</div>
              <PostButton>게시물 바로가기</PostButton>
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

      <InputBar onSubmit={(e) => {
        e.preventDefault();
        const text = input.trim();
        if (!text) return;
        setMessages((prev) => [...prev, { id: String(Date.now()), from: 'me', text }]);
        setInput('');
      }}>
        <Input placeholder="메세지 보내기" value={input} onChange={(e) => setInput(e.target.value)} />
        <SendButton type="submit"><Send size={18} color="#6B7280" /></SendButton>
      </InputBar>
    </ChatContainer>
  );
};

export default ChatPage;
