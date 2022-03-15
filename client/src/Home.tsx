import styled from 'styled-components';

const Circle = styled.div`
  width: 300px;
  height: 300px;
  background-color: ${(props) => props.theme.bgColor};
  border: 10px solid ${(props) => props.theme.btnColor};
  border-radius: 500px;
  position: fixed;
`;

function Home() {
  return <Circle />;
}

export default Home;
