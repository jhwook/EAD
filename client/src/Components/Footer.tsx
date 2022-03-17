import styled from 'styled-components';
import logo from '../Image/Logo/ead.png';

const Wrapper = styled.div`
  height: 10vh;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.green};
  padding: 20px;
`;
const UpBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
`;

const LeftBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LeftBoxText = styled.div`
  font-size: ${(props) => props.theme.fontSize.tiny};
  font-weight: normal;
`;

const DownBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${(props) => props.theme.fontSize.tiny};
  font-weight: bold;
`;

const Logo = styled.img`
  width: 200px;
`;
const Service = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Contact = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  font-size: ${(props) => props.theme.fontSize.medium};
  margin-bottom: 10px;
`;
const Contents = styled.ul``;

const Content = styled.li`
  font-size: ${(props) => props.theme.fontSize.tiny};
  margin-bottom: 10px;
`;

function Footer() {
  return (
    <Wrapper>
      <UpBox>
        <LeftBox>
          <Logo src={logo} />
          <LeftBoxText>서울특별시 강남구 서초구 서초중앙로 220</LeftBoxText>
        </LeftBox>
        <Service>
          <Title>Service</Title>
          <Contents>
            <Content>
              <a
                target="_blank"
                href="https://github.com/codestates/EAD/wiki"
                rel="noreferrer"
              >
                Wiki
              </a>
            </Content>

            <Content>
              <a
                target="_blank"
                href="https://github.com/codestates/EAD/tree/main"
                rel="noreferrer"
              >
                GitHub
              </a>
            </Content>
          </Contents>
        </Service>
        <Contact>
          <Title>Contact</Title>
          <Contents>
            <Content>
              <a
                target="_blank"
                href="https://github.com/EBinY"
                rel="noreferrer"
              >
                윤의빈
              </a>
            </Content>
            <Content>
              <a
                target="_blank"
                href="https://github.com/jhwook"
                rel="noreferrer"
              >
                전현욱
              </a>
            </Content>
            <Content>
              <a
                target="_blank"
                href="https://github.com/apeachicetea"
                rel="noreferrer"
              >
                김대윤
              </a>
            </Content>
          </Contents>
        </Contact>
      </UpBox>
      <DownBox>© 2022 The A-Team, All Rights Reserved</DownBox>
    </Wrapper>
  );
}

export default Footer;
