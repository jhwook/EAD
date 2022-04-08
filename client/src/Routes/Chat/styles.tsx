import styled from 'styled-components';

export const ChattingWrapper = styled.div`
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
  height: 798px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 45px;
  margin-bottom: 5px;
  @media ${(props) => props.theme.iPhone12Pro} {
    margin-top: 20px;
  }
  @media ${(props) => props.theme.mobile1} {
    margin-top: 20px;
  }
`;

export const ChatWrapper = styled.div`
  width: 1200px;
  height: 750px;
  border: 2px solid ${(props) => props.theme.btnGreen};
  box-shadow: rgba(0, 0, 0, 0.3) 3px 3px;
  border-radius: 10px;
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 350px;
    height: 650px;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 350px;
    height: 650px;
  }
  @media ${(props) => props.theme.mobile} {
    width: 500px;
    height: 650px;
  }
  @media ${(props) => props.theme.tablet} {
    width: 700px;
    height: 650px;
  }
  @media ${(props) => props.theme.desktop} {
    width: 1000px;
    height: 720px;
  }
`;
export const ChatInfo = styled.div`
  width: 100%;
  height: 7.3%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding-left: 20px;
  padding-right: 20px;
  border-bottom: 2px solid ${(props) => props.theme.btnGreen};
  @media ${(props) => props.theme.iPhone12Pro} {
    padding-left: 10px;
  }
  @media ${(props) => props.theme.mobile1} {
    padding-left: 10px;
  }
`;

export const Nickname = styled.div`
  max-width: 100%;
  font-size: ${(props) => props.theme.fontSize.small};
  font-weight: bold;
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
    font-size: ${(props) => props.theme.fontSize.mini};
  }
`;

export const ChatMain = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;
export const Chatting = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const List = styled.ul`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  padding: 10px 20px 20px 20px;
  box-sizing: border-box;
  @media ${(props) => props.theme.iPhone12Pro} {
    padding: 5px 5px 5px 5px;
  }
  @media ${(props) => props.theme.mobile1} {
    padding: 5px 5px 5px 5px;
  }
`;

export const ChatRoomList = styled.ul`
  max-width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
  @media ${(props) => props.theme.iPhone12Pro} {
    padding: 5px;
  }
  @media ${(props) => props.theme.mobile1} {
    padding: 5px;
  }
  .focus {
    background-color: ${(props) => props.theme.btnGreen};
    color: ${(props) => props.theme.beige};
    border: 1px solid ${(props) => props.theme.beige};
  }
`;

export const RoomWrapper = styled.div`
  height: 100%;
  width: 30%;
  border-right: 2px solid ${(props) => props.theme.btnGreen};
`;

export const RoomBox = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
`;

export const Picture = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
  border-radius: 50px;
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 25px;
    height: 25px;
    margin-right: 5px;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 25px;
    height: 25px;
    margin-right: 5px;
  }
  @media ${(props) => props.theme.mobile} {
    width: 25px;
    height: 25px;
  }
  @media ${(props) => props.theme.tablet} {
    width: 30px;
    height: 30px;
  }
`;

export const ListTitle = styled.div`
  height: 7.05%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 20px;
  font-size: ${(props) => props.theme.fontSize.small};
  font-weight: bold;
  border-bottom: 2px solid ${(props) => props.theme.btnGreen};
  @media ${(props) => props.theme.iPhone12Pro} {
    font-size: ${(props) => props.theme.fontSize.tiny};
    padding-left: 10px;
  }
  @media ${(props) => props.theme.mobile1} {
    font-size: ${(props) => props.theme.fontSize.tiny};
    padding-left: 10px;
  }
  @media ${(props) => props.theme.mobile} {
    font-size: ${(props) => props.theme.fontSize.mini};
  }
  @media ${(props) => props.theme.tablet} {
    font-size: ${(props) => props.theme.fontSize.mini};
  }
`;

export const ChatForm = styled.form`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .send {
    color: ${(props) => props.theme.btnGreen};
    font-size: ${(props) => props.theme.fontSize.medium};
    font-weight: bold;
    position: absolute;
    top: 28px;
    right: 135px;
    cursor: pointer;
    transition: all 0.7s;
    &:hover {
      color: ${(props) => props.theme.pink};
    }
    @media ${(props) => props.theme.iPhone12Pro} {
      font-size: ${(props) => props.theme.fontSize.mini};
    }
    @media ${(props) => props.theme.mobile1} {
      font-size: ${(props) => props.theme.fontSize.mini};
    }
    @media ${(props) => props.theme.mobile} {
      font-size: ${(props) => props.theme.fontSize.mini};
    }
    @media ${(props) => props.theme.tablet} {
      font-size: ${(props) => props.theme.fontSize.small};
    }
  }
`;

export const MsgTextArea = styled.textarea`
  width: 550px;
  height: 40px;
  font-size: ${(props) => props.theme.fontSize.mini};
  border: 2px solid ${(props) => props.theme.btnGreen};
  box-shadow: rgba(0, 0, 0, 0.3) 3px 3px;
  border-radius: 10px;
  padding-left: 10px;
  position: relative;
  resize: none;
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 170px;
    height: 32px;
    font-size: ${(props) => props.theme.fontSize.tiny};
  }
  @media ${(props) => props.theme.mobile1} {
    width: 175px;
    height: 32px;
    font-size: ${(props) => props.theme.fontSize.tiny};
  }
  @media ${(props) => props.theme.mobile} {
    width: 250px;
    height: 35px;
  }
  @media ${(props) => props.theme.tablet} {
    width: 350px;
    height: 35px;
  }
`;

export const MsgBtn = styled.button`
  border: none;
  background-color: inherit;
  position: absolute;
  top: 0px;
  right: 20px;
  @media ${(props) => props.theme.iPhone12Pro} {
    top: -4.5px;
    right: -121px;
  }
  @media ${(props) => props.theme.mobile1} {
    top: -4.5px;
    right: -123px;
  }
  @media ${(props) => props.theme.mobile} {
    top: -4.5px;
    right: -115px;
  }
  @media ${(props) => props.theme.tablet} {
    top: -4.5px;
    right: -85px;
  }
  @media ${(props) => props.theme.desktop} {
    top: -4.5px;
    right: -75px;
  }
  @media ${(props) => props.theme.desktop1} {
    top: -2px;
    right: 0px;
  }
  @media ${(props) => props.theme.desktop2} {
    top: -2px;
    right: 0px;
  }
`;

export const BackBtn = styled.button`
  background-color: ${(props) => props.theme.beige};
  color: ${(props) => props.theme.btnGreen};
  font-size: ${(props) => props.theme.fontSize.mini};
  font-weight: bold;
  border: none;
  position: absolute;
  top: 125px;
  left: 80px;
  cursor: pointer;
  @media ${(props) => props.theme.iPhone12Pro} {
    font-size: ${(props) => props.theme.fontSize.tiny};
    top: 100px;
    left: 30px;
  }
  @media ${(props) => props.theme.mobile1} {
    font-size: ${(props) => props.theme.fontSize.tiny};
    top: 100px;
    left: 30px;
  }
  @media ${(props) => props.theme.mobile} {
    font-size: ${(props) => props.theme.fontSize.tiny};
    top: 100px;
    left: 45px;
  }
`;

export const RoomList = styled.li`
  width: 200px;
  height: 65px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: ${(props) => props.theme.fontSize.mini};
  font-weight: bold;
  border: 2px solid ${(props) => props.theme.btnGreen};
  box-shadow: rgba(0, 0, 0, 0.3) 3px 3px;
  border-radius: 10px;
  padding-left: 10px;
  margin-bottom: 5px;
  box-sizing: border-box;
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 75px;
    height: 45px;
    font-size: ${(props) => props.theme.fontSize.micro};
    padding-left: 3px;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 75px;
    height: 45px;
    font-size: ${(props) => props.theme.fontSize.micro};
    padding-left: 3px;
  }
  @media ${(props) => props.theme.mobile} {
    width: 120px;
    height: 50px;
    font-size: ${(props) => props.theme.fontSize.tiny};
  }
  @media ${(props) => props.theme.tablet} {
    width: 150px;
    height: 55px;
    font-size: ${(props) => props.theme.fontSize.tiny};
  }
`;

export const ChatListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  .me {
    flex-direction: row-reverse;
    border-radius: 5px;
  }
`;

export const ChatBox = styled.div`
  display: flex;
  .itsme {
    margin-right: 9px;
    margin-left: 5px;
    background-color: ${(props) => props.theme.btnGreen};
  }
`;

export const ChatList = styled.li`
  width: 300px;
  font-size: ${(props) => props.theme.fontSize.mini};
  font-weight: bold;
  border: 2px solid ${(props) => props.theme.btnGreen};
  box-shadow: rgba(0, 0, 0, 0.3) 3px 3px;
  border-radius: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
  display: flex;
  overflow: hidden;
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 150px;
    font-size: ${(props) => props.theme.fontSize.tiny};
  }
  @media ${(props) => props.theme.mobile1} {
    width: 150px;
    font-size: ${(props) => props.theme.fontSize.tiny};
  }
  @media ${(props) => props.theme.mobile} {
    width: 170px;
    font-size: ${(props) => props.theme.fontSize.tiny};
  }
  @media ${(props) => props.theme.tablet} {
    width: 250px;
    font-size: ${(props) => props.theme.fontSize.tiny};
  }
`;

export const DateBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 12px;
  .meyo {
    width: 47px;
    text-align: right;
    @media ${(props) => props.theme.mobile} {
      width: 100px;
    }
    @media ${(props) => props.theme.tablet} {
      width: 100px;
    }
    @media ${(props) => props.theme.desktop} {
      width: 100px;
    }
    @media ${(props) => props.theme.desktop1} {
      width: 100px;
    }
    @media ${(props) => props.theme.desktop2} {
      width: 100px;
    }
  }
`;

export const Date = styled.div`
  margin-left: 10px;
  font-size: ${(props) => props.theme.fontSize.micro};
  color: ${(props) => props.theme.grey};
  @media ${(props) => props.theme.iPhone12Pro} {
    margin-left: 5px;
    font-size: ${(props) => props.theme.fontSize.quark};
  }
  @media ${(props) => props.theme.mobile1} {
    margin-left: 5px;
    font-size: ${(props) => props.theme.fontSize.quark};
  }
  @media ${(props) => props.theme.mobile} {
    font-size: ${(props) => props.theme.fontSize.atom};
  }
`;

export const MsgBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 15px;
  word-break: break-all;
  @media ${(props) => props.theme.iPhone12Pro} {
    padding: 5px;
  }
  @media ${(props) => props.theme.mobile1} {
    padding: 5px;
  }
`;

export const ExitRoomBtn = styled.div`
  font-size: ${(props) => props.theme.fontSize.tiny};
  font-weight: bold;
  cursor: pointer;
  transition: all 0.7s;
  &:hover {
    color: ${(props) => props.theme.pink};
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    font-size: ${(props) => props.theme.fontSize.atom};
  }
  @media ${(props) => props.theme.mobile1} {
    font-size: ${(props) => props.theme.fontSize.atom};
  }
  @media ${(props) => props.theme.mobile} {
    font-size: ${(props) => props.theme.fontSize.dust};
  }
`;

export const ExitRoomText = styled.div``;

export const RoomTitle = styled.div`
  word-break: break-all;
  @media ${(props) => props.theme.iPhone12Pro} {
    font-size: ${(props) => props.theme.fontSize.quark};
  }
  @media ${(props) => props.theme.mobile1} {
    font-size: ${(props) => props.theme.fontSize.quark};
  }
  @media ${(props) => props.theme.mobile} {
    font-size: ${(props) => props.theme.fontSize.dust};
  }
`;

export const ExitModalWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -50px;
`;

export const ExitModal = styled.div`
  width: 150px;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.beige};
  border: 2px solid ${(props) => props.theme.btnGreen};
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.3) 2px 2px;
  z-index: 5;
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 150px;
    height: 80px;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 150px;
    height: 80px;
  }
  @media ${(props) => props.theme.mobile} {
    width: 150px;
    height: 80px;
  }
  @media ${(props) => props.theme.tablet} {
    width: 200px;
    height: 90px;
  }
  @media ${(props) => props.theme.desktop} {
    width: 200px;
    height: 90px;
  }
  @media ${(props) => props.theme.desktop1} {
    width: 200px;
    height: 90px;
  }
  @media ${(props) => props.theme.desktop2} {
    width: 200px;
    height: 90px;
  }
`;

export const UpBox = styled.div`
  font-size: ${(props) => props.theme.fontSize.micro};
  @media ${(props) => props.theme.iPhone12Pro} {
    font-size: ${(props) => props.theme.fontSize.micro};
  }
  @media ${(props) => props.theme.mobile1} {
    font-size: ${(props) => props.theme.fontSize.micro};
  }
  @media ${(props) => props.theme.mobile} {
    font-size: ${(props) => props.theme.fontSize.micro};
  }
  @media ${(props) => props.theme.tablet} {
    font-size: ${(props) => props.theme.fontSize.micro};
  }
  @media ${(props) => props.theme.desktop} {
    font-size: ${(props) => props.theme.fontSize.tiny};
  }
  @media ${(props) => props.theme.desktop1} {
    font-size: ${(props) => props.theme.fontSize.tiny};
  }
  @media ${(props) => props.theme.desktop2} {
    font-size: ${(props) => props.theme.fontSize.tiny};
  }
`;

export const DownBox = styled.div`
  display: flex;
  font-size: ${(props) => props.theme.fontSize.dust};
  @media ${(props) => props.theme.iPhone12Pro} {
    font-size: ${(props) => props.theme.fontSize.dust};
  }
  @media ${(props) => props.theme.mobile1} {
    font-size: ${(props) => props.theme.fontSize.dust};
  }
  @media ${(props) => props.theme.mobile} {
    font-size: ${(props) => props.theme.fontSize.dust};
  }
  @media ${(props) => props.theme.tablet} {
    font-size: ${(props) => props.theme.fontSize.dust};
  }
  @media ${(props) => props.theme.desktop} {
    font-size: ${(props) => props.theme.fontSize.micro};
  }
  @media ${(props) => props.theme.desktop1} {
    font-size: ${(props) => props.theme.fontSize.micro};
  }
  @media ${(props) => props.theme.desktop2} {
    font-size: ${(props) => props.theme.fontSize.micro};
  }
`;

export const ExitTitle = styled.div`
  margin-bottom: 10px;
`;

export const ExitBtn = styled.div`
  border: 2px solid ${(props) => props.theme.btnGreen};
  padding: 3px;
  margin: 2px;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.3) 1px 1px;
  transition: all 0.7s;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.btnGreen};
  }
`;
