import React, { useRef } from 'react';
import styled from 'styled-components';
import { 
  Heart, 
  Bookmark
} from 'lucide-react';

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
  cursor: grab;
  user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  &:active {
    cursor: grabbing;
  }
  
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

const BookmarkIcon = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  color: #6c757d;
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

const LikeSection = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 12px;
`;

const LikeIcon = styled.div`
  color: #ff6b6b;
`;

const LikeCount = styled.span`
  font-size: 12px;
  color: #6c757d;
  font-weight: 500;
`;

const HomePage = () => {
  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartScrollLeft = useRef(0);
  const hasDragged = useRef(false);

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

  // 고민은 이제 저 멀리 데이터
  const worryBooks = [
    {
      id: 1,
      title: '고양이님의 고민',
      subtitle: '회사 생활이 힘들어요',
      date: '23. 8. 3',
      likes: 103
    },
    {
      id: 2,
      title: '강아지님의 고민',
      subtitle: '대인관계가 어려워요',
      date: '23. 8. 2',
      likes: 125
    },
    {
      id: 3,
      title: '토끼님의 고민',
      subtitle: '자신감이 부족해요',
      date: '23. 8. 1',
      likes: 89
    },
    {
      id: 4,
      title: '펭귄님의 고민',
      subtitle: '스트레스 관리가 어려워요',
      date: '23. 7. 30',
      likes: 156
    }
  ];

  const onMouseDown = (e) => {
    isDragging.current = true;
    dragStartX.current = e.pageX;
    dragStartScrollLeft.current = containerRef.current ? containerRef.current.scrollLeft : 0;
    hasDragged.current = false;
  };

  const onMouseMove = (e) => {
    if (!isDragging.current || !containerRef.current) return;
    e.preventDefault();
    const deltaX = e.pageX - dragStartX.current;
    containerRef.current.scrollLeft = dragStartScrollLeft.current - deltaX;
    if (Math.abs(deltaX) > 5) hasDragged.current = true;
  };

  const endDrag = () => {
    isDragging.current = false;
  };

  const onTouchStart = (e) => {
    const touch = e.touches[0];
    isDragging.current = true;
    dragStartX.current = touch.pageX;
    dragStartScrollLeft.current = containerRef.current ? containerRef.current.scrollLeft : 0;
    hasDragged.current = false;
  };

  const onTouchMove = (e) => {
    if (!isDragging.current || !containerRef.current) return;
    const touch = e.touches[0];
    const deltaX = touch.pageX - dragStartX.current;
    containerRef.current.scrollLeft = dragStartScrollLeft.current - deltaX;
    if (Math.abs(deltaX) > 5) hasDragged.current = true;
  };

  const onTouchEnd = () => {
    isDragging.current = false;
  };

  const handleCardClick = (book) => {
    if (hasDragged.current) return;
    console.log('카드 클릭:', book.title);
    // 카드 상세 페이지로 이동하는 로직 추가 예정
  };

  return (
    <HomeContainer>
      <ContentArea>
        {/* 오늘의 완결 BOOK UP 섹션 */}
        <TodaySection>
          <SectionTitle>오늘의 완결 BOOK UP!</SectionTitle>
          <ScrollContainer
            ref={containerRef}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={endDrag}
            onMouseLeave={endDrag}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <HorizontalCardList>
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
        </TodaySection>

        {/* 고민은 이제 저 멀리 섹션 */}
        <WorrySection>
          <SectionTitle>고민은 이제 저 멀리,</SectionTitle>
          <BookGrid>
            {worryBooks.map((book) => (
              <BookCard key={book.id} onClick={() => handleCardClick(book)}>
                <BookmarkIcon>
                  <Bookmark size={16} />
                </BookmarkIcon>
                <BookContent>
                  <BookTitle>{book.title}</BookTitle>
                  <BookSubtitle>{book.subtitle}</BookSubtitle>
                  <BookDate>{book.date}</BookDate>
                  <LikeSection>
                    <LikeIcon>
                      <Heart size={12} fill="#ff6b6b" />
                    </LikeIcon>
                    <LikeCount>{book.likes}</LikeCount>
                  </LikeSection>
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
