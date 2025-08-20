import { useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
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
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ChooseExpert from './pages/ChooseExpert';
import UserTypeModal from './components/UserTypeModal';

function AppContent() {
  const location = useLocation();
  const { isLoggedIn, isLoading, profile, isProfileLoaded } = useAuth();
  const [showUserTypeModal, setShowUserTypeModal] = useState(false);
  
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
      case '/choose-expert':
        return '전문가 선택';
      default:
        return '다독이다';
    }
  };

  // Show user type modal when logged in but no profile
  React.useEffect(() => {
    if (isLoggedIn && isProfileLoaded && !profile && !showUserTypeModal) {
      setShowUserTypeModal(true);
    }
  }, [isLoggedIn, isProfileLoaded, profile, showUserTypeModal]);

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
          <Route path="/choose-expert" element={<ChooseExpert />} />
          <Route path="/chatting" element={<ChatPage />} />
        </Routes>
      </MainLayout>
      <MenuBar />
      <UserTypeModal 
        isOpen={showUserTypeModal} 
        onClose={() => setShowUserTypeModal(false)} 
      />
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
  ${reset}

  body {
    margin: 0;
    background-color: #f0f2f5;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif;
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