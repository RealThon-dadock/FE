import React from 'react';
import styled from 'styled-components';
import { ArrowLeft, Bell, MessageCircle, Star } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const ExpertSelectionContainer = styled.div`
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

const ExpertCard = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const ExpertHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ExpertProfileImage = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #dee2e6;
  margin-right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6c757d;
  font-size: 24px;
  position: relative;
`;

const VerifiedBadge = styled.div`
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #007bff;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
`;

const ExpertInfo = styled.div`
  flex: 1;
`;

const ExpertName = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #212529;
  margin: 0 0 4px 0;
`;

const ExpertTitle = styled.p`
  font-size: 14px;
  color: #6c757d;
  margin: 0 0 8px 0;
`;

const RatingSection = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const StarIcon = styled.div`
  color: #ffc107;
`;

const RatingText = styled.span`
  font-size: 14px;
  color: #6c757d;
  margin-left: 4px;
`;

const ExpertDescription = styled.div`
  margin-bottom: 24px;
`;

const DescriptionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #212529;
  margin: 0 0 12px 0;
`;

const DescriptionText = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: #495057;
  margin: 0;
`;

const ConsultationButton = styled.button`
  width: 100%;
  padding: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #0056b3;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
  }
`;

const ExpertSelectionPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const expert = location.state?.expert || {
    name: '심리상담사 너구리',
    title: '전문 심리상담사',
    rating: 4.8,
    description: '10년 이상의 상담 경력을 바탕으로 다양한 심리적 고민에 대한 전문적인 상담을 제공합니다. 특히 직장 스트레스, 대인관계, 자신감 문제 등에 대한 해결책을 제시해드립니다.'
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleStartConsultation = () => {
    // 채팅 페이지로 이동하면서 전문가 정보 전달
    navigate('/chat', { 
      state: { 
        expert: expert,
        startChat: true 
      } 
    });
  };

  return (
    <ExpertSelectionContainer>
      <Header>
        <HeaderLeft>
          <BackButton onClick={handleBack}>
            <ArrowLeft size={24} />
          </BackButton>
          <HeaderTitle>전문가 선택</HeaderTitle>
        </HeaderLeft>
        <HeaderRight>
          <NotificationButton>
            <Bell size={24} />
          </NotificationButton>
        </HeaderRight>
      </Header>

      <ContentArea>
        <ExpertCard>
          <ExpertHeader>
            <ExpertProfileImage>
              <span>🦝</span>
              <VerifiedBadge>
                <Star size={12} color="white" />
              </VerifiedBadge>
            </ExpertProfileImage>
            <ExpertInfo>
              <ExpertName>{expert.name}</ExpertName>
              <ExpertTitle>{expert.title}</ExpertTitle>
              <RatingSection>
                <StarIcon>
                  <Star size={16} fill="#ffc107" />
                </StarIcon>
                <RatingText>{expert.rating}</RatingText>
              </RatingSection>
            </ExpertInfo>
          </ExpertHeader>

          <ExpertDescription>
            <DescriptionTitle>전문 분야</DescriptionTitle>
            <DescriptionText>{expert.description}</DescriptionText>
          </ExpertDescription>

          <ConsultationButton onClick={handleStartConsultation}>
            <MessageCircle size={20} />
            상담 시작하기
          </ConsultationButton>
        </ExpertCard>
      </ContentArea>
    </ExpertSelectionContainer>
  );
};

export default ExpertSelectionPage;
