import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.div`
  font-size: ${(props) => props.theme.fontSize.xLarge};
  text-align: center;
  @media ${(props) => props.theme.iPhone12Pro} {
    font-size: ${(props) => props.theme.fontSize.medium};
  }
  @media ${(props) => props.theme.mobile1} {
    font-size: ${(props) => props.theme.fontSize.medium};
  }
  @media ${(props) => props.theme.mobile} {
    font-size: ${(props) => props.theme.fontSize.medium};
  }
  @media ${(props) => props.theme.tablet} {
    font-size: ${(props) => props.theme.fontSize.large};
  }
`;

function NotFound() {
  return (
    <Wrapper>
      <Text>
        404 <br /> not found
      </Text>
    </Wrapper>
  );
}

export default NotFound;
