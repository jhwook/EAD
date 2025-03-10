import styled from 'styled-components';
import { GiHamburgerMenu } from 'react-icons/gi';
import logo from './Image/Logo/ead.png';

const Circle = styled.div`
  width: 300px;
  height: 300px;
  background-color: ${(props) => props.theme.white};
  border: 10px solid ${(props) => props.theme.green};
  border-radius: 500px;
  @media ${(props) => props.theme.mobile} {
    background-color: ${(props) => props.theme.white};
  }
  @media ${(props) => props.theme.tablet} {
    background-color: ${(props) => props.theme.green};
  }
  @media ${(props) => props.theme.desktop} {
    background-color: ${(props) => props.theme.pink};
  }
`;

const Title = styled.div`
  font-size: 80px;
  background-color: ${(props) => props.theme.pink};
`;

const Wrapper = styled.div`
  .logo {
    font-size: 30px;
    position: absolute;
    top: 20px;
    right: 30px;
    opacity: 0;
    @media ${(props) => props.theme.mobile} {
      opacity: 1;
    }
  }
`;

const Logo = styled.img`
  width: 250px;
`;

function Home() {
  return (
    <Wrapper>
      <Logo src={logo} />
      <Title>Hello</Title>
      <GiHamburgerMenu className="logo" />
      <Circle />
    </Wrapper>
  );
}

export default Home;
