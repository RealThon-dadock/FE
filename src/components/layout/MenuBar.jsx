import React from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, BookOpen, MessageCircle, User } from 'lucide-react';

const MenuBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { path: '/', icon: Home, label: '홈' },
    { path: '/bookshelf', icon: BookOpen, label: '책장' },
    { path: '/chat', icon: MessageCircle, label: '채팅' },
    { path: '/my', icon: User, label: '마이' }
  ];

  const handleMenuClick = (path) => {
    navigate(path);
  };

  return (
    <MenuBarContainer>
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        
        return (
          <MenuItem 
            key={item.path} 
            onClick={() => handleMenuClick(item.path)}
            $isActive={isActive}
          >
            <IconWrapper $isActive={isActive}>
              <Icon size={24} />
              {item.path === '/chat' && <NotificationBadge />}
            </IconWrapper>
            <MenuLabel $isActive={isActive}>{item.label}</MenuLabel>
          </MenuItem>
        );
      })}
    </MenuBarContainer>
  );
};

export default MenuBar;

const MenuBarContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 480px;
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 12px 0 20px 0;
  box-shadow: 0 -4px 20px rgba(37, 99, 235, 0.3);
  z-index: 1000;
`;

const MenuItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 8px 12px;
  border-radius: 12px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }
`;

const IconWrapper = styled.div`
  position: relative;
  color: ${props => props.$isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.7)'};
  margin-bottom: 4px;
  transition: all 0.3s ease;
  
  ${props => props.$isActive && `
    transform: scale(1.1);
    color: #ffffff;
  `}
`;

const MenuLabel = styled.span`
  font-size: 12px;
  font-weight: ${props => props.$isActive ? '600' : '400'};
  color: ${props => props.$isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.7)'};
  transition: all 0.3s ease;
`;

const NotificationBadge = styled.div`
  position: absolute;
  top: -4px;
  right: -4px;
  width: 12px;
  height: 12px;
  background: #ef4444;
  border-radius: 50%;
  border: 2px solid #2563eb;
  animation: pulse 2s infinite;
  
  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(239, 68, 68, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
    }
  }
`;