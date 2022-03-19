import styled from 'styled-components';
import { FormEvent, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { useNavigate } from 'react-router';
import { RootState } from 'index';
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
  height: 650px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

// 유저의 등록된 사진으로 변경 예정
const UserPhoto = styled.img`
  width: 240px;
  height: 170px;
`;

const StackName = styled.div`
  font-size: ${(props) => props.theme.fontSize.small};
  margin-bottom: 40px;
`;

const StackText = styled.div`
  font-size: ${(props) => props.theme.fontSize.small};
  width: 300px;
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
  padding-top: 3vh;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

const RightBox = styled.div`
  width: 700px;
  height: 650px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const InfoBox = styled.div`
  width: 400px;
  height: 500px;
  margin-top: 30px;
  padding-top: 30px;
  border-radius: 30px;
  border: 2px solid ${(props) => props.theme.lightGrey};
  background-color: ${(props) => props.theme.white};
`;

const InfoForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
`;

const InfoText = styled.div`
  font-size: ${(props) => props.theme.fontSize.small};
  width: 290px;
  margin-top: 10px;
`;

const InfoWarn = styled.div`
  font-size: ${(props) => props.theme.fontSize.tiny};
  color: ${(props) => props.theme.grey};
  width: 290px;
  margin-bottom: 5px;
  text-align: right;
  cursor: default;
`;

const InfoDistrict = styled.div`
  font-size: ${(props) => props.theme.fontSize.tiny};
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
  padding: 8px;
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
  padding: 8px;
  padding-left: 15px;
  margin-bottom: 5px;
`;

const InfoConfirmBtn = styled.button`
  font-size: ${(props) => props.theme.fontSize.small};
  background-color: ${(props) => props.theme.btnGreen};
  color: ${(props) => props.theme.white};
  width: 200px;
  height: 40px;
  margin-top: 5px;
  margin-bottom: 12px;
  border: 1px solid ${(props) => props.theme.btnGreen};
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    font-weight: bold;
  }
`;

const InfoAlertText = styled.div`
  font-size: ${(props) => props.theme.fontSize.micro};
  color: ${(props) => props.theme.lightGrey};
  width: 290px;
  margin-bottom: 10px;
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
  const [modalView, setModalView] = useState(false);

  const user = useSelector((state: RootState) => state);
  console.log(user);

  const [js, setJs] = useState(user.userInfo.stacks?.[0]);
  const [ts, setTs] = useState(user.userInfo.stacks?.[1]);
  const [css, setCss] = useState(user.userInfo.stacks?.[2]);
  const [react, setReact] = useState(user.userInfo.stacks?.[3]);
  const [vue, setVue] = useState(user.userInfo.stacks?.[4]);
  const [noSql, setNoSql] = useState(user.userInfo.stacks?.[5]);
  const [sql, setSql] = useState(user.userInfo.stacks?.[6]);
  const [express, setExpress] = useState(user.userInfo.stacks?.[7]);
  const [aws, setAws] = useState(user.userInfo.stacks?.[8]);
  const [other, setOther] = useState(user.userInfo.stacks?.[9]);

  const [username, setUsername] = useState(user.userInfo.username);
  const [password, setpassword] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const dispatch: Dispatch = useDispatch();

  const onClickJs = () => {
    setJs(!js);
  };

  const onClickTs = () => {
    setTs(!ts);
  };

  const onClickCss = () => {
    setCss(!css);
  };

  const onClickReact = () => {
    setReact(!react);
  };

  const onClickVue = () => {
    setVue(!vue);
  };

  const onClickNoSql = () => {
    setNoSql(!noSql);
  };

  const onClickSql = () => {
    setSql(!sql);
  };

  const onClickExpress = () => {
    setExpress(!express);
  };

  const onClickAws = () => {
    setAws(!aws);
  };

  const onClickOther = () => {
    setOther(!other);
  };

  const handleModalClick = () => {
    setModalView(!modalView);
  };

  // const handlePhotoAddClick = () => {};

  // const handleInfoSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   try {
  //     if (password === confirmPw) {
  //       const data = await axios.patch(
  //         `${process.env.REACT_APP_SERVER}/users/profile`,
  //         {username, password},
  //         {
  //           headers: {
  //             'Content-Type': 'application/json',
  //             Authorization: user.accessToken,
  //           },
  //        withCredentials: true,
  //         },
  //       );
  //       dispatch({
  //         type: 'profile',
  //         userInfo:
  //       })
  //     }
  //   }
  // }

  return (
    <Wrapper>
      <LeftBox>
        {/* {userInfo?.photo ? (
          <UserPhoto src={userInfo.photo} />
        ) : (
          <UserPhoto src={hiLogo} />
        )} */}
        <UserPhoto src={hiLogo} />
        <StackName>어서오세요, {user.userInfo.username}님!</StackName>
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
      </LeftBox>
      <RightBox>
        <InfoBox>
          <InfoForm>
            <InfoText>이메일</InfoText>
            <InfoWarn>변경불가</InfoWarn>
            <EmailInput value={user.userInfo.email} readOnly />
            <InfoText>닉네임</InfoText>
            <InfoDistrict>중복검사</InfoDistrict>
            <InfoInput type="text" placeholder={user.userInfo.username} />
            <InfoAlertText>사용 가능한 이름입니다</InfoAlertText>
            <InfoText>비밀번호</InfoText>
            <InfoWarn>필수사항</InfoWarn>
            <InfoInput type="password" placeholder="비밀번호를 입력하세요" />
            <InfoInput
              type="password"
              placeholder="비밀번호를 한번 더 입력하세요"
            />
            <InfoAlertText>비밀번호가 일치합니다</InfoAlertText>
            <InfoConfirmBtn type="submit">변경하기</InfoConfirmBtn>
            <WitInfo onClick={handleModalClick}>회원탈퇴</WitInfo>
          </InfoForm>
        </InfoBox>
      </RightBox>
      {modalView ? (
        <WitModalBack>
          <WitModalBox>
            <WitText>정말로 탈퇴하실 건가요?</WitText>
            <WitModalBtnBox>
              <WitModalBtn onClick={handleModalClick}>네</WitModalBtn>
              <WitModalBtn onClick={handleModalClick}>아니요</WitModalBtn>
            </WitModalBtnBox>
          </WitModalBox>
        </WitModalBack>
      ) : null}
    </Wrapper>
  );
}

export default Profile;
