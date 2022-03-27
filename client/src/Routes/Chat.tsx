import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';
import { nanoid } from 'nanoid';

const ENDPOINT = 'http://localhost:4000';
const socket = io(ENDPOINT);

const Box = styled.div``;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ChatWrapper = styled.div``;
const ChatInfo = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
const ChatMain = styled.div`
  width: 100%;
  height: 70vh;
  margin-top: 100px;
  display: flex;
`;
const Chatting = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`;

const List = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ChatRoomList = styled.ul`
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 0;
`;
const NicknameForm = styled.form``;
const RoomnameForm = styled.form``;
const ChatForm = styled.form`
  width: 50%;
  display: flex;
  flex-direction: column;
`;

function Join() {
  const [open, setOpen] = useState(true);
  const [nickname, setNickname] = useState('');
  const [room, setRoom] = useState('');
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [roomList, setRoomList] = useState([]);

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setNickname(e.currentTarget.value);
  };

  const onRoomChange = (e: React.FormEvent<HTMLInputElement>) => {
    setRoom(e.currentTarget.value);
  };

  const onMessageChange = (e: React.FormEvent<HTMLInputElement>) => {
    setMessage(e.currentTarget.value);
  };

  const onClick = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    socket.emit('nickname', nickname);
  };

  const onRoomClick = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    socket.emit('enter_room', room, (num: number) => {
      setOpen(false);
      setCount(num);
    });
  };

  const onMessageClick = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    socket.emit('new_message', message, room, () => {
      setChat([...chat, `You: ${message}`]);
    });
    setMessage('');
  };

  useEffect(() => {
    socket.on('welcome', (user, newCount) => {
      setChat([...chat, `${user} joined!`]);
      setCount(newCount);
    });

    socket.on('bye', (user, newCount) => {
      setChat([...chat, `${user} left :(`]);
      setCount(newCount);
    });

    socket.on('new_message', (msg: string) => {
      setChat([...chat, msg]);
    });

    socket.on('room_change', (rooms) => {
      setRoomList([...rooms]);
    });
  }, [chat]);

  return (
    <Box>
      {open ? (
        <Wrapper>
          <NicknameForm>
            <input
              placeholder="Choose Nickname"
              value={nickname}
              onChange={onChange}
            />
            <button type="submit" onClick={onClick}>
              Save
            </button>
          </NicknameForm>
          <RoomnameForm>
            <input
              placeholder="Room name"
              value={room}
              onChange={onRoomChange}
            />
            <button type="submit" onClick={onRoomClick}>
              Save
            </button>
          </RoomnameForm>
        </Wrapper>
      ) : (
        <ChatWrapper>
          <ChatInfo>
            <div>{`Nickname: ${nickname}`}</div>
            <div>{`Room: ${room}`}</div>
            <div>{`인원: (${count})`}</div>
          </ChatInfo>
          <div>목록으로 돌아가기</div>
          <ChatMain>
            <ChatRoomList>
              {roomList.map((el) => (
                <li key={nanoid()}>{el}</li>
              ))}
            </ChatRoomList>
            <Chatting>
              <List>
                {chat.map((el) => (
                  <li key={nanoid()}>{el}</li>
                ))}
              </List>
              <ChatForm>
                <input
                  placeholder="Write a msg"
                  value={message}
                  onChange={onMessageChange}
                />
                <button type="submit" onClick={onMessageClick}>
                  Send
                </button>
              </ChatForm>
            </Chatting>
          </ChatMain>
        </ChatWrapper>
      )}
    </Box>
  );
}

export default Join;

// 실시간 채팅 해결해야할 부분

// 1. 지금은 브라우저간 구별이였는데, 유저별 구별 어떻게?
// 2. 유저별 구별되면 유저 닉네임과 방제목은 상대방 이름으로 고정
// 3. 채팅창끼리 옮겨가는거 리스트 온클릭하면 enter_room하게 해서 이동??
// 4. 옮기는건 어려우니까 그냥 누르면 1대1 채팅방처럼 만들어야 할듯 => 버튼 누르면 채팅창
// 5. 새로고침하면 다 풀리는거 어떻게 고정하지???
