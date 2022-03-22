import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import Home from './Home';

const SignupWrapper = styled.div`
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

const UsernameInput = styled.input`
  width: 315px;
  font-size: ${(props) => props.theme.fontSize.small};
  color: ${(props) => props.theme.lightGrey};
  border: 2px solid ${(props) => props.theme.lightGrey};
  border-radius: 15px;
  padding: 10px;
  margin-bottom: 12px;
`;
const EmailInput = styled.input`
  width: 315px;
  font-size: ${(props) => props.theme.fontSize.small};
  color: ${(props) => props.theme.lightGrey};
  border: 2px solid ${(props) => props.theme.lightGrey};
  border-radius: 15px;
  padding: 10px;
  margin-bottom: 12px;
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

const CofirmPasswordInput = styled.input`
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

const SignupBtn = styled.button`
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

const Text = styled.div`
  width: 340px;
  color: ${(props) => props.theme.black};
  font-size: ${(props) => props.theme.fontSize.small};
  text-align: left;
`;

const ConfirmText = styled.div`
  width: 340px;
  color: ${(props) => props.theme.lightGrey};
  font-size: ${(props) => props.theme.fontSize.tiny};
  text-align: right;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 10px;
  &:hover {
    color: ${(props) => props.theme.pink};
    font-weight: bold;
  }
`;

const ErrorText = styled.div`
  width: 340px;
  color: ${(props) => props.theme.lightGrey};
  font-size: ${(props) => props.theme.fontSize.tiny};
  text-align: left;
  margin-bottom: 10px;
`;

function Signup() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [open, setOpen] = useState(true);
  const [show, setShow] = useState(false);
  const [errorUsernameMessage, setErrorUsernameMessage] = useState('');
  const [errorEmailMessage, setEmailErrorMessage] = useState('');
  const [errorPasswordMessage, setPasswordErrorMessage] = useState('');
  const [errorConfrimPasswordMessage, setConfirmPasswordErrorMessage] =
    useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (username === '') {
      setErrorUsernameMessage('');
    }
    if (username.length > 0 && username.length < 2) {
      setErrorUsernameMessage('최소 2글자 이상 입력하세요.');
    }
    if (email === '') {
      setEmailErrorMessage('');
    }
    if (password === '') {
      setPasswordErrorMessage('');
    }
    if (password.length > 0 && password.length < 4) {
      setPasswordErrorMessage('최소 4글자 이상 입력하세요.');
    }
    if (password.length >= 4) {
      setPasswordErrorMessage('');
    }
    if (confirmPassword === '') {
      setConfirmPasswordErrorMessage('');
    }
    if (confirmPassword === password) {
      setConfirmPasswordErrorMessage('');
    }
    if (confirmPassword !== password) {
      setConfirmPasswordErrorMessage('비밀번호가 일치하지 않습니다.');
    }
  }, [username, email, password, confirmPassword]);

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username && email && password && confirmPassword) {
      try {
        await axios.post(
          `${process.env.REACT_APP_SERVER}/users/signup`,
          { username, email, password },
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          },
        );
        setEmail('');
        setPassword('');
        setUsername('');
        navigate('/login');
      } catch (err) {
        console.log(err);
      }
    }
  };

  const checkUernameOnClick = async () => {
    if (username.length >= 2) {
      try {
        await axios.post(
          `${process.env.REACT_APP_SERVER}/users/verify/username`,
          { username },
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          },
        );
        setErrorUsernameMessage('닉네임을 사용하실 수 있습니다.');
      } catch {
        setErrorUsernameMessage('이미 동일한 닉네임이 존재합니다.');
      }
    }
  };

  const emailVaildationCheck = () => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return emailRegex.test(email);
  };

  const checkEmailOnClick = async () => {
    if (emailVaildationCheck()) {
      try {
        await axios.post(
          `${process.env.REACT_APP_SERVER}/users/verify/email`,
          { email },
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          },
        );
        setEmailErrorMessage('이메일을 사용하실 수 있습니다.');
      } catch {
        setEmailErrorMessage('이미 동일한 이메일이 존재합니다.');
      }
    } else {
      setEmailErrorMessage('유효하지 않은 이메일 양식입니다.');
    }
  };
  const usernameOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    setErrorUsernameMessage('닉네임 중복검사를 하세요');
    setUsername(e.currentTarget.value);
  };

  const emailOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    setEmailErrorMessage('이메일 중복검사를 하세요');
    setEmail(e.currentTarget.value);
  };

  const passwordOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const confirmPasswordOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    setConfirmPassword(e.currentTarget.value);
  };

  const showPasswordOnClick = () => {
    setShow(!show);
  };

  const exitOnClick = () => {
    setOpen(false);
    navigate('/');
  };

  return (
    <>
      {open ? (
        <SignupWrapper>
          <Wrapper>
            <ExitBtn onClick={exitOnClick}>X</ExitBtn>
            <Form onSubmit={handleOnSubmit}>
              <Text>닉네임</Text>
              <ConfirmText onClick={checkUernameOnClick}>중복검사</ConfirmText>
              <UsernameInput
                value={username}
                required
                onChange={usernameOnChange}
                placeholder="닉네임을 입력해주세요"
              />
              {errorUsernameMessage ? (
                <ErrorText>{errorUsernameMessage}</ErrorText>
              ) : null}
              <Text>이메일</Text>
              <ConfirmText onClick={checkEmailOnClick}>중복검사</ConfirmText>
              <EmailInput
                value={email}
                type="email"
                required
                onChange={emailOnChange}
                placeholder="이메일을 입력해주세요"
              />
              {errorEmailMessage ? (
                <ErrorText>{errorEmailMessage}</ErrorText>
              ) : null}
              <Text>비밀번호</Text>
              {show ? (
                <ConfirmText onClick={showPasswordOnClick}>
                  비밀번호 숨기기
                </ConfirmText>
              ) : (
                <ConfirmText onClick={showPasswordOnClick}>
                  비밀번호 보기
                </ConfirmText>
              )}
              {show ? (
                <>
                  <PasswordInput
                    value={password}
                    type="text"
                    required
                    onChange={passwordOnChange}
                    placeholder="비밀번호을 입력해주세요"
                  />
                  {errorPasswordMessage ? (
                    <ErrorText>{errorPasswordMessage}</ErrorText>
                  ) : null}
                  <CofirmPasswordInput
                    value={confirmPassword}
                    type="text"
                    required
                    onChange={confirmPasswordOnChange}
                    placeholder="비밀번호을 한번 더 입력해주세요"
                  />
                  {errorPasswordMessage ? (
                    <ErrorText>{errorPasswordMessage}</ErrorText>
                  ) : null}
                </>
              ) : (
                <>
                  <PasswordInput
                    value={password}
                    type="password"
                    required
                    onChange={passwordOnChange}
                    placeholder="비밀번호을 입력해주세요"
                  />
                  {errorPasswordMessage ? (
                    <ErrorText>{errorPasswordMessage}</ErrorText>
                  ) : null}
                  <CofirmPasswordInput
                    value={confirmPassword}
                    type="password"
                    required
                    onChange={confirmPasswordOnChange}
                    placeholder="비밀번호을 한번 더 입력해주세요"
                  />
                  {errorConfrimPasswordMessage ? (
                    <ErrorText>{errorConfrimPasswordMessage}</ErrorText>
                  ) : null}
                </>
              )}
              <SignupBtn type="submit">회원가입</SignupBtn>
            </Form>
          </Wrapper>
        </SignupWrapper>
      ) : null}
      <Home />
    </>
  );
}

export default Signup;
