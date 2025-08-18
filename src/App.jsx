import { useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset';
import Header from './components/layout/header';
import MenuBar from './components/layout/MenuBar';
import MainLayout from './components/layout/MainLayout';
function App() {
  return (
    <>
      <GlobalStyle />
      <AppWrapper>
        <Header />
        <MainLayout />
        <MenuBar />
      </AppWrapper>
    </>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
  ${reset}

  body {
    margin: 0;
    background-color: #f0f2f5; /* 배경색을 주어 앱 영역을 구분 */
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
  }
`;

const AppWrapper = styled.div`
  max-width: 480px; /* 앱 전체의 최대 너비를 480px로 제한 */
  margin: 0 auto; /* 화면 중앙에 위치 */
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;