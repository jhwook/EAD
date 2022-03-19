import { useState } from 'react';
import styled from 'styled-components';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'index';
import logo from '../Image/Logo/ead.png';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 30px;
  .dot {
    font-size: ${(props) => props.theme.fontSize.large};
    cursor: pointer;
  }
`;
const LeftBox = styled.div``;
const RightBox = styled.div``;
const Logo = styled.img`
  width: 250px;
  cursor: pointer;
`;
const Menus = styled.ul`
  width: 250px;
  display: flex;
  justify-content: space-around;
  font-size: ${(props) => props.theme.fontSize.small};
  font-weight: 600;
`;
const Menu = styled.li``;

const Modal = styled.div`
  width: 150px;
  height: 200px;
  position: absolute;
  top: 80px;
  right: 130px;
  background-color: ${(props) => props.theme.white};
  border: 2px solid ${(props) => props.theme.lightGrey};
  border-radius: 15px;
  font-size: ${(props) => props.theme.fontSize.small};
  font-weight: bold;
`;

const ModalMenus = styled.ul`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding-left: 10px;
`;
const ModalMenu = styled.li``;

function Nav() {
  const [login, setLogin] = useState(false);
  const [show, isShow] = useState(false);
  const userData = useSelector((state: RootState) => state);

  const ModalOnClick = () => {
    isShow(!show);
  };
  return (
    <Wrapper>
      {show ? (
        <Modal>
          <ModalMenus>
            <ModalMenu>내가 쓴 글</ModalMenu>
            <ModalMenu>내가 쓴 댓글</ModalMenu>
            <ModalMenu>내 정보</ModalMenu>
            <ModalMenu>로그아웃</ModalMenu>
          </ModalMenus>
        </Modal>
      ) : null}
      {login ? (
        <>
          <LeftBox>
            <Link to="/">
              <Logo src={logo} />
            </Link>
          </LeftBox>
          <RightBox>
            <Menus>
              <Menu>
                <HiOutlineDotsHorizontal
                  onClick={ModalOnClick}
                  className="dot"
                />
              </Menu>
            </Menus>
          </RightBox>
        </>
      ) : (
        <>
          <LeftBox>
            <Link to="/">
              <Logo src={logo} />
            </Link>
          </LeftBox>
          <RightBox>
            <Menus>
              <Link to="/login">
                <Menu>로그인</Menu>
              </Link>
              <Link to="/signup">
                <Menu>회원가입</Menu>
              </Link>
            </Menus>
          </RightBox>
        </>
      )}
    </Wrapper>
  );
}

export default Nav;
