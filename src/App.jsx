import { useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import MenuBar from './components/layout/MenuBar';
import MainLayout from './components/layout/MainLayout';
import ExpertMainPage from './pages/ExpertMainPage';

function App() {
  return (
    <Router>
      <GlobalStyle />
      <AppWrapper>
        <Header />
        <MainLayout>
          <Routes>
            <Route path="/" element={<ExpertMainPage />} />
          </Routes>
        </MainLayout>
        <MenuBar />
      </AppWrapper>
    </Router>
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