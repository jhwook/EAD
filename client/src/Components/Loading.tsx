import ReactLoading from 'react-loading';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.beige};
  width: 100%;
  height: 77.3vh;
`;

const Text = styled.div`
  font-size: ${(props) => props.theme.fontSize.huge};
  margin-bottom: 20px;
  @media ${(props) => props.theme.mobile} {
    font-size: ${(props) => props.theme.fontSize.medium};
  }
  @media ${(props) => props.theme.tablet} {
    font-size: ${(props) => props.theme.fontSize.large};
  }
`;

const LoadingBox = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

function Loading() {
  return (
    <Wrapper>
      <LoadingBox>
        <Text>로딩 중....</Text>
        <ReactLoading type="bubbles" color="#5A9E7A" height="90%" width="90%" />
      </LoadingBox>
    </Wrapper>
  );
}
export default Loading;
