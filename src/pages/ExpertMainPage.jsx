import React from 'react';
import styled from 'styled-components';
import { Heart, Bookmark } from 'lucide-react';

const ExpertMainPage = () => {
  const oneWordCards = [
    {
      id: 1,
      status: '채택 전',
      user: '고양이 님',
      message: '심리적 압박감이 심해요',
      date: '08.11. 22:06'
    },
    {
      id: 2,
      status: '채택 전',
      user: '강아지 님',
      message: '스트레스가 너무 많아요',
      date: '08.11. 21:30'
    },
    {
      id: 3,
      status: '채택 전',
      user: '토끼 님',
      message: '불안감이 계속 들어요',
      date: '08.11. 20:15'
    }
  ];

  const completedBooks = [
    {
      id: 1,
      title: '고냥이님의 고민',
      subtitle: '회사 생활이 힘들어요',
      dateRange: '7.12 - 8.3',
      color: '#E3F2FD'
    },
    {
      id: 2,
      title: '멍멍이님의 고민',
      subtitle: '인간관계가 어려워요',
      dateRange: '7.15 - 8.5',
      color: '#E8F5E8'
    },
    {
      id: 3,
      title: '토끼님의 고민',
      subtitle: '자신감이 없어요',
      dateRange: '7.20 - 8.8',
      color: '#FFF3E0'
    }
  ];

  const concernCards = [
    {
      id: 1,
      title: '고냥이님의 고민',
      subtitle: '회사 생활이 힘들어요',
      dateRange: '7.12 - 8.3',
      likes: 123,
      color: '#E3F2FD'
    },
    {
      id: 2,
      title: '멍멍이님의 고민',
      subtitle: '인간관계가 어려워요',
      dateRange: '7.15 - 8.5',
      likes: 89,
      color: '#FCE4EC'
    },
    {
      id: 3,
      title: '토끼님의 고민',
      subtitle: '자신감이 없어요',
      dateRange: '7.20 - 8.8',
      likes: 156,
      color: '#F3E5F5'
    },
    {
      id: 4,
      title: '펭귄님의 고민',
      subtitle: '스트레스 관리가 안돼요',
      dateRange: '7.25 - 8.10',
      likes: 67,
      color: '#E0F2F1'
    }
  ];

  return (
    <Container>
      {/* 상단 프로필 섹션 */}
      <ProfileSection>
        <ProfileAvatar />
        <ProfileInfo>
          <ProfileName>심리상담가 너구리</ProfileName>
          <ProfileDescription>
            안녕하세요, 심리상담가 너구리입니다.
            <br />
            당신의 이야기를 들려주세요.
          </ProfileDescription>
        </ProfileInfo>
      </ProfileSection>

      {/* 한마디 해주실래요? 섹션 */}
      <Section>
        <SectionHeader>
          <SectionTitle>한마디 해주실래요?</SectionTitle>
          <ScrollIndicator>
            <ScrollDot $active={true} />
            <ScrollDot />
            <ScrollDot />
            <ScrollDot />
            <ScrollDot />
          </ScrollIndicator>
        </SectionHeader>
        <HorizontalScroll>
          {oneWordCards.map((card) => (
            <OneWordCard key={card.id}>
              <CardStatus>{card.status}</CardStatus>
              <CardUser>
                <UserAvatar />
                <UserName>{card.user}</UserName>
              </CardUser>
              <CardMessage>{card.message}</CardMessage>
              <CardDate>{card.date}</CardDate>
            </OneWordCard>
          ))}
        </HorizontalScroll>
        <Pagination>
          <PaginationDot $active={true} />
          <PaginationDot />
          <PaginationDot />
          <PaginationDot />
          <PaginationDot />
        </Pagination>
      </Section>

      {/* 오늘의 완결 BOOK UP! 섹션 */}
      <Section>
        <SectionHeader>
          <SectionTitle>오늘의 완결 BOOK UP!</SectionTitle>
          <ScrollIndicator>
            <ScrollDot $active={true} />
            <ScrollDot />
            <ScrollDot />
            <ScrollDot />
            <ScrollDot />
          </ScrollIndicator>
        </SectionHeader>
        <HorizontalScroll>
          {completedBooks.map((book) => (
            <CompletedBookCard key={book.id}>
              <BookSpine $color={book.color} />
              <BookContent>
                <BookTitle>{book.title}</BookTitle>
                <BookSubtitle>{book.subtitle}</BookSubtitle>
                <BookDate>{book.dateRange}</BookDate>
                <BookResolution>심리상담사 너구리 님이 해결해주셨어요!</BookResolution>
              </BookContent>
            </CompletedBookCard>
          ))}
        </HorizontalScroll>
        <Pagination>
          <PaginationDot $active={true} />
          <PaginationDot />
          <PaginationDot />
          <PaginationDot />
          <PaginationDot />
        </Pagination>
      </Section>

      {/* 고민은 이제 저 멀리, 섹션 */}
      <Section>
        <SectionTitle>고민은 이제 저 멀리,</SectionTitle>
        <ConcernGrid>
          {concernCards.map((card) => (
            <ConcernCard key={card.id}>
              <BookmarkIcon>
                <Bookmark size={16} color="#6B7280" />
              </BookmarkIcon>
              <BookSpine $color={card.color} />
              <CardContent>
                <CardTitle>{card.title}</CardTitle>
                <CardSubtitle>{card.subtitle}</CardSubtitle>
                <ConcernCardDate>{card.dateRange}</ConcernCardDate>
                <CardLikes>
                  <Heart size={14} color="#6B7280" />
                  <LikesCount>{card.likes}</LikesCount>
                </CardLikes>
              </CardContent>
            </ConcernCard>
          ))}
        </ConcernGrid>
      </Section>
    </Container>
  );
};

export default ExpertMainPage;

const Container = styled.div`
  padding: 20px;
  padding-bottom: 100px;
  background-color: #ffffff;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 32px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 16px;
`;

const ProfileAvatar = styled.div`
  width: 60px;
  height: 60px;
  background-color: #e9ecef;
  border-radius: 50%;
  flex-shrink: 0;
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const ProfileName = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 8px 0;
`;

const ProfileDescription = styled.p`
  font-size: 14px;
  color: #64748b;
  line-height: 1.5;
  margin: 0;
`;

const Section = styled.div`
  margin-bottom: 32px;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
`;

const ScrollIndicator = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

const ScrollDot = styled.div`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: ${props => props.$active ? '#1e293b' : '#e2e8f0'};
`;

const HorizontalScroll = styled.div`
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 8px;
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

const OneWordCard = styled.div`
  min-width: 200px;
  background-color: #f8f9fa;
  border-radius: 12px;
  padding: 16px;
  position: relative;
`;

const CardStatus = styled.div`
  font-size: 12px;
  color: #64748b;
  margin-bottom: 8px;
`;

const CardUser = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
`;

const UserAvatar = styled.div`
  width: 24px;
  height: 24px;
  background-color: #ffffff;
  border-radius: 50%;
`;

const UserName = styled.span`
  font-size: 14px;
  color: #1e293b;
  font-weight: 500;
`;

const CardMessage = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 12px;
  line-height: 1.4;
`;

const CardDate = styled.div`
  font-size: 12px;
  color: #94a3b8;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-top: 16px;
`;

const PaginationDot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${props => props.$active ? '#1e293b' : '#e2e8f0'};
`;

const CompletedBookCard = styled.div`
  min-width: 180px;
  background-color: #ffffff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 12px;
`;

const BookSpine = styled.div`
  width: 8px;
  background-color: ${props => props.color};
  border-radius: 4px;
  flex-shrink: 0;
`;

const BookContent = styled.div`
  flex: 1;
`;

const BookTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 4px;
`;

const BookSubtitle = styled.div`
  font-size: 12px;
  color: #64748b;
  margin-bottom: 8px;
`;

const BookDate = styled.div`
  font-size: 11px;
  color: #94a3b8;
  margin-bottom: 4px;
`;

const BookResolution = styled.div`
  font-size: 11px;
  color: #94a3b8;
`;

const ConcernGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
`;

const ConcernCard = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  display: flex;
  gap: 12px;
`;

const BookmarkIcon = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
`;

const CardContent = styled.div`
  flex: 1;
`;

const CardTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 4px;
`;

const CardSubtitle = styled.div`
  font-size: 12px;
  color: #64748b;
  margin-bottom: 8px;
`;

const ConcernCardDate = styled.div`
  font-size: 11px;
  color: #94a3b8;
  margin-bottom: 8px;
`;

const CardLikes = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const LikesCount = styled.span`
  font-size: 12px;
  color: #6B7280;
`;
