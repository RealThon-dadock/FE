import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import MainPageImg from '../assets/image/MainPageImg.png';

const ExpertContainer = styled.div`
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

// 한마디 해주실래요? 섹션
const OneWordSection = styled.section`
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
  background-color: #e9ecef;
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

// 오늘의 완결 BOOK UP 섹션
const TodaySection = styled.section`
  margin-bottom: 32px;
`;

const CompletedBookCard = styled.div`
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

const BookContent = styled.div`
  margin-left: 12px;
`;

const BookTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #212529;
  margin: 0 0 8px 0;
  line-height: 1.3;
`;

const BookSubtitle = styled.p`
  font-size: 14px;
  color: #6c757d;
  margin: 0 0 8px 0;
`;

const BookDate = styled.span`
  font-size: 12px;
  color: #adb5bd;
`;

const BookResolution = styled.p`
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

const BookCardContent = styled.div`
  margin-top: 8px;
`;

const BookCardTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: #212529;
  margin: 0 0 6px 0;
  line-height: 1.3;
`;

const BookCardSubtitle = styled.p`
  font-size: 12px;
  color: #6c757d;
  margin: 0 0 6px 0;
`;

const BookCardDate = styled.span`
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

const ExpertMainPage = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [activeDot, setActiveDot] = useState(0);
  const [displayedWorryBooks, setDisplayedWorryBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showBookModal, setShowBookModal] = useState(false);

  // 한마디 해주실래요? 데이터
  const oneWordCards = [
    {
      id: 1,
      status: '채택 전',
      user: '고양이 님',
      message: '심리적 압박감이 심해요',
      date: '08.11',
      color: '#4ECDC4'
    },
    {
      id: 2,
      status: '채택 전',
      user: '강아지 님',
      message: '스트레스가 너무 많아요',
      date: '08.11',
      color: '#FF6B6B'
    },
    {
      id: 3,
      status: '채택 전',
      user: '토끼 님',
      message: '불안감이 계속 들어요',
      date: '08.11',
      color: '#45B7D1'
    }
  ];

  // 오늘의 완결 BOOK UP 데이터
  const todayBooks = [
    {
      id: 1,
      title: '고냥이님의 고민',
      subtitle: '회사 생활이 힘들어요',
      date: '7.12 - 8.3',
      description: '심리상담사 너구리 님이 해결해주셨어요!',
      color: '#E3F2FD'
    },
    {
      id: 2,
      title: '멍멍이님의 고민',
      subtitle: '인간관계가 어려워요',
      date: '7.15 - 8.5',
      description: '소통의 기술로 해결책을 찾았어요!',
      color: '#E8F5E8'
    },
    {
      id: 3,
      title: '토끼님의 고민',
      subtitle: '자신감이 없어요',
      date: '7.20 - 8.8',
      description: '자기계발로 새로운 변화를 시작했어요!',
      color: '#FFF3E0'
    }
  ];

  // 고민은 이제 저 멀리 데이터 (더 많은 책들)
  const allWorryBooks = [
    {
      id: 1,
      title: '고냥이님의 고민',
      subtitle: '회사 생활이 힘들어요',
      date: '7.12 - 8.3',
      content: '안녕하세요, 고냥이입니다. 요즘 회사에서 일이 너무 많아서 스트레스가 심해요. 특히 상사님께서 항상 까다롭게 구시고, 동료들과도 소통이 잘 안 돼요. 매일 밤늦게까지 일하고 집에 가면 너무 지쳐서 아무것도 할 수 없어요. 이런 상황을 어떻게 해결해야 할지 모르겠어요.'
    },
    {
      id: 2,
      title: '멍멍이님의 고민',
      subtitle: '인간관계가 어려워요',
      date: '7.15 - 8.5',
      content: '안녕하세요, 멍멍이입니다. 저는 사람들과 대화할 때 항상 긴장하고 어색해요. 특히 처음 만나는 사람 앞에서는 말을 제대로 못하고, 대화가 자연스럽게 이어지지 않아요. 친구들도 제가 너무 수줍어한다고 하는데, 어떻게 하면 더 자연스럽게 대화할 수 있을까요?'
    },
    {
      id: 3,
      title: '토끼님의 고민',
      subtitle: '자신감이 없어요',
      date: '7.20 - 8.8',
      content: '안녕하세요, 토끼입니다. 저는 항상 자신이 없어요. 뭔가를 해도 잘할 수 있을까 하는 생각이 먼저 들고, 실패할까봐 두려워서 도전을 못해요. 특히 중요한 일이나 새로운 일을 할 때는 더욱 그렇습니다. 어떻게 하면 자신감을 가질 수 있을까요?'
    },
    {
      id: 4,
      title: '펭귄님의 고민',
      subtitle: '스트레스 관리가 안돼요',
      date: '7.25 - 8.10',
      content: '안녕하세요, 펭귄입니다. 요즘 스트레스가 너무 많아서 어떻게 해야 할지 모르겠어요. 일도 많고, 개인적인 문제도 있어서 마음이 복잡해요. 스트레스를 어떻게 관리해야 할지 조언을 구하고 싶어요.'
    },
    {
      id: 5,
      title: '사자님의 고민',
      subtitle: '리더십 발휘가 어려워요',
      date: '7.29 - 8.12',
      content: '안녕하세요, 사자입니다. 팀장이 되었는데 리더십을 어떻게 발휘해야 할지 모르겠어요. 팀원들과의 관계도 어렵고, 업무 지시도 제대로 못하고 있어요. 좋은 리더가 되고 싶은데 어떻게 해야 할까요?'
    },
    {
      id: 6,
      title: '코알라님의 고민',
      subtitle: '수면 패턴이 불규칙해요',
      date: '8.1 - 8.15',
      content: '안녕하세요, 코알라입니다. 요즘 잠을 제대로 못 자고 있어요. 밤에 잠이 안 오고, 아침에 일어나기도 힘들어요. 수면 패턴을 어떻게 조정해야 할지 조언을 구하고 싶어요.'
    },
    {
      id: 7,
      title: '기린님의 고민',
      subtitle: '목이 길어서 불편해요',
      date: '8.3 - 8.18',
      content: '안녕하세요, 기린입니다. 목이 너무 길어서 일상생활이 불편해요. 옷도 맞는 게 없고, 차도 타기 어려워요. 이런 외모적 특징을 어떻게 받아들여야 할지 고민이에요.'
    },
    {
      id: 8,
      title: '코뿔소님의 고민',
      subtitle: '외모에 대한 스트레스가 있어요',
      date: '8.5 - 8.20',
      content: '안녕하세요, 코뿔소입니다. 외모 때문에 스트레스를 받고 있어요. 사람들이 저를 보면 놀라고, 때로는 무시하기도 해요. 외모에 대한 스트레스를 어떻게 해결해야 할까요?'
    },
    {
      id: 9,
      title: '하마님의 고민',
      subtitle: '체중 관리가 어려워요',
      date: '8.7 - 8.22',
      content: '안녕하세요, 하마입니다. 체중 관리가 너무 어려워요. 다이어트를 해도 금방 포기하고, 운동도 꾸준히 못하고 있어요. 건강한 체중 관리를 어떻게 해야 할지 조언을 구하고 싶어요.'
    },
    {
      id: 10,
      title: '악어님의 고민',
      subtitle: '감정 표현이 어려워요',
      date: '8.9 - 8.25',
      content: '안녕하세요, 악어입니다. 감정을 표현하는 것이 너무 어려워요. 기쁘거나 슬플 때도 표정 변화가 없고, 다른 사람들이 제 감정을 이해하지 못해요. 어떻게 감정을 표현해야 할까요?'
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
    setSelectedBook(book);
    setShowBookModal(true);
  };

  const handleCloseModal = () => {
    setShowBookModal(false);
    setSelectedBook(null);
  };

  return (
    <ExpertContainer>
      <ContentArea>
        {/* 히어로 이미지 */}
        <HeroImage />
        
        {/* 한마디 해주실래요? 섹션 */}
        <OneWordSection>
          <SectionTitle>한마디 해주실래요?</SectionTitle>
          <ScrollContainer>
            <HorizontalCardList ref={scrollRef} onScroll={handleScroll}>
              {oneWordCards.map((card) => (
                <HorizontalCard key={card.id} onClick={() => handleCardClick(card)}>
                  <CardSpine color={card.color} />
                  <CardContent>
                    <CardStatus>{card.status}</CardStatus>
                    <CardUser>
                      <UserAvatar />
                      <UserName>{card.user}</UserName>
                    </CardUser>
                    <CardMessage>{card.message}</CardMessage>
                    <CardDate>{card.date}</CardDate>
                  </CardContent>
                </HorizontalCard>
              ))}
            </HorizontalCardList>
          </ScrollContainer>
          <DotIndicator>
            {oneWordCards.map((_, index) => (
              <Dot key={index} active={index === activeDot} />
            ))}
          </DotIndicator>
        </OneWordSection>

        {/* 오늘의 완결 BOOK UP 섹션 */}
        <TodaySection>
          <SectionTitle>오늘의 완결 BOOK UP!</SectionTitle>
          <ScrollContainer>
            <HorizontalCardList>
              {todayBooks.map((book) => (
                <CompletedBookCard key={book.id} onClick={() => handleCardClick(book)}>
                  <CardSpine color={book.color} />
                  <BookContent>
                    <BookTitle>{book.title}</BookTitle>
                    <BookSubtitle>{book.subtitle}</BookSubtitle>
                    <BookDate>{book.date}</BookDate>
                    <BookResolution>{book.description}</BookResolution>
                  </BookContent>
                </CompletedBookCard>
              ))}
            </HorizontalCardList>
          </ScrollContainer>
        </TodaySection>

        {/* 고민은 이제 저 멀리 섹션 */}
        <WorrySection>
          <SectionTitle>고민은 이제 저 멀리,</SectionTitle>
          <BookGrid>
            {displayedWorryBooks.map((book) => (
              <BookCard key={book.id} onClick={() => handleCardClick(book)}>
                <BookCardContent>
                  <BookCardTitle>{book.title}</BookCardTitle>
                  <BookCardSubtitle>{book.subtitle}</BookCardSubtitle>
                  <BookCardDate>{book.date}</BookCardDate>
                </BookCardContent>
              </BookCard>
            ))}
          </BookGrid>
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
              <ModalBookSubtitle>{selectedBook.subtitle}</ModalBookSubtitle>
              <ModalBookDate>{selectedBook.date}</ModalBookDate>
              <ModalBookText>{selectedBook.content}</ModalBookText>
            </ModalBookContent>
          </ModalContent>
        </ModalOverlay>
      )}
    </ExpertContainer>
  );
};

export default ExpertMainPage;


