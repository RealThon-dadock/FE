import styled from "styled-components";

function Header() {
    return(
        <HeaderWrapper>
            Header
        </HeaderWrapper>
    );

}

export default Header;

const HeaderWrapper = styled.header`
  width: 100%;
  background-color: #2c3e50;
  color: white;
  padding: 0.9rem;
  text-align: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;

    /* 보통 폰 (max-width: 414px) */
  @media (max-width: 414px) {
    padding: 0.8rem;

  }

  /* 작은 폰 (max-width: 360px) */
  @media (max-width: 360px) {
    padding: 0.7rem;

  }
`
