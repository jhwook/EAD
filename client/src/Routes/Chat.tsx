import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';
import Scrollbars from 'react-custom-scrollbars';
import { nanoid } from 'nanoid';
import { useMatch, useNavigate, useParams } from 'react-router';
import { FiSend } from 'react-icons/fi';
import useSWR from 'swr';
import Nav from 'Components/Nav';
import Footer from 'Components/Footer';
import { useSelector } from 'react-redux';
import { RootState } from 'index';
import fetcher from '../utils/fetcher';
import logo from '../Image/Logo/1.svg';

const socket = io(`${process.env.REACT_APP_SERVER}`);

const ChattingWrapper = styled.div`
  height: auto;
  min-height: 100%;
  padding-bottom: 150px;
  @media ${(props) => props.theme.mobile} {
    height: auto;
    min-height: 100%;
    padding-bottom: 200px;
  }
`;

const FooterWrapper = styled.div`
  height: 150px;
  position: relative;
  margin-top: -150px;
  @media ${(props) => props.theme.mobile} {
    height: 200px;
    position: relative;
    margin-top: -200px;
  }
`;

const Wrapper = styled.div`
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

const ChatWrapper = styled.div`
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
const ChatInfo = styled.div`
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

const Nickname = styled.div`
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

const ChatMain = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;
const Chatting = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const List = styled.ul`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  padding: 10px 20px 20px 20px;
  box-sizing: border-box;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    padding: 5px 5px 5px 5px;
  }
  @media ${(props) => props.theme.mobile1} {
    padding: 5px 5px 5px 5px;
  }
`;

const ChatRoomList = styled.ul`
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

const RoomWrapper = styled.div`
  height: 100%;
  width: 30%;
  border-right: 2px solid ${(props) => props.theme.btnGreen};
`;

const RoomBox = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
`;

const Picture = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
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
    width: 35px;
    height: 35px;
  }
  @media ${(props) => props.theme.tablet} {
    width: 35px;
    height: 35px;
  }
`;

const ListTitle = styled.div`
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

const ChatForm = styled.form`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .send {
    color: ${(props) => props.theme.btnGreen};
    font-size: ${(props) => props.theme.fontSize.small};
    font-weight: bold;
    position: absolute;
    top: 28px;
    right: 135px;
    cursor: pointer;
  }
`;

const MsgInput = styled.input`
  width: 550px;
  height: 40px;
  font-size: ${(props) => props.theme.fontSize.mini};
  border: 2px solid ${(props) => props.theme.btnGreen};
  box-shadow: rgba(0, 0, 0, 0.3) 3px 3px;
  border-radius: 10px;
  padding-left: 10px;
  position: relative;
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 200px;
    height: 32px;
    font-size: ${(props) => props.theme.fontSize.tiny};
  }
  @media ${(props) => props.theme.mobile1} {
    width: 200px;
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

const MsgBtn = styled.button`
  border: none;
  background-color: inherit;
  position: absolute;
  top: 0px;
  right: 20px;
  @media ${(props) => props.theme.iPhone12Pro} {
    top: -6px;
    right: -100px;
  }
  @media ${(props) => props.theme.mobile1} {
    top: -6px;
    right: -100px;
  }
  @media ${(props) => props.theme.mobile} {
    top: -6px;
    right: -70px;
  }
  @media ${(props) => props.theme.tablet} {
    top: -5px;
    right: -30px;
  }
  @media ${(props) => props.theme.desktop} {
    top: -2px;
    right: -5px;
  }
  @media ${(props) => props.theme.desktop1} {
    top: 0px;
    right: 70px;
  }
  @media ${(props) => props.theme.desktop2} {
    top: 0px;
    right: 70px;
  }
`;

const BackBtn = styled.button`
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

const RoomList = styled.li`
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
    height: 55px;
    font-size: ${(props) => props.theme.fontSize.tiny};
  }
  @media ${(props) => props.theme.tablet} {
    width: 150px;
    height: 55px;
    font-size: ${(props) => props.theme.fontSize.tiny};
  }
`;

const ChatListWrapper = styled.div`
  display: flex;
`;

const ChatList = styled.li`
  width: 300px;
  max-height: 50px;
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

const DateBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 12px;
`;

const Date = styled.div`
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

const MsgBox = styled.div`
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

const ExitRoomBtn = styled.div`
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

const ExitRoomText = styled.div``;

const RoomTitle = styled.div``;

function Chat() {
  const [room, setRoom] = useState<string | undefined>('');
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<string[]>([]);
  const [index, setIndex] = useState<number>();
  const [roomList, setRoomList] = useState<string[]>([
    '김대윤',
    '전현욱',
    '윤의빈',
    '블리츠',
    '진',
    '나미',
  ]);
  const scrollRef = useRef<Scrollbars>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { username } = useParams<{ username: string }>();
  const { userData } = useSelector((state: RootState) => state);
  // const { data: roomList, mutate: mutateRoom } = useSWR<~~ | false>(
  //   userData ? `${process.env.REACT_APP_SERVER}/~~/${userInfo.id}` : null,
  //   fetcher,
  // );
  // const { data: chat, mutate: mutateChat } = useSWR<~~| false>(
  //   userData ? `${process.env.REACT_APP_SERVER}/~~/${userInfo.id}` : null,
  //   fetcher,
  // );

  const onMessageChange = (e: React.FormEvent<HTMLInputElement>) => {
    setMessage(e.currentTarget.value);
  };

  const onMessageClick = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    socket.emit('new_message', message, room, () => {
      setChat([...chat, `You: ${message}`]);
    });
    scrollRef.current?.scrollToBottom();
    setMessage('');
  };

  const goBackOnClick = () => {
    navigate('/search');
  };

  useEffect(() => {
    socket.on('welcome', (user) => {
      setChat([...chat, `${user} joined!`]);
    });

    socket.on('bye', (user) => {
      setChat([...chat, `${user} left :(`]);
    });

    socket.on('new_message', (msg: string) => {
      setChat([...chat, msg]);
    });
  }, [chat]);

  const onClickChatRoom = (username: string, id: number) => {
    socket.emit('enter_room', username);
    setRoom(username);
    setIndex(id);
    navigate(`/chat/${username}`);
  };

  const exitRoom = () => {
    socket.emit('bye', room);
    navigate(`/chat`);
  };

  return (
    <>
      <Nav />
      <ChattingWrapper>
        <Wrapper>
          <BackBtn onClick={goBackOnClick}>{`< 목록으로 돌아가기`}</BackBtn>
          <ChatWrapper>
            <ChatMain>
              <RoomWrapper>
                <ListTitle>채팅목록</ListTitle>
                <ChatRoomList>
                  {roomList.map((el: string, i) => (
                    <RoomList
                      // eslint-disable-next-line react/no-array-index-key
                      key={i}
                      className={index === i ? 'focus' : ''}
                      onClick={() => onClickChatRoom(el, i)}
                    >
                      <RoomBox>
                        <Picture src={logo} />
                        <RoomTitle>{el}</RoomTitle>
                      </RoomBox>
                    </RoomList>
                  ))}
                </ChatRoomList>
              </RoomWrapper>
              <Chatting>
                <ChatInfo>
                  <Nickname>{`${room}`}</Nickname>
                  <ExitRoomBtn onClick={exitRoom}>
                    <ExitRoomText>방 나가기</ExitRoomText>
                  </ExitRoomBtn>
                </ChatInfo>
                <List>
                  <Scrollbars autoHide ref={scrollRef}>
                    {chat.map((el: string) => (
                      <ChatListWrapper key={nanoid()}>
                        <Picture src={logo} />
                        <ChatList>
                          <MsgBox>{el}</MsgBox>
                        </ChatList>
                        <DateBox>
                          <Date key={nanoid()}>오후 10시 31분</Date>
                        </DateBox>
                      </ChatListWrapper>
                    ))}
                  </Scrollbars>
                </List>
                <ChatForm>
                  <MsgInput
                    placeholder="메세지를 입력해주세요."
                    value={message}
                    onChange={onMessageChange}
                    ref={inputRef}
                  />
                  <MsgBtn type="submit" onClick={onMessageClick}>
                    <FiSend className="send" />
                  </MsgBtn>
                </ChatForm>
              </Chatting>
            </ChatMain>
          </ChatWrapper>
        </Wrapper>
      </ChattingWrapper>
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </>
  );
}

export default Chat;
