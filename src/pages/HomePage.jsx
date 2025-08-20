import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { getCompletedBooks } from '../utils/bookData';
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
`;

const HeroImage = styled.div`
  width: 100%;
  height: 200px;
  background-image: url(${MainPageImg});
  background-size: cover;
  background-position: center;
  border-radius: 12px;
  margin-bottom: 24px;
`;

const TodaySection = styled.section`
  margin-bottom: 32px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #212529;
  margin: 0 0 16px 0;
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
  background: linear-gradient(135deg, ${props => props.color || '#FFB3BA'} 0%, ${props => props.color || '#FFB3BA'}80 100%);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 8px;
    background: rgba(255, 255, 255, 0.3);
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
  }
`;

const CardSpine = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 8px;
  background: rgba(255, 255, 255, 0.3);
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
`;

const CardContent = styled.div`
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;

const CardTitle = styled.h3`
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.3;
`;

const CardSubtitle = styled.p`
  margin: 0 0 12px 0;
  font-size: 14px;
  opacity: 0.9;
  line-height: 1.4;
`;

const CardDate = styled.p`
  margin: 0 0 8px 0;
  font-size: 12px;
  font-weight: 500;
  opacity: 0.8;
`;

const CardDescription = styled.p`
  margin: 0;
  font-size: 12px;
  opacity: 0.7;
  font-style: italic;
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
  background-color: ${props => props.active ? '#212529' : '#dee2e6'};
  transition: all 0.2s ease;
`;

const WorrySection = styled.section`
  margin-bottom: 32px;
`;

const BookGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

const BookCard = styled.div`
  background: linear-gradient(135deg, ${props => props.color || '#FFB3BA'} 0%, ${props => props.color || '#FFB3BA'}80 100%);
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 6px;
    background: rgba(255, 255, 255, 0.3);
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
  }
`;

const BookContent = styled.div`
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;

const BookTitle = styled.h3`
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.3;
`;

const BookSubtitle = styled.p`
  margin: 0 0 8px 0;
  font-size: 12px;
  opacity: 0.9;
  line-height: 1.4;
`;

const BookDate = styled.p`
  margin: 0;
  font-size: 11px;
  font-weight: 500;
  opacity: 0.8;
`;

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
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 16px;
  margin: 20px;
  max-width: 400px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
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
  z-index: 1;
  
  &:hover {
    color: #212529;
  }
`;

const ModalBookSpine = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 12px;
  background: linear-gradient(180deg, ${props => props.color || '#495057'} 0%, ${props => props.color || '#495057'}80 100%);
  border-top-left-radius: 16px;
  border-bottom-left-radius: 16px;
`;

const ModalBookContent = styled.div`
  padding: 24px 24px 24px 36px;
`;

const ModalBookTitle = styled.h2`
  margin: 0 0 12px 0;
  font-size: 20px;
  font-weight: 700;
  color: #212529;
  line-height: 1.3;
`;

const ModalBookSubtitle = styled.p`
  margin: 0 0 16px 0;
  font-size: 16px;
  color: #6c757d;
  line-height: 1.5;
`;

const ModalBookDate = styled.p`
  margin: 0 0 20px 0;
  font-size: 14px;
  color: #6c757d;
  font-weight: 500;
`;

const ModalBookText = styled.p`
  margin: 0;
  font-size: 16px;
  line-height: 1.6;
  color: #495057;
  white-space: pre-wrap;
`;

const LoadingText = styled.div`
  text-align: center;
  padding: 40px 20px;
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

  // 랜덤으로 책을 선택하는 함수
  const getRandomBooks = (books, count) => {
    const shuffled = [...books].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // 책 데이터 로드
  useEffect(() => {
    const loadBooks = () => {
      const allCompletedBooks = getCompletedBooks();
      
      // 완결된 공개 책들만 필터링 (visibility가 PUBLIC이거나 isLocked가 false인 것들)
      const publicCompletedBooks = allCompletedBooks.filter(book => 
        book.visibility === 'PUBLIC' || !book.isLocked
      );

      // 오늘의 완결 BOOK UP (3개)
      const todayBooksData = getRandomBooks(publicCompletedBooks, 3).map(book => ({
        ...book,
        date: book.completedAt 
          ? new Date(book.completedAt).toLocaleDateString('ko-KR', {
              month: '2-digit',
              day: '2-digit'
            })
          : book.date,
        description: '전문가와의 상담으로 해결되었어요!'
      }));

      // 고민은 이제 저 멀리 (4개)
      const worryBooksData = getRandomBooks(publicCompletedBooks, 4).map(book => ({
        ...book,
        date: book.completedAt 
          ? new Date(book.completedAt).toLocaleDateString('ko-KR', {
              month: '2-digit',
              day: '2-digit'
            })
          : book.date
      }));

      setTodayBooks(todayBooksData);
      setDisplayedWorryBooks(worryBooksData);
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
                    <HorizontalCard 
                      key={book.id} 
                      onClick={() => handleCardClick(book)}
                      color={book.color}
                    >
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
                <BookCard 
                  key={book.id} 
                  onClick={() => handleCardClick(book)}
                  color={book.color}
                >
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
