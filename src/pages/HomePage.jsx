import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { getBooks } from '../api/book';
import MainPageImg from '../assets/image/MainPageImg.png';

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

const HeroImage = styled.div`
  width: 100%;
  height: 200px;
  background-image: url(${MainPageImg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 12px;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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
  width: 20px;
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

// 책 상세 모달 스타일
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 16px;
  padding: 24px;
  max-width: 400px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #6c757d;
  padding: 4px;
  border-radius: 4px;
  
  &:hover {
    background-color: #f8f9fa;
  }
`;

const ModalBookSpine = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 20px;
  background: linear-gradient(180deg, ${props => props.color || '#4ECDC4'} 0%, ${props => props.color || '#4ECDC4'}80 100%);
  border-top-left-radius: 16px;
  border-bottom-left-radius: 16px;
`;

const ModalBookContent = styled.div`
  margin-left: 16px;
`;

const ModalBookTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #212529;
  margin: 0 0 8px 0;
  line-height: 1.3;
`;

const ModalBookSubtitle = styled.p`
  font-size: 16px;
  color: #6c757d;
  margin: 0 0 12px 0;
`;

const ModalBookDate = styled.span`
  font-size: 14px;
  color: #adb5bd;
  margin-bottom: 20px;
  display: block;
`;

const ModalBookText = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #495057;
  margin: 0;
  white-space: pre-line;
`;

const LoadingText = styled.div`
  text-align: center;
  padding: 40px;
  color: #6c757d;
  font-size: 16px;
`;

const HomePage = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [activeDot, setActiveDot] = useState(0);
  const [todayBooks, setTodayBooks] = useState([]);
  const [displayedWorryBooks, setDisplayedWorryBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showBookModal, setShowBookModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 색상 매핑 함수
  const getColorFromBackend = (backendColor) => {
    const colorMapping = {
      'RED': '#FF6B6B',
      'YELLOW': '#FFD93D',
      'BLUE': '#4ECDC4'
    };
    return colorMapping[backendColor] || '#4ECDC4';
  };

  // 랜덤으로 책을 선택하는 함수
  const getRandomBooks = (books, count) => {
    const shuffled = [...books].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // 책 데이터 로드
  useEffect(() => {
    const loadBooks = async () => {
      try {
        setIsLoading(true);
        const response = await getBooks();
        const allBooks = response.books || [];
        
        // 완결된 공개 책들만 필터링
        const completedPublicBooks = allBooks.filter(book => 
          book.status === 'END' && book.visibility === 'PUBLIC'
        );

        // 오늘의 완결 BOOK UP (3개)
        const todayBooksData = getRandomBooks(completedPublicBooks, 3).map(book => ({
          ...book,
          color: getColorFromBackend(book.color),
          date: new Date(book.completedAt || book.createdAt).toLocaleDateString('ko-KR', {
            month: '2-digit',
            day: '2-digit'
          }),
          description: '전문가와의 상담으로 해결되었어요!'
        }));

        // 고민은 이제 저 멀리 (4개)
        const worryBooksData = getRandomBooks(completedPublicBooks, 4).map(book => ({
          ...book,
          color: getColorFromBackend(book.color),
          date: new Date(book.completedAt || book.createdAt).toLocaleDateString('ko-KR', {
            month: '2-digit',
            day: '2-digit'
          })
        }));

        setTodayBooks(todayBooksData);
        setDisplayedWorryBooks(worryBooksData);
      } catch (error) {
        console.error('책 목록 로드 실패:', error);
        // 에러 시 기본 데이터 사용
        setTodayBooks([]);
        setDisplayedWorryBooks([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadBooks();
  }, []);

  const handleScroll = (e) => {
    const scrollLeft = e.target.scrollLeft;
    const cardWidth = 280 + 16; // 카드 너비 + gap
    const newActiveDot = Math.round(scrollLeft / cardWidth);
    setActiveDot(newActiveDot);
  };

  const handleCardClick = (book) => {
    console.log('카드 클릭:', book.title);
    setSelectedBook(book);
    setShowBookModal(true);
  };

  const handleCloseModal = () => {
    setShowBookModal(false);
    setSelectedBook(null);
  };

  if (isLoading) {
    return (
      <HomeContainer>
        <ContentArea>
          <HeroImage />
          <LoadingText>책들을 불러오는 중...</LoadingText>
        </ContentArea>
      </HomeContainer>
    );
  }

  return (
    <HomeContainer>
      <ContentArea>
        {/* 히어로 이미지 */}
        <HeroImage />
        
        {/* 오늘의 완결 BOOK UP 섹션 */}
        <TodaySection>
          <SectionTitle>오늘의 완결 BOOK UP!</SectionTitle>
          {todayBooks.length > 0 ? (
            <>
              <ScrollContainer>
                <HorizontalCardList ref={scrollRef} onScroll={handleScroll}>
                  {todayBooks.map((book) => (
                    <HorizontalCard key={book.id} onClick={() => handleCardClick(book)}>
                      <CardSpine color={book.color} />
                      <CardContent>
                        <CardTitle>{book.title}</CardTitle>
                        <CardSubtitle>{book.content.substring(0, 30)}...</CardSubtitle>
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
            </>
          ) : (
            <LoadingText>완결된 책이 없습니다.</LoadingText>
          )}
        </TodaySection>

        {/* 고민은 이제 저 멀리 섹션 */}
        <WorrySection>
          <SectionTitle>고민은 이제 저 멀리,</SectionTitle>
          {displayedWorryBooks.length > 0 ? (
            <BookGrid>
              {displayedWorryBooks.map((book) => (
                <BookCard key={book.id} onClick={() => handleCardClick(book)}>
                  <BookContent>
                    <BookTitle>{book.title}</BookTitle>
                    <BookSubtitle>{book.content.substring(0, 20)}...</BookSubtitle>
                    <BookDate>{book.date}</BookDate>
                  </BookContent>
                </BookCard>
              ))}
            </BookGrid>
          ) : (
            <LoadingText>완결된 책이 없습니다.</LoadingText>
          )}
        </WorrySection>
      </ContentArea>

      {/* 책 상세 모달 */}
      {showBookModal && selectedBook && (
        <ModalOverlay onClick={handleCloseModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalCloseButton onClick={handleCloseModal}>×</ModalCloseButton>
            <ModalBookSpine color={selectedBook.color} />
            <ModalBookContent>
              <ModalBookTitle>{selectedBook.title}</ModalBookTitle>
              <ModalBookSubtitle>{selectedBook.content.substring(0, 50)}...</ModalBookSubtitle>
              <ModalBookDate>{selectedBook.date}</ModalBookDate>
              <ModalBookText>{selectedBook.content}</ModalBookText>
            </ModalBookContent>
          </ModalContent>
        </ModalOverlay>
      )}
    </HomeContainer>
  );
};

export default HomePage;
