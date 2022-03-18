import styled from 'styled-components';
import { useState } from 'react';
import Button from '../Components/Button';
import hiLogo from '../Image/Logo/profile.png';

// `${process.env.REACT_APP_SERVER}/search`

interface IStackButton {
  bgColor: string;
  color: string;
}

const Wrapper = styled.div`
  width: 100%;
  height: 88vh;
  display: flex;
  flex-direction: flex;
  justify-content: center;
  align-items: center;
`;

const LeftBox = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  //justify-content: center;
  align-items: center;
  flex-direction: column;
`;

// 유저의 등록된 사진으로 변경 예정
const UserPhoto = styled.img`
  width: 33vh;
  height: 23vh;
`;

const StackName = styled.div`
  font-size: 4vh; //${(props) => props.theme.fontSize.large};
  margin-bottom: 5vh;
`;

const StackText = styled.div`
  font-size: 4.5vh; //${(props) => props.theme.fontSize.large};
  margin-bottom: 1vh;
`;

const UnderLine = styled.hr`
  height: 2px;
  width: 40vh;
  margin-bottom: 2vh;
  background-color: ${(props) => props.theme.black};
`;

const StackBox = styled.div`
  width: 50%;
  height: 32vh;
  //background-color: ${(props) => props.theme.white};
  border: 1px solid ${(props) => props.theme.grey};
  display: flex;
  padding-top: 3vh;
  //align-items: space-evenly;
  //flex-direction: column;
  justify-content: space-evenly;
  //flex-flow: column wrap;
  flex-wrap: wrap;
`;

const StackBtn = styled.button<IStackButton>`
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.color};
  font-size: 1.8vh;
  width: 40%;
  height: 15%;
  border: 1px solid ${(props) => props.theme.btnGreen};
  border-radius: 15px;
  cursor: pointer;
`;

const RightBox = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  //justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const InfoBox = styled.div`
  width: 60%;
  height: 80%;
  margin-top: 5vh;
  border-radius: 30px;
  border: 1px solid ${(props) => props.theme.grey};
  background-color: ${(props) => props.theme.white};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
`;

const InfoText = styled.div`
  font-size: 3vh;
  margin: 0.5vh;
  /* position: relative;
  left: 0%; */
  //float: right;
`;

const EmailInput = styled.input`
  font-size: 2.4vh;
  color: ${(props) => props.theme.grey};
  width: 75%;
  height: 5vh;
  padding-left: 1vh;
  margin: 1vh;
  border: 1px solid ${(props) => props.theme.grey};
  border-radius: 10px;
  cursor: no-drop;
`;

const InfoInput = styled.input`
  font-size: 2.4vh;
  color: ${(props) => props.theme.grey};
  width: 75%;
  height: 5vh;
  padding-left: 1vh;
  margin: 0.5vh;
  margin-bottom: 1.5vh;
  border: 1px solid ${(props) => props.theme.grey};
  border-radius: 10px;
`;

const InfoDistrict = styled.div`
  font-size: 1.7vh;
  color: ${(props) => props.theme.grey};
  cursor: pointer;
`;

const InfoConfirmBtn = styled.button`
  background-color: ${(props) => props.theme.btnGreen};
  color: ${(props) => props.theme.white};
  width: 24vh;
  height: 5vh;
  margin: 1vh;
  margin-bottom: 2vh;
  font-size: 2.2vh;
  border: 1px solid ${(props) => props.theme.btnGreen};
  border-radius: 10px;
  cursor: pointer;
`;

const WitModalBack = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
`;

const WitModalBox = styled.div`
  position: absolute;
  width: 35vh;
  height: 20vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  //transition: all 0.5s;
  background-color: ${(props) => props.theme.beige};
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const WitModalYesBtn = styled.button`
  background-color: ${(props) => props.theme.white};
  color: ${(props) => props.theme.green};
  border: 1px solid ${(props) => props.theme.grey};
  border-radius: 11px;
  margin: 1vh;
  font-size: 2vh;
  width: 9vh;
  height: 4vh;
  cursor: pointer;
`;

const WitModalNoBtn = styled.button`
  background-color: ${(props) => props.theme.white};
  color: ${(props) => props.theme.green};
  border: 1px solid ${(props) => props.theme.grey};
  border-radius: 11px;
  margin: 1vh;
  font-size: 2vh;
  width: 9vh;
  height: 4vh;
  cursor: pointer;
`;

function Profile() {
  const [modalView, setModalView] = useState<boolean>(false);
  const [checkJs, setCheckJs] = useState<boolean>(false);

  const onClick = () => {
    setCheckJs(!checkJs);
  };

  const modalClick = () => {
    setModalView(!modalView);
  };

  return (
    <Wrapper>
      <LeftBox>
        <UserPhoto src={hiLogo} />
        <StackName>Hi, EB!</StackName>
        <StackText>내가 사용하는 스텍</StackText>
        <UnderLine />
        <StackBox>
          {checkJs ? (
            <Button onClick={onClick} bg="green" cl="white" name="Javascript" />
          ) : (
            <Button onClick={onClick} bg="white" cl="green" name="Javascript" />
          )}
          <Button onClick={onClick} bg="green" cl="white" name="Javascript" />
        </StackBox>
      </LeftBox>
      <RightBox>
        <InfoBox>
          <InfoText>이메일</InfoText>
          <InfoDistrict>변경불가</InfoDistrict>
          <EmailInput value="기존 이메일" readOnly />
          <InfoText>닉네임</InfoText>
          <InfoDistrict>중복검사</InfoDistrict>
          <InfoInput type="text" placeholder="기존 닉네임" />
          <InfoText>비밀번호</InfoText>
          <InfoInput type="password" placeholder="비밀번호를 입력하세요" />
          <InfoInput
            type="password"
            placeholder="비밀번호를 한번 더 입력하세요"
          />
          <InfoConfirmBtn>변경하기</InfoConfirmBtn>
          <InfoDistrict onClick={modalClick}>회원탈퇴</InfoDistrict>
        </InfoBox>
      </RightBox>
      {modalView ? (
        <WitModalBack>
          <WitModalBox>
            <InfoText>정말로 탈퇴하실 건가요?</InfoText>
            <WitModalYesBtn onClick={modalClick}>네</WitModalYesBtn>
            <WitModalNoBtn onClick={modalClick}>아니요</WitModalNoBtn>
          </WitModalBox>
        </WitModalBack>
      ) : null}
    </Wrapper>
  );
}

export default Profile;
