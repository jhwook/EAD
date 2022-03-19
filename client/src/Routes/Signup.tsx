import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { RootState } from 'index';
import styled from 'styled-components';
import Home from './Home';

const SignupWrapper = styled.div`
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

const UsernameInput = styled.input`
  width: 315px;
  font-size: ${(props) => props.theme.fontSize.small};
  color: ${(props) => props.theme.lightGrey};
  border: 2px solid ${(props) => props.theme.lightGrey};
  border-radius: 15px;
  padding: 10px;
  margin-bottom: 15px;
`;
const EmailInput = styled.input`
  width: 315px;
  font-size: ${(props) => props.theme.fontSize.small};
  color: ${(props) => props.theme.lightGrey};
  border: 2px solid ${(props) => props.theme.lightGrey};
  border-radius: 15px;
  padding: 10px;
  margin-bottom: 15px;
`;
const PasswordInput = styled.input`
  width: 315px;
  font-size: ${(props) => props.theme.fontSize.small};
  font-weight: normal;
  color: ${(props) => props.theme.lightGrey};
  border: 2px solid ${(props) => props.theme.lightGrey};
  border-radius: 15px;
  padding: 10px;
  margin-top: 15px;
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
  margin-bottom: 30px;
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

function Signup() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = useSelector((state: RootState) => state);
  console.log(userData);

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await axios.post(
      `${process.env.REACT_APP_SERVER}/signup`,
      { username, email, password },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      },
    );
    dispatch({ type: 'Signup', payload: data });
    setEmail('');
    setPassword('');
    setUsername('');
    navigate('/');
  };

  const checkUernameOnClick = async () => {
    const data = await axios.post(
      `${process.env.REACT_APP_SERVER}/users/verify/username`,
      { username },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      },
    );
  };

  const checkEmailOnClick = async () => {
    const data = await axios.post(
      `${process.env.REACT_APP_SERVER}/users/verify/email`,
      { email },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      },
    );
  };

  const emailOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };

  const passwordOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const usernameOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    setUsername(e.currentTarget.value);
  };

  const confirmPasswordOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    setConfirmPassword(e.currentTarget.value);
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
                onChange={usernameOnChange}
                placeholder="닉네임을 입력해주세요"
              />
              <Text>이메일</Text>
              <ConfirmText onClick={checkEmailOnClick}>중복검사</ConfirmText>
              <EmailInput
                value={email}
                onChange={emailOnChange}
                placeholder="이메일을 입력해주세요"
              />
              <Text>비밀번호</Text>
              <PasswordInput
                value={password}
                onChange={passwordOnChange}
                placeholder="비밀번호을 입력해주세요"
              />
              <CofirmPasswordInput
                value={confirmPassword}
                onChange={confirmPasswordOnChange}
                placeholder="비밀번호을 한번 더 입력해주세요"
              />
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
