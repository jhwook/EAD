import styled from 'styled-components';
import React, {
  FormEvent,
  MouseEventHandler,
  useEffect,
  useState,
  useRef,
} from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { AppDispatch, RootState, UserLogout, UserModify } from 'index';
import Payment from 'Components/Payment';
import Button from '../Components/Button';
import hiLogo from '../Image/Logo/profile.png';

const Wrapper = styled.div`
  width: 100%;
  height: 88vh;
  display: flex;
  flex-direction: flex;
  justify-content: center;
  align-items: center;
`;

const LeftBox = styled.div`
  width: 700px;
  height: 700px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

// 유저의 등록된 사진으로 변경 예정
const UserPhoto = styled.img`
  width: 200px;
  height: 140px;
`;

const ImgInput = styled.input`
  display: none;
`;

const ImgLabel = styled.label`
  background-color: ${(props) => props.theme.btnGreen};
  color: ${(props) => props.theme.white};
  font-size: ${(props) => props.theme.fontSize.tiny};
  padding: 5px;
  margin-bottom: 10px;
  border: 1px solid ${(props) => props.theme.btnGreen};
  border-radius: 5px;
  cursor: pointer;
`;

const StackName = styled.div`
  font-size: ${(props) => props.theme.fontSize.small};
  margin-bottom: 10px;
`;

const StackText = styled.div`
  font-size: ${(props) => props.theme.fontSize.small};
  width: 300px;
  margin-top: 20px;
`;

const StackLine = styled.hr`
  height: 2px;
  width: 300px;
  background-color: ${(props) => props.theme.black};
`;

const StackBox = styled.div`
  width: 50%;
  height: 245px;
  display: flex;
  //padding-top: 10px;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

const CostBox = styled.div`
  /* width: 50%;
  height: 245px;
  display: flex;
  padding-top: 1vh;
  display: flex;
  align-items: center;
  flex-direction: column; */
  width: 50%;
  height: 110px;
  display: flex;
  padding-top: 10px;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

const CostText = styled.div`
  font-size: ${(props) => props.theme.fontSize.mini};
  width: 120px;
  margin-left: 15px;
  height: 20px;
`;

const CostInput = styled.input`
  font-size: ${(props) => props.theme.fontSize.mini};
  width: 115px;
  //margin-rignt: 30px;
  //padding-right: 20px;
  height: 23px;
`;

const RightBox = styled.div`
  width: 700px;
  height: 700px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const InfoBox = styled.div`
  width: 375px;
  height: 600px;
  margin-top: 10px;
  padding-top: 25px;
  border-radius: 30px;
  border: 2px solid ${(props) => props.theme.lightGrey};
  background-color: ${(props) => props.theme.white};
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
  margin-top: 5px;
  margin-bottom: 15px;
`;

const NameText = styled.div`
  font-size: ${(props) => props.theme.fontSize.small};
  width: 290px;
  margin-top: 10px;
`;

const PasswordText = styled.div`
  font-size: ${(props) => props.theme.fontSize.small};
  width: 290px;
  margin-top: 10px;
  margin-bottom: 15px;
`;

const InfoDistrict = styled.div`
  font-size: ${(props) => props.theme.fontSize.micro};
  color: ${(props) => props.theme.grey};
  width: 290px;
  text-align: right;
  margin-bottom: 5px;
  cursor: pointer;
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
  margin-bottom: 10px;
  cursor: no-drop;
`;

const InfoInput = styled.input`
  font-size: ${(props) => props.theme.fontSize.mini};
  color: ${(props) => props.theme.grey};
  width: 290px;
  border: 2px solid ${(props) => props.theme.lightGrey};
  border-radius: 15px;
  padding: 12px;
  padding-left: 15px;
  margin-bottom: 5px;
`;

const InfoNameBtn = styled.button`
  font-size: ${(props) => props.theme.fontSize.tiny};
  background-color: ${(props) => props.theme.btnGreen};
  color: ${(props) => props.theme.white};
  width: 140px;
  height: 40px;
  margin-top: 2px;
  margin-bottom: 20px;
  border: 1px solid ${(props) => props.theme.btnGreen};
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    font-weight: bold;
  }
`;

const InfoPwBtn = styled.button`
  font-size: ${(props) => props.theme.fontSize.tiny};
  background-color: ${(props) => props.theme.btnGreen};
  color: ${(props) => props.theme.white};
  width: 140px;
  height: 40px;
  margin-top: 6px;
  margin-bottom: 24px;
  border: 1px solid ${(props) => props.theme.btnGreen};
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    font-weight: bold;
  }
`;

const InfoErrorText = styled.div`
  font-size: ${(props) => props.theme.fontSize.micro};
  color: ${(props) => props.theme.lightGrey};
  width: 290px;
  height: 8px;
  margin-top: 2px;
  margin-bottom: 10px;
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
  transition: all 0.5s;
  &:hover {
    color: ${(props) => props.theme.pink};
    font-weight: bold;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  }
`;

const PwModalBack = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
`;

const PwModalBox = styled.div`
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

const PwModalText = styled.div`
  font-size: ${(props) => props.theme.fontSize.small};
  width: 290px;
  margin-top: 20px;
  text-align: center;
`;

const PwModalBtn = styled.button`
  background-color: ${(props) => props.theme.white};
  color: ${(props) => props.theme.btnGreen};
  border: 1px solid ${(props) => props.theme.grey};
  border-radius: 11px;
  margin: 20px;
  font-size: ${(props) => props.theme.fontSize.tiny};
  width: 80px;
  height: 30px;
  cursor: pointer;
  transition: all 0.5s;
  &:hover {
    color: ${(props) => props.theme.pink};
    font-weight: bold;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
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
  &:hover {
    color: ${(props) => props.theme.pink};
    font-weight: bold;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  }
`;

// `${process.env.REACT_APP_SERVER}/search`
function Profile() {
  const [witModalView, setWitModalView] = useState(false);
  const [infoModalView, setInfoModalView] = useState(false);
  const [pwModalView, setPwModalView] = useState(false);

  const { userData } = useSelector((state: RootState) => state);
  const { userInfo, accessToken, isLogin } = userData;

  console.log(userInfo);
  const [userImg, setUserImg] = useState<string>('');
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

  const [username, setUsername] = useState(userInfo.username);
  const [nametag, setNametag] = useState(userInfo.username);
  const [password, setPassword] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [errNameMessage, setErrNameMessage] = useState('');
  const [errPwMessage, setErrPwMessage] = useState('');
  const [errConfirmPwMessage, setErrConfirmPwMessage] = useState('');

  // onChange=중복검사 때

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // 중복검사, 비밀번호/유저네임 버튼 및 폼 분리할까
  // 변경 후 변경 완료 확인 모달 제공

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
        const userinfo = res.data;
        setUsername(userinfo.data.username);
        setNametag(userinfo.data.username);
        setJs(userinfo.data.stacks[0]);
        setTs(userinfo.data.stacks[1]);
        setCss(userinfo.data.stacks[2]);
        setReact(userinfo.data.stacks[3]);
        setVue(userinfo.data.stacks[4]);
        setNoSql(userinfo.data.stacks[5]);
        setSql(userinfo.data.stacks[6]);
        setExpress(userinfo.data.stacks[7]);
        setAws(userinfo.data.stacks[8]);
        setOther(userinfo.data.stacks[9]);
      });
  }, []);

  useEffect(() => {
    if (username === '') {
      setErrNameMessage('');
    }
    // if (username !== '') {
    //   setErrNameMessage('최소 2글자 이상 입력하세요.');
    // }
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

  // useEffect(() => {
  //   async function getUser() {
  //     const data = await axios.get(
  //       `${process.env.REACT_APP_SERVER}/users/auth`,
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //         withCredentials: true,
  //       },
  //     );
  //     console.log(data);
  //     setUserData(data);
  //   }
  //   console.log(userData);
  // }, [username, password, confirmPw]);

  const usernameOnChange = (e: FormEvent<HTMLInputElement>) => {
    setUsername(e.currentTarget.value);
    // console.log(username);
  };

  const passwordOnChange = (e: FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
    // console.log(password);
  };

  const confirmPwOnChange = (e: FormEvent<HTMLInputElement>) => {
    setConfirmPw(e.currentTarget.value);
    // console.log(confirmPw);
  };

  const onClickJs = async () => {
    setJs(!js);
    try {
      await axios.post(
        `${process.env.REACT_APP_SERVER}/users/stacks/0`,
        { js },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
    } catch (err) {
      console.log(err);
    }
  };

  const onClickTs = async () => {
    setTs(!ts);
    try {
      await axios.post(
        `${process.env.REACT_APP_SERVER}/users/stacks/1`,
        { ts },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
    } catch (err) {
      console.log(err);
    }
  };

  const onClickCss = async () => {
    setCss(!css);
    try {
      await axios.post(
        `${process.env.REACT_APP_SERVER}/users/stacks/2`,
        { css },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
    } catch (err) {
      console.log(err);
    }
  };

  const onClickReact = async () => {
    setReact(!react);
    try {
      await axios.post(
        `${process.env.REACT_APP_SERVER}/users/stacks/3`,
        { react },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
    } catch (err) {
      console.log(err);
    }
  };

  const onClickVue = async () => {
    setVue(!vue);
    try {
      await axios.post(
        `${process.env.REACT_APP_SERVER}/users/stacks/4`,
        { vue },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
    } catch (err) {
      console.log(err);
    }
  };

  const onClickNoSql = async () => {
    setNoSql(!noSql);
    try {
      await axios.post(
        `${process.env.REACT_APP_SERVER}/users/stacks/5`,
        { noSql },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
    } catch (err) {
      console.log(err);
    }
  };

  const onClickSql = async () => {
    setSql(!sql);
    try {
      await axios.post(
        `${process.env.REACT_APP_SERVER}/users/stacks/6`,
        { sql },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
    } catch (err) {
      console.log(err);
    }
  };

  const onClickExpress = async () => {
    setExpress(!express);
    try {
      await axios.post(
        `${process.env.REACT_APP_SERVER}/users/stacks/7`,
        { express },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
    } catch (err) {
      console.log(err);
    }
  };

  const onClickAws = async () => {
    setAws(!aws);
    try {
      await axios.post(
        `${process.env.REACT_APP_SERVER}/users/stacks/8`,
        { aws },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
    } catch (err) {
      console.log(err);
    }
  };

  const onClickOther = async () => {
    setOther(!other);
    try {
      await axios.post(
        `${process.env.REACT_APP_SERVER}/users/stacks/9`,
        { other },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleInfoModalClick = () => {
    setInfoModalView(!infoModalView);
  };

  const handlePwModalClick = () => {
    setPwModalView(!pwModalView);
    navigate('/');
  };

  const handleWitModalClick = () => {
    setWitModalView(!witModalView);
  };

  const handleWitDelClick = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_SERVER}/users/signout`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });
      dispatch(UserLogout());
    } catch (err) {
      console.log(err);
    }
    navigate('/');
    setWitModalView(!witModalView);
  };

  // const handlePhotoAddClick = () => {};

  const handleNameSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // 유저 이름만 변경
      if (username !== userInfo.username) {
        setUsername(username);
        const data = await axios.patch(
          `${process.env.REACT_APP_SERVER}/users/profile`,
          { username },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
          },
        );
        console.log('data', data);
        dispatch(UserModify(data.data.data));
        setUsername(username);
        setNametag(username);
        setErrNameMessage('');
        setInfoModalView(!infoModalView);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handlePasswordSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // 비밀번호만 변경
      if (password === confirmPw && password !== '') {
        await axios.patch(
          `${process.env.REACT_APP_SERVER}/users/profile`,
          { password },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
          },
        );
        dispatch(UserLogout());
        setPwModalView(!pwModalView);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const checkUernameOnClick = async () => {
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
  };

  // const uploadOnClick = (e: any) => {
  //   event?.preventDefault();
  //   userImgInput.current.click();
  // };

  const uploadImgOnChange = async (event: any) => {
    const formData = new FormData();
    formData.append('file', event?.target.files[0]);
    console.log('formdata', formData);
    try {
      await axios.post(
        `${process.env.REACT_APP_SERVER}/users/upload`,
        { formData },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        },
      );
    } catch (err) {
      console.log(err);
    }
  };

  // 결제 부분
  const [cost, setCost] = useState(0);

  const costOnChange = (e: any) => {
    setCost(e.target.value);
  };

  // const userImgInput = useRef<HTMLInputElement>('');

  return (
    <Wrapper>
      <LeftBox>
        {userInfo?.imgUrl ? (
          <UserPhoto src={userInfo.imgUrl} />
        ) : (
          <UserPhoto src={hiLogo} />
        )}
        <ImgLabel htmlFor="imgInput">프로필 사진 등록</ImgLabel>
        <ImgInput
          // ref={userImgInput}
          id="imgInput"
          type="file"
          accept="image/*"
          onChange={uploadImgOnChange}
        />
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
          {/* <CostText>충전할 금액</CostText> */}
          <CostInput
            placeholder="충전할 금액"
            type="number"
            // value={cost}
            onChange={costOnChange}
          />
          <Payment cost={cost} setCost={setCost} />
        </CostBox>
      </LeftBox>
      <RightBox>
        <InfoBox>
          <InfoNameForm onSubmit={handleNameSubmit}>
            <InfoText>이메일</InfoText>
            {/* <InfoWarn>변경불가</InfoWarn> */}
            <EmailInput value={userInfo.email} readOnly />
            <NameText>닉네임</NameText>
            <InfoDistrict onClick={checkUernameOnClick}>중복검사</InfoDistrict>
            <InfoInput
              type="text"
              value={username}
              placeholder={username}
              onChange={usernameOnChange}
            />
            <InfoErrorText>{errNameMessage}</InfoErrorText>
            <InfoNameBtn type="submit">닉네임 변경하기</InfoNameBtn>
          </InfoNameForm>
          <InfoPasswordForm onSubmit={handlePasswordSubmit}>
            <PasswordText>비밀번호</PasswordText>
            {/* <InfoWarn>4자이상</InfoWarn> */}
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
      {pwModalView ? (
        <PwModalBack>
          <PwModalBox>
            <PwModalText>
              비밀번호가 변경되었습니다 다시 로그인 해주세요
            </PwModalText>
            <PwModalBtn onClick={handlePwModalClick}>확인</PwModalBtn>
          </PwModalBox>
        </PwModalBack>
      ) : null}
    </Wrapper>
  );
}

export default Profile;
