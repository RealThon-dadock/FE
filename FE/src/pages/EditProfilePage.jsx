import React, { useState } from 'react';
import styled from 'styled-components';
import { ArrowLeft, Bell, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const EditProfileContainer = styled.div`
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
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const HeaderTitle = styled.h1`
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 0 16px;
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

const ContentArea = styled.div`
  padding: 20px;
  padding-bottom: 100px;
`;

const ProfileSection = styled.section`
  background-color: white;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const EditIcon = styled.div`
  color: #6c757d;
  cursor: pointer;
  
  &:hover {
    color: #495057;
  }
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  background-color: #e9ecef;
  margin: 24px 0;
`;

const InfoSection = styled.section`
  background-color: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #f1f3f4;
  
  &:last-child {
    border-bottom: none;
  }
`;

const InfoLabel = styled.span`
  font-size: 16px;
  color: #212529;
  font-weight: 500;
`;

const InfoValue = styled.span`
  font-size: 16px;
  color: #6c757d;
`;

const EditButton = styled.button`
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 14px;
  color: #6c757d;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #e9ecef;
  }
`;

const ModeSection = styled.section`
  background-color: white;
  border-radius: 12px;
  padding: 24px;
  margin-top: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const ModeTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #212529;
  margin: 0 0 16px 0;
`;

const ModeToggle = styled.div`
  display: flex;
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 4px;
  gap: 4px;
`;

const ModeButton = styled.button`
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${props => props.active ? 'white' : 'transparent'};
  color: ${props => props.active ? '#212529' : '#6c757d'};
  box-shadow: ${props => props.active ? '0 2px 4px rgba(0, 0, 0, 0.1)' : 'none'};
  
  &:hover {
    background-color: ${props => props.active ? 'white' : '#e9ecef'};
  }
`;

const EditProfilePage = () => {
  const navigate = useNavigate();
  const { user, userMode, updateUserMode } = useAuth();
  const [currentUserMode, setCurrentUserMode] = useState(userMode || 'general');
  
  // 사용자 정보 (실제로는 API에서 가져올 데이터)
  const [userInfo, setUserInfo] = useState({
    name: '홍길동',
    birthdate: '2000.01.01',
    phone: '010-1234-5678',
    email: 'abcat123@gmail.com'
  });

  const handleBack = () => {
    navigate('/my');
  };

  const handleModeChange = (mode) => {
    setCurrentUserMode(mode);
    // AuthContext에서 사용자 모드 업데이트
    if (updateUserMode) {
      updateUserMode(mode);
    }
  };

  const handleEditInfo = (field) => {
    console.log(`${field} 수정하기`);
    // 실제로는 모달이나 새 페이지로 이동하여 수정
    alert(`${field} 수정 기능은 추후 구현 예정입니다.`);
  };

  return (
    <EditProfileContainer>
      <Header>
        <HeaderLeft>
          <BackButton onClick={handleBack}>
            <ArrowLeft size={24} />
          </BackButton>
          <HeaderTitle>내 정보 수정</HeaderTitle>
        </HeaderLeft>
      </Header>

      <ContentArea>
        <ProfileSection>
          <ProfileImage>
            {user?.profileImage ? (
              <img 
                src={user.profileImage} 
                alt="프로필" 
                style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
              />
            ) : (
              <span>🐱</span>
            )}
          </ProfileImage>
          <UserName>
            {user?.nickname || '고양이'}
            <EditIcon>
              <Edit size={16} />
            </EditIcon>
          </UserName>
        </ProfileSection>

        <InfoSection>
          <InfoItem>
            <InfoLabel>이름</InfoLabel>
            <InfoValue>{userInfo.name}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>생년월일</InfoLabel>
            <InfoValue>{userInfo.birthdate}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>휴대폰 번호</InfoLabel>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <InfoValue>{userInfo.phone}</InfoValue>
              <EditButton onClick={() => handleEditInfo('휴대폰 번호')}>
                수정
              </EditButton>
            </div>
          </InfoItem>
          <InfoItem>
            <InfoLabel>이메일 주소</InfoLabel>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <InfoValue>{userInfo.email}</InfoValue>
              <EditButton onClick={() => handleEditInfo('이메일 주소')}>
                수정
              </EditButton>
            </div>
          </InfoItem>
        </InfoSection>

        <ModeSection>
          <ModeTitle>사용자 모드</ModeTitle>
          <ModeToggle>
            <ModeButton 
              active={currentUserMode === 'general'} 
              onClick={() => handleModeChange('general')}
            >
              일반유저
            </ModeButton>
            <ModeButton 
              active={currentUserMode === 'expert'} 
              onClick={() => handleModeChange('expert')}
            >
              전문가
            </ModeButton>
          </ModeToggle>
        </ModeSection>
      </ContentArea>
    </EditProfileContainer>
  );
};

export default EditProfilePage;
