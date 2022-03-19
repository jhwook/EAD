import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
// import logo from '../Image/Logo/ead.png';
import yeb from '../Image/member/yeb.png';
import jhw from '../Image/member/jhw.png';
import kdy from '../Image/member/kdy.png';

const Wrapper = styled.div`
  height: 100vh;
  padding: 30px;
  background-color: ${(props) => props.theme.pink};
`;
const UpBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px 20px;
`;
const DownBox = styled.div`
  height: 650px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 80px;
`;

// const Logo = styled.img`
//   width: 250px;
// `;

const TeamText = styled.div`
  font-size: ${(props) => props.theme.fontSize.large};
  font-weight: bold;
`;
const Btn = styled.button`
  background-color: inherit;
  border: none;
  font-size: ${(props) => props.theme.fontSize.medium};
  height: 50px;
  &:hover {
    transform: rotate(90deg);
    transition: transform 0.5s;
  }
`;
const Member = styled.img`
  width: 300px;
  cursor: pointer;
`;

const MemberOne = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: ${(props) => props.theme.fontSize.small};
`;
const MemberTwo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: ${(props) => props.theme.fontSize.small};
  border-right: 2px solid black;
  border-left: 2px solid black;
  width: 700px;
  height: 600px;
`;
const MemberThree = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: ${(props) => props.theme.fontSize.small};
`;

const Title = styled.div`
  margin-top: 30px;
  font-size: ${(props) => props.theme.fontSize.large};
`;
const Role = styled.div`
  margin-bottom: 30px;
  font-weight: bold;
`;
const Description = styled.div``;

interface ITeamProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

function Team(props: ITeamProps) {
  const { setOpen } = props;
  const handleOnClick = () => {
    setOpen(false);
  };
  return (
    <Wrapper>
      <UpBox>
        {/* <Logo src={logo} /> */}
        <TeamText>Team Introdution</TeamText>
        <Btn onClick={handleOnClick}>X</Btn>
      </UpBox>
      <DownBox>
        <MemberOne>
          <a target="_blank" href="https://github.com/EBinY" rel="noreferrer">
            <Member src={yeb} />
          </a>
          <Title>윤의빈</Title>
          <Role>Front-end</Role>
          <Description>Wireframe 제작,</Description>
          <Description>내 정보 페이지 제작</Description>
        </MemberOne>
        <MemberTwo>
          <a target="_blank" href="https://github.com/jhwook" rel="noreferrer">
            <Member src={jhw} />
          </a>
          <Title>전현욱</Title>
          <Role>Back-end</Role>
          <Description>Server 구축,</Description>
          <Description>OAuth 인증 / 보안 등등</Description>
        </MemberTwo>
        <MemberThree>
          <a
            target="_blank"
            href="https://github.com/apeachicetea"
            rel="noreferrer"
          >
            <Member src={kdy} />
          </a>
          <Title>김대윤</Title>
          <Role>Front-end</Role>
          <Description>Prototype 제작,</Description>
          <Description>Home, Team 페이지 제작</Description>
        </MemberThree>
      </DownBox>
    </Wrapper>
  );
}

export default Team;
