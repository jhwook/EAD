import loadable from '@loadable/component';
import { useState, useCallback } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { AppDispatch } from 'index';
import { UserLogin } from '../../index';

import {
  EmailInput,
  ExitBtn,
  Form,
  Google,
  Kaoko,
  LoginBtn,
  LoginWrapper,
  Naver,
  PasswordInput,
  SignupBtn,
  Text,
  Wrapper,
} from './styles';

const Home = loadable(() => import('Routes/Home'));

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [open, isOpen] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleOnSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
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
    },
    [email, password, setEmail, setPassword, navigate, setErrorMessage],
  );

  const emailOnChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setEmail(e.currentTarget.value);
    },
    [setEmail],
  );

  const passwordOnChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setPassword(e.currentTarget.value);
    },
    [setPassword],
  );

  const exitOnClick = useCallback(() => {
    isOpen(false);
    navigate('/');
  }, [open, isOpen, navigate]);

  const signUpOnClick = useCallback(() => {
    navigate('/signup');
  }, [navigate]);

  const state = window.localStorage.getItem('com.naver.nid.oauth.state_token');
  const naverUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.REACT_APP_NAVER_CLIENT_ID}&state=${state}&redirect_uri=${process.env.REACT_APP_NAVER_CALLBACK_URL}`;
  const kakaoUrl = process.env.REACT_APP_KAKAO_AUTH_URL;
  const googleUrl = process.env.REACT_APP_GOOGLE_AUTH_URL;

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
            <Naver href={naverUrl} />
            <Kaoko href={kakaoUrl} />
            <Google href={googleUrl} />
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
