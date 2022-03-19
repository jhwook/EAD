import { useState } from 'react';
import styled from 'styled-components';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'index';
import { Dispatch } from 'redux';
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
  z-index: 3;
`;

const ModalMenus = styled.ul`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding-left: 10px;
`;
const ModalMenu = styled.li`
  cursor: pointer;
`;

function Nav() {
  const [show, isShow] = useState(false);
  const dispatch: Dispatch = useDispatch();
  const { userInfo, accessToken, isLogin } = useSelector(
    (state: RootState) => state,
  );
  const navigate = useNavigate();
  const ModalOnClick = () => {
    isShow(!show);
  };

  const closeModal = () => {
    isShow(false);
  };

  const LogoutOnClick = () => {
    dispatch({ type: 'Logout', userInfo, accessToken, isLogin });
    isShow(false);
    navigate('/');
  };
  return (
    <Wrapper>
      {show ? (
        <Modal>
          <ModalMenus>
            <ModalMenu onClick={closeModal}>내가 쓴 글</ModalMenu>
            <ModalMenu onClick={closeModal}>내가 쓴 댓글</ModalMenu>
            <Link to="/profile">
              <ModalMenu onClick={closeModal}>내 정보</ModalMenu>
            </Link>
            <ModalMenu onClick={LogoutOnClick}>로그아웃</ModalMenu>
          </ModalMenus>
        </Modal>
      ) : null}
      {isLogin === true ? (
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
