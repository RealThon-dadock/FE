import React from 'react';
import styled from 'styled-components';
import { User, Settings, Bell, Heart, Bookmark, HelpCircle, LogOut, ChevronRight } from 'lucide-react';

const MyPage = () => {
  const menuItems = [
    { icon: Settings, title: '설정', subtitle: '앱 설정 및 개인정보' },
    { icon: Bell, title: '알림', subtitle: '알림 설정' },
    { icon: Heart, title: '관심 매물', subtitle: '저장한 매물 목록' },
    { icon: Bookmark, title: '북마크', subtitle: '저장한 콘텐츠' },
    { icon: HelpCircle, title: '고객센터', subtitle: '도움말 및 문의' },
    { icon: LogOut, title: '로그아웃', subtitle: '계정에서 로그아웃' }
  ];

  return (
    <MyContainer>
      <Header>
        <ProfileSection>
          <ProfileAvatar>
            <User size={32} color="#2563eb" />
          </ProfileAvatar>
          <ProfileInfo>
            <ProfileName>김투자님</ProfileName>
            <ProfileEmail>investor@example.com</ProfileEmail>
            <ProfileLevel>프리미엄 회원</ProfileLevel>
          </ProfileInfo>
        </ProfileSection>
      </Header>
      
      <StatsSection>
        <StatCard>
          <StatValue>15</StatValue>
          <StatLabel>관심 매물</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>8</StatValue>
          <StatLabel>분석 완료</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>3</StatValue>
          <StatLabel>투자 성공</StatLabel>
        </StatCard>
      </StatsSection>
      
      <MenuSection>
        <SectionTitle>메뉴</SectionTitle>
        <MenuList>
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <MenuItem key={index}>
                <MenuItemLeft>
                  <MenuItemIcon>
                    <Icon size={20} color="#64748b" />
                  </MenuItemIcon>
                  <MenuItemContent>
                    <MenuItemTitle>{item.title}</MenuItemTitle>
                    <MenuItemSubtitle>{item.subtitle}</MenuItemSubtitle>
                  </MenuItemContent>
                </MenuItemLeft>
                <ChevronRight size={16} color="#94a3b8" />
              </MenuItem>
            );
          })}
        </MenuList>
      </MenuSection>
      
      <AppInfo>
        <AppVersion>리얼톤 v1.0.0</AppVersion>
        <AppCopyright>© 2024 리얼톤. All rights reserved.</AppCopyright>
      </AppInfo>
    </MyContainer>
  );
};

export default MyPage;

const MyContainer = styled.div`
  padding: 20px;
  padding-bottom: 100px;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  min-height: 100vh;
`;

const Header = styled.div`
  margin-bottom: 24px;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  background: white;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 8px 32px rgba(37, 99, 235, 0.2);
  border: 1px solid rgba(37, 99, 235, 0.1);
`;

const ProfileAvatar = styled.div`
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  border: 2px solid rgba(37, 99, 235, 0.2);
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const ProfileName = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 4px 0;
`;

const ProfileEmail = styled.p`
  font-size: 14px;
  color: #64748b;
  margin: 0 0 8px 0;
`;

const ProfileLevel = styled.span`
  font-size: 12px;
  background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%);
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(245, 158, 11, 0.3);
`;

const StatsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 24px;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 16px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(37, 99, 235, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 32px rgba(37, 99, 235, 0.2);
    border-color: rgba(37, 99, 235, 0.3);
  }
`;

const StatValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #2563eb;
  margin-bottom: 4px;
`;

const StatLabel = styled.div`
  font-size: 12px;
  color: #64748b;
`;

const MenuSection = styled.div`
  margin-bottom: 24px;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 16px;
`;

const MenuList = styled.div`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(37, 99, 235, 0.1);
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid #f1f5f9;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background: rgba(37, 99, 235, 0.05);
    transform: translateX(4px);
  }
`;

const MenuItemLeft = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

const MenuItemIcon = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  border: 1px solid rgba(37, 99, 235, 0.1);
`;

const MenuItemContent = styled.div`
  flex: 1;
`;

const MenuItemTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #1e293b;
  margin-bottom: 2px;
`;

const MenuItemSubtitle = styled.div`
  font-size: 12px;
  color: #64748b;
`;

const AppInfo = styled.div`
  text-align: center;
  padding: 20px;
`;

const AppVersion = styled.div`
  font-size: 14px;
  color: #64748b;
  margin-bottom: 4px;
`;

const AppCopyright = styled.div`
  font-size: 12px;
  color: #94a3b8;
`;
