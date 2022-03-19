import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
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
  margin-top: 20px;
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
  //height: 35px;
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
  //height: 35px;
  border: 2px solid ${(props) => props.theme.lightGrey};
  border-radius: 15px;
  padding: 8px;
  padding-left: 15px;
  //margin-top: 10px;
`;

const InfoConfirmBtn = styled.button`
  font-size: ${(props) => props.theme.fontSize.small};
  background-color: ${(props) => props.theme.btnGreen};
  color: ${(props) => props.theme.white};
  width: 200px;
  height: 40px;
  margin-top: 10px;
  margin-bottom: 10px;
  border: 1px solid ${(props) => props.theme.btnGreen};
  border-radius: 10px;
  cursor: pointer;
`;

const AlertText = styled.div`
  font-size: ${(props) => props.theme.fontSize.micro};
`;

const WitText = styled.div`
  font-size: ${(props) => props.theme.fontSize.small};
  width: 290px;
  margin-top: 20px;
  text-align: center;
`;

const WitInfo = styled.div`
  font-size: ${(props) => props.theme.fontSize.tiny};
  color: ${(props) => props.theme.grey};
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
`;

// `${process.env.REACT_APP_SERVER}/search`
function Profile() {
  const [user, setUser] = useState<string | null>(null);

  const [modalView, setModalView] = useState(false);
  const [js, setJs] = useState(false);
  const [ts, setTs] = useState(false);
  const [css, setCss] = useState(false);
  const [react, setReact] = useState(false);
  const [vue, setVue] = useState(false);
  const [noSql, setNoSql] = useState(false);
  const [sql, setSql] = useState(false);
  const [express, setExpress] = useState(false);
  const [aws, setAws] = useState(false);
  const [other, setOther] = useState(false);

  const [username, setUsername] = useState('');
  const [firstPw, setFirstPw] = useState('');
  const [secPw, setSecPw] = useState('');

  // fpw,spw가 같지않으면 요청을 거절해야 함
  // 버튼을 비활성화 할건지, 요청을 자를건지는 고민해보고

  useEffect(() => {
    const userinfo = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER}/auth`,
        );
        setUser(response.data);
      } catch (e) {
        console.log(e);
      }
    };
  }, []);

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

  return (
    <Wrapper>
      <LeftBox>
        <UserPhoto
          src={hiLogo}
          // {user?.photo ? (src={user.photo}) : (src={hiLogo})}
        />
        <StackName>어서오세요, 전해커님!</StackName>
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
            <EmailInput value="기존 이메일" readOnly />
            <InfoText>닉네임</InfoText>
            <InfoDistrict>중복검사</InfoDistrict>
            <InfoInput type="text" placeholder="기존 닉네임" />
            <AlertText>사용 가능한 이름입니다</AlertText>
            <InfoText>비밀번호</InfoText>
            <InfoWarn>필수사항</InfoWarn>
            <InfoInput type="password" placeholder="비밀번호를 입력하세요" />
            <InfoInput
              type="password"
              placeholder="비밀번호를 한번 더 입력하세요"
            />
            <AlertText>비밀번호가 일치합니다</AlertText>
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
