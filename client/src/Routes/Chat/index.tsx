import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import Scrollbars from 'react-custom-scrollbars';
import { nanoid } from 'nanoid';
import { useMatch, useNavigate, useParams } from 'react-router';
import { FiSend } from 'react-icons/fi';
import useSWR, { useSWRConfig } from 'swr';
import Nav from 'Components/Nav';
import Footer from 'Components/Footer';
import { useSelector } from 'react-redux';
import { RootState } from 'index';
import { FooterWrapper } from 'Routes/Home/styles';
import axios from 'axios';
import fetcher from '../../utils/fetcher';
import {
  BackBtn,
  ChatBox,
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

interface IRoomList {
  id: string;
  roomName: string;
  image: string;
}

interface IChattings {
  content: string;
  createdAt: string;
  room_id: string;
  updatedAt: string;
  userImg: string;
  user: string;
  __v: number;
  _id: string;
}

interface IChatList {
  chatting: string[];
  chattings: IChattings[];
  createdAt: string;
  updatedAt: string;
  users: string[];
  _v: number;
  _id: string;
}

function Chat() {
  const [room, setRoom] = useState<string | undefined>('');
  const [message, setMessage] = useState('');
  const [index, setIndex] = useState<number>();
  const scrollRef = useRef<Scrollbars>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { username, roomId } =
    useParams<{ username: string; roomId: string }>();
  const { userData } = useSelector((state: RootState) => state);
  const { mutate } = useSWRConfig();
  const { data: roomList, mutate: mutateRoom } = useSWR<
    IRoomList[] | undefined
  >(
    userData
      ? `${process.env.REACT_APP_SERVER}/chats/room-list/6236ccf67859b50174765244`
      : null,
    fetcher,
  );
  console.log('roomList :', roomList);

  const { data: chat, mutate: mutateChat } = useSWR<IChatList | undefined>(
    userData && roomId
      ? `${process.env.REACT_APP_SERVER}/chats/rooms/${roomId}`
      : null,
    fetcher,
  );
  console.log('chat :', chat);

  const onMessageChange = (e: React.FormEvent<HTMLInputElement>) => {
    setMessage(e.currentTarget.value);
  };

  const onMessageClick = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    socket.emit(
      'new_message',
      message,
      room,
      roomId,
      userData.userInfo.username,
      () => {
        mutate(`${process.env.REACT_APP_SERVER}/chats/rooms/${roomId}`);
      },
    );
    scrollRef.current?.scrollToBottom();
    setMessage('');
  };

  const goBackOnClick = () => {
    navigate('/search');
  };

  useEffect(() => {
    socket.on('welcome', (user) => {
      // setChat([...chat, `${user} joined!`]);
      axios
        .post('', { message: `${user} joined!` }, { withCredentials: true })
        .then(() => {
          mutateChat();
        })
        .catch((err) => {
          console.log(err);
        });
    });

    socket.on('bye', (user) => {
      // setChat([...chat, `${user} left :(`]);
      axios
        .post('', { message: `${user} left :(` }, { withCredentials: true })
        .then(() => {
          mutateChat();
        })
        .catch((err) => {
          console.log(err);
        });
    });

    socket.on('new_message', (msg: string) => {
      // setChat([...chat, msg]);
      axios
        .post('', { message: msg }, { withCredentials: true })
        .then(() => {
          mutateChat();
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }, [chat]);

  const onClickChatRoom = (username: string, i: number, id: string) => {
    socket.emit('enter_room', username);
    setRoom(username);
    setIndex(i);
    navigate(`/chat/${id}/${username}`);
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
                  {roomList?.map((el: IRoomList, i: number) => (
                    <RoomList
                      // eslint-disable-next-line react/no-array-index-key
                      key={i}
                      className={index === i ? 'focus' : ''}
                      onClick={() => onClickChatRoom(el.roomName, i, el.id)}
                    >
                      <RoomBox>
                        <Picture src={el.image} />
                        <RoomTitle>{el.roomName}</RoomTitle>
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
                    <ChatListWrapper>
                      {chat?.chattings.map((el: IChattings) => (
                        <ChatBox key={nanoid()}>
                          <Picture src={el.userImg} />
                          <ChatList>
                            <MsgBox>{el.content}</MsgBox>
                          </ChatList>
                          <DateBox>
                            <Date>{el.createdAt}</Date>
                          </DateBox>
                        </ChatBox>
                      ))}
                    </ChatListWrapper>
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
