import styled from 'styled-components';

interface IStackProps {
  bgColor: string;
  color: string;
}

export const SearchWrapper = styled.div`
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

export const StackWrapper = styled.div`
  width: 70%;
  padding: 30px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  @media ${(props) => props.theme.iPhone12Pro} {
    padding: 5px;
    margin-bottom: 10px;
  }
  @media ${(props) => props.theme.mobile1} {
    padding: 5px;
    margin-bottom: 10px;
  }
`;

export const UpBox = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  @media ${(props) => props.theme.iPhone12Pro} {
    flex-wrap: wrap;
    margin-bottom: 2px;
  }
  @media ${(props) => props.theme.mobile1} {
    flex-wrap: wrap;
    margin-bottom: 2px;
  }
`;
export const DownBox = styled.div`
  display: flex;
  justify-content: center;
  @media ${(props) => props.theme.iPhone12Pro} {
    flex-wrap: wrap;
  }
  @media ${(props) => props.theme.mobile1} {
    flex-wrap: wrap;
  }
`;

export const Stack = styled.div<IStackProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.color};
  font-size: ${(props) => props.theme.fontSize.small};
  font-weight: bold;
  padding: 10px;
  margin: 0px 5px;
  border: 2px solid ${(props) => props.theme.btnGreen};
  box-shadow: rgba(0, 0, 0, 0.3) 3px 3px;
  border-radius: 10px;
  cursor: pointer;
  @media ${(props) => props.theme.iPhone12Pro} {
    font-size: ${(props) => props.theme.fontSize.micro};
    margin: 5px;
  }
  @media ${(props) => props.theme.mobile1} {
    font-size: ${(props) => props.theme.fontSize.micro};
    margin: 5px;
  }
  @media ${(props) => props.theme.mobile} {
    font-size: ${(props) => props.theme.fontSize.micro};
  }
  @media ${(props) => props.theme.tablet} {
    font-size: ${(props) => props.theme.fontSize.mini};
  }
`;

export const Searchbar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 0;
  .search {
    font-size: ${(props) => props.theme.fontSize.large};
    @media ${(props) => props.theme.iPhone12Pro} {
      display: none;
    }
    @media ${(props) => props.theme.mobile1} {
      display: none;
    }
    @media ${(props) => props.theme.mobile} {
      display: none;
    }
  }
`;
export const SearchInput = styled.input`
  width: 700px;
  height: 20px;
  border: 3px solid ${(props) => props.theme.green};
  padding: 10px 10px 10px 15px;
  margin-right: 5px;
  font-size: ${(props) => props.theme.fontSize.small};
  box-shadow: rgba(0, 0, 0, 0.3) 3px 3px;
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 300px;
    margin-right: 0px;
    margin-left: 25px;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 300px;
    margin-right: 0px;
    margin-left: 25px;
  }
  @media ${(props) => props.theme.mobile} {
    width: 340px;
    margin-right: 0px;
  }
  @media ${(props) => props.theme.tablet} {
    width: 600px;
  }
`;

export const Form = styled.form`
  display: flex;
  align-items: center;
`;

export const SearchBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const Button = styled.button`
  border: none;
  background-color: inherit;
  cursor: pointer;
`;

export const DeleteBtn = styled.div`
  font-size: ${(props) => props.theme.fontSize.small};
  font-weight: bold;
  position: absolute;
  top: 12px;
  right: 35px;
  cursor: pointer;
`;

export const ListWrapper = styled.div`
  min-height: 638px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  word-break: break-all;
`;

export const Lists = styled.ul`
  width: 1500px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  text-align: center;
  place-items: center;
  margin-top: 50px;
  margin-bottom: 50px;
  @media ${(props) => props.theme.iPhone12Pro} {
    grid-template-columns: repeat(1, 1fr);
    width: 300px;
    gap: 20px;
  }
  @media ${(props) => props.theme.mobile1} {
    grid-template-columns: repeat(1, 1fr);
    width: 300px;
    gap: 20px;
  }
  @media ${(props) => props.theme.mobile} {
    grid-template-columns: repeat(1, 1fr);
    width: 500px;
    gap: 20px;
  }
  @media ${(props) => props.theme.tablet} {
    grid-template-columns: repeat(2, 1fr);
    width: 700px;
    gap: 20px;
  }
  @media ${(props) => props.theme.desktop} {
    grid-template-columns: repeat(3, 1fr);
    width: 1000px;
    gap: 20px;
  }
`;
export const List = styled.li`
  width: 260px;
  height: 260px;
  border: 2px solid ${(props) => props.theme.btnGreen};
  border-radius: 15px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.3) 3px 3px;
  cursor: pointer;
`;

export const UpSide = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const DownSide = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

export const Title = styled.div`
  font-size: ${(props) => props.theme.fontSize.medium};
`;
export const Tag = styled.div`
  width: 70px;
  color: ${(props) => props.theme.btnGreen};
  font-size: ${(props) => props.theme.fontSize.tiny};
  font-weight: bold;
  padding: 5px 5px;
  border: 2px solid ${(props) => props.theme.btnGreen};
  border-radius: 15px;
  margin: 5px;
  box-shadow: rgba(0, 0, 0, 0.3) 1.5px 1.5px;
`;

export const SearchBarBox = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 15px 5px 10px 15px;
  width: 700px;
  font-size: ${(props) => props.theme.fontSize.small};
  font-weight: bold;
  border: 2px solid ${(props) => props.theme.green};
  background-color: ${(props) => props.theme.beige};
  position: absolute;
  top: 60px;
  box-shadow: rgba(0, 0, 0, 0.3) 3px 3px;
  z-index: 3;
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 300px;
    margin-right: 0px;
    margin-left: 25px;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 300px;
    margin-right: 0px;
    margin-left: 25px;
  }
  @media ${(props) => props.theme.mobile} {
    width: 340px;
    margin-right: 0px;
  }
  @media ${(props) => props.theme.tablet} {
    width: 600px;
  }
`;

export const AddBtnBox = styled.div``;

export const AddPostBtn = styled.img`
  width: 60px;
  height: 60px;
  position: fixed;
  right: 40px;
  bottom: 700px;
  border: 2px solid ${(props) => props.theme.btnGreen};
  border-radius: 15px;
  transition: all 1s;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.3) 3px 3px;
  &:hover {
    background-color: ${(props) => props.theme.btnGreen};
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 35px;
    height: 35px;
    top: 390px;
    right: 10px;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 35px;
    height: 35px;
    top: 390px;
    right: 10px;
  }
  @media ${(props) => props.theme.mobile} {
    width: 45px;
    height: 45px;
    top: 350px;
    right: 10px;
  }
  @media ${(props) => props.theme.tablet} {
    width: 55px;
    height: 55px;
    right: 10px;
  }
  @media ${(props) => props.theme.desktop} {
    width: 60px;
    height: 60px;
    right: 10px;
  }
  @media ${(props) => props.theme.desktop1} {
    width: 60px;
    height: 60px;
    right: 10px;
  }
`;

export const UpScrollBtn = styled.div`
  width: 60px;
  height: 60px;
  position: fixed;
  right: 160px;
  bottom: 170px;
  border: 2px solid ${(props) => props.theme.btnGreen};
  border-radius: 15px;
  transition: all 1s;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.3) 3px 3px;
  .upscroll {
    width: 100%;
    height: 100%;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 35px;
    height: 35px;
    right: 20px;
    bottom: 240px;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 35px;
    height: 35px;
    right: 20px;
    bottom: 240px;
  }
  @media ${(props) => props.theme.mobile} {
    width: 35px;
    height: 35px;
    right: 20px;
    bottom: 240px;
  }
  @media ${(props) => props.theme.tablet} {
    width: 40px;
    height: 40px;
    right: 20px;
  }
  @media ${(props) => props.theme.desktop} {
    width: 50px;
    height: 50px;
    right: 20px;
  }
  @media ${(props) => props.theme.desktop1} {
    width: 50px;
    height: 50px;
    right: 20px;
  }
`;

export const Box = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const NoneLogo = styled.img`
  margin-bottom: 30px;
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 300px;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 300px;
  }
  @media ${(props) => props.theme.mobile} {
    width: 400px;
  }
  @media ${(props) => props.theme.tablet} {
    width: 450px;
  }
  @media ${(props) => props.theme.desktop} {
    width: 450px;
  }
  @media ${(props) => props.theme.desktop1} {
    width: 450px;
  }
  @media ${(props) => props.theme.desktop2} {
    width: 500px;
  }
`;

export const NoneText = styled.div`
  font-size: ${(props) => props.theme.fontSize.medium};
  font-weight: bold;
  color: ${(props) => props.theme.btnGreen};
  @media ${(props) => props.theme.iPhone12Pro} {
    font-size: ${(props) => props.theme.fontSize.small};
  }
  @media ${(props) => props.theme.mobile1} {
    font-size: ${(props) => props.theme.fontSize.small};
  }
  @media ${(props) => props.theme.mobile} {
    font-size: ${(props) => props.theme.fontSize.small};
  }
  @media ${(props) => props.theme.tablet} {
    font-size: ${(props) => props.theme.fontSize.small};
  }
`;
