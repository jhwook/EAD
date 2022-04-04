import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import yeb from '../Image/member/yeb.png';
import jhw from '../Image/member/jhw.png';
import kdy from '../Image/member/kdy.png';

const Wrapper = styled.div`
  height: 100vh;
  padding: 30px;
  background-color: ${(props) => props.theme.green};
  @media ${(props) => props.theme.mobile} {
    padding: 20px 10px;
  }
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
  margin-top: 120px;
  @media ${(props) => props.theme.iPhone12Pro} {
    flex-direction: column;
    margin-top: 100px;
  }
  @media ${(props) => props.theme.mobile1} {
    flex-direction: column;
    margin-top: 100px;
  }
  @media ${(props) => props.theme.mobile} {
    flex-direction: column;
    margin-top: 145px;
  }
  @media ${(props) => props.theme.tablet} {
    flex-direction: column;
    margin-top: 145px;
  }
`;

const TeamText = styled.div`
  font-size: ${(props) => props.theme.fontSize.large};
  font-weight: bold;
  @media ${(props) => props.theme.iPhone12Pro} {
    font-size: ${(props) => props.theme.fontSize.small};
  }
  @media ${(props) => props.theme.mobile1} {
    font-size: ${(props) => props.theme.fontSize.small};
  }
  @media ${(props) => props.theme.mobile} {
    font-size: ${(props) => props.theme.fontSize.medium};
  }
  @media ${(props) => props.theme.tablet} {
    font-size: ${(props) => props.theme.fontSize.medium};
  }
  @media ${(props) => props.theme.desktop} {
    font-size: ${(props) => props.theme.fontSize.large};
  }
`;
const Btn = styled.button`
  background-color: inherit;
  border: none;
  font-size: ${(props) => props.theme.fontSize.medium};
  position: absolute;
  top: 10px;
  right: 50px;
  height: 100px;
  z-index: 11;
  cursor: pointer;
  &:hover {
    transform: rotate(90deg);
    transition: transform 0.5s;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    font-size: ${(props) => props.theme.fontSize.tiny};
  }
  @media ${(props) => props.theme.mobile1} {
    font-size: ${(props) => props.theme.fontSize.tiny};
  }
  @media ${(props) => props.theme.mobile} {
    font-size: ${(props) => props.theme.fontSize.mini};
  }
  @media ${(props) => props.theme.tablet} {
    font-size: ${(props) => props.theme.fontSize.small};
  }
`;
const Member = styled.img`
  width: 300px;
  cursor: pointer;
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 100px;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 100px;
  }
  @media ${(props) => props.theme.mobile} {
    width: 100px;
  }
  @media ${(props) => props.theme.tablet} {
    width: 120px;
  }
  @media ${(props) => props.theme.desktop} {
    width: 230px;
  }
`;

const MemberOne = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: ${(props) => props.theme.fontSize.small};
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 400px;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 400px;
  }
  @media ${(props) => props.theme.mobile} {
    width: 400px;
  }
  @media ${(props) => props.theme.tablet} {
    width: 300px;
  }
  @media ${(props) => props.theme.desktop} {
    width: 400px;
  }
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
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 300px;
    border-left: none;
    border-right: none;
    border-top: 2px solid black;
    border-bottom: 2px solid black;
    margin-top: 20px;
    margin-bottom: 20px;
    padding-top: 10px;
    padding-bottom: 20px;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 300px;
    border-left: none;
    border-right: none;
    border-top: 2px solid black;
    border-bottom: 2px solid black;
    margin-top: 20px;
    margin-bottom: 20px;
    padding-bottom: 20px;
  }
  @media ${(props) => props.theme.mobile} {
    width: 300px;
    border-left: none;
    border-right: none;
    border-top: 2px solid black;
    border-bottom: 2px solid black;
    margin-top: 20px;
    margin-bottom: 20px;
    padding-bottom: 20px;
  }
  @media ${(props) => props.theme.tablet} {
    width: 300px;
    border-left: none;
    border-right: none;
    border-top: 2px solid black;
    border-bottom: 2px solid black;
    margin-top: 20px;
    margin-bottom: 20px;
    padding-bottom: 20px;
  }
  @media ${(props) => props.theme.desktop} {
    width: 495px;
  }
  @media ${(props) => props.theme.desktop1} {
    width: 600px;
  }
`;
const MemberThree = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: ${(props) => props.theme.fontSize.small};
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 400px;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 400px;
  }
  @media ${(props) => props.theme.mobile} {
    width: 400px;
  }
  @media ${(props) => props.theme.tablet} {
    width: 400px;
  }
  @media ${(props) => props.theme.desktop} {
    width: 400px;
  }
`;

const Title = styled.div`
  margin-top: 30px;
  font-size: ${(props) => props.theme.fontSize.large};
  @media ${(props) => props.theme.iPhone12Pro} {
    font-size: ${(props) => props.theme.fontSize.mini};
  }
  @media ${(props) => props.theme.mobile1} {
    font-size: ${(props) => props.theme.fontSize.mini};
  }
  @media ${(props) => props.theme.mobile} {
    font-size: ${(props) => props.theme.fontSize.mini};
  }
  @media ${(props) => props.theme.tablet} {
    font-size: ${(props) => props.theme.fontSize.small};
  }
  @media ${(props) => props.theme.desktop} {
    font-size: ${(props) => props.theme.fontSize.medium};
  }
`;
const Role = styled.div`
  margin-bottom: 30px;
  font-weight: bold;
  @media ${(props) => props.theme.iPhone12Pro} {
    font-size: ${(props) => props.theme.fontSize.tiny};
  }
  @media ${(props) => props.theme.mobile1} {
    font-size: ${(props) => props.theme.fontSize.tiny};
  }
  @media ${(props) => props.theme.mobile} {
    font-size: ${(props) => props.theme.fontSize.tiny};
  }
  @media ${(props) => props.theme.tablet} {
    font-size: ${(props) => props.theme.fontSize.mini};
  }
  @media ${(props) => props.theme.desktop} {
    font-size: ${(props) => props.theme.fontSize.small};
  }
`;
const Description = styled.div`
  @media ${(props) => props.theme.iPhone12Pro} {
    font-size: ${(props) => props.theme.fontSize.micro};
  }
  @media ${(props) => props.theme.mobile1} {
    font-size: ${(props) => props.theme.fontSize.micro};
  }
  @media ${(props) => props.theme.mobile} {
    font-size: ${(props) => props.theme.fontSize.micro};
  }
  @media ${(props) => props.theme.tablet} {
    font-size: ${(props) => props.theme.fontSize.tiny};
  }
  @media ${(props) => props.theme.desktop} {
    font-size: ${(props) => props.theme.fontSize.mini};
  }
`;

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
