import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ArrowLeft, MoreVertical, Check, Send, X } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { getWritingBooks, getCompletedBooks, moveToCompleted } from '../utils/bookData';
import { useAuth } from '../contexts/AuthContext';

const PostDetailContainer = styled.div`
  max-width: 480px;
  margin: 0 auto;
  background-color: #f8f9fa;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background-color: white;
  border-bottom: 1px solid #e9ecef;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
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
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const HeaderTitle = styled.h1`
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 0 16px;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const IconButton = styled.button`
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
  position: relative;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const MenuDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 10;
  min-width: 120px;
  overflow: hidden;
  margin-top: 4px;
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

const ContentArea = styled.div`
  padding: 20px;
  padding-bottom: 100px;
`;

const PostSection = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const PostHeader = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 16px;
`;

const ProfileImage = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #dee2e6;
  margin-right: 12px;
  flex-shrink: 0;
`;

const PostInfo = styled.div`
  flex: 1;
`;

const AuthorName = styled.h3`
  margin: 0 0 4px 0;
  font-size: 16px;
  font-weight: 600;
  color: #212529;
`;

const PostDate = styled.p`
  margin: 0;
  font-size: 14px;
  color: #6c757d;
`;

const PostTitle = styled.h2`
  margin: 0 0 12px 0;
  font-size: 18px;
  font-weight: 700;
  color: #212529;
  line-height: 1.4;
`;

const PostContent = styled.p`
  margin: 0;
  font-size: 16px;
  line-height: 1.6;
  color: #495057;
`;

const CommentsSection = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const CommentsTitle = styled.h3`
  margin: 0 0 20px 0;
  font-size: 18px;
  font-weight: 600;
  color: #212529;
`;

const CommentItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const CommentProfileImage = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #dee2e6;
  margin-right: 12px;
  flex-shrink: 0;
  position: relative;
  cursor: pointer;
  
  &:hover {
    opacity: 0.8;
  }
`;

const VerifiedBadge = styled.div`
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #6c757d;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
`;

const CommentContent = styled.div`
  flex: 1;
`;

const CommentAuthor = styled.h4`
  margin: 0 0 4px 0;
  font-size: 16px;
  font-weight: 600;
  color: #212529;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`;

const CommentDate = styled.p`
  margin: 0 0 8px 0;
  font-size: 14px;
  color: #6c757d;
`;

const CommentText = styled.p`
  margin: 0;
  font-size: 16px;
  line-height: 1.6;
  color: #495057;
`;

// 댓글 입력 관련 스타일
const CommentInputSection = styled.div`
  padding: 20px;
  background-color: white;
  border-top: 1px solid #e9ecef;
  margin-top: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const CommentInputContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const CommentTextarea = styled.textarea`
  flex: 1;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 12px 16px;
  font-size: 14px;
  line-height: 1.4;
  resize: none;
  min-height: 44px;
  max-height: 120px;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const SendButton = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: none;
  background: #007bff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #0056b3;
  }
  
  &:disabled {
    background: #e9ecef;
    color: #6c757d;
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
  margin-top: 20px;
  
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

const PostDetailPage = () => {
  const navigate = useNavigate();
  const { bookId } = useParams();
  const { profile, user } = useAuth();
  const [book, setBook] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedVisibility, setSelectedVisibility] = useState('PUBLIC');
  const [comments, setComments] = useState([
    {
      id: 1,
      author: '심리상담사 너구리',
      date: new Date().toISOString(),
      text: '안녕하세요, 심리상담사 너구리입니다. 고양이님께서 심리적압박감이 심하셨군요... 이러한 조언을 드리며 저러한 조언을 드립니다. 더 자세한 상담도 도와드릴게요 :)'
    },
    {
      id: 2,
      author: '심리상담사 너구리',
      date: new Date().toISOString(),
      text: '안녕하세요, 심리상담사 너구리입니다. 고양이님께서 심리적압박감이 심하셨군요... 이러한 조언을 드리며 저러한 조언을 드립니다. 더 자세한 상담도 도와드릴게요 :)'
    }
  ]);

  useEffect(() => {
    // URL에서 bookId를 가져와서 해당 책 정보를 찾기
    const writingBooks = getWritingBooks();
    const completedBooks = getCompletedBooks();
    const allBooks = [...writingBooks, ...completedBooks];
    const foundBook = allBooks.find(b => b.id === parseInt(bookId));
    
    if (foundBook) {
      setBook(foundBook);
    } else {
      // 책을 찾을 수 없으면 책장으로 이동
      navigate('/bookshelf');
    }
  }, [bookId, navigate]);

  const handleBack = () => {
    navigate('/bookshelf');
  };

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };

  const handleEditBook = () => {
    setShowMenu(false);
    navigate(`/create-book?edit=${bookId}`);
  };

  const handleDeleteBook = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      // 책 삭제 로직
      const writingBooks = JSON.parse(localStorage.getItem('writingBooks') || '[]');
      const completedBooks = JSON.parse(localStorage.getItem('completedBooks') || '[]');
      
      const updatedWritingBooks = writingBooks.filter(b => b.id !== parseInt(bookId));
      const updatedCompletedBooks = completedBooks.filter(b => b.id !== parseInt(bookId));
      
      localStorage.setItem('writingBooks', JSON.stringify(updatedWritingBooks));
      localStorage.setItem('completedBooks', JSON.stringify(updatedCompletedBooks));
      
      // 이벤트 발생
      window.dispatchEvent(new CustomEvent('booksUpdated'));
      
      navigate('/bookshelf');
    }
  };

  const handleCompleteBook = () => {
    setShowShareModal(true);
  };

  const handleShareConfirm = () => {
    if (book) {
      try {
        // 완결 처리
        moveToCompleted(book.id, selectedVisibility);
        
        // 책 정보 업데이트
        const writingBooks = getWritingBooks();
        const completedBooks = getCompletedBooks();
        const allBooks = [...writingBooks, ...completedBooks];
        const updatedBook = allBooks.find(b => b.id === parseInt(bookId));
        
        if (updatedBook) {
          setBook(updatedBook);
        }
        
        setShowShareModal(false);
        setShowSuccessModal(true);
      } catch (error) {
        console.error('책 완결 실패:', error);
        alert('책 완결에 실패했습니다.');
      }
    }
  };

  const handleShareCancel = () => {
    setShowShareModal(false);
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    navigate('/bookshelf');
  };

  const handleCloseMenu = () => {
    setShowMenu(false);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      const newComment = {
        id: Date.now(),
        author: user?.nickname || '사용자',
        date: new Date().toISOString(),
        text: commentText.trim()
      };
      setComments([...comments, newComment]);
      setCommentText('');
    }
  };

  const handleTextareaChange = (e) => {
    setCommentText(e.target.value);
    // 자동 높이 조정
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
  };

  // 전문가 클릭 핸들러 (일반 사용자만)
  const handleExpertClick = () => {
    if (profile?.role !== 'expert') {
      navigate(`/choose-expert?postId=${bookId}&postTitle=${encodeURIComponent(book.title)}`);
    }
  };

  if (!book) {
    return (
      <PostDetailContainer>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          로딩 중...
        </div>
      </PostDetailContainer>
    );
  }

  return (
    <PostDetailContainer onClick={handleCloseMenu}>
      <Header>
        <HeaderLeft>
          <BackButton onClick={handleBack}>
            <ArrowLeft size={24} />
          </BackButton>
          <HeaderTitle>포스트</HeaderTitle>
        </HeaderLeft>
        <HeaderRight>
          {/* 전문가가 아닐 때만 수정/삭제 메뉴 표시 */}
          {profile?.role !== 'expert' && (
            <IconButton onClick={(e) => {
              e.stopPropagation();
              handleMenuClick();
            }}>
              <MoreVertical size={24} />
              {showMenu && (
                <MenuDropdown onClick={(e) => e.stopPropagation()}>
                  <MenuItem onClick={handleEditBook}>
                    수정하기
                  </MenuItem>
                  <MenuItem onClick={handleDeleteBook}>
                    삭제하기
                  </MenuItem>
                </MenuDropdown>
              )}
            </IconButton>
          )}
        </HeaderRight>
      </Header>

      <ContentArea>
        <PostSection>
          <PostHeader>
            <ProfileImage />
            <PostInfo>
              <AuthorName>{book.author || '사용자'}</AuthorName>
              <PostDate>
                {book.completedAt 
                  ? new Date(book.completedAt).toLocaleString('ko-KR', {
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit'
                    })
                  : `${book.date} 22:06`
                }
              </PostDate>
            </PostInfo>
          </PostHeader>
          <PostTitle>{book.title}</PostTitle>
          <PostContent>{book.content}</PostContent>
          
          {/* 작성 중인 책에만 완결 버튼 표시 */}
          {book.isWriting && profile?.role !== 'expert' && (
            <CompleteButton 
              onClick={handleCompleteBook}
              bookColor={book.color}
            >
              완결하기
            </CompleteButton>
          )}
        </PostSection>

        {/* 댓글 섹션 - 모든 사용자에게 표시 */}
        <CommentsSection>
          <CommentsTitle>댓글 {comments.length}</CommentsTitle>
          
          {comments.map((comment) => (
            <CommentItem key={comment.id}>
              <CommentProfileImage onClick={handleExpertClick}>
                <VerifiedBadge>
                  <Check size={10} color="white" />
                </VerifiedBadge>
              </CommentProfileImage>
              <CommentContent>
                <CommentAuthor onClick={handleExpertClick}>{comment.author}</CommentAuthor>
                <CommentDate>
                  {new Date(comment.date).toLocaleString('ko-KR', {
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </CommentDate>
                <CommentText>{comment.text}</CommentText>
              </CommentContent>
            </CommentItem>
          ))}
        </CommentsSection>

        {/* 댓글 입력 섹션 - 전문가만 표시 */}
        {profile?.role === 'expert' && (
          <CommentInputSection>
            <form onSubmit={handleCommentSubmit}>
              <CommentInputContainer>
                <CommentTextarea
                  value={commentText}
                  onChange={handleTextareaChange}
                  placeholder="댓글을 입력하세요..."
                  rows={1}
                />
                <SendButton 
                  type="submit" 
                  disabled={!commentText.trim()}
                >
                  <Send size={20} />
                </SendButton>
              </CommentInputContainer>
            </form>
          </CommentInputSection>
        )}
      </ContentArea>

      {/* 공유 설정 모달 */}
      {showShareModal && (
        <NotificationOverlay onClick={handleShareCancel}>
          <NotificationModal onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={handleShareCancel}>
              <X size={20} />
            </CloseButton>
            <NotificationTitle>사람들에게 공유할까요?</NotificationTitle>
            <NotificationButtons>
              <NotificationButton 
                className="primary" 
                onClick={() => {
                  setSelectedVisibility('PUBLIC');
                  handleShareConfirm();
                }}
              >
                공개
              </NotificationButton>
              <NotificationButton 
                className="secondary" 
                onClick={() => {
                  setSelectedVisibility('PRIVATE');
                  handleShareConfirm();
                }}
              >
                비공개
              </NotificationButton>
            </NotificationButtons>
          </NotificationModal>
        </NotificationOverlay>
      )}

      {/* 성공 모달 */}
      {showSuccessModal && (
        <NotificationOverlay onClick={handleSuccessClose}>
          <NotificationModal onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={handleSuccessClose}>
              <X size={20} />
            </CloseButton>
            <NotificationTitle>완결 완료!</NotificationTitle>
            <SuccessMessage>책이 완결되었습니다!</SuccessMessage>
            <NotificationButtons>
              <NotificationButton className="primary" onClick={handleSuccessClose}>
                확인
              </NotificationButton>
            </NotificationButtons>
          </NotificationModal>
        </NotificationOverlay>
      )}
    </PostDetailContainer>
  );
};

export default PostDetailPage;
