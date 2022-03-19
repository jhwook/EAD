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
  width: 120px;
  height: 37px;
  border: 1px solid ${(props) => props.theme.btnGreen};
  border-radius: 15px;
  cursor: pointer;
  &:hover {
    font-weight: bold;
    //box-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
  }
`;

function Button({ name, onClick, bg, cl }: IProps) {
  return (
    <Btn onClick={() => onClick()} bgColor={bg} color={cl}>
      {name}
    </Btn>
  );
}

// <StackBtn bgColor="#5A9E7A" color="white" onClick={onClick}></StackBtn>
// {checkJs ? (
//   <StackBtn bgColor="#5A9E7A" color="white" onClick={onClick}>
//     Javascript
//   </StackBtn>
// ) : (
//   <StackBtn bgColor="white" color="#5A9E7A" onClick={onClick}>
//     Javascript
//   </StackBtn>
// )}
export default Button;
