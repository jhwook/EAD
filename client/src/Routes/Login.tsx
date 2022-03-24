import styled from 'styled-components';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { AppDispatch } from 'index';
import { UserLogin } from '../index';
import kakao from '../Image/Btn/kakao.png';
import google from '../Image/Btn/google.png';
import Home from './Home';

const LoginWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;
const Wrapper = styled.div`
  width: 370px;
  height: 480px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.white};
  border: 1px solid ${(props) => props.theme.lightGrey};
  border-radius: 30px;
  padding: 70px 35px;
  position: relative;
  top: -100px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const EmailInput = styled.input`
  width: 315px;
  font-size: ${(props) => props.theme.fontSize.small};
  color: ${(props) => props.theme.lightGrey};
  border: 2px solid ${(props) => props.theme.lightGrey};
  border-radius: 15px;
  padding: 10px;
  margin-bottom: 10px;
`;
const PasswordInput = styled.input`
  width: 315px;
  font-size: ${(props) => props.theme.fontSize.small};
  font-weight: normal;
  color: ${(props) => props.theme.lightGrey};
  border: 2px solid ${(props) => props.theme.lightGrey};
  border-radius: 15px;
  padding: 10px;
  margin-bottom: 10px;
`;
const ExitBtn = styled.button`
  color: ${(props) => props.theme.lightGrey};
  font-size: ${(props) => props.theme.fontSize.small};
  background-color: inherit;
  border: none;
  position: absolute;
  top: 15px;
  right: 25px;
  cursor: pointer;
`;
const LoginBtn = styled.button`
  width: 240px;
  background-color: ${(props) => props.theme.lightGrey};
  color: ${(props) => props.theme.white};
  font-size: ${(props) => props.theme.fontSize.small};
  font-weight: bold;
  border: 2px solid ${(props) => props.theme.lightGrey};
  border-radius: 15px;
  padding: 7px 10px;
  margin-bottom: 15px;
  cursor: pointer;
  transition: all 1s;
  &:hover {
    background-color: ${(props) => props.theme.white};
    color: ${(props) => props.theme.lightGrey};
  }
`;
const SignupBtn = styled.div`
  width: 220px;
  background-color: ${(props) => props.theme.white};
  color: ${(props) => props.theme.lightGrey};
  font-size: ${(props) => props.theme.fontSize.small};
  font-weight: bold;
  text-align: center;
  border: 2px solid ${(props) => props.theme.lightGrey};
  border-radius: 15px;
  padding: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: all 1s;
  &:hover {
    background-color: ${(props) => props.theme.lightGrey};
    color: ${(props) => props.theme.white};
  }
`;

const NaverBtn = styled.div``;

const NaverImg = styled.img`
  width: 225px;
  height: 48px;
  margin-bottom: 1px;
  cursor: pointer;
`;

const KaokoImg = styled(NaverImg)``;

const GoogleImg = styled(NaverImg)`
  margin-bottom: 15px;
`;

const Text = styled.div`
  color: ${(props) => props.theme.lightGrey};
  font-size: ${(props) => props.theme.fontSize.tiny};
  margin-bottom: 15px;
`;

declare global {
  interface Window {
    naver: any;
  }
}

const { naver } = window;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [open, isOpen] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (email && password) {
        const data = await axios.post(
          `${process.env.REACT_APP_SERVER}/users/login`,
          { email, password },
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          },
        );
        dispatch(UserLogin(data.data.data));
        setEmail('');
        setPassword('');
        navigate('/');
      }
    } catch (err) {
      setErrorMessage('이메일과 비밀번호를 다시 확인해주세요.');
    }
  };

  const emailOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };

  const passwordOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const exitOnClick = () => {
    isOpen(false);
    navigate('/');
  };

  const signUpOnClick = () => {
    navigate('/signup');
  };

  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: process.env.REACT_APP_NAVER_CLIENT_ID,
      callbackUrl: process.env.REACT_APP_NAVER_CALLBACK_URL,
      isPopup: false,
      loginButton: { color: 'green', type: 3, height: '48' },
    });
    naverLogin.init();
  };

  useEffect(() => {
    initializeNaverLogin();
  }, []);

  return (
    <>
      {open ? (
        <LoginWrapper>
          <Wrapper>
            <ExitBtn onClick={exitOnClick}>X</ExitBtn>
            <Form onSubmit={handleOnSubmit}>
              <EmailInput
                value={email}
                required
                onChange={emailOnChange}
                placeholder="이메일을 입력해주세요"
              />
              <PasswordInput
                value={password}
                required
                type="password"
                onChange={passwordOnChange}
                placeholder="비밀번호을 입력해주세요"
              />
              <Text>{errorMessage || null}</Text>
              <LoginBtn type="submit">로그인</LoginBtn>
            </Form>
            <Text>------------------------ 또는 -----------------------</Text>
            <NaverBtn id="naverIdLogin" />
            <KaokoImg src={kakao} />
            <GoogleImg src={google} />
            <Text>--------------- 아직 회원이 아니시라면? --------------</Text>
            <SignupBtn onClick={signUpOnClick}>회원가입</SignupBtn>
          </Wrapper>
        </LoginWrapper>
      ) : null}
      <Home />
    </>
  );
}

export default Login;
