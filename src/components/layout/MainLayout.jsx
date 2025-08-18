import styled from "styled-components";

function MainLayout() {
    return(
        <MainWrapper>
            Main Content
        </MainWrapper>
    );
}

export default MainLayout;

const MainWrapper = styled.main`
  flex: 1;
  overflow-y: auto;
  
  /* 기본 패딩 (max-width: 480px) */
  /* 헤더와 메뉴바 높이를 고려하여 설정 */
  padding: 65px 20px 70px;


  /* 보통 폰 (max-width: 414px) */
  @media (max-width: 414px) {
    padding-top: 60px;
    padding-bottom: 65px;

  }
  
  /* 작은 폰 (max-width: 360px) */
  @media (max-width: 360px) {
    padding: 55px 15px 60px;

  }
`;