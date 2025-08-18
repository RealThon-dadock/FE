import styled from "styled-components";

function MenuBar() {
    return(
        <MenuBarWrapper>
            MenuBar
        </MenuBarWrapper>
    )
}

export default MenuBar;

const MenuBarWrapper = styled.footer`
  width: 100%;
  background-color: #fff000;
  border-top: 1px solid #e0e0e0;
  padding: 0.5rem 0;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-around;
  align-items: center;

`;