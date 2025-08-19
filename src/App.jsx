import { useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MenuBar from './components/layout/MenuBar';
import MainLayout from './components/layout/MainLayout';
import MyPage from './pages/MyPage';
import BookshelfPage from './pages/BookshelfPage';
import CreateBookPage from './pages/CreateBookPage';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <GlobalStyle />
        <AppWrapper>
          <MainLayout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/my" element={<MyPage />} />
              <Route path="/bookshelf" element={<BookshelfPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/create-book" element={<CreateBookPage />} />
            </Routes>
          </MainLayout>
          <MenuBar />
        </AppWrapper>
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