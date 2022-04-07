import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import loadable from '@loadable/component';
import {
  CofirmPasswordInput,
  ConfirmNumberBtn,
  ConfirmText,
  EmailInput,
  ErrorDoneText,
  ErrorText,
  ExitBtn,
  Form,
  NumberBox,
  NumberInput,
  PasswordInput,
  PhoneBox,
  PhoneInput,
  SendPhoneBtn,
  SignupWrapper,
  Text,
  UsernameInput,
  Wrapper,
  SignupBtn,
} from './styles';

const Home = loadable(() => import('Routes/Home'));

function Signup() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [number, setNumber] = useState('');
  const [confirmNumber, setConfirmNumber] = useState('');
  const [done, setDone] = useState(false);
  const [open, setOpen] = useState(true);
  const [show, setShow] = useState(false);
  const [on, setOn] = useState(false);
  const [errorUsernameMessage, setErrorUsernameMessage] = useState('');
  const [errorEmailMessage, setEmailErrorMessage] = useState('');
  const [errorPasswordMessage, setPasswordErrorMessage] = useState('');
  const [errorConfrimPasswordMessage, setConfirmPasswordErrorMessage] =
    useState('');
  const [errorConfrimNumberMessage, setConfirmNumberErrorMessage] =
    useState('');
  const [errorDoneMessage, setErrorDoneMessage] = useState('');
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
    if (username && email && password && confirmPassword && done) {
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
      setDone(false);
      navigate('/login');
    }
    if (done === false) {
      setErrorDoneMessage('본인 인증이 필요합니다.');
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

  const phoneOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    setPhone(e.currentTarget.value);
  };

  const numberOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    setNumber(e.currentTarget.value);
  };

  const phoneOnClick = async () => {
    if (phone.length === 11) {
      const randomNumber = await axios.post(
        `${process.env.REACT_APP_SERVER}/users/sms`,
        { phone: `+82${phone}` },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      );
      setConfirmNumber(randomNumber.data.data);
      setConfirmNumberErrorMessage('인증번호가 발송 되었습니다.');
    } else if (phone.length !== 11) {
      setConfirmNumberErrorMessage('번호를 정확히 입력해주세요.');
    }
  };

  const NumberOnclick = () => {
    if (Number(number) === Number(confirmNumber)) {
      setConfirmNumberErrorMessage('인증번호가 확인 되었습니다.');
      setOn(false);
      setDone(true);
    } else {
      setOn(true);
      setConfirmNumberErrorMessage('인증번호가 일치하지 않습니다.');
    }
  };

  const showPasswordOnClick = () => {
    setShow(!show);
  };
  const exitOnClick = () => {
    setOpen(false);
    setPhone('');
    setNumber('');
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
              <Text>휴대전화</Text>
              <PhoneBox>
                <PhoneInput
                  value={phone}
                  onChange={phoneOnChange}
                  placeholder="ex) 01012344321"
                  required
                />
                <SendPhoneBtn type="button" onClick={phoneOnClick}>
                  인증번호 받기
                </SendPhoneBtn>
              </PhoneBox>
              <NumberBox>
                <NumberInput
                  value={number}
                  onChange={numberOnChange}
                  placeholder="인증번호를 입력하세요"
                  required
                />
                <ConfirmNumberBtn type="button" onClick={NumberOnclick}>
                  확인
                </ConfirmNumberBtn>
              </NumberBox>
              <ErrorText>{errorConfrimNumberMessage}</ErrorText>
              {on ? <ErrorDoneText>{errorDoneMessage}</ErrorDoneText> : null}
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
