import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { 
  Plus,
  Lock,
  MoreVertical
} from 'lucide-react';
import bookImage from '../assets/image/book.png';
import { 
  getWritingBooks, 
  getCompletedBooks, 
  onBooksUpdate,
  deleteWritingBook,
  deleteCompletedBook,
  moveToCompleted
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
  background-image: url(${bookImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 8px;
  padding: 20px 16px 16px 20px;
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
  width: 6px;
  background: linear-gradient(180deg, ${props => props.color || '#495057'} 0%, ${props => props.color || '#495057'}80 100%);
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.2);
`;

const BookTitle = styled.h3`
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
  line-height: 1.3;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  position: relative;
  z-index: 1;
`;

const BookDate = styled.p`
  margin: 0;
  font-size: 12px;
  color: #ffffff;
  font-weight: 500;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  position: relative;
  z-index: 1;
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
  transform: translateX(200px); /* 480px 컨테이너의 오른쪽에서 20px 안쪽 */
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
  const { isLoggedIn, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('writing');
  const [writingBooks, setWritingBooks] = useState([]);
  const [completedBooks, setCompletedBooks] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);

  // 책 데이터 로드
  useEffect(() => {
    const loadBooks = () => {
      setWritingBooks(getWritingBooks());
      setCompletedBooks(getCompletedBooks());
    };

    // 초기 데이터 로드
    loadBooks();

    // 이벤트 리스너 등록
    const cleanup = onBooksUpdate(() => {
      setCompletedBooks(getCompletedBooks());
    });

    return cleanup;
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleBookClick = (book) => {
    // 포스트 상세 페이지로 이동
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
        setWritingBooks(getWritingBooks());
      } else {
        deleteCompletedBook(book.id);
        setCompletedBooks(getCompletedBooks());
      }
      setOpenMenuId(null);
    }
  };

  const handleCompleteBook = (book) => {
    if (window.confirm('이 책을 완결하시겠습니까?')) {
      moveToCompleted(book.id);
      setWritingBooks(getWritingBooks());
      setCompletedBooks(getCompletedBooks());
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
          작성중
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
              <BookCard key={book.id} onClick={() => handleBookClick(book)}>
                <BookSpine color={book.color} />
                <BookTitle>{book.title}</BookTitle>
                <BookDate>{book.date}</BookDate>
                {book.isLocked && (
                  <LockIcon>
                    <Lock size={16} />
                  </LockIcon>
                )}
                {book.isWriting && (
                  <MenuButton onClick={(e) => handleMenuClick(e, book.id)}>
                    <MoreVertical size={16} />
                  </MenuButton>
                )}
                {openMenuId === book.id && book.isWriting && (
                  <MenuDropdown>
                    <MenuItem onClick={() => handleEditBook(book)}>
                      수정하기
                    </MenuItem>
                    <MenuItem onClick={() => handleCompleteBook(book)}>
                      완결하기
                    </MenuItem>
                    <MenuItem onClick={() => handleDeleteBook(book)}>
                      삭제하기
                    </MenuItem>
                  </MenuDropdown>
                )}
              </BookCard>
            ))}
          </BookGrid>
        ) : (
          <EmptyState>
            <EmptyIcon>📚</EmptyIcon>
            <EmptyText>
              {activeTab === 'writing' ? '작성 중인 책이 없습니다.' : '완결된 책이 없습니다.'}
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
