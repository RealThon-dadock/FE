import React from 'react';
import styled from 'styled-components';
import { BookOpen, Search, Filter, Plus } from 'lucide-react';

const BookshelfPage = () => {
  const books = [
    { id: 1, title: '부동산 투자 가이드', author: '김투자', category: '투자', rating: 4.5 },
    { id: 2, title: '시장 분석 방법론', author: '이분석', category: '분석', rating: 4.2 },
    { id: 3, title: '성공 투자 사례', author: '박성공', category: '사례', rating: 4.8 },
    { id: 4, title: '부동산 법률 해설', author: '최법률', category: '법률', rating: 4.0 },
    { id: 5, title: '시장 트렌드 2024', author: '정트렌드', category: '트렌드', rating: 4.6 },
    { id: 6, title: '투자 심리학', author: '한심리', category: '심리', rating: 4.3 }
  ];

  return (
    <BookshelfContainer>
      <Header>
        <Title>책장</Title>
        <Subtitle>부동산 투자 관련 도서</Subtitle>
      </Header>
      
      <SearchSection>
        <SearchBar>
          <Search size={20} color="#64748b" />
          <SearchInput placeholder="도서 검색..." />
        </SearchBar>
        <FilterButton>
          <Filter size={20} />
        </FilterButton>
      </SearchSection>
      
      <CategoryTabs>
        <CategoryTab $isActive={true}>전체</CategoryTab>
        <CategoryTab>투자</CategoryTab>
        <CategoryTab>분석</CategoryTab>
        <CategoryTab>사례</CategoryTab>
        <CategoryTab>법률</CategoryTab>
      </CategoryTabs>
      
      <BookGrid>
        {books.map((book) => (
          <BookCard key={book.id}>
            <BookCover>
              <BookOpen size={32} color="#2563eb" />
            </BookCover>
            <BookInfo>
              <BookTitle>{book.title}</BookTitle>
              <BookAuthor>{book.author}</BookAuthor>
              <BookCategory>{book.category}</BookCategory>
              <BookRating>⭐ {book.rating}</BookRating>
            </BookInfo>
          </BookCard>
        ))}
      </BookGrid>
      
      <AddButton>
        <Plus size={24} />
      </AddButton>
    </BookshelfContainer>
  );
};

export default BookshelfPage;

const BookshelfContainer = styled.div`
  padding: 20px;
  padding-bottom: 100px;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  min-height: 100vh;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 24px;
  padding: 20px;
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  border-radius: 20px;
  color: white;
  box-shadow: 0 8px 32px rgba(37, 99, 235, 0.3);
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 4px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
`;

const SearchSection = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
`;

const SearchBar = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  background: white;
  border-radius: 16px;
  padding: 12px 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  gap: 12px;
  border: 1px solid rgba(37, 99, 235, 0.1);
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  flex: 1;
  font-size: 14px;
  
  &::placeholder {
    color: #94a3b8;
  }
`;

const FilterButton = styled.button`
  width: 48px;
  height: 48px;
  background: white;
  border: none;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  color: #64748b;
  cursor: pointer;
  border: 1px solid rgba(37, 99, 235, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(37, 99, 235, 0.2);
  }
`;

const CategoryTabs = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  overflow-x: auto;
  padding-bottom: 8px;
`;

const CategoryTab = styled.button`
  background: ${props => props.$isActive ? 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)' : 'white'};
  color: ${props => props.$isActive ? 'white' : '#64748b'};
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 1px solid rgba(37, 99, 235, 0.1);
  
  &:hover {
    background: ${props => props.$isActive ? 'linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)' : '#f8fafc'};
    transform: translateY(-2px);
  }
`;

const BookGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`;

const BookCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border: 1px solid rgba(37, 99, 235, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 32px rgba(37, 99, 235, 0.2);
    border-color: rgba(37, 99, 235, 0.3);
  }
`;

const BookCover = styled.div`
  width: 60px;
  height: 80px;
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  border: 1px solid rgba(37, 99, 235, 0.1);
`;

const BookInfo = styled.div`
  flex: 1;
  width: 100%;
`;

const BookTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 4px;
  line-height: 1.3;
`;

const BookAuthor = styled.p`
  font-size: 12px;
  color: #64748b;
  margin-bottom: 4px;
`;

const BookCategory = styled.span`
  font-size: 10px;
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  color: white;
  padding: 2px 6px;
  border-radius: 8px;
  margin-bottom: 4px;
  display: inline-block;
`;

const BookRating = styled.div`
  font-size: 12px;
  color: #f59e0b;
  margin-top: 4px;
`;

const AddButton = styled.button`
  position: fixed;
  bottom: 100px;
  right: 20px;
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 8px 32px rgba(37, 99, 235, 0.4);
  cursor: pointer;
  z-index: 100;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 12px 40px rgba(37, 99, 235, 0.5);
  }
`;
