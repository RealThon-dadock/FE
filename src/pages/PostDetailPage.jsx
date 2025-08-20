import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ArrowLeft, MoreVertical, Check, Send, ExternalLink } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { getWritingBooks, getCompletedBooks } from '../utils/bookData';
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
  padding-bottom: 100px; /* 메뉴 바 높이만큼 패딩 */
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
  &:hover { text-decoration: underline; }
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
  align-items: flex-end;
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

const GoToOriginalButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  color: #495057;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 16px;
  
  &:hover {
    background-color: #e9ecef;
    border-color: #adb5bd;
  }
`;

const PostDetailPage = () => {
  const navigate = useNavigate();
  const { bookId } = useParams();
  const { profile, user } = useAuth();
  const [book, setBook] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [commentText, setCommentText] = useState('');
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

  const handleGoToOriginal = () => {
    // 원래 게시물로 이동 (현재 탭에서 이동)
    navigate(`/post/${bookId}`);
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
          
          {/* 전문가일 때만 게시물 바로가기 버튼 표시 */}
          {profile?.role === 'expert' && (
            <GoToOriginalButton onClick={handleGoToOriginal}>
              <ExternalLink size={16} />
              게시물 바로가기
            </GoToOriginalButton>
          )}
        </PostSection>

        {/* 댓글 섹션 - 모든 사용자에게 표시 */}
        <CommentsSection>
          <CommentsTitle>댓글 {comments.length}</CommentsTitle>
          
          {comments.map((comment) => (
            <CommentItem key={comment.id}>
              <CommentProfileImage>
                <VerifiedBadge>
                  <Check size={10} color="white" />
                </VerifiedBadge>
              </CommentProfileImage>
              <CommentContent>
                <CommentAuthor onClick={() => navigate(`/choose-expert?postId=${bookId}&postTitle=${encodeURIComponent(book.title)}`)}>{comment.author}</CommentAuthor>
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
    </PostDetailContainer>
  );
};

export default PostDetailPage;
