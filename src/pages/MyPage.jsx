import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  User, 
  ChevronRight
} from 'lucide-react';
import { getBookCounts, onBooksUpdate } from '../utils/bookData';
import { useAuth } from '../contexts/AuthContext';

const MyPageContainer = styled.div`
  max-width: 480px;
  margin: 0 auto;
  background-color: #f8f9fa;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const ProfileSection = styled.section`
  background-color: white;
  padding: 32px 20px;
  text-align: center;
  border-bottom: 1px solid #e9ecef;
  margin-top: 20px;
`;

const ProfileImage = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #dee2e6;
  margin: 0 auto 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6c757d;
  font-size: 24px;
`;

const UserName = styled.h2`
  margin: 0 0 8px 0;
  font-size: 20px;
  font-weight: 600;
  color: #212529;
`;

const EditProfileButton = styled.button`
  background: none;
  border: 1px solid #dee2e6;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  color: #6c757d;
  cursor: pointer;
  
  &:hover {
    background-color: #f8f9fa;
  }
`;

const StatsSection = styled.div`
  display: flex;
  justify-content: center;
  gap: 32px;
  margin-top: 24px;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #212529;
  margin-bottom: 4px;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: #6c757d;
`;

const MenuSection = styled.section`
  background-color: white;
  margin-top: 16px;
`;

const MenuItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #f1f3f4;
  cursor: pointer;
  
  &:hover {
    background-color: #f8f9fa;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const MenuText = styled.span`
  font-size: 16px;
  color: #212529;
`;

const MenuIcon = styled.div`
  color: #6c757d;
`;

const ContentWrapper = styled.div`
  padding-bottom: 80px;
`;

const MyPage = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const [writingCount, setWritingCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  const menuItems = [
    { id: 'notices', text: '공지사항', icon: <ChevronRight size={16} /> },
    { id: 'account', text: '나의 계정', icon: <ChevronRight size={16} /> },
    { id: 'inquiry', text: '나의 문의내역', icon: <ChevronRight size={16} /> },
    { id: 'cache', text: '캐시 삭제', icon: <ChevronRight size={16} /> },
    { id: 'service', text: '고객센터', icon: <ChevronRight size={16} /> },
    ...(isLoggedIn ? [
      { id: 'logout', text: '로그아웃', icon: <ChevronRight size={16} /> },
      { id: 'withdraw', text: '회원 탈퇴', icon: <ChevronRight size={16} /> }
    ] : [])
  ];

  // 책 수 데이터 로드
  useEffect(() => {
    const updateCounts = (counts) => {
      setWritingCount(counts.writingCount);
      setCompletedCount(counts.completedCount);
    };

    // 초기 데이터 로드
    updateCounts(getBookCounts());

    // 이벤트 리스너 등록
    const cleanup = onBooksUpdate(updateCounts);

    return cleanup;
  }, []);

  const handleMenuClick = (menuId) => {
    console.log(`메뉴 클릭: ${menuId}`);
    
    if (menuId === 'logout') {
      logout();
    }
    // 각 메뉴에 대한 처리 로직 추가
  };

  return (
    <MyPageContainer>
      <ContentWrapper>
        <ProfileSection>
          <ProfileImage>
            <User size={32} />
          </ProfileImage>
          <UserName>{isLoggedIn ? (user?.nickname || '사용자') : '게스트'}</UserName>
          {isLoggedIn && (
            <EditProfileButton>
              내 정보 수정
            </EditProfileButton>
          )}
          
          {isLoggedIn && (
            <StatsSection>
              <StatItem>
                <StatNumber>{writingCount}권</StatNumber>
                <StatLabel>작성중</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber>{completedCount}권</StatNumber>
                <StatLabel>완결</StatLabel>
              </StatItem>
            </StatsSection>
          )}
        </ProfileSection>

        <MenuSection>
          {menuItems.map((item) => (
            <MenuItem 
              key={item.id} 
              onClick={() => handleMenuClick(item.id)}
            >
              <MenuText>{item.text}</MenuText>
              <MenuIcon>{item.icon}</MenuIcon>
            </MenuItem>
          ))}
        </MenuSection>
      </ContentWrapper>
    </MyPageContainer>
  );
};

export default MyPage;
