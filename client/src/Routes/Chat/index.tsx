import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import Scrollbars from 'react-custom-scrollbars';
import { nanoid } from 'nanoid';
import { useNavigate, useParams } from 'react-router';
import { FiSend } from 'react-icons/fi';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import useSWR, { useSWRConfig } from 'swr';
import autosize from 'autosize';
import Nav from 'Components/Nav';
import Footer from 'Components/Footer';
import { useSelector } from 'react-redux';
import { RootState } from 'index';
import { FooterWrapper } from 'Routes/Home/styles';
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
  DownBox,
  ExitBtn,
  ExitModal,
  ExitModalWrapper,
  ExitRoomBtn,
  ExitRoomText,
  ExitTitle,
  List,
  ListTitle,
  MsgBox,
  MsgBtn,
  MsgTextArea,
  Nickname,
  Picture,
  RoomBox,
  RoomList,
  RoomTitle,
  RoomWrapper,
  UpBox,
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
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState<number>();
  const scrollRef = useRef<Scrollbars>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();
  dayjs.locale('ko');
  const { username, roomId } =
    useParams<{ username: string; roomId: string }>();
  const { userData } = useSelector((state: RootState) => state);
  const { mutate } = useSWRConfig();
  const { data: roomList } = useSWR<IRoomList[] | undefined>(
    userData
      ? `${process.env.REACT_APP_SERVER}/chats/room-list/${userData.userInfo.id}`
      : null,
    fetcher,
    { refreshInterval: 1000 },
  );

  const { data: chat } = useSWR<IChatList | undefined>(
    userData && roomId
      ? `${process.env.REACT_APP_SERVER}/chats/rooms/${roomId}`
      : null,
    fetcher,
    { refreshInterval: 1 },
  );

  const onMessageChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setMessage(e.currentTarget.value);
  };

  useEffect(() => {
    if (textAreaRef.current) {
      autosize(textAreaRef.current);
    }
  }, []);

  const onKeydownChat = (e: any) => {
    if (e.key === 'Enter') {
      if (!e.shiftKey) {
        e.preventDefault();
        onMessageClick(e);
      }
    }
  };

  useEffect(() => {
    if (username && roomId) {
      socket.emit('enter_room', username, () => {
        mutate(
          `${process.env.REACT_APP_SERVER}/chats/room-list/${userData.userInfo.id}`,
        );
      });
      setRoom(username);
    }
  }, [username, roomId]);

  useEffect(() => {
    if (chat?.chattings) {
      scrollRef.current?.scrollToBottom();
    }
  }, [chat]);

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
        scrollRef.current?.scrollToBottom();
      },
    );
    setMessage('');
  };

  const goBackOnClick = () => {
    navigate(`/search`);
  };

  useEffect(() => {
    socket.on('new_message', () => {
      mutate(`${process.env.REACT_APP_SERVER}/chats/rooms/${roomId}`);
    });
  }, [chat]);

  const onClickChatRoom = (username: string, i: number, id: string) => {
    socket.emit('enter_room', username, () => {
      // mutate(
      //   `${process.env.REACT_APP_SERVER}/chats/room-list/${userData.userInfo.id}`,
      // );
    });
    setRoom(username);
    setIndex(i);
    navigate(`/chat/${id}/${username}`);
  };

  const exitRoom = () => {
    socket.emit('bye', room, roomId, userData.userInfo.id, () => {
      mutate(
        `${process.env.REACT_APP_SERVER}/chats/room-list/${userData.userInfo.id}`,
      );
      setRoom('');
    });
    setOpen(!open);
    navigate(`/chat`);
  };

  const exitOnClick = () => {
    setOpen(!open);
  };

  const reverseChat = chat?.chattings.flat().reverse();

  return (
    <>
      <Nav />
      {open ? (
        <ExitModalWrapper>
          <ExitModal>
            <UpBox>
              <ExitTitle>정말로 나가시겠습니까?</ExitTitle>
            </UpBox>
            <DownBox>
              <ExitBtn onClick={exitRoom}>네, 나갈래요.</ExitBtn>
              <ExitBtn onClick={exitOnClick}>아니요</ExitBtn>
            </DownBox>
          </ExitModal>
        </ExitModalWrapper>
      ) : null}
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
                      className={
                        index === i || el.roomName === username ? 'focus' : ''
                      }
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
                  <ExitRoomBtn onClick={exitOnClick}>
                    <ExitRoomText>방 나가기</ExitRoomText>
                  </ExitRoomBtn>
                </ChatInfo>
                <List>
                  <Scrollbars autoHide ref={scrollRef}>
                    <ChatListWrapper>
                      {reverseChat?.map((el: IChattings) => (
                        <ChatBox
                          key={nanoid()}
                          className={
                            el.user === userData.userInfo.username ? 'me' : ''
                          }
                        >
                          <Picture src={el.userImg} />
                          <ChatList
                            key={nanoid()}
                            className={
                              el.user === userData.userInfo.username
                                ? 'itsme'
                                : ''
                            }
                          >
                            <MsgBox
                              className={
                                el.user === userData.userInfo.username
                                  ? 'itsmeyo'
                                  : ''
                              }
                            >{`${el.user}: ${el.content}`}</MsgBox>
                          </ChatList>
                          <DateBox>
                            <Date
                              className={
                                el.user === userData.userInfo.username
                                  ? 'meyo'
                                  : ''
                              }
                            >
                              {dayjs(el.createdAt).format('MM. DD HH:mm')}
                            </Date>
                          </DateBox>
                        </ChatBox>
                      ))}
                    </ChatListWrapper>
                  </Scrollbars>
                </List>
                <ChatForm>
                  <MsgTextArea
                    placeholder="메세지를 입력해주세요."
                    value={message}
                    onChange={onMessageChange}
                    onKeyPress={onKeydownChat}
                    ref={textAreaRef}
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
