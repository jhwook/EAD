import styled from 'styled-components';

export const Wrapper = styled.div`
  height: auto;
  min-height: 100%;
  display: flex;
  flex-direction: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 150px;
  @media ${(props) => props.theme.desktop2} {
    height: auto;
    min-height: 868px;
    margin: 0px 0 296px 0;
  }
  @media ${(props) => props.theme.tablet} {
    padding-bottom: 386px;
  }
  @media ${(props) => props.theme.tablet} {
    padding-bottom: 386px;
  }
  @media ${(props) => props.theme.mobile} {
    flex-direction: column;
    padding-bottom: 200px;
  }
  @media ${(props) => props.theme.mobile1} {
    flex-direction: column;
    padding-bottom: 200px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    flex-direction: column;
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
  @media ${(props) => props.theme.mobile1} {
    height: 200px;
    position: relative;
    margin-top: -200px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    height: 200px;
    position: relative;
    margin-top: -200px;
  }
`;

export const LeftBox = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  flex-direction: column;
  @media ${(props) => props.theme.mobile} {
    width: 90%;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 90%;
    padding: 20px 0 0 0;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 90%;
  }
`;

export const UserPhoto = styled.img`
  width: 200px;
  height: 140px;
`;

export const ImgForm = styled.form`
  width: 50%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const ImgInput = styled.input`
  display: none;
`;

export const ImgLabel = styled.label`
  background-color: ${(props) => props.theme.btnGreen};
  color: ${(props) => props.theme.white};
  font-size: ${(props) => props.theme.fontSize.tiny};
  padding: 5px;
  margin: 15px 0 15px 0;
  border: 1px solid ${(props) => props.theme.btnGreen};
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: rgba(0, 0, 0, 0.3) 2px 2px;
  @media ${(props) => props.theme.mobile} {
    font-size: ${(props) => props.theme.fontSize.micro};
    margin: 10px 0 20px 0;
  }
  @media ${(props) => props.theme.mobile1} {
    font-size: ${(props) => props.theme.fontSize.micro};
    margin: 10px 0 30px 0;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    font-size: ${(props) => props.theme.fontSize.micro};
    margin: 10px 0 20px 0;
  }
  &:hover {
    background-color: ${(props) => props.theme.white};
    color: ${(props) => props.theme.btnGreen};
  }
`;

export const StackBox = styled.div`
  width: 320px;
  height: 226px;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  @media ${(props) => props.theme.mobile} {
    height: 250px;
    margin: 5px 0px 5px 0px;
  }
  @media ${(props) => props.theme.mobile1} {
    height: 270px;
    margin: 5px 0px 5px 0px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    height: 250px;
    margin: 5px 0px 5px 0px;
  }
`;

export const StackName = styled.div`
  font-size: ${(props) => props.theme.fontSize.small};
  margin: 0 0 5px 0;
`;

export const StackText = styled.div`
  font-size: ${(props) => props.theme.fontSize.small};
  width: 300px;
  margin-top: 18px;
  @media ${(props) => props.theme.mobile} {
    margin-top: 23px;
  }
  @media ${(props) => props.theme.mobile1} {
    margin-top: 23px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    margin-top: 23px;
  }
`;

export const StackLine = styled.hr`
  height: 2px;
  width: 300px;
  margin: 6px 0 10px 0;
  background-color: ${(props) => props.theme.black};
  @media ${(props) => props.theme.mobile} {
    height: 2px;
    margin: 5px 0 15px 0;
  }
  @media ${(props) => props.theme.mobile1} {
    height: 2px;
    margin: 5px 0 15px 0;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    height: 2px;
    margin: 5px 0 15px 0;
  }
`;

export const CostBox = styled.div`
  width: 320px;
  height: 80px;
  display: flex;
  margin: 1px 0 9px 0;
  justify-content: space-evenly;
  flex-direction: center;
  flex-wrap: wrap;
  @media ${(props) => props.theme.mobile} {
    height: 100px;
    margin: 10px 0 9px 0;
  }
  @media ${(props) => props.theme.mobile1} {
    height: 110px;
    margin: 10px 0 9px 0;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    height: 100px;
    margin: 10px 0 9px 0;
  }
`;

export const CostText = styled.div`
  font-size: ${(props) => props.theme.fontSize.mini};
  width: 115px;
  height: 32px;
  text-align: center;
  display: table-cell;
  vertical-align: middle;
`;

export const CostInput = styled.input`
  font-size: ${(props) => props.theme.fontSize.mini};
  color: ${(props) => props.theme.grey};
  width: 100px;
  border: 2px solid ${(props) => props.theme.lightGrey};
  border-radius: 10px;
  padding-left: 5px;
  height: 32px;
`;

export const RightBox = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 10px auto 10px auto;
  @media ${(props) => props.theme.mobile} {
    width: 90%;
    margin: 40px 0 20px 0;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 90%;
    margin: 40px 0 20px 0;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 90%;
    margin: 40px 0 15px 0;
  }
`;

export const InfoBox = styled.div`
  width: 375px;
  height: 600px;
  margin: 10px 0 9px 0;
  padding: 25px 0 0 0;
  border-radius: 20px;
  border: 2px solid ${(props) => props.theme.lightGrey};
  background-color: ${(props) => props.theme.white};
  @media ${(props) => props.theme.mobile} {
    height: 550px;
    width: 330px;
    padding: 25px 0 0 0;
    margin: 0 auto 15px auto;
  }
  @media ${(props) => props.theme.mobile1} {
    height: 570px;
    width: 330px;
    padding: 25px 0 0 0;
    margin: 0px auto 25px auto;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    height: 550px;
    width: 306px;
    padding: 25px 0 0 0;
    margin: 0px auto 15px auto;
  }
`;

export const InfoNameForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
`;

export const InfoPasswordForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
`;

export const InfoText = styled.div`
  font-size: ${(props) => props.theme.fontSize.small};
  width: 290px;
  margin: 5px 0 15px 0;
  @media ${(props) => props.theme.mobile} {
    width: 270px;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 270px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 270px;
  }
`;

export const NameText = styled.div`
  font-size: ${(props) => props.theme.fontSize.small};
  width: 290px;
  margin: 10px 0 0px 0;
  @media ${(props) => props.theme.mobile} {
    width: 270px;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 270px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 270px;
  }
`;

export const PasswordText = styled.div`
  font-size: ${(props) => props.theme.fontSize.small};
  width: 290px;
  margin: 10px 0 15px 0;
  @media ${(props) => props.theme.mobile} {
    width: 270px;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 270px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 270px;
  }
`;

export const InfoDistrict = styled.div`
  font-size: ${(props) => props.theme.fontSize.micro};
  color: ${(props) => props.theme.grey};
  width: 290px;
  text-align: right;
  margin: 0px 0 5px 0;
  cursor: pointer;
  transition: all 0.4s;
  @media ${(props) => props.theme.mobile} {
    width: 270px;
    margin: 0px 0 3px 0;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 270px;
    margin: 0px 0 3px 0;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 270px;
    margin: 0px 0 3px 0;
  }
  &:hover {
    color: ${(props) => props.theme.pink};
    font-weight: bold;
  }
`;

export const EmailInput = styled.input`
  font-size: ${(props) => props.theme.fontSize.mini};
  color: ${(props) => props.theme.grey};
  width: 290px;
  border: 2px solid ${(props) => props.theme.lightGrey};
  border-radius: 15px;
  padding: 12px;
  padding-left: 15px;
  margin: 0px 0 10px 0;
  cursor: no-drop;
  @media ${(props) => props.theme.mobile} {
    width: 270px;
    padding: 4px 0px 4px 10px;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 270px;
    padding: 9px 0px 9px 10px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 270px;
    padding: 4px 0px 4px 10px;
  }
`;

export const InfoInput = styled.input`
  font-size: ${(props) => props.theme.fontSize.mini};
  color: ${(props) => props.theme.grey};
  width: 290px;
  border: 2px solid ${(props) => props.theme.lightGrey};
  border-radius: 15px;
  padding: 12px 12px 12px 15px;
  margin-bottom: 5px;
  @media ${(props) => props.theme.mobile} {
    width: 270px;
    padding: 4px 0px 4px 10px;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 270px;
    padding: 9px 0px 9px 10px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 270px;
    padding: 4px 0px 4px 10px;
  }
`;

export const InfoNameBtn = styled.button`
  font-size: ${(props) => props.theme.fontSize.tiny};
  background-color: ${(props) => props.theme.btnGreen};
  color: ${(props) => props.theme.white};
  width: 140px;
  height: 40px;
  margin: 2px 0 20px 0;
  border: 1px solid ${(props) => props.theme.btnGreen};
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.4s;
  box-shadow: rgba(0, 0, 0, 0.3) 2px 2px;
  &:hover {
    color: ${(props) => props.theme.pink};
  }
`;

export const InfoPwBtn = styled.button`
  font-size: ${(props) => props.theme.fontSize.tiny};
  background-color: ${(props) => props.theme.btnGreen};
  color: ${(props) => props.theme.white};
  width: 140px;
  height: 40px;
  margin: 6px 0 24px 0;
  border: 1px solid ${(props) => props.theme.btnGreen};
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.4s;
  box-shadow: rgba(0, 0, 0, 0.3) 2px 2px;
  &:hover {
    color: ${(props) => props.theme.pink};
  }
`;

export const InfoErrorText = styled.div`
  font-size: ${(props) => props.theme.fontSize.micro};
  color: ${(props) => props.theme.lightGrey};
  width: 290px;
  height: 8px;
  margin: 2px 0 10px 0;
  @media ${(props) => props.theme.mobile} {
    width: 270px;
    margin: 2px 0 12px 0;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 270px;
    margin: 2px 0 12px 0;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 270px;
    margin: 2px 0 12px 0;
  }
`;

export const InfoModalBack = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
`;

export const InfoModalBox = styled.div`
  position: absolute;
  width: 320px;
  height: 150px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${(props) => props.theme.beige};
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const InfoModalText = styled.div`
  font-size: ${(props) => props.theme.fontSize.small};
  width: 290px;
  margin-top: 20px;
  text-align: center;
`;

export const InfoModalBtn = styled.button`
  background-color: ${(props) => props.theme.white};
  color: ${(props) => props.theme.btnGreen};
  border: 1px solid ${(props) => props.theme.grey};
  border-radius: 11px;
  margin: 20px;
  font-size: ${(props) => props.theme.fontSize.tiny};
  width: 80px;
  height: 30px;
  cursor: pointer;
  transition: all 0.4s;
  box-shadow: rgba(0, 0, 0, 0.3) 2px 2px;
  &:hover {
    color: ${(props) => props.theme.pink};
  }
`;

export const ChangeModalBack = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
`;

export const ChangeModalBox = styled.div`
  position: absolute;
  width: 320px;
  height: 150px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${(props) => props.theme.beige};
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const ChangeModalText = styled.div`
  font-size: ${(props) => props.theme.fontSize.small};
  width: 290px;
  margin-top: 20px;
  text-align: center;
`;

export const ChangeModalBtn = styled.button`
  background-color: ${(props) => props.theme.white};
  color: ${(props) => props.theme.btnGreen};
  border: 1px solid ${(props) => props.theme.grey};
  border-radius: 11px;
  margin: 20px;
  font-size: ${(props) => props.theme.fontSize.tiny};
  width: 80px;
  height: 30px;
  cursor: pointer;
  transition: all 0.4s;
  box-shadow: rgba(0, 0, 0, 0.3) 2px 2px;
  &:hover {
    color: ${(props) => props.theme.pink};
  }
`;

export const WitText = styled.div`
  font-size: ${(props) => props.theme.fontSize.small};
  width: 290px;
  margin-top: 20px;
  text-align: center;
`;

export const WitInfo = styled.div`
  font-size: ${(props) => props.theme.fontSize.tiny};
  color: ${(props) => props.theme.lightGrey};
  width: 290px;
  text-align: center;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.pink};
    font-weight: bold;
  }
`;

export const WitModalBack = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
`;

export const WitModalBox = styled.div`
  position: absolute;
  width: 320px;
  height: 150px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${(props) => props.theme.beige};
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const WitModalBtnBox = styled.div``;

export const WitModalBtn = styled.button`
  background-color: ${(props) => props.theme.white};
  color: ${(props) => props.theme.btnGreen};
  border: 1px solid ${(props) => props.theme.grey};
  border-radius: 11px;
  margin: 20px;
  font-size: ${(props) => props.theme.fontSize.tiny};
  width: 80px;
  height: 30px;
  cursor: pointer;
  transition: all 0.4s;
  box-shadow: rgba(0, 0, 0, 0.3) 2px 2px;
  &:hover {
    color: ${(props) => props.theme.pink};
  }
`;

export const CommonBox = styled.div`
  margin: 0 auto 0 auto;
  height: auto;
  text-align: center;
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 150px;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 200px;
  }
  @media ${(props) => props.theme.mobile} {
    width: 250px;
  }
  @media ${(props) => props.theme.tablet} {
    width: 300px;
  }
  @media ${(props) => props.theme.desktop} {
    width: 300px;
  }
  @media ${(props) => props.theme.desktop1} {
    width: 300px;
  }
  @media ${(props) => props.theme.desktop2} {
    width: 350px;
  }
`;

export const OauthHolder = styled.img`
  margin: 40px 0 0 0;
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 120px;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 150px;
  }
  @media ${(props) => props.theme.mobile} {
    width: 250px;
  }
  @media ${(props) => props.theme.tablet} {
    width: 300px;
  }
  @media ${(props) => props.theme.desktop} {
    width: 300px;
  }
  @media ${(props) => props.theme.desktop1} {
    width: 300px;
  }
  @media ${(props) => props.theme.desktop2} {
    width: 310px;
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
    width: 25px;
    height: 25px;
    right: 10px;
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
