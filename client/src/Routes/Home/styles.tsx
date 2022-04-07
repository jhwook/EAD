import styled, { keyframes } from 'styled-components';

export const HomeArrow = keyframes`
  0% {
    top: 135px;
  }
  50% {
    top: 145px;
  }
  100% {
    top: 135px;
  }
`;

export const HomeArrow1 = keyframes`
  0% {
    top: 100px;
  }
  50% {
    top: 110px;
  }
  100% {
    top: 100px;
  }
`;

export const HomeArrow2 = keyframes`
  0% {
    top: 80px;
  }
  50% {
    top: 90px;
  }
  100% {
    top: 80px;
  }
`;

export const HomeArrow3 = keyframes`
  0% {
    top: 70px;
  }
  50% {
    top: 80px;
  }
  100% {
    top: 70px;
  }
`;

export const HomeWrapper = styled.div`
  height: auto;
  min-height: 100%;
  padding-bottom: 150px;
  @media ${(props) => props.theme.mobile} {
    height: auto;
    min-height: 100%;
    padding-bottom: 200px;
  }
`;

export const FooterWrapper = styled.div`
  height: 150px;
  position: relative;
  margin-top: -150px;
  @media ${(props) => props.theme.mobile} {
    height: 200px;
    position: relative;
    margin-top: -200px;
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  @media ${(props) => props.theme.iPhone12Pro} {
    height: 92vh;
    flex-direction: column;
  }
  @media ${(props) => props.theme.mobile1} {
    height: 92vh;
    flex-direction: column;
  }
  @media ${(props) => props.theme.mobile} {
    flex-direction: column;
  }
  @media ${(props) => props.theme.tablet} {
    flex-direction: column;
  }
  /* .team {
    font-size: ${(props) => props.theme.fontSize.veryHuge};
    color: ${(props) => props.theme.green};
    position: absolute;
    right: 20px;
    cursor: pointer;
    z-index: 2;
    &:hover {
      font-size: ${(props) => props.theme.fontSize.huge};
    }
    @media ${(props) => props.theme.iPhone12Pro} {
      top: 570px;
      right: 5px;
      font-size: ${(props) => props.theme.fontSize.large};
      &:hover {
        font-size: ${(props) => props.theme.fontSize.medium};
      }
    }
    @media ${(props) => props.theme.mobile1} {
      top: 570px;
      right: 5px;
      font-size: ${(props) => props.theme.fontSize.large};
      &:hover {
        font-size: ${(props) => props.theme.fontSize.medium};
      }
    }
    @media ${(props) => props.theme.mobile} {
      top: 600px;
      right: 5px;
      font-size: ${(props) => props.theme.fontSize.huge};
      &:hover {
        font-size: ${(props) => props.theme.fontSize.xLarge};
      }
    }
    @media ${(props) => props.theme.tablet} {
      top: 600px;
      right: 10px;
      font-size: ${(props) => props.theme.fontSize.huge};
      &:hover {
        font-size: ${(props) => props.theme.fontSize.xLarge};
      }
    }
    @media ${(props) => props.theme.desktop} {
      top: 600px;
      right: 10px;
    }
    @media ${(props) => props.theme.desktop1} {
      top: 600px;
      right: 10px;
    }
    @media ${(props) => props.theme.desktop2} {
      top: 600px;
      right: 10px;
    }
  } */
  .down {
    position: absolute;
    top: 135px;
    left: 283px;
    font-size: ${(props) => props.theme.fontSize.large};
    animation: ${HomeArrow} 1s infinite;
    @media ${(props) => props.theme.iPhone12Pro} {
      top: 70px;
      left: 150px;
      font-size: ${(props) => props.theme.fontSize.small};
      animation: ${HomeArrow3} 1s infinite;
    }
    @media ${(props) => props.theme.mobile1} {
      top: 70px;
      left: 150px;
      font-size: ${(props) => props.theme.fontSize.small};
      animation: ${HomeArrow3} 1s infinite;
    }
    @media ${(props) => props.theme.mobile} {
      top: 80px;
      left: 200px;
      font-size: ${(props) => props.theme.fontSize.medium};
      animation: ${HomeArrow2} 1s infinite;
    }
    @media ${(props) => props.theme.tablet} {
      top: 100px;
      left: 263px;
      font-size: ${(props) => props.theme.fontSize.medium};
      animation: ${HomeArrow1} 1s infinite;
    }
    @media ${(props) => props.theme.desktop} {
      top: 100px;
      left: 263px;
      font-size: ${(props) => props.theme.fontSize.medium};
      animation: ${HomeArrow1} 1s infinite;
    }
  }
`;

export const IntroWrapper = styled.div`
  margin-right: 70px;
  @media ${(props) => props.theme.iPhone12Pro} {
    margin-right: 0px;
    margin-bottom: 30px;
  }
  @media ${(props) => props.theme.mobile1} {
    margin-right: 0px;
    margin-bottom: 30px;
  }
  @media ${(props) => props.theme.mobile} {
    margin-right: 0px;
    margin-bottom: 30px;
  }
  @media ${(props) => props.theme.tablet} {
    margin-right: 0px;
    margin-bottom: 30px;
  }
  @media ${(props) => props.theme.desktop} {
    margin-right: 50px;
  }
`;

export const Intro = styled.img`
  width: 630px;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.3) 3px 3px;
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 300px;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 380px;
  }
  @media ${(props) => props.theme.mobile} {
    width: 500px;
  }
  @media ${(props) => props.theme.tablet} {
    width: 530px;
  }
  @media ${(props) => props.theme.desktop} {
    width: 580px;
  }
`;

// const TeamWrapper = styled.div`
//   position: absolute;
//   width: 100%;
//   transform: translateX(0%);
//   transition: all 1s;
//   z-index: 6;
// `;

export const Box = styled.div`
  width: 100%;
  height: 100vh;
`;

export const Logo = styled.img`
  width: 650px;
  margin: 40px 20px 40px 20px;
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 320px;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 320px;
  }
  @media ${(props) => props.theme.mobile} {
    width: 400px;
  }
  @media ${(props) => props.theme.tablet} {
    width: 470px;
  }
  @media ${(props) => props.theme.desktop} {
    width: 470px;
  }
  @media ${(props) => props.theme.desktop1} {
    width: 600px;
  }
  .logo5 {
    @media ${(props) => props.theme.desktop} {
      width: 400px;
    }
  }
`;
export const SearchBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const LeftBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.pink};
  @media ${(props) => props.theme.iPhone12Pro} {
    flex-direction: column;
  }
  @media ${(props) => props.theme.mobile1} {
    flex-direction: column;
  }
  @media ${(props) => props.theme.mobile} {
    flex-direction: column;
  }
  @media ${(props) => props.theme.tablet} {
    flex-direction: column;
  }
  .three {
    padding: 0px 40px;
  }
`;

export const RightBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.beige};
  @media ${(props) => props.theme.iPhone12Pro} {
    flex-direction: column;
  }
  @media ${(props) => props.theme.mobile1} {
    flex-direction: column;
  }
  @media ${(props) => props.theme.mobile} {
    flex-direction: column;
  }
  @media ${(props) => props.theme.tablet} {
    flex-direction: column;
  }
  .four {
    padding: 0px 60px;
  }
`;

export const TextBox = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

export const Text = styled.div`
  font-size: ${(props) => props.theme.fontSize.huge};
  margin-bottom: 10px;
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
    font-size: ${(props) => props.theme.fontSize.large};
  }
  @media ${(props) => props.theme.desktop} {
    font-size: ${(props) => props.theme.fontSize.large};
  }
`;

export const Number = styled.div`
  font-size: ${(props) => props.theme.fontSize.huge};
  @media ${(props) => props.theme.iPhone12Pro} {
    font-size: ${(props) => props.theme.fontSize.medium};
  }
  @media ${(props) => props.theme.mobile1} {
    font-size: ${(props) => props.theme.fontSize.medium};
  }
  @media ${(props) => props.theme.mobile} {
    font-size: ${(props) => props.theme.fontSize.large};
  }
`;

export const Title = styled.div`
  font-size: ${(props) => props.theme.fontSize.huge};
  margin-bottom: 50px;
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
    font-size: ${(props) => props.theme.fontSize.large};
  }
  @media ${(props) => props.theme.desktop} {
    font-size: ${(props) => props.theme.fontSize.large};
  }
`;
export const Descriprtion = styled.div`
  font-size: ${(props) => props.theme.fontSize.medium};
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
  @media ${(props) => props.theme.desktop} {
    font-size: ${(props) => props.theme.fontSize.small};
  }
`;

export const Searchbar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  z-index: 0;
  .search {
    font-size: ${(props) => props.theme.fontSize.huge};
    @media ${(props) => props.theme.iPhone12Pro} {
      font-size: ${(props) => props.theme.fontSize.medium};
    }
    @media ${(props) => props.theme.mobile1} {
      font-size: ${(props) => props.theme.fontSize.medium};
    }
    @media ${(props) => props.theme.mobile} {
      font-size: ${(props) => props.theme.fontSize.large};
    }
  }
`;
export const SearchInput = styled.input`
  width: 500px;
  height: 30px;
  border: 3px solid ${(props) => props.theme.green};
  padding: 10px 10px 10px 15px;
  margin-right: 20px;
  font-size: ${(props) => props.theme.fontSize.small};
  box-shadow: rgba(0, 0, 0, 0.3) 3px 3px;
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 250px;
    height: 20px;
    margin-right: 5px;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 250px;
    height: 20px;
    margin-right: 5px;
  }
  @media ${(props) => props.theme.mobile} {
    width: 350px;
    margin-right: 5px;
  }
  @media ${(props) => props.theme.tablet} {
    width: 450px;
  }
  @media ${(props) => props.theme.desktop} {
    width: 450px;
  }
`;

export const Form = styled.form`
  display: flex;
  align-items: center;
`;

export const Button = styled.button`
  border: none;
  background-color: inherit;
  cursor: pointer;
`;

export const SearchBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const SearchBarBox = styled.ul`
  display: flex;
  flex-direction: column;
  margin-top: 2px;
  padding: 15px 5px 10px 15px;
  width: 503px;
  font-size: ${(props) => props.theme.fontSize.small};
  font-weight: bold;
  border: 2px solid ${(props) => props.theme.green};
  background-color: ${(props) => props.theme.beige};
  position: absolute;
  top: 60px;
  box-shadow: rgba(0, 0, 0, 0.3) 3px 3px;
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 250px;
    margin-right: 5px;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 250px;
    margin-right: 5px;
  }
  @media ${(props) => props.theme.mobile} {
    width: 350px;
    margin-right: 5px;
  }
  @media ${(props) => props.theme.tablet} {
    width: 450px;
  }
  @media ${(props) => props.theme.desktop} {
    width: 450px;
  }
`;

export const DeleteBtn = styled.div`
  font-size: ${(props) => props.theme.fontSize.small};
  font-weight: bold;
  position: absolute;
  top: 17px;
  right: 35px;
  cursor: pointer;
  @media ${(props) => props.theme.iPhone12Pro} {
    top: 12px;
    right: 25px;
  }
  @media ${(props) => props.theme.mobile1} {
    top: 12px;
    right: 25px;
  }
`;

export const UpScrollBtn = styled.div`
  width: 45px;
  height: 45px;
  position: fixed;
  right: 160px;
  bottom: 170px;
  border: 2px solid ${(props) => props.theme.btnGreen};
  border-radius: 15px;
  transition: all 1s;
  cursor: pointer;
  z-index: 5;
  box-shadow: rgba(0, 0, 0, 0.3) 3px 3px;
  .upscroll {
    width: 100%;
    height: 100%;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 30px;
    height: 30px;
    right: 40px;
    bottom: 220px;
    border-radius: 10px;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 30px;
    height: 30px;
    right: 40px;
    bottom: 220px;
    border-radius: 10px;
  }
  @media ${(props) => props.theme.mobile} {
    width: 35px;
    height: 35px;
    right: 40px;
    bottom: 220px;
  }
  @media ${(props) => props.theme.tablet} {
    width: 40px;
    height: 40px;
    right: 60px;
  }
  @media ${(props) => props.theme.desktop} {
    right: 70px;
  }
  @media ${(props) => props.theme.desktop1} {
    right: 110px;
  }
`;
