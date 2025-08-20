import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ArrowLeft, Plus, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { 
  addWritingBook
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
  padding: 16px;
  padding-bottom: 100px;
  padding-top: 16px;
`;

const InputSection = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
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
  padding: 12px 16px;
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
  min-height: 150px;
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
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ColorLabel = styled.label`
  display: block;
  font-size: 16px;
  font-weight: 600;
  color: #212529;
  margin-bottom: 12px;
`;

const ColorGrid = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 12px;
  align-items: center;
`;

const ColorOption = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  border: 3px solid ${props => props.selected ? '#6c757d' : 'transparent'};
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const PlusButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #e9ecef;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6c757d;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #dee2e6;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
`;

const CompleteButton = styled.button`
  width: 100%;
  padding: 16px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, ${props => props.bookColor || '#FFB3BA'} 0%, ${props => props.bookColor || '#FFB3BA'}80 100%);
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  &:disabled {
    background: #e9ecef;
    transform: none;
    box-shadow: none;
    cursor: not-allowed;
  }
`;

const NotificationOverlay = styled.div`
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

const NotificationModal = styled.div`
  background-color: #f8f9fa;
  border-radius: 16px;
  padding: 24px;
  margin: 20px;
  max-width: 320px;
  width: 100%;
  text-align: center;
  position: relative;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  cursor: pointer;
  color: #6c757d;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const NotificationTitle = styled.h3`
  margin: 0 0 20px 0;
  font-size: 18px;
  font-weight: 600;
  color: #212529;
`;

const NotificationButtons = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
`;

const NotificationButton = styled.button`
  flex: 1;
  padding: 12px 16px;
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

const SuccessMessage = styled.div`
  color: #28a745;
  font-size: 16px;
  font-weight: 500;
  margin: 16px 0;
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 16px;
  font-weight: 500;
  margin: 16px 0;
`;

const CreateBookPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn, isLoading, user } = useAuth();
  const [currentTime, setCurrentTime] = useState('');
  const [bookTitle, setBookTitle] = useState('');
  const [bookContent, setBookContent] = useState('');
  const [selectedColor, setSelectedColor] = useState('#FFB3BA');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const colors = ['#FFB3BA', '#FFE5B4', '#B8E6B8']; // 부드러운 핑크, 노랑, 파랑

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

  const handleBack = () => {
    navigate('/bookshelf');
  };

  const handleCreateBook = async () => {
    if (!bookTitle.trim() || !bookContent.trim()) {
      setErrorMessage('제목과 내용을 모두 입력해주세요.');
      setShowErrorModal(true);
      return;
    }

    if (!user || !user.id) {
      setErrorMessage('사용자 정보를 찾을 수 없습니다. 다시 로그인해주세요.');
      setShowErrorModal(true);
      return;
    }

    setIsSubmitting(true);

    try {
      // API 스타일의 데이터 구조 유지
      const bookData = {
        userId: user.id,
        title: bookTitle,
        content: bookContent,
        status: 'CONTINUE', // 작성 중 상태로 설정
        visibility: 'PRIVATE', // 기본값은 비공개
        color: selectedColor,
        author: user?.nickname || '사용자',
        date: new Date().toLocaleDateString('ko-KR', {
          month: '2-digit',
          day: '2-digit'
        }),
        createdAt: new Date().toISOString(),
        isWriting: true,
        isCompleted: false
      };

      // 로컬 스토리지에 저장 (API 대신)
      addWritingBook(bookData);
      
      console.log('책 생성 성공:', bookData);
      
      setShowSuccessModal(true);
    } catch (error) {
      console.error('책 생성 실패:', error);
      setErrorMessage('책 생성에 실패했습니다. 다시 시도해주세요.');
      setShowErrorModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    navigate('/bookshelf');
  };

  const handleErrorClose = () => {
    setShowErrorModal(false);
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
            <PlusButton>
              <Plus size={20} />
            </PlusButton>
          </ColorGrid>
        </ColorSection>

        <ButtonContainer>
          <CompleteButton
            onClick={handleCreateBook}
            disabled={!bookTitle.trim() || !bookContent.trim() || isSubmitting}
            bookColor={selectedColor}
          >
            {isSubmitting ? '생성 중...' : '책 생성하기'}
          </CompleteButton>
        </ButtonContainer>
      </ContentArea>

      {/* 성공 모달 */}
      {showSuccessModal && (
        <NotificationOverlay onClick={handleSuccessClose}>
          <NotificationModal onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={handleSuccessClose}>
              <X size={20} />
            </CloseButton>
            <NotificationTitle>책 생성 완료!</NotificationTitle>
            <SuccessMessage>새로운 책이 생성되었습니다!</SuccessMessage>
            <NotificationButtons>
              <NotificationButton className="primary" onClick={handleSuccessClose}>
                확인
              </NotificationButton>
            </NotificationButtons>
          </NotificationModal>
        </NotificationOverlay>
      )}

      {/* 에러 모달 */}
      {showErrorModal && (
        <NotificationOverlay onClick={handleErrorClose}>
          <NotificationModal onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={handleErrorClose}>
              <X size={20} />
            </CloseButton>
            <NotificationTitle>오류 발생</NotificationTitle>
            <ErrorMessage>{errorMessage}</ErrorMessage>
            <NotificationButtons>
              <NotificationButton className="secondary" onClick={handleErrorClose}>
                확인
              </NotificationButton>
            </NotificationButtons>
          </NotificationModal>
        </NotificationOverlay>
      )}
    </CreateBookContainer>
  );
};

export default CreateBookPage;
