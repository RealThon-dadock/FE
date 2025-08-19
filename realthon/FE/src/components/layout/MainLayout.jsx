import React from 'react';
import styled from "styled-components";

function MainLayout({ children }) {
    return(
        <MainWrapper>
            {children}
        </MainWrapper>
    );
}

export default MainLayout;

const MainWrapper = styled.main`
  flex: 1;
  overflow-y: auto;
  padding-top: 0;
  padding-bottom: 0;
`;