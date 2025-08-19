import React from 'react';
import styled from 'styled-components';
import { Menu, Bell } from 'lucide-react';

const Header = ({ title = '다독이다' }) => {
  return (
    <HeaderContainer>
      <LeftSection>
        <MenuButton>
          <Menu size={24} color="#6B7280" />
        </MenuButton>
      </LeftSection>
      
      <CenterSection>
        <Title>{title}</Title>
      </CenterSection>
      
      <RightSection>
        <NotificationButton>
          <Bell size={24} color="#6B7280" />
          <NotificationBadge />
        </NotificationButton>
      </RightSection>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background-color: #F8F8F8;
  border-bottom: 1px solid #E5E7EB;
  position: sticky;
  top: 0;
  z-index: 1000;
  max-width: 480px;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

const CenterSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0;
  text-align: center;
`;

const NotificationButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const NotificationBadge = styled.div`
  position: absolute;
  top: 6px;
  right: 6px;
  width: 8px;
  height: 8px;
  background-color: #9CA3AF;
  border-radius: 50%;
  border: 2px solid #F8F8F8;
`;
