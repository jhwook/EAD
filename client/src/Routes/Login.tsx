import styled from 'styled-components';
import { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { useNavigate } from 'react-router';
import { RootState } from 'index';
import naver from '../Image/Btn/naver.png';
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
`;
const Wrapper = styled.div`
  width: 370px;
  height: 450px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.white};
  border: 1px solid ${(props) => props.theme.lightGrey};
  border-radius: 30px;
  padding: 70px 35px;
  position: relative;
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
`;

const NaverImg = styled.img`
  width: 230px;
  height: 45px;
  margin-bottom: 5px;
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

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [open, isOpen] = useState(true);
  const navigate = useNavigate();
  const dispatch: Dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state);
  console.log(userData);

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
        dispatch({
          type: 'Login',
          userInfo: data.data.userInfo,
          accessToken: data.data.token,
        });
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
            <Text>--------------- 또는 --------------</Text>
            <NaverImg src={naver} />
            <KaokoImg src={kakao} />
            <GoogleImg src={google} />
            <Text>--------- 아직 회원이 아니시라면? --------</Text>
            <SignupBtn onClick={signUpOnClick}>회원가입</SignupBtn>
          </Wrapper>
        </LoginWrapper>
      ) : null}
      <Home />
    </>
  );
}

export default Login;
