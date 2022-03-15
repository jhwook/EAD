import styled from 'styled-components';

const Circle = styled.div`
  width: 300px;
  height: 300px;
  background-color: ${(props) => props.theme.bgColor};
  border: 10px solid ${(props) => props.theme.btnColor};
  border-radius: 500px;
<<<<<<< HEAD
  position: absolute;
=======
  position: fixed;
>>>>>>> bcf0c16a62bbf3be5373dced6c3a12720aa85680
`;

function Home() {
  return <Circle />;
}

export default Home;
