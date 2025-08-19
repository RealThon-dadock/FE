import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { addCompletedBook } from '../utils/bookData';
import { useAuth } from '../contexts/AuthContext';
import LoginRequired from '../components/LoginRequired';

const CreateBookContainer = styled.div`
  max-width: 480px;
  margin: 0 auto;
  background-color: #f8f9fa;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const ContentArea = styled.div`
  padding: 20px;
  padding-bottom: 100px;
  padding-top: 40px;
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
  grid-template-columns: repeat(6, 1fr);
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

const CreateBookPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn, isLoading } = useAuth();
  const [currentTime, setCurrentTime] = useState('');
  const [bookTitle, setBookTitle] = useState('');
  const [bookContent, setBookContent] = useState('');
  const [selectedColor, setSelectedColor] = useState('#FF6B6B');

  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD',
    '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9', '#F8C471', '#82E0AA'
  ];

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

  const handleSubmit = () => {
    if (!bookTitle.trim() || !bookContent.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    // 새 책 데이터 생성
    const newBook = {
      id: Date.now(), // 임시 ID 생성
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

    console.log('새 책이 생성되었습니다:', newBook);
    
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
    </CreateBookContainer>
  );
};

export default CreateBookPage;
