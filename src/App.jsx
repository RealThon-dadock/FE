import { useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import MenuBar from './components/layout/MenuBar';
import MainLayout from './components/layout/MainLayout';
import Header from './components/layout/Header';
import MyPage from './pages/MyPage';
import BookshelfPage from './pages/BookshelfPage';
import CreateBookPage from './pages/CreateBookPage';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import PostDetailPage from './pages/PostDetailPage';
import KakaoLoginPage from './pages/KakaoLoginPage';
import Redirect from './pages/Redirect';
import { AuthProvider } from './contexts/AuthContext';

function AppContent() {
  const location = useLocation();
  
  const getHeaderTitle = () => {
    switch (location.pathname) {
      case '/':
        return '다독이다';
      case '/bookshelf':
        return '나의 책장';
      case '/create-book':
        return '고민 쓰기';
      case '/chat':
        return '채팅';
      case '/my':
        return '마이페이지';
      default:
        return '다독이다';
    }
  };

  return (
    <AppWrapper>
      <Header title={getHeaderTitle()} />
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/my" element={<MyPage />} />
          <Route path="/bookshelf" element={<BookshelfPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/create-book" element={<CreateBookPage />} />
          <Route path="/post/:bookId" element={<PostDetailPage />} />
          <Route path="/kakao-login" element={<KakaoLoginPage />} />
          <Route path="/redirect" element={<Redirect />} />
        </Routes>
      </MainLayout>
      <MenuBar />
    </AppWrapper>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <GlobalStyle />
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.css');

  ${reset}

  body {
    margin: 0;
    background-color: #f0f2f5;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      'Apple SD Gothic Neo', 'Noto Sans KR', system-ui, sans-serif;
  }
`;

const AppWrapper = styled.div`
  max-width: 480px;
  margin: 0 auto;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;