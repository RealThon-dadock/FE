import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { 
  Plus,
  Lock,
  MoreVertical,
  X
} from 'lucide-react';
import bookImage1 from '../assets/image/book1.png';
import bookImage2 from '../assets/image/book2.png';
import bookImage3 from '../assets/image/book3.png';
import bookImage4 from '../assets/image/book4.png';
import bookImage5 from '../assets/image/book5.png';
import bookImage6 from '../assets/image/book6.png';
import { 
  getWritingBooks, 
  getCompletedBooks, 
  onBooksUpdate,
  deleteWritingBook,
  deleteCompletedBook
} from '../utils/bookData';
import { useAuth } from '../contexts/AuthContext';
import LoginRequired from '../components/LoginRequired';

const BookshelfContainer = styled.div`
  max-width: 480px;
  margin: 0 auto;
  background-color: #f8f9fa;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const TabContainer = styled.div`
  display: flex;
  background-color: white;
  border-bottom: 1px solid #e9ecef;
`;

const Tab = styled.button`
  flex: 1;
  padding: 16px 20px;
  background: none;
  border: none;
  font-size: 16px;
  font-weight: ${props => props.active ? '600' : '400'};
  color: ${props => props.active ? '#212529' : '#6c757d'};
  cursor: pointer;
  position: relative;
  
  &:hover {
    background-color: #f8f9fa;
  }
  
  ${props => props.active && `
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 2px;
      background-color: #212529;
    }
  `}
`;

const ContentArea = styled.div`
  padding: 20px;
  padding-bottom: 100px;
`;

const BookGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding: 10px 0;
`;

const BookCard = styled.div`
  background-image: url(${props => props.backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 8px;
  padding: 20px 16px 16px 40px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  &:hover {
    transform: translateY(-4px) rotateY(5deg);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(0, 0, 0, 0.1) 100%);
    border-radius: 8px;
    pointer-events: none;
  }
`;

const BookSpine = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 30px;
  background: linear-gradient(180deg, ${props => props.color || '#495057'} 0%, ${props => props.color || '#495057'}80 100%);
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.2);
`;

const BookTitle = styled.h3`
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 700;
  color: #000000;
  line-height: 1.3;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
  position: relative;
  z-index: 1;
`;

const BookDate = styled.p`
  margin: 0;
  font-size: 12px;
  color: #000000;
  font-weight: 500;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
  position: relative;
  z-index: 1;
`;

const BookAuthor = styled.p`
  margin: 0 0 4px 0;
  font-size: 11px;
  color: #000000;
  font-weight: 400;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
  position: relative;
  z-index: 1;
  opacity: 0.9;
`;

const LockIcon = styled.div`
  position: absolute;
  bottom: 12px;
  right: 12px;
  color: #ffffff;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  padding: 4px;
  backdrop-filter: blur(4px);
  position: relative;
  z-index: 1;
`;

const MenuButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  color: #ffffff;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);
  z-index: 2;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

const MenuDropdown = styled.div`
  position: absolute;
  top: 40px;
  right: 8px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 10;
  min-width: 120px;
  overflow: hidden;
`;

const MenuItem = styled.button`
  width: 100%;
  padding: 12px 16px;
  background: none;
  border: none;
  text-align: left;
  font-size: 14px;
  color: #212529;
  cursor: pointer;
  
  &:hover {
    background-color: #f8f9fa;
  }
  
  &:not(:last-child) {
    border-bottom: 1px solid #e9ecef;
  }
`;

const FloatingActionButton = styled.button`
  position: fixed;
  bottom: 100px;
  right: 50%;
  transform: translateX(200px);
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #6c757d;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: all 0.2s ease;
  z-index: 1000;
  
  &:hover {
    background-color: #495057;
    transform: translateX(200px) scale(1.05);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #6c757d;
`;

const EmptyIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.5;
`;

const EmptyText = styled.p`
  font-size: 16px;
  margin: 0;
`;

const BookshelfPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn, isLoading, profile } = useAuth();
  const [activeTab, setActiveTab] = useState('writing');
  const [writingBooks, setWritingBooks] = useState([]);
  const [completedBooks, setCompletedBooks] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);

  // 책 표지 이미지 배열
  const bookImages = [bookImage1, bookImage2, bookImage3, bookImage4, bookImage5, bookImage6];

  // 랜덤 이미지 선택 함수
  const getRandomBookImage = () => {
    const randomIndex = Math.floor(Math.random() * bookImages.length);
    return bookImages[randomIndex];
  };

  // 책 데이터 로드
  useEffect(() => {
    const loadBooks = () => {
      const writing = getWritingBooks();
      const completed = getCompletedBooks();
      
      setWritingBooks(writing);
      setCompletedBooks(completed);
    };

    // 초기 데이터 로드
    loadBooks();

    // 이벤트 리스너 등록
    const cleanup = onBooksUpdate(() => {
      loadBooks();
    });

    return cleanup;
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleBookClick = (book) => {
    // 모든 책을 PostDetailPage로 이동
    navigate(`/post/${book.id}`);
  };

  const handleMenuClick = (e, bookId) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === bookId ? null : bookId);
  };

  const handleEditBook = (book) => {
    setOpenMenuId(null);
    navigate(`/create-book?edit=${book.id}`);
  };

  const handleDeleteBook = (book) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      if (book.isWriting) {
        deleteWritingBook(book.id);
      } else {
        deleteCompletedBook(book.id);
      }
      
      // 데이터 다시 로드
      const writing = getWritingBooks();
      const completed = getCompletedBooks();
      
      setWritingBooks(writing);
      setCompletedBooks(completed);
      setOpenMenuId(null);
    }
  };

  const handleAddBook = () => {
    navigate('/create-book');
  };

  const currentBooks = activeTab === 'writing' ? writingBooks : completedBooks;

  // 로딩 중이거나 로그인하지 않은 경우
  if (isLoading) {
    return (
      <BookshelfContainer>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          로딩 중...
        </div>
      </BookshelfContainer>
    );
  }

  if (!isLoggedIn) {
    return (
      <BookshelfContainer>
        <LoginRequired 
          title="로그인이 필요합니다"
          message="로그인 후 나의 책장을 확인할 수 있습니다!"
        />
      </BookshelfContainer>
    );
  }

  return (
    <BookshelfContainer>
      <TabContainer>
        <Tab 
          active={activeTab === 'writing'} 
          onClick={() => handleTabClick('writing')}
        >
          {profile?.role === 'expert' ? '상담중' : '작성중'}
        </Tab>
        <Tab 
          active={activeTab === 'completed'} 
          onClick={() => handleTabClick('completed')}
        >
          완결
        </Tab>
      </TabContainer>

      <ContentArea>
        {currentBooks.length > 0 ? (
          <BookGrid>
            {currentBooks.map((book) => (
              <BookCard 
                key={book.id} 
                onClick={() => handleBookClick(book)}
                backgroundImage={getRandomBookImage()}
              >
                <BookSpine color={book.color} />
                <BookTitle>{book.title}</BookTitle>
                <BookAuthor>{book.author || '사용자'}</BookAuthor>
                <BookDate>
                  {book.isCompleted && book.completedAt 
                    ? new Date(book.completedAt).toLocaleDateString('ko-KR', {
                        month: '2-digit',
                        day: '2-digit'
                      })
                    : book.date
                  }
                </BookDate>
                {book.visibility === 'PRIVATE' && (
                  <LockIcon>
                    <Lock size={16} />
                  </LockIcon>
                )}
                
                {/* 작성중인 책에만 메뉴 버튼 표시 */}
                {activeTab === 'writing' && profile?.role !== 'expert' && (
                  <>
                    <MenuButton onClick={(e) => handleMenuClick(e, book.id)}>
                      <MoreVertical size={16} />
                    </MenuButton>
                    {openMenuId === book.id && (
                      <MenuDropdown>
                        <MenuItem onClick={() => handleEditBook(book)}>
                          수정하기
                        </MenuItem>
                        <MenuItem onClick={() => handleDeleteBook(book)}>
                          삭제하기
                        </MenuItem>
                      </MenuDropdown>
                    )}
                  </>
                )}
              </BookCard>
            ))}
          </BookGrid>
        ) : (
          <EmptyState>
            <EmptyIcon>📚</EmptyIcon>
            <EmptyText>
              {activeTab === 'writing' 
                ? (profile?.role === 'expert' ? '상담 중인 책이 없습니다.' : '작성 중인 책이 없습니다.')
                : '완결된 책이 없습니다.'
              }
            </EmptyText>
          </EmptyState>
        )}
      </ContentArea>

      <FloatingActionButton onClick={handleAddBook}>
        <Plus size={24} />
      </FloatingActionButton>
    </BookshelfContainer>
  );
};

export default BookshelfPage;
