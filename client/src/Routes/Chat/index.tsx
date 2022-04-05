import React, { useEffect, useRef, useState } from 'react';
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
import { FooterWrapper } from 'Routes/Home/styles';
import fetcher from '../../utils/fetcher';
import logo from '../../Image/Logo/1.svg';
import {
  BackBtn,
  ChatForm,
  ChatInfo,
  ChatList,
  ChatListWrapper,
  ChatMain,
  ChatRoomList,
  Chatting,
  ChattingWrapper,
  ChatWrapper,
  Date,
  DateBox,
  ExitRoomBtn,
  ExitRoomText,
  List,
  ListTitle,
  MsgBox,
  MsgBtn,
  MsgInput,
  Nickname,
  Picture,
  RoomBox,
  RoomList,
  RoomTitle,
  RoomWrapper,
  Wrapper,
} from './styles';

const socket = io(`${process.env.REACT_APP_SERVER}`);

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
