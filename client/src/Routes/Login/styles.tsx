import styled from 'styled-components';
import kakao from '../../Image/Btn/kakao.png';
import google from '../../Image/Btn/google.png';
import naver from '../../Image/Btn/naver.png';

export const LoginWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  @media ${(props) => props.theme.iPhone12Pro} {
    top: -35px;
  }
  @media ${(props) => props.theme.mobile1} {
    top: -35px;
  }
  @media ${(props) => props.theme.mobile} {
    top: -35px;
  }
`;
export const Wrapper = styled.div`
  width: 370px;
  height: 480px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.white};
  border: 1px solid ${(props) => props.theme.lightGrey};
  border-radius: 30px;
  padding: 70px 35px;
  position: relative;
  top: 50px;
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 270px;
    height: 450px;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 270px;
    height: 450px;
  }
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const EmailInput = styled.input`
  width: 315px;
  font-size: ${(props) => props.theme.fontSize.small};
  color: ${(props) => props.theme.lightGrey};
  border: 2px solid ${(props) => props.theme.lightGrey};
  border-radius: 15px;
  padding: 10px;
  margin-bottom: 10px;
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 250px;
    height: 18px;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 250px;
    height: 18px;
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
    width: 250px;
    height: 18px;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 250px;
    height: 18px;
  }
`;
export const ExitBtn = styled.button`
  color: ${(props) => props.theme.lightGrey};
  font-size: ${(props) => props.theme.fontSize.small};
  background-color: inherit;
  border: none;
  position: absolute;
  top: 15px;
  right: 25px;
  cursor: pointer;
`;
export const LoginBtn = styled.button`
  width: 240px;
  background-color: ${(props) => props.theme.lightGrey};
  color: ${(props) => props.theme.white};
  font-size: ${(props) => props.theme.fontSize.small};
  font-weight: bold;
  border: 2px solid ${(props) => props.theme.lightGrey};
  border-radius: 15px;
  padding: 7px 10px;
  margin-bottom: 15px;
  cursor: pointer;
  transition: all 1s;
  &:hover {
    background-color: ${(props) => props.theme.white};
    color: ${(props) => props.theme.lightGrey};
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 150px;
    height: 45px;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 150px;
    height: 45px;
  }
`;
export const SignupBtn = styled.div`
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
    width: 130px;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 130px;
  }
`;

export const Naver = styled.a`
  width: 225px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-image: url(${naver});
  background-position: center;
  background-size: cover;
  margin-bottom: 3px;
  cursor: pointer;
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 190px;
    height: 45px;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 190px;
    height: 45px;
  }
`;

export const Kaoko = styled(Naver)`
  background-image: url(${kakao});
  @media ${(props) => props.theme.iPhone12Pro} {
    margin-bottom: 0px;
    height: 44px;
  }
  @media ${(props) => props.theme.mobile1} {
    margin-bottom: 0px;
    height: 44px;
  }
`;

export const Google = styled(Naver)`
  background-image: url(${google});
  width: 230px;
  border-radius: 10px;
  margin-bottom: 15px;
  @media ${(props) => props.theme.iPhone12Pro} {
    background-size: 195px 50px;
    width: 195px;
    height: 50px;
  }
  @media ${(props) => props.theme.mobile1} {
    background-size: 195px 50px;
    width: 195px;
    height: 50px;
  }
`;

export const Text = styled.div`
  color: ${(props) => props.theme.lightGrey};
  font-size: ${(props) => props.theme.fontSize.tiny};
  margin-bottom: 15px;
  @media ${(props) => props.theme.iPhone12Pro} {
    font-size: ${(props) => props.theme.fontSize.micro};
  }
  @media ${(props) => props.theme.mobile1} {
    font-size: ${(props) => props.theme.fontSize.micro};
  }
`;
