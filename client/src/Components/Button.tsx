import styled from 'styled-components';

interface IProps {
  onClick: () => void;
  name: string;
  bg: string;
  cl: string;
}

interface IStackButton {
  bgColor: string;
  color: string;
}

const Btn = styled.button<IStackButton>`
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.color};
  font-size: ${(props) => props.theme.fontSize.tiny};
  width: 110px;
  height: 32px;
  margin: 0 10px 0 10px;
  border: 1px solid ${(props) => props.theme.btnGreen};
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.4s;
  box-shadow: rgba(0, 0, 0, 0.3) 2px 2px;
  /* @media ${(props) => props.theme.tablet} {
    width: 92px;
  } */
  @media ${(props) => props.theme.mobile} {
    margin: 0 10px 0px 10px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    margin: 0 10px 0 10px;
  }
  &:hover {
    color: ${(props) => props.theme.pink};
  }
`;

function Button({ name, onClick, bg, cl }: IProps) {
  return (
    <Btn onClick={() => onClick()} bgColor={bg} color={cl}>
      {name}
    </Btn>
  );
}

export default Button;
