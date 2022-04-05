import styled from 'styled-components';

export const SignupWrapper = styled.div`
  width: 100%;
  height: 100%;
  top: 30px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;
export const Wrapper = styled.div`
  width: 370px;
  height: 650px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.white};
  border: 1px solid ${(props) => props.theme.lightGrey};
  border-radius: 30px;
  padding: 70px 35px;
  position: relative;
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 270px;
    height: 620px;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 270px;
    height: 620px;
  }
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const UsernameInput = styled.input`
  width: 315px;
  font-size: ${(props) => props.theme.fontSize.small};
  color: ${(props) => props.theme.lightGrey};
  border: 2px solid ${(props) => props.theme.lightGrey};
  border-radius: 15px;
  padding: 10px;
  margin-bottom: 12px;
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 270px;
    font-size: ${(props) => props.theme.fontSize.mini};
  }
  @media ${(props) => props.theme.mobile1} {
    width: 270px;
    font-size: ${(props) => props.theme.fontSize.mini};
  }
`;
export const EmailInput = styled.input`
  width: 315px;
  font-size: ${(props) => props.theme.fontSize.small};
  color: ${(props) => props.theme.lightGrey};
  border: 2px solid ${(props) => props.theme.lightGrey};
  border-radius: 15px;
  padding: 10px;
  margin-bottom: 12px;
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 270px;
    font-size: ${(props) => props.theme.fontSize.mini};
  }
  @media ${(props) => props.theme.mobile1} {
    width: 270px;
    font-size: ${(props) => props.theme.fontSize.mini};
  }
`;
export const PasswordInput = styled.input`
  width: 315px;
  font-size: ${(props) => props.theme.fontSize.small};
  font-weight: normal;
  color: ${(props) => props.theme.lightGrey};
  border: 2px solid ${(props) => props.theme.lightGrey};
  border-radius: 15px;
  padding: 10px;
  margin-bottom: 10px;
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 270px;
    font-size: ${(props) => props.theme.fontSize.mini};
  }
  @media ${(props) => props.theme.mobile1} {
    width: 270px;
    font-size: ${(props) => props.theme.fontSize.mini};
  }
`;

export const CofirmPasswordInput = styled.input`
  width: 315px;
  font-size: ${(props) => props.theme.fontSize.small};
  font-weight: normal;
  color: ${(props) => props.theme.lightGrey};
  border: 2px solid ${(props) => props.theme.lightGrey};
  border-radius: 15px;
  padding: 10px;
  margin-bottom: 10px;
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 270px;
    font-size: ${(props) => props.theme.fontSize.mini};
  }
  @media ${(props) => props.theme.mobile1} {
    width: 270px;
    font-size: ${(props) => props.theme.fontSize.mini};
  }
`;

export const PhoneBox = styled.div`
  display: flex;
  margin-top: 10px;
`;

export const NumberBox = styled.div`
  display: flex;
`;

export const PhoneInput = styled.input`
  width: 220px;
  font-size: ${(props) => props.theme.fontSize.small};
  font-weight: normal;
  color: ${(props) => props.theme.lightGrey};
  border: 2px solid ${(props) => props.theme.lightGrey};
  border-radius: 15px;
  padding: 10px;
  margin-bottom: 10px;
  margin-right: 10px;
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 170px;
    font-size: ${(props) => props.theme.fontSize.mini};
  }
  @media ${(props) => props.theme.mobile1} {
    width: 170px;
    font-size: ${(props) => props.theme.fontSize.mini};
  }
`;

export const NumberInput = styled.input`
  width: 240px;
  font-size: ${(props) => props.theme.fontSize.small};
  font-weight: normal;
  color: ${(props) => props.theme.lightGrey};
  border: 2px solid ${(props) => props.theme.lightGrey};
  border-radius: 15px;
  padding: 10px;
  margin-bottom: 10px;
  margin-right: 15px;
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 190px;
    font-size: ${(props) => props.theme.fontSize.mini};
  }
  @media ${(props) => props.theme.mobile1} {
    width: 190px;
    font-size: ${(props) => props.theme.fontSize.mini};
  }
`;

export const SendPhoneBtn = styled.button`
  height: 50px;
  color: ${(props) => props.theme.lightGrey};
  background-color: inherit;
  border: 2px solid ${(props) => props.theme.lightGrey};
  border-radius: 15px;
  font-weight: bold;
  cursor: pointer;
  transition: all 1s;
  &:hover {
    background-color: ${(props) => props.theme.lightGrey};
    color: ${(props) => props.theme.white};
  }
`;

export const ConfirmNumberBtn = styled.button`
  height: 50px;
  width: 60px;
  color: ${(props) => props.theme.lightGrey};
  background-color: inherit;
  border: 2px solid ${(props) => props.theme.lightGrey};
  border-radius: 15px;
  font-weight: bold;
  cursor: pointer;
  transition: all 1s;
  &:hover {
    background-color: ${(props) => props.theme.lightGrey};
    color: ${(props) => props.theme.white};
  }
`;

export const ExitBtn = styled.button`
  color: ${(props) => props.theme.lightGrey};
  font-size: ${(props) => props.theme.fontSize.small};
  background-color: inherit;
  border: none;
  position: absolute;
  top: 15px;
  right: 23px;
  cursor: pointer;
`;

export const SignupBtn = styled.button`
  width: 220px;
  background-color: ${(props) => props.theme.white};
  color: ${(props) => props.theme.lightGrey};
  font-size: ${(props) => props.theme.fontSize.small};
  font-weight: bold;
  text-align: center;
  border: 2px solid ${(props) => props.theme.lightGrey};
  border-radius: 15px;
  padding: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: all 1s;
  &:hover {
    background-color: ${(props) => props.theme.lightGrey};
    color: ${(props) => props.theme.white};
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 170px;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 170px;
  }
`;

export const Text = styled.div`
  width: 340px;
  color: ${(props) => props.theme.black};
  font-size: ${(props) => props.theme.fontSize.small};
  text-align: left;
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 270px;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 270px;
  }
`;

export const ConfirmText = styled.div`
  width: 340px;
  color: ${(props) => props.theme.lightGrey};
  font-size: ${(props) => props.theme.fontSize.tiny};
  text-align: right;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 10px;
  &:hover {
    color: ${(props) => props.theme.pink};
    font-weight: bold;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 270px;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 270px;
  }
`;

export const ErrorText = styled.div`
  width: 340px;
  color: ${(props) => props.theme.lightGrey};
  font-size: ${(props) => props.theme.fontSize.tiny};
  text-align: left;
  margin-bottom: 10px;
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 270px;
    font-size: ${(props) => props.theme.fontSize.micro};
  }
  @media ${(props) => props.theme.mobile1} {
    width: 270px;
    font-size: ${(props) => props.theme.fontSize.micro};
  }
`;

export const ErrorDoneText = styled.div`
  width: 340px;
  color: ${(props) => props.theme.red};
  font-size: ${(props) => props.theme.fontSize.tiny};
  text-align: center;
  margin-bottom: 10px;
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 270px;
    font-size: ${(props) => props.theme.fontSize.micro};
  }
  @media ${(props) => props.theme.mobile1} {
    width: 270px;
    font-size: ${(props) => props.theme.fontSize.micro};
  }
`;
