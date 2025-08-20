import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell } from 'lucide-react';

const Page = styled.div`
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
  &:hover { background-color: rgba(0,0,0,0.05); }
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 0 16px;
`;

const Content = styled.div`
  padding: 24px 20px 100px 20px;
`;

const ProfileWrap = styled.section`
  background-color: white;
  border-radius: 12px;
  padding: 32px 20px 24px 20px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

const Avatar = styled.div`
  width: 160px; height: 160px; border-radius: 50%;
  background-color: #dee2e6; margin: 0 auto 16px;
`;

const ExpertName = styled.h2`
  margin: 0 0 8px 0; font-size: 18px; font-weight: 700; color: #212529;
`;

const Greeting = styled.p`
  margin: 0; font-size: 14px; color: #6c757d; line-height: 1.5;
`;

const Card = styled.div`
  background: #fff; border: 1px solid #e9ecef; border-radius: 12px;
  padding: 16px; margin-top: 20px; text-align: left;
`;

const Bullet = styled.li`
  font-size: 14px; color: #495057; line-height: 1.6;
`;

const StartButton = styled.button`
  width: 100%; 
  margin-top: 24px; 
  padding: 16px; 
  border: none;
  border-radius: 12px; 
  background: #f8f9fa; 
  color: #495057; 
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid #e9ecef;
  
  &:hover {
    background: #e9ecef;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

const ChooseExpert = () => {
  const navigate = useNavigate();
  return (
    <Page>
      <Header>
        <HeaderLeft>
          <BackButton onClick={() => navigate(-1)}><ArrowLeft size={24} /></BackButton>
          <Title>전문가 선택</Title>
        </HeaderLeft>
        <Bell size={22} color="#6B7280" />
      </Header>

      <Content>
        <ProfileWrap>
          <Avatar />
          <ExpertName>심리상담가 너구리</ExpertName>
          <Greeting>
            안녕하세요, 심리상담가 너구리입니다.<br/>
            당신의 이야기를 들려주세요.
          </Greeting>

          <Card>
            <ul style={{ paddingLeft: 16, margin: 0 }}>
              <Bullet>사고 후 트라우마, 공황장애 전문의</Bullet>
              <Bullet>경력 작성란</Bullet>
              <Bullet>○○○ 자격증</Bullet>
              <Bullet>○○○ 심리센터 경력 5년차</Bullet>
            </ul>
          </Card>

          <StartButton onClick={() => navigate('/chatting')}>상담 시작</StartButton>
        </ProfileWrap>
      </Content>
    </Page>
  );
};

export default ChooseExpert;


