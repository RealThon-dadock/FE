import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ArrowLeft, Bell, MoreVertical, Check } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { getWritingBooks, getCompletedBooks } from '../utils/bookData';

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

const PostDetailPage = () => {
  const navigate = useNavigate();
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

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

  const handleCloseMenu = () => {
    setShowMenu(false);
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
           <IconButton>
             <Bell size={24} />
           </IconButton>
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
         </HeaderRight>
      </Header>

      <ContentArea>
        <PostSection>
          <PostHeader>
            <ProfileImage />
            <PostInfo>
              <AuthorName>고양이</AuthorName>
              <PostDate>{book.date} 22:06</PostDate>
            </PostInfo>
          </PostHeader>
          <PostTitle>{book.title}</PostTitle>
          <PostContent>{book.content}</PostContent>
        </PostSection>

        <CommentsSection>
          <CommentsTitle>전문가들의 댓글 6</CommentsTitle>
          
          <CommentItem>
            <CommentProfileImage>
              <VerifiedBadge>
                <Check size={10} color="white" />
              </VerifiedBadge>
            </CommentProfileImage>
            <CommentContent>
              <CommentAuthor onClick={() => navigate('/choose-expert')}>심리상담사 너구리</CommentAuthor>
              <CommentDate>{book.date} 22:06</CommentDate>
              <CommentText>
                안녕하세요, 심리상담사 너구리입니다. 고양이님께서 심리적압박감이 심하셨군요... 이러한 조언을 드리며 저러한 조언을 드립니다. 더 자세한 상담도 도와드릴게요 :)
              </CommentText>
            </CommentContent>
          </CommentItem>

          <CommentItem>
            <CommentProfileImage>
              <VerifiedBadge>
                <Check size={10} color="white" />
              </VerifiedBadge>
            </CommentProfileImage>
            <CommentContent>
              <CommentAuthor onClick={() => navigate('/choose-expert')}>심리상담사 너구리</CommentAuthor>
              <CommentDate>{book.date} 22:06</CommentDate>
              <CommentText>
                안녕하세요, 심리상담사 너구리입니다. 고양이님께서 심리적압박감이 심하셨군요... 이러한 조언을 드리며 저러한 조언을 드립니다. 더 자세한 상담도 도와드릴게요 :)
              </CommentText>
            </CommentContent>
          </CommentItem>
        </CommentsSection>
      </ContentArea>
    </PostDetailContainer>
  );
};

export default PostDetailPage;
