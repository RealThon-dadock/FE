import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { 
  addCompletedBook, 
  addWritingBook, 
  updateWritingBook,
  deleteWritingBook,
  updateCompletedBook
} from '../utils/bookData';
import { useAuth } from '../contexts/AuthContext';
import LoginRequired from '../components/LoginRequired';

const CreateBookContainer = styled.div`
  max-width: 480px;
  margin: 0 auto;
  background-color: #f8f9fa;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
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
  margin-bottom: 16px;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const ContentArea = styled.div`
  padding: 20px;
  padding-bottom: 100px;
  padding-top: 20px;
`;

const InputSection = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const InputLabel = styled.label`
  display: block;
  font-size: 16px;
  font-weight: 600;
  color: #212529;
  margin-bottom: 12px;
`;

const TitleInput = styled.input`
  width: 100%;
  padding: 16px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 16px;
  font-family: inherit;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
  
  &::placeholder {
    color: #adb5bd;
  }
`;

const ContentTextarea = styled.textarea`
  width: 100%;
  min-height: 200px;
  padding: 16px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 16px;
  font-family: inherit;
  resize: vertical;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
  
  &::placeholder {
    color: #adb5bd;
  }
`;

const ColorSection = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const ColorLabel = styled.label`
  display: block;
  font-size: 16px;
  font-weight: 600;
  color: #212529;
  margin-bottom: 16px;
`;

const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
`;

const ColorOption = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  cursor: pointer;
  border: 3px solid ${props => props.selected ? '#007bff' : 'transparent'};
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 16px;
  background-color: ${props => props.bookColor || '#007bff'};
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
  
  &:disabled {
    background-color: #adb5bd;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const DialogOverlay = styled.div`
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

const Dialog = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 24px;
  margin: 20px;
  max-width: 320px;
  width: 100%;
  text-align: center;
`;

const DialogTitle = styled.h3`
  margin: 0 0 16px 0;
  font-size: 18px;
  font-weight: 600;
  color: #212529;
`;

const DialogButtons = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
`;

const DialogButton = styled.button`
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &.primary {
    background-color: #007bff;
    color: white;
    
    &:hover {
      background-color: #0056b3;
    }
  }
  
  &.secondary {
    background-color: #6c757d;
    color: white;
    
    &:hover {
      background-color: #545b62;
    }
  }
`;

const CreateBookPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn, isLoading } = useAuth();
  const [currentTime, setCurrentTime] = useState('');
  const [bookTitle, setBookTitle] = useState('');
  const [bookContent, setBookContent] = useState('');
  const [selectedColor, setSelectedColor] = useState('#FF6B6B');
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [editingBookId, setEditingBookId] = useState(null);

  const colors = ['#FF6B6B', '#FFD93D', '#4ECDC4']; // 빨강, 노랑, 파랑만

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
      setCurrentTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  // URL 파라미터에서 편집할 책 ID 확인
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('edit');
    if (bookId) {
      setEditingBookId(parseInt(bookId));
      // 기존 책 데이터 로드
      const writingBooks = JSON.parse(localStorage.getItem('writingBooks') || '[]');
      const completedBooks = JSON.parse(localStorage.getItem('completedBooks') || '[]');
      const allBooks = [...writingBooks, ...completedBooks];
      const bookToEdit = allBooks.find(book => book.id === parseInt(bookId));
      
      if (bookToEdit) {
        setBookTitle(bookToEdit.title || '');
        setBookContent(bookToEdit.content || '');
        setSelectedColor(bookToEdit.color || '#FF6B6B');
      }
    }
  }, []);

  const handleBack = () => {
    // 내용이 입력되어 있으면 다이얼로그 표시
    if (bookTitle.trim() || bookContent.trim()) {
      setShowExitDialog(true);
    } else {
      navigate('/bookshelf');
    }
  };

  const handleExit = () => {
    setShowExitDialog(false);
    navigate('/bookshelf');
  };

  const handleSaveDraft = () => {
    if (editingBookId) {
      // 기존 책 업데이트
      updateWritingBook(editingBookId, {
        title: bookTitle,
        content: bookContent,
        color: selectedColor,
        lastModified: Date.now()
      });
    } else {
      // 새 책을 작성중인 책으로 추가
      const newBook = {
        title: bookTitle,
        content: bookContent,
        color: selectedColor,
        date: new Date().toLocaleDateString('ko-KR', {
          month: '2-digit',
          day: '2-digit'
        }),
        lastModified: Date.now()
      };
      addWritingBook(newBook);
    }
    setShowExitDialog(false);
    navigate('/bookshelf');
  };

  const handleCancelDialog = () => {
    setShowExitDialog(false);
  };

  const handleSubmit = () => {
    if (!bookTitle.trim() || !bookContent.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    if (editingBookId) {
      // 기존 책이 작성중인 책인지 완결된 책인지 확인
      const writingBooks = JSON.parse(localStorage.getItem('writingBooks') || '[]');
      const completedBooks = JSON.parse(localStorage.getItem('completedBooks') || '[]');
      
      const bookToEdit = writingBooks.find(book => book.id === editingBookId) || 
                        completedBooks.find(book => book.id === editingBookId);
      
      if (bookToEdit) {
        const updatedBook = {
          ...bookToEdit,
          title: bookTitle,
          content: bookContent,
          color: selectedColor,
          lastModified: Date.now()
        };

        if (bookToEdit.isWriting) {
          // 작성중인 책 업데이트
          updateWritingBook(editingBookId, {
            title: bookTitle,
            content: bookContent,
            color: selectedColor,
            lastModified: Date.now()
          });
        } else {
          // 완결된 책 업데이트
          updateCompletedBook(editingBookId, {
            title: bookTitle,
            content: bookContent,
            color: selectedColor,
            lastModified: Date.now()
          });
        }
      }
    } else {
      // 새 책 데이터 생성
      const newBook = {
        title: bookTitle,
        content: bookContent,
        color: selectedColor,
        date: new Date().toLocaleDateString('ko-KR', {
          month: '2-digit',
          day: '2-digit'
        }),
        isLocked: false,
        isCompleted: true
      };

      // 새 책 추가 (유틸리티 함수 사용)
      addCompletedBook(newBook);
    }

    console.log('책이 완결되었습니다.');
    
    // 책장 페이지로 이동
    navigate('/bookshelf');
  };

  // 로딩 중이거나 로그인하지 않은 경우
  if (isLoading) {
    return (
      <CreateBookContainer>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          로딩 중...
        </div>
      </CreateBookContainer>
    );
  }

  if (!isLoggedIn) {
    return (
      <CreateBookContainer>
        <LoginRequired 
          title="로그인이 필요합니다"
          message="로그인 후 새 책을 작성할 수 있습니다!"
        />
      </CreateBookContainer>
    );
  }

  return (
    <CreateBookContainer>
      <BackButton onClick={handleBack}>
        <ArrowLeft size={24} />
      </BackButton>
      
      <ContentArea>
        <InputSection>
          <InputLabel>책 제목</InputLabel>
          <TitleInput
            type="text"
            placeholder="책 제목을 입력하세요"
            value={bookTitle}
            onChange={(e) => setBookTitle(e.target.value)}
          />
        </InputSection>

        <InputSection>
          <InputLabel>내용</InputLabel>
          <ContentTextarea
            placeholder="책의 내용을 입력하세요..."
            value={bookContent}
            onChange={(e) => setBookContent(e.target.value)}
          />
        </InputSection>

        <ColorSection>
          <ColorLabel>책 표지 색상</ColorLabel>
          <ColorGrid>
            {colors.map((color) => (
              <ColorOption
                key={color}
                style={{ backgroundColor: color }}
                selected={selectedColor === color}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </ColorGrid>
        </ColorSection>

        <SubmitButton
          onClick={handleSubmit}
          disabled={!bookTitle.trim() || !bookContent.trim()}
          bookColor={selectedColor}
        >
          완결하기
        </SubmitButton>
      </ContentArea>

      {showExitDialog && (
        <DialogOverlay onClick={handleCancelDialog}>
          <Dialog onClick={(e) => e.stopPropagation()}>
            <DialogTitle>정말 나갈까요?</DialogTitle>
            <DialogButtons>
              <DialogButton className="secondary" onClick={handleSaveDraft}>
                임시저장
              </DialogButton>
              <DialogButton className="primary" onClick={handleExit}>
                나가기
              </DialogButton>
            </DialogButtons>
          </Dialog>
        </DialogOverlay>
      )}
    </CreateBookContainer>
  );
};

export default CreateBookPage;
