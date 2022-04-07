import styled from 'styled-components';
import {
  FormEvent,
  useEffect,
  useState,
  ChangeEvent,
  useCallback,
} from 'react';
import axios from 'axios';
import loadable from '@loadable/component';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { AppDispatch, RootState, UserLogout, UserModify } from 'index';
import { FiChevronsUp } from 'react-icons/fi';
import Nav from 'Components/Nav';
import Footer from 'Components/Footer';
import userHolder from '../Image/Logo/welcoming.svg';
import oauthImg from '../Image/Logo/3people.svg';

const Payment = loadable(() => import('Components/Payment'));
const Button = loadable(() => import('Components/Button'));

const Wrapper = styled.div`
  height: auto;
  min-height: 100%;
  display: flex;
  flex-direction: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 150px;
  @media ${(props) => props.theme.tablet} {
    padding-bottom: 386px;
  }
  @media ${(props) => props.theme.mobile} {
    flex-direction: column;
    padding-bottom: 200px;
  }
  @media ${(props) => props.theme.mobile1} {
    flex-direction: column;
    padding-bottom: 200px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    flex-direction: column;
    padding-bottom: 200px;
  }
`;

const FooterWrapper = styled.div`
  height: 150px;
  position: relative;
  margin-top: -150px;
  @media ${(props) => props.theme.mobile} {
    height: 200px;
    position: relative;
    margin-top: -200px;
  }
  @media ${(props) => props.theme.mobile1} {
    height: 200px;
    position: relative;
    margin-top: -200px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    height: 200px;
    position: relative;
    margin-top: -200px;
  }
`;

const LeftBox = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  flex-direction: column;
  @media ${(props) => props.theme.mobile} {
    width: 90%;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 90%;
    padding: 20px 0 0 0;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 90%;
  }
`;

const UserPhoto = styled.img`
  width: 200px;
  height: 140px;
`;

const ImgForm = styled.form`
  width: 50%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const ImgInput = styled.input`
  display: none;
`;

const ImgLabel = styled.label`
  background-color: ${(props) => props.theme.btnGreen};
  color: ${(props) => props.theme.white};
  font-size: ${(props) => props.theme.fontSize.tiny};
  padding: 5px;
  margin: 15px 0 15px 0;
  border: 1px solid ${(props) => props.theme.btnGreen};
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: rgba(0, 0, 0, 0.3) 2px 2px;
  @media ${(props) => props.theme.mobile} {
    font-size: ${(props) => props.theme.fontSize.micro};
    margin: 10px 0 20px 0;
  }
  @media ${(props) => props.theme.mobile1} {
    font-size: ${(props) => props.theme.fontSize.micro};
    margin: 10px 0 30px 0;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    font-size: ${(props) => props.theme.fontSize.micro};
    margin: 10px 0 20px 0;
  }
  &:hover {
    background-color: ${(props) => props.theme.white};
    color: ${(props) => props.theme.btnGreen};
  }
`;

const StackName = styled.div`
  font-size: ${(props) => props.theme.fontSize.small};
  margin: 0 0 5px 0;
`;

const StackText = styled.div`
  font-size: ${(props) => props.theme.fontSize.small};
  width: 300px;
  margin-top: 18px;
  @media ${(props) => props.theme.mobile} {
    margin-top: 23px;
  }
  @media ${(props) => props.theme.mobile1} {
    margin-top: 23px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    margin-top: 23px;
  }
`;

const StackLine = styled.hr`
  height: 2px;
  width: 300px;
  margin: 6px 0 10px 0;
  background-color: ${(props) => props.theme.black};
  @media ${(props) => props.theme.mobile} {
    height: 2px;
    margin: 5px 0 15px 0;
  }
  @media ${(props) => props.theme.mobile1} {
    height: 2px;
    margin: 5px 0 15px 0;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    height: 2px;
    margin: 5px 0 15px 0;
  }
`;

const StackBox = styled.div`
  width: 320px;
  height: 226px;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  @media ${(props) => props.theme.mobile} {
    height: 250px;
    margin: 5px 0px 5px 0px;
  }
  @media ${(props) => props.theme.mobile1} {
    height: 270px;
    margin: 5px 0px 5px 0px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    height: 250px;
    margin: 5px 0px 5px 0px;
  }
`;

const CostBox = styled.div`
  width: 320px;
  height: 80px;
  display: flex;
  margin: 1px 0 9px 0;
  justify-content: space-evenly;
  flex-direction: center;
  flex-wrap: wrap;
  @media ${(props) => props.theme.mobile} {
    height: 100px;
    margin: 10px 0 9px 0;
  }
  @media ${(props) => props.theme.mobile1} {
    height: 110px;
    margin: 10px 0 9px 0;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    height: 100px;
    margin: 10px 0 9px 0;
  }
`;

const CostText = styled.div`
  font-size: ${(props) => props.theme.fontSize.mini};
  width: 115px;
  height: 32px;
  text-align: center;
  display: table-cell;
  vertical-align: middle;
`;

const CostInput = styled.input`
  font-size: ${(props) => props.theme.fontSize.mini};
  color: ${(props) => props.theme.grey};
  width: 100px;
  border: 2px solid ${(props) => props.theme.lightGrey};
  border-radius: 10px;
  padding-left: 5px;
  height: 32px;
`;

const RightBox = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 10px auto 10px auto;
  @media ${(props) => props.theme.mobile} {
    width: 90%;
    margin: 40px 0 20px 0;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 90%;
    margin: 40px 0 20px 0;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 90%;
    margin: 40px 0 15px 0;
  }
`;

const InfoBox = styled.div`
  width: 375px;
  height: 600px;
  margin: 10px 0 9px 0;
  padding: 25px 0 0 0;
  border-radius: 20px;
  border: 2px solid ${(props) => props.theme.lightGrey};
  background-color: ${(props) => props.theme.white};
  @media ${(props) => props.theme.mobile} {
    height: 550px;
    width: 330px;
    padding: 25px 0 0 0;
    margin: 0 auto 15px auto;
  }
  @media ${(props) => props.theme.mobile1} {
    height: 570px;
    width: 330px;
    padding: 25px 0 0 0;
    margin: 0px auto 25px auto;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    height: 550px;
    width: 306px;
    padding: 25px 0 0 0;
    margin: 0px auto 15px auto;
  }
`;

const InfoNameForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
`;

const InfoPasswordForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
`;

const InfoText = styled.div`
  font-size: ${(props) => props.theme.fontSize.small};
  width: 290px;
  margin: 5px 0 15px 0;
  @media ${(props) => props.theme.mobile} {
    width: 270px;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 270px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 270px;
  }
`;

const NameText = styled.div`
  font-size: ${(props) => props.theme.fontSize.small};
  width: 290px;
  margin: 10px 0 0px 0;
  @media ${(props) => props.theme.mobile} {
    width: 270px;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 270px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 270px;
  }
`;

const PasswordText = styled.div`
  font-size: ${(props) => props.theme.fontSize.small};
  width: 290px;
  margin: 10px 0 15px 0;
  @media ${(props) => props.theme.mobile} {
    width: 270px;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 270px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 270px;
  }
`;

const InfoDistrict = styled.div`
  font-size: ${(props) => props.theme.fontSize.micro};
  color: ${(props) => props.theme.grey};
  width: 290px;
  text-align: right;
  margin: 0px 0 5px 0;
  cursor: pointer;
  transition: all 0.4s;
  @media ${(props) => props.theme.mobile} {
    width: 270px;
    margin: 0px 0 3px 0;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 270px;
    margin: 0px 0 3px 0;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 270px;
    margin: 0px 0 3px 0;
  }
  &:hover {
    color: ${(props) => props.theme.pink};
    font-weight: bold;
  }
`;

const EmailInput = styled.input`
  font-size: ${(props) => props.theme.fontSize.mini};
  color: ${(props) => props.theme.grey};
  width: 290px;
  border: 2px solid ${(props) => props.theme.lightGrey};
  border-radius: 15px;
  padding: 12px;
  padding-left: 15px;
  margin: 0px 0 10px 0;
  cursor: no-drop;
  @media ${(props) => props.theme.mobile} {
    width: 270px;
    padding: 4px 0px 4px 10px;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 270px;
    padding: 9px 0px 9px 10px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 270px;
    padding: 4px 0px 4px 10px;
  }
`;

const InfoInput = styled.input`
  font-size: ${(props) => props.theme.fontSize.mini};
  color: ${(props) => props.theme.grey};
  width: 290px;
  border: 2px solid ${(props) => props.theme.lightGrey};
  border-radius: 15px;
  padding: 12px 12px 12px 15px;
  margin-bottom: 5px;
  @media ${(props) => props.theme.mobile} {
    width: 270px;
    padding: 4px 0px 4px 10px;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 270px;
    padding: 9px 0px 9px 10px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 270px;
    padding: 4px 0px 4px 10px;
  }
`;

const InfoNameBtn = styled.button`
  font-size: ${(props) => props.theme.fontSize.tiny};
  background-color: ${(props) => props.theme.btnGreen};
  color: ${(props) => props.theme.white};
  width: 140px;
  height: 40px;
  margin: 2px 0 20px 0;
  border: 1px solid ${(props) => props.theme.btnGreen};
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.4s;
  box-shadow: rgba(0, 0, 0, 0.3) 2px 2px;
  &:hover {
    color: ${(props) => props.theme.pink};
  }
`;

const InfoPwBtn = styled.button`
  font-size: ${(props) => props.theme.fontSize.tiny};
  background-color: ${(props) => props.theme.btnGreen};
  color: ${(props) => props.theme.white};
  width: 140px;
  height: 40px;
  margin: 6px 0 24px 0;
  border: 1px solid ${(props) => props.theme.btnGreen};
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.4s;
  box-shadow: rgba(0, 0, 0, 0.3) 2px 2px;
  &:hover {
    color: ${(props) => props.theme.pink};
  }
`;

const InfoErrorText = styled.div`
  font-size: ${(props) => props.theme.fontSize.micro};
  color: ${(props) => props.theme.lightGrey};
  width: 290px;
  height: 8px;
  margin: 2px 0 10px 0;
  @media ${(props) => props.theme.mobile} {
    width: 270px;
    margin: 2px 0 12px 0;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 270px;
    margin: 2px 0 12px 0;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 270px;
    margin: 2px 0 12px 0;
  }
`;

const InfoModalBack = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
`;

const InfoModalBox = styled.div`
  position: absolute;
  width: 320px;
  height: 150px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${(props) => props.theme.beige};
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const InfoModalText = styled.div`
  font-size: ${(props) => props.theme.fontSize.small};
  width: 290px;
  margin-top: 20px;
  text-align: center;
`;

const InfoModalBtn = styled.button`
  background-color: ${(props) => props.theme.white};
  color: ${(props) => props.theme.btnGreen};
  border: 1px solid ${(props) => props.theme.grey};
  border-radius: 11px;
  margin: 20px;
  font-size: ${(props) => props.theme.fontSize.tiny};
  width: 80px;
  height: 30px;
  cursor: pointer;
  transition: all 0.4s;
  box-shadow: rgba(0, 0, 0, 0.3) 2px 2px;
  &:hover {
    color: ${(props) => props.theme.pink};
  }
`;

const ChangeModalBack = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
`;

const ChangeModalBox = styled.div`
  position: absolute;
  width: 320px;
  height: 150px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${(props) => props.theme.beige};
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ChangeModalText = styled.div`
  font-size: ${(props) => props.theme.fontSize.small};
  width: 290px;
  margin-top: 20px;
  text-align: center;
`;

const ChangeModalBtn = styled.button`
  background-color: ${(props) => props.theme.white};
  color: ${(props) => props.theme.btnGreen};
  border: 1px solid ${(props) => props.theme.grey};
  border-radius: 11px;
  margin: 20px;
  font-size: ${(props) => props.theme.fontSize.tiny};
  width: 80px;
  height: 30px;
  cursor: pointer;
  transition: all 0.4s;
  box-shadow: rgba(0, 0, 0, 0.3) 2px 2px;
  &:hover {
    color: ${(props) => props.theme.pink};
  }
`;

const WitText = styled.div`
  font-size: ${(props) => props.theme.fontSize.small};
  width: 290px;
  margin-top: 20px;
  text-align: center;
`;

const WitInfo = styled.div`
  font-size: ${(props) => props.theme.fontSize.tiny};
  color: ${(props) => props.theme.lightGrey};
  width: 290px;
  text-align: center;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.pink};
    font-weight: bold;
  }
`;

const WitModalBack = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
`;

const WitModalBox = styled.div`
  position: absolute;
  width: 320px;
  height: 150px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${(props) => props.theme.beige};
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const WitModalBtnBox = styled.div``;

const WitModalBtn = styled.button`
  background-color: ${(props) => props.theme.white};
  color: ${(props) => props.theme.btnGreen};
  border: 1px solid ${(props) => props.theme.grey};
  border-radius: 11px;
  margin: 20px;
  font-size: ${(props) => props.theme.fontSize.tiny};
  width: 80px;
  height: 30px;
  cursor: pointer;
  transition: all 0.4s;
  box-shadow: rgba(0, 0, 0, 0.3) 2px 2px;
  &:hover {
    color: ${(props) => props.theme.pink};
  }
`;

const CommonBox = styled.div`
  margin: 0 auto 0 auto;
  height: auto;
  text-align: center;
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 150px;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 200px;
  }
  @media ${(props) => props.theme.mobile} {
    width: 250px;
  }
  @media ${(props) => props.theme.tablet} {
    width: 300px;
  }
  @media ${(props) => props.theme.desktop} {
    width: 300px;
  }
  @media ${(props) => props.theme.desktop1} {
    width: 300px;
  }
  @media ${(props) => props.theme.desktop2} {
    width: 350px;
  }
`;

const OauthHolder = styled.img`
  margin: 40px 0 0 0;
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 120px;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 150px;
  }
  @media ${(props) => props.theme.mobile} {
    width: 250px;
  }
  @media ${(props) => props.theme.tablet} {
    width: 300px;
  }
  @media ${(props) => props.theme.desktop} {
    width: 300px;
  }
  @media ${(props) => props.theme.desktop1} {
    width: 300px;
  }
  @media ${(props) => props.theme.desktop2} {
    width: 310px;
  }
`;

const UpScrollBtn = styled.div`
  width: 60px;
  height: 60px;
  position: fixed;
  right: 160px;
  bottom: 170px;
  border: 2px solid ${(props) => props.theme.btnGreen};
  border-radius: 15px;
  transition: all 1s;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.3) 3px 3px;
  .upscroll {
    width: 100%;
    height: 100%;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 25px;
    height: 25px;
    right: 10px;
    bottom: 240px;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 35px;
    height: 35px;
    right: 20px;
    bottom: 240px;
  }
  @media ${(props) => props.theme.mobile} {
    width: 35px;
    height: 35px;
    right: 20px;
    bottom: 240px;
  }
  @media ${(props) => props.theme.tablet} {
    width: 40px;
    height: 40px;
    right: 20px;
  }
  @media ${(props) => props.theme.desktop} {
    width: 50px;
    height: 50px;
    right: 20px;
  }
  @media ${(props) => props.theme.desktop1} {
    width: 50px;
    height: 50px;
    right: 20px;
  }
`;

function Profile() {
  const [witModalView, setWitModalView] = useState(false);
  const [infoModalView, setInfoModalView] = useState(false);
  const [changeModalView, setChangeModalView] = useState(false);
  const { userData } = useSelector((state: RootState) => state);
  const { userInfo, accessToken } = userData;
  const [js, setJs] = useState(userInfo.stacks?.[0]);
  const [ts, setTs] = useState(userInfo.stacks?.[1]);
  const [css, setCss] = useState(userInfo.stacks?.[2]);
  const [react, setReact] = useState(userInfo.stacks?.[3]);
  const [vue, setVue] = useState(userInfo.stacks?.[4]);
  const [noSql, setNoSql] = useState(userInfo.stacks?.[5]);
  const [sql, setSql] = useState(userInfo.stacks?.[6]);
  const [express, setExpress] = useState(userInfo.stacks?.[7]);
  const [aws, setAws] = useState(userInfo.stacks?.[8]);
  const [other, setOther] = useState(userInfo.stacks?.[9]);
  // const [userInfo.id, setuserInfo.id] = useState(userInfo.id);
  const [username, setUsername] = useState(userInfo.username);
  const [password, setPassword] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [errNameMessage, setErrNameMessage] = useState('');
  const [errPwMessage, setErrPwMessage] = useState('');
  const [errConfirmPwMessage, setErrConfirmPwMessage] = useState('');
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER}/users/auth`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        const userinfo = res.data.data.userInfo;
        setUsername(userinfo.username);
        setJs(userinfo.stacks[0]);
        setTs(userinfo.stacks[1]);
        setCss(userinfo.stacks[2]);
        setReact(userinfo.stacks[3]);
        setVue(userinfo.stacks[4]);
        setNoSql(userinfo.stacks[5]);
        setSql(userinfo.stacks[6]);
        setExpress(userinfo.stacks[7]);
        setAws(userinfo.stacks[8]);
        setOther(userinfo.stacks[9]);
        dispatch(UserModify(res.data.data.userInfo));
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER}/users/oauth`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        const userinfo = res.data.data.userInfo;
        setUsername(userinfo.username);
        setJs(userinfo.stacks[0]);
        setTs(userinfo.stacks[1]);
        setCss(userinfo.stacks[2]);
        setReact(userinfo.stacks[3]);
        setVue(userinfo.stacks[4]);
        setNoSql(userinfo.stacks[5]);
        setSql(userinfo.stacks[6]);
        setExpress(userinfo.stacks[7]);
        setAws(userinfo.stacks[8]);
        setOther(userinfo.stacks[9]);
      });
  }, []);

  useEffect(() => {
    if (username === '') {
      setErrNameMessage('');
    }
    if (password === '') {
      setErrPwMessage('');
    }
    if (password.length > 0 && password.length < 4) {
      setErrPwMessage('최소 4글자 이상 입력하세요.');
    }
    if (password.length >= 4) {
      setErrPwMessage('');
    }
    if (confirmPw === '') {
      setErrConfirmPwMessage('');
    }
    if (confirmPw === password) {
      setErrConfirmPwMessage('');
    }
    if (confirmPw !== password) {
      setErrConfirmPwMessage('비밀번호가 일치하지 않습니다.');
    }
  }, [username, password, confirmPw]);

  const usernameOnChange = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      setUsername(e.currentTarget.value);
    },
    [setUsername],
  );

  const passwordOnChange = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      setPassword(e.currentTarget.value);
    },
    [setPassword],
  );

  const confirmPwOnChange = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      setConfirmPw(e.currentTarget.value);
    },
    [setConfirmPw],
  );

  const handleFollow = () => {
    setScrollY(window.pageYOffset); // window 스크롤 값을 ScrollY에 저장
  };

  const UpScrollOnClick = () => {
    if (!window.scrollY) {
      return;
    }
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const watch = () => {
      window.addEventListener('scroll', handleFollow);
    };
    watch(); // addEventListener 함수를 실행
    return () => {
      window.removeEventListener('scroll', handleFollow); // addEventListener 함수를 삭제
    };
  });

  const onClickJs = useCallback(async () => {
    setJs(!js);
    const data = await axios.post(
      `${process.env.REACT_APP_SERVER}/users/stacks/0`,
      { js, id: userInfo.id },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    dispatch(UserModify(data.data.data));
  }, [js, setJs]);

  const onClickTs = useCallback(async () => {
    setTs(!ts);
    const data = await axios.post(
      `${process.env.REACT_APP_SERVER}/users/stacks/1`,
      { ts, id: userInfo.id },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    dispatch(UserModify(data.data.data));
  }, [ts, setTs]);

  const onClickCss = useCallback(async () => {
    setCss(!css);
    const data = await axios.post(
      `${process.env.REACT_APP_SERVER}/users/stacks/2`,
      { css, id: userInfo.id },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    dispatch(UserModify(data.data.data));
  }, [css, setCss]);

  const onClickReact = useCallback(async () => {
    setReact(!react);
    const data = await axios.post(
      `${process.env.REACT_APP_SERVER}/users/stacks/3`,
      { react, id: userInfo.id },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    dispatch(UserModify(data.data.data));
  }, [react, setReact]);

  const onClickVue = useCallback(async () => {
    setVue(!vue);
    const data = await axios.post(
      `${process.env.REACT_APP_SERVER}/users/stacks/4`,
      { vue, id: userInfo.id },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    dispatch(UserModify(data.data.data));
  }, [vue, setVue]);

  const onClickNoSql = useCallback(async () => {
    setNoSql(!noSql);
    const data = await axios.post(
      `${process.env.REACT_APP_SERVER}/users/stacks/5`,
      { noSql, id: userInfo.id },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    dispatch(UserModify(data.data.data));
  }, [noSql, setNoSql]);

  const onClickSql = useCallback(async () => {
    setSql(!sql);
    const data = await axios.post(
      `${process.env.REACT_APP_SERVER}/users/stacks/6`,
      { sql, id: userInfo.id },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    dispatch(UserModify(data.data.data));
  }, [sql, setSql]);

  const onClickExpress = useCallback(async () => {
    setExpress(!express);
    const data = await axios.post(
      `${process.env.REACT_APP_SERVER}/users/stacks/7`,
      { express, id: userInfo.id },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    dispatch(UserModify(data.data.data));
  }, [express, setExpress]);

  const onClickAws = useCallback(async () => {
    setAws(!aws);
    const data = await axios.post(
      `${process.env.REACT_APP_SERVER}/users/stacks/8`,
      { aws, id: userInfo.id },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    dispatch(UserModify(data.data.data));
  }, [aws, setAws]);

  const onClickOther = useCallback(async () => {
    setOther(!other);
    const data = await axios.post(
      `${process.env.REACT_APP_SERVER}/users/stacks/9`,
      { other, id: userInfo.id },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    dispatch(UserModify(data.data.data));
  }, [other, setOther]);

  const handleInfoModalClick = useCallback(() => {
    setInfoModalView(!infoModalView);
  }, [infoModalView, setInfoModalView]);

  const handlePwModalClick = useCallback(() => {
    setChangeModalView(!changeModalView);
    navigate('/');
  }, [changeModalView, setChangeModalView, navigate]);

  const handleWitModalClick = useCallback(() => {
    setWitModalView(!witModalView);
  }, [witModalView, setWitModalView]);

  const handleWitDelClick = useCallback(async () => {
    await axios.delete(`${process.env.REACT_APP_SERVER}/users/signout`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    });
    dispatch(UserLogout());
    navigate('/');
    setWitModalView(!witModalView);
  }, [witModalView, setWitModalView, navigate]);

  const handleNameSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (username !== userInfo.username) {
        setUsername(username);
        const data = await axios.patch(
          `${process.env.REACT_APP_SERVER}/users/profile`,
          { id: userInfo.id, newUsername: username },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
          },
        );
        dispatch(UserModify(data.data.data));
        setUsername(username);
        setErrNameMessage('');
        setInfoModalView(!infoModalView);
      }
    },
    [
      username,
      setUsername,
      setErrNameMessage,
      infoModalView,
      setInfoModalView,
      dispatch,
    ],
  );

  const handlePasswordSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === confirmPw && password !== '') {
      await axios.patch(
        `${process.env.REACT_APP_SERVER}/users/profile`,
        { id: userInfo.id, newPassword: password },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        },
      );
      dispatch(UserLogout());
      setChangeModalView(!changeModalView);
    }
  };

  const checkUernameOnClick = useCallback(async () => {
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
      setErrNameMessage('닉네임을 사용하실 수 있습니다.');
    } catch {
      setErrNameMessage('이미 동일한 닉네임이 존재합니다.');
    }
  }, [username, setUsername]);

  const [cost, setCost] = useState(0);

  const costOnChange = useCallback(
    (e: any) => {
      setCost(e.target.value);
    },
    [cost, setCost],
  );

  const onChangeImg = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      const uploadImg = e.target.files[0];
      const formData = new FormData();
      formData.append('image', uploadImg);
      const data = await axios.post(
        `${process.env.REACT_APP_SERVER}/users/upload/${userInfo.id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        },
      );
      dispatch(UserModify(data.data.data));
    }
  };

  return (
    <>
      <Nav />
      <Wrapper>
        <LeftBox>
          {userInfo?.imgUrl ? (
            <UserPhoto src={userInfo.imgUrl} />
          ) : (
            <UserPhoto src={userHolder} />
          )}
          <ImgForm>
            <ImgLabel htmlFor="imgInput">프로필 사진 등록</ImgLabel>
            <ImgInput
              id="imgInput"
              type="file"
              accept="image/*"
              onChange={onChangeImg}
            />
          </ImgForm>
          <StackName>어서오세요, {userInfo.username}님!</StackName>
          <StackText>내가 사용하는 스택</StackText>
          <StackLine />
          <StackBox>
            {js ? (
              <Button
                onClick={onClickJs}
                bg="#5A9E7A"
                cl="white"
                name="Javascript"
              />
            ) : (
              <Button
                onClick={onClickJs}
                bg="white"
                cl="#5A9E7A"
                name="Javascript"
              />
            )}
            {ts ? (
              <Button
                onClick={onClickTs}
                bg="#5A9E7A"
                cl="white"
                name="Typescript"
              />
            ) : (
              <Button
                onClick={onClickTs}
                bg="white"
                cl="#5A9E7A"
                name="Typescript"
              />
            )}
            {css ? (
              <Button onClick={onClickCss} bg="#5A9E7A" cl="white" name="CSS" />
            ) : (
              <Button onClick={onClickCss} bg="white" cl="#5A9E7A" name="CSS" />
            )}
            {react ? (
              <Button
                onClick={onClickReact}
                bg="#5A9E7A"
                cl="white"
                name="React"
              />
            ) : (
              <Button
                onClick={onClickReact}
                bg="white"
                cl="#5A9E7A"
                name="React"
              />
            )}
            {vue ? (
              <Button onClick={onClickVue} bg="#5A9E7A" cl="white" name="Vue" />
            ) : (
              <Button onClick={onClickVue} bg="white" cl="#5A9E7A" name="Vue" />
            )}
            {noSql ? (
              <Button
                onClick={onClickNoSql}
                bg="#5A9E7A"
                cl="white"
                name="NoSql"
              />
            ) : (
              <Button
                onClick={onClickNoSql}
                bg="white"
                cl="#5A9E7A"
                name="NoSql"
              />
            )}
            {sql ? (
              <Button onClick={onClickSql} bg="#5A9E7A" cl="white" name="SQL" />
            ) : (
              <Button onClick={onClickSql} bg="white" cl="#5A9E7A" name="SQL" />
            )}
            {express ? (
              <Button
                onClick={onClickExpress}
                bg="#5A9E7A"
                cl="white"
                name="Express"
              />
            ) : (
              <Button
                onClick={onClickExpress}
                bg="white"
                cl="#5A9E7A"
                name="Express"
              />
            )}
            {aws ? (
              <Button onClick={onClickAws} bg="#5A9E7A" cl="white" name="AWS" />
            ) : (
              <Button onClick={onClickAws} bg="white" cl="#5A9E7A" name="AWS" />
            )}
            {other ? (
              <Button
                onClick={onClickOther}
                bg="#5A9E7A"
                cl="white"
                name="Others"
              />
            ) : (
              <Button
                onClick={onClickOther}
                bg="white"
                cl="#5A9E7A"
                name="Others"
              />
            )}
          </StackBox>
          <StackText>내 충전 금액</StackText>
          <StackLine />
          <CostBox>
            <CostText>충전된 금액</CostText>
            <CostText>{userInfo.money}원</CostText>
            <CostInput
              placeholder="충전할 금액"
              type="text"
              onChange={costOnChange}
            />
            <Payment cost={cost} setCost={setCost} />
          </CostBox>
        </LeftBox>
        <RightBox>
          <InfoBox>
            <InfoNameForm onSubmit={handleNameSubmit}>
              <InfoText>이메일</InfoText>
              <EmailInput value={userInfo.email} readOnly />
              <NameText>닉네임</NameText>
              <InfoDistrict onClick={checkUernameOnClick}>
                중복검사
              </InfoDistrict>
              <InfoInput
                type="text"
                maxLength={16}
                value={username}
                placeholder={username}
                onChange={usernameOnChange}
              />
              <InfoErrorText>{errNameMessage}</InfoErrorText>
              <InfoNameBtn type="submit">닉네임 변경하기</InfoNameBtn>
            </InfoNameForm>
            {userInfo.oauth ? (
              <CommonBox>
                <OauthHolder src={oauthImg} />
              </CommonBox>
            ) : (
              <InfoPasswordForm onSubmit={handlePasswordSubmit}>
                <PasswordText>비밀번호</PasswordText>
                <InfoInput
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  onChange={passwordOnChange}
                />
                <InfoErrorText>{errPwMessage}</InfoErrorText>
                <InfoInput
                  type="password"
                  placeholder="비밀번호를 한번 더 입력하세요"
                  onChange={confirmPwOnChange}
                />
                <InfoErrorText>{errConfirmPwMessage}</InfoErrorText>
                <InfoPwBtn type="submit">비밀번호 변경하기</InfoPwBtn>
                <WitInfo onClick={handleWitModalClick}>회원탈퇴</WitInfo>
              </InfoPasswordForm>
            )}
          </InfoBox>
        </RightBox>
        {witModalView ? (
          <WitModalBack>
            <WitModalBox>
              <WitText>정말로 탈퇴하실 건가요?</WitText>
              <WitModalBtnBox>
                <WitModalBtn onClick={handleWitDelClick}>네</WitModalBtn>
                <WitModalBtn onClick={handleWitModalClick}>아니요</WitModalBtn>
              </WitModalBtnBox>
            </WitModalBox>
          </WitModalBack>
        ) : null}
        {infoModalView ? (
          <InfoModalBack>
            <InfoModalBox>
              <InfoModalText>닉네임이 변경되었습니다</InfoModalText>
              <InfoModalBtn onClick={handleInfoModalClick}>확인</InfoModalBtn>
            </InfoModalBox>
          </InfoModalBack>
        ) : null}
        {changeModalView ? (
          <ChangeModalBack>
            <ChangeModalBox>
              <ChangeModalText>
                비밀번호 변경을 완료했습니다 다시 로그인 해주세요
              </ChangeModalText>
              <ChangeModalBtn onClick={handlePwModalClick}>확인</ChangeModalBtn>
            </ChangeModalBox>
          </ChangeModalBack>
        ) : null}
      </Wrapper>
      {scrollY > 500 ? (
        <UpScrollBtn>
          <FiChevronsUp
            className="upscroll"
            type="button"
            onClick={UpScrollOnClick}
          >
            위로가기
          </FiChevronsUp>
        </UpScrollBtn>
      ) : null}
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </>
  );
}

export default Profile;
