import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, UserLogout } from 'index';
import logo from '../Image/Logo/ead.png';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 50px;

  .dot {
    font-size: ${(props) => props.theme.fontSize.large};
    cursor: pointer;
    @media ${(props) => props.theme.iPhone12Pro} {
      display: none;
    }
    @media ${(props) => props.theme.mobile1} {
      display: none;
    }
    @media ${(props) => props.theme.mobile} {
      display: none;
      font-size: ${(props) => props.theme.fontSize.medium};
    }
  }
  .burger {
    font-size: ${(props) => props.theme.fontSize.large};
    cursor: pointer;
    display: none;
    @media ${(props) => props.theme.iPhone12Pro} {
      display: block;
      position: absolute;
      top: 25px;
      right: 40px;
      font-size: ${(props) => props.theme.fontSize.medium};
    }
    @media ${(props) => props.theme.mobile1} {
      display: block;
      position: absolute;
      top: 25px;
      right: 40px;
      font-size: ${(props) => props.theme.fontSize.medium};
    }
    @media ${(props) => props.theme.mobile} {
      display: block;
      position: absolute;
      top: 25px;
      right: 40px;
      font-size: ${(props) => props.theme.fontSize.medium};
    }
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    padding: 10px 20px;
  }
  @media ${(props) => props.theme.mobile1} {
    padding: 10px 20px;
  }
  @media ${(props) => props.theme.mobile} {
    padding: 10px 20px;
  }
`;
const LeftBox = styled.div``;
const RightBox = styled.div``;
const Logo = styled.img`
  width: 250px;
  cursor: pointer;
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 150px;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 150px;
  }
  @media ${(props) => props.theme.mobile} {
    width: 200px;
  }
`;
const Menus = styled.ul`
  width: 300px;
  display: flex;
  justify-content: space-around;
  font-size: ${(props) => props.theme.fontSize.small};
  font-weight: bold;
  color: ${(props) => props.theme.black};
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 170px;
    font-size: ${(props) => props.theme.fontSize.micro};
  }
  @media ${(props) => props.theme.mobile1} {
    width: 170px;
    font-size: ${(props) => props.theme.fontSize.micro};
  }
  @media ${(props) => props.theme.mobile} {
    width: 170px;
    font-size: ${(props) => props.theme.fontSize.micro};
  }
`;
const Menu = styled.li`
  transition: all 0.5s ease-in-out;
  font-weight: bolder;
  &:hover {
    color: ${(props) => props.theme.green};
  }
`;

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
  z-index: 10;
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 99%;
    right: 0px;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 99%;
    right: 0px;
  }
  @media ${(props) => props.theme.mobile} {
    width: 99%;
    right: 0px;
  }
`;

const ModalMenus = styled.ul`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding-left: 15px;
  @media ${(props) => props.theme.iPhone12Pro} {
    align-items: center;
    text-align: center;
    padding: 0px;
  }
  @media ${(props) => props.theme.mobile1} {
    align-items: center;
    text-align: center;
    padding: 0px;
  }
  @media ${(props) => props.theme.mobile} {
    align-items: center;
    text-align: center;
    padding: 0px;
  }
  a {
    cursor: pointer;
    @media ${(props) => props.theme.iPhone12Pro} {
      width: 100%;
      &:hover {
        background-color: ${(props) => props.theme.pink};
        color: ${(props) => props.theme.black};
      }
    }
    @media ${(props) => props.theme.mobile1} {
      width: 100%;
      &:hover {
        background-color: ${(props) => props.theme.pink};
        color: ${(props) => props.theme.black};
      }
    }
    @media ${(props) => props.theme.mobile} {
      width: 100%;
      &:hover {
        background-color: ${(props) => props.theme.pink};
        color: ${(props) => props.theme.black};
      }
    }
  }
`;
const ModalMenu = styled.li`
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  &:hover {
    color: ${(props) => props.theme.pink};
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 100%;
    transition: all 0.5s ease-in-out;
    &:hover {
      padding: 3px 0px;
      background-color: ${(props) => props.theme.pink};
      color: ${(props) => props.theme.black};
    }
  }
  @media ${(props) => props.theme.mobile1} {
    width: 100%;
    transition: all 0.5s ease-in-out;
    &:hover {
      padding: 3px 0px;
      background-color: ${(props) => props.theme.pink};
      color: ${(props) => props.theme.black};
    }
  }
  @media ${(props) => props.theme.mobile} {
    width: 100%;
    transition: all 0.5s ease-in-out;
    &:hover {
      padding: 3px 0px;
      background-color: ${(props) => props.theme.pink};
      color: ${(props) => props.theme.black};
    }
  }
`;

function Nav() {
  const [show, isShow] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { userData } = useSelector((state: RootState) => state);
  const { isLogin } = userData;
  const navigate = useNavigate();

  useEffect(() => {
    isShow(false);
  }, []);

  const ModalOnClick = () => {
    isShow(!show);
  };

  const closeModal = () => {
    isShow(false);
  };

  const LogoutOnClick = () => {
    dispatch(UserLogout());
    isShow(false);
    localStorage.removeItem('persist:root');
    navigate('/');
  };
  return (
    <Wrapper>
      {show ? (
        <Modal>
          <ModalMenus>
            <Link to="/mypost">
              <ModalMenu onClick={closeModal}>내가 쓴 글</ModalMenu>
            </Link>
            <Link to="/mycomment">
              <ModalMenu onClick={closeModal}>내가 쓴 댓글</ModalMenu>
            </Link>
            <Link to="/chat">
              <ModalMenu onClick={closeModal}>내 채팅방</ModalMenu>
            </Link>
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
                <GiHamburgerMenu onClick={ModalOnClick} className="burger" />
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
              <Link to="/search">
                <Menu>체험하기</Menu>
              </Link>
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
