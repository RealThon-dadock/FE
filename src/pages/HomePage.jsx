import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const HomeContainer = styled.div`
  max-width: 480px;
  margin: 0 auto;
  background-color: #f8f9fa;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const ContentArea = styled.div`
  padding: 20px;
  padding-bottom: 100px;
  padding-top: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #212529;
  margin: 0 0 16px 0;
`;

// 오늘의 완결 BOOK UP 섹션
const TodaySection = styled.section`
  margin-bottom: 32px;
`;

const ScrollContainer = styled.div`
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

const HorizontalCardList = styled.div`
  display: flex;
  gap: 16px;
  padding: 4px 0;
`;

const HorizontalCard = styled.div`
  min-width: 280px;
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  cursor: pointer;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const CardSpine = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 6px;
  background: linear-gradient(180deg, ${props => props.color || '#4ECDC4'} 0%, ${props => props.color || '#4ECDC4'}80 100%);
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
`;

const CardContent = styled.div`
  margin-left: 12px;
`;

const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #212529;
  margin: 0 0 8px 0;
  line-height: 1.3;
`;

const CardSubtitle = styled.p`
  font-size: 14px;
  color: #6c757d;
  margin: 0 0 8px 0;
`;

const CardDate = styled.span`
  font-size: 12px;
  color: #adb5bd;
`;

const CardDescription = styled.p`
  font-size: 12px;
  color: #6c757d;
  margin: 8px 0 0 0;
  line-height: 1.4;
`;

const DotIndicator = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => props.active ? '#007bff' : '#dee2e6'};
  transition: background-color 0.2s ease;
`;

// 고민은 이제 저 멀리 섹션
const WorrySection = styled.section`
  margin-bottom: 32px;
`;

const BookGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

const BookCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  cursor: pointer;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const BookContent = styled.div`
  margin-top: 8px;
`;

const BookTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: #212529;
  margin: 0 0 6px 0;
  line-height: 1.3;
`;

const BookSubtitle = styled.p`
  font-size: 12px;
  color: #6c757d;
  margin: 0 0 6px 0;
`;

const BookDate = styled.span`
  font-size: 11px;
  color: #adb5bd;
`;

const HomePage = () => {
  const scrollRef = useRef(null);
  const [activeDot, setActiveDot] = useState(0);
  const [displayedWorryBooks, setDisplayedWorryBooks] = useState([]);

  // 오늘의 완결 BOOK UP 데이터
  const todayBooks = [
    {
      id: 1,
      title: '고양이님의 고민',
      subtitle: '회사 생활이 힘들어요',
      date: '23. 8. 3',
      description: '심리적 성찰로 너구리님이 해결해주셨어요!',
      color: '#4ECDC4'
    },
    {
      id: 2,
      title: '강아지님의 고민',
      subtitle: '대인관계가 어려워요',
      date: '23. 8. 2',
      description: '소통의 기술로 해결책을 찾았어요!',
      color: '#FF6B6B'
    },
    {
      id: 3,
      title: '토끼님의 고민',
      subtitle: '자신감이 부족해요',
      date: '23. 8. 1',
      description: '자기계발로 새로운 변화를 시작했어요!',
      color: '#45B7D1'
    }
  ];

  // 고민은 이제 저 멀리 데이터 (더 많은 책들)
  const allWorryBooks = [
    {
      id: 1,
      title: '고양이님의 고민',
      subtitle: '회사 생활이 힘들어요',
      date: '23. 8. 3'
    },
    {
      id: 2,
      title: '강아지님의 고민',
      subtitle: '대인관계가 어려워요',
      date: '23. 8. 2'
    },
    {
      id: 3,
      title: '토끼님의 고민',
      subtitle: '자신감이 부족해요',
      date: '23. 8. 1'
    },
    {
      id: 4,
      title: '펭귄님의 고민',
      subtitle: '스트레스 관리가 어려워요',
      date: '23. 7. 30'
    },
    {
      id: 5,
      title: '사자님의 고민',
      subtitle: '리더십 발휘가 어려워요',
      date: '23. 7. 29'
    },
    {
      id: 6,
      title: '코알라님의 고민',
      subtitle: '수면 패턴이 불규칙해요',
      date: '23. 7. 28'
    },
    {
      id: 7,
      title: '기린님의 고민',
      subtitle: '목이 길어서 불편해요',
      date: '23. 7. 27'
    },
    {
      id: 8,
      title: '코뿔소님의 고민',
      subtitle: '외모에 대한 스트레스가 있어요',
      date: '23. 7. 26'
    },
    {
      id: 9,
      title: '하마님의 고민',
      subtitle: '체중 관리가 어려워요',
      date: '23. 7. 25'
    },
    {
      id: 10,
      title: '악어님의 고민',
      subtitle: '감정 표현이 어려워요',
      date: '23. 7. 24'
    }
  ];

  // 랜덤으로 4개의 책을 선택하는 함수
  const getRandomBooks = () => {
    const shuffled = [...allWorryBooks].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4);
  };

  // 컴포넌트 마운트 시 랜덤 책들 설정
  useEffect(() => {
    setDisplayedWorryBooks(getRandomBooks());
  }, []);

  const handleScroll = (e) => {
    const scrollLeft = e.target.scrollLeft;
    const cardWidth = 280 + 16; // 카드 너비 + gap
    const newActiveDot = Math.round(scrollLeft / cardWidth);
    setActiveDot(newActiveDot);
  };

  const handleCardClick = (book) => {
    console.log('카드 클릭:', book.title);
    // 카드 상세 페이지로 이동하는 로직 추가
  };

  return (
    <HomeContainer>
      <ContentArea>
        {/* 오늘의 완결 BOOK UP 섹션 */}
        <TodaySection>
          <SectionTitle>오늘의 완결 BOOK UP!</SectionTitle>
          <ScrollContainer>
            <HorizontalCardList ref={scrollRef} onScroll={handleScroll}>
              {todayBooks.map((book) => (
                <HorizontalCard key={book.id} onClick={() => handleCardClick(book)}>
                  <CardSpine color={book.color} />
                  <CardContent>
                    <CardTitle>{book.title}</CardTitle>
                    <CardSubtitle>{book.subtitle}</CardSubtitle>
                    <CardDate>{book.date}</CardDate>
                    <CardDescription>{book.description}</CardDescription>
                  </CardContent>
                </HorizontalCard>
              ))}
            </HorizontalCardList>
          </ScrollContainer>
          <DotIndicator>
            {todayBooks.map((_, index) => (
              <Dot key={index} active={index === activeDot} />
            ))}
          </DotIndicator>
        </TodaySection>

        {/* 고민은 이제 저 멀리 섹션 */}
        <WorrySection>
          <SectionTitle>고민은 이제 저 멀리,</SectionTitle>
          <BookGrid>
            {displayedWorryBooks.map((book) => (
              <BookCard key={book.id} onClick={() => handleCardClick(book)}>
                <BookContent>
                  <BookTitle>{book.title}</BookTitle>
                  <BookSubtitle>{book.subtitle}</BookSubtitle>
                  <BookDate>{book.date}</BookDate>
                </BookContent>
              </BookCard>
            ))}
          </BookGrid>
        </WorrySection>
      </ContentArea>
    </HomeContainer>
  );
};

export default HomePage;
