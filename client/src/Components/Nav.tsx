import { useState } from 'react';
import styled from 'styled-components';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import logo from '../Image/Logo/ead.png';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 30px;
  .dot {
    font-size: ${(props) => props.theme.fontSize.large};
  }
`;
const LeftBox = styled.div``;
const RightBox = styled.div``;
const Logo = styled.img`
  width: 250px;
`;
const Menus = styled.ul`
  width: 250px;
  display: flex;
  justify-content: space-around;
  font-size: ${(props) => props.theme.fontSize.small};
  font-weight: 600;
`;
const Menu = styled.li``;

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <Wrapper>
      {open ? (
        <>
          <LeftBox>
            <Logo src={logo} />
          </LeftBox>
          <RightBox>
            <Menus>
              <Menu>
                <HiOutlineDotsHorizontal className="dot" />
              </Menu>
            </Menus>
          </RightBox>
        </>
      ) : (
        <>
          <LeftBox>
            <Logo src={logo} />
          </LeftBox>
          <RightBox>
            <Menus>
              <Menu>로그인</Menu>
              <Menu>회원가입</Menu>
            </Menus>
          </RightBox>
        </>
      )}
    </Wrapper>
  );
}

export default Nav;
