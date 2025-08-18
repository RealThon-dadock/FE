import React from 'react';
import styled from 'styled-components';
import { Home, TrendingUp, Users, Star } from 'lucide-react';

const HomePage = () => {
  return (
    <HomeContainer>
      <Header>
        <Title>리얼톤</Title>
        <Subtitle>부동산 투자의 새로운 패러다임</Subtitle>
      </Header>
      
      <StatsSection>
        <StatCard>
          <StatIcon>
            <TrendingUp size={24} />
          </StatIcon>
          <StatContent>
            <StatValue>12.5%</StatValue>
            <StatLabel>평균 수익률</StatLabel>
          </StatContent>
        </StatCard>
        
        <StatCard>
          <StatIcon>
            <Users size={24} />
          </StatIcon>
          <StatContent>
            <StatValue>10,000+</StatValue>
            <StatLabel>활성 사용자</StatLabel>
          </StatContent>
        </StatCard>
        
        <StatCard>
          <StatIcon>
            <Star size={24} />
          </StatIcon>
          <StatContent>
            <StatValue>4.8</StatValue>
            <StatLabel>평점</StatLabel>
          </StatContent>
        </StatCard>
      </StatsSection>
      
      <FeaturesSection>
        <SectionTitle>주요 기능</SectionTitle>
        <FeatureGrid>
          <FeatureCard>
            <FeatureIcon>🏠</FeatureIcon>
            <FeatureTitle>실시간 시세</FeatureTitle>
            <FeatureDesc>최신 부동산 시세 정보</FeatureDesc>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>📊</FeatureIcon>
            <FeatureTitle>투자 분석</FeatureTitle>
            <FeatureDesc>체계적인 분석 도구</FeatureDesc>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>💬</FeatureIcon>
            <FeatureTitle>커뮤니티</FeatureTitle>
            <FeatureDesc>투자자 정보 공유</FeatureDesc>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>📈</FeatureIcon>
            <FeatureTitle>트렌드</FeatureTitle>
            <FeatureDesc>시장 동향 분석</FeatureDesc>
          </FeatureCard>
        </FeatureGrid>
      </FeaturesSection>
    </HomeContainer>
  );
};

export default HomePage;

const HomeContainer = styled.div`
  padding: 20px;
  padding-bottom: 100px;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  min-height: 100vh;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 30px;
  padding: 20px;
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  border-radius: 20px;
  color: white;
  box-shadow: 0 8px 32px rgba(37, 99, 235, 0.3);
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 8px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
`;

const StatsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 30px;
`;

const StatCard = styled.div`
  background: white;
  padding: 16px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 12px;
  border: 1px solid rgba(37, 99, 235, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 32px rgba(37, 99, 235, 0.2);
  }
`;

const StatIcon = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
`;

const StatContent = styled.div`
  flex: 1;
`;

const StatValue = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 2px;
`;

const StatLabel = styled.div`
  font-size: 12px;
  color: #64748b;
`;

const FeaturesSection = styled.div`
  margin-top: 30px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 20px;
  text-align: center;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`;

const FeatureCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  border: 1px solid rgba(37, 99, 235, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 32px rgba(37, 99, 235, 0.2);
    border-color: rgba(37, 99, 235, 0.3);
  }
`;

const FeatureIcon = styled.div`
  font-size: 32px;
  margin-bottom: 12px;
`;

const FeatureTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 8px;
`;

const FeatureDesc = styled.p`
  font-size: 14px;
  color: #64748b;
  margin: 0;
`;
