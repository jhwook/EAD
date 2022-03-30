import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router';
import { FiSend } from 'react-icons/fi';
import Nav from 'Components/Nav';
import Footer from 'Components/Footer';
import logo from '../Image/Logo/1.png';

const ENDPOINT = 'http://localhost:4000';
const socket = io(ENDPOINT);

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
`;

const PostWrapper = styled.div`
  width: 600px;
  height: 750px;
  border: 2px dotted red;
  margin-left: 50px;
  border: 2px solid ${(props) => props.theme.btnGreen};
  box-shadow: rgba(0, 0, 0, 0.3) 3px 3px;
  border-radius: 10px;
`;

const ChatWrapper = styled.div`
  width: 40%;
  border: 2px solid ${(props) => props.theme.btnGreen};
  box-shadow: rgba(0, 0, 0, 0.3) 3px 3px;
  border-radius: 10px;
`;
const ChatInfo = styled.div`
  width: 100%;
  height: 7.3%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  padding-left: 20px;
  border-bottom: 2px solid ${(props) => props.theme.btnGreen};
`;

const Nickname = styled.div`
  max-width: 100%;
  font-size: ${(props) => props.theme.fontSize.small};
  font-weight: bold;
`;

const ChatMain = styled.div`
  width: 100%;
  height: 70vh;
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
  padding: 10px 30px 30px 30px;
  box-sizing: border-box;
`;

const ChatRoomList = styled.ul`
  max-width: 100%;
  height: 93%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
`;

const RoomWrapper = styled.div`
  height: 100%;
  width: 30%;
  border-right: 2px solid ${(props) => props.theme.btnGreen};
`;

const RoomBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Picture = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;

const ListTitle = styled.div`
  height: 7%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 20px;
  font-size: ${(props) => props.theme.fontSize.mini};
  font-weight: bold;
  border-bottom: 2px solid ${(props) => props.theme.btnGreen};
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
  width: 450px;
  height: 40px;
  font-size: ${(props) => props.theme.fontSize.mini};
  border: 2px solid ${(props) => props.theme.btnGreen};
  box-shadow: rgba(0, 0, 0, 0.3) 3px 3px;
  border-radius: 10px;
  padding-left: 10px;
`;

const MsgBtn = styled.button`
  border: none;
  background-color: inherit;
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
`;

const RoomList = styled.li`
  width: 150px;
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
`;
const ChatList = styled.li`
  width: 300px;
  height: 50px;
  font-size: ${(props) => props.theme.fontSize.mini};
  font-weight: bold;
  border: 2px solid ${(props) => props.theme.btnGreen};
  box-shadow: rgba(0, 0, 0, 0.3) 3px 3px;
  border-radius: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
`;

const MsgBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 15px;
`;

function Join() {
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<string[]>([
    'sdfdsfsdfsdf',
    'sdffdgdfg',
    'sdfgdfgfdg',
    'sdfgfdg',
  ]);
  const [roomList, setRoomList] = useState<string[]>([
    '김대윤',
    '전현욱',
    '윤의빈',
  ]);
  const navigate = useNavigate();

  const onMessageChange = (e: React.FormEvent<HTMLInputElement>) => {
    setMessage(e.currentTarget.value);
  };

  const onMessageClick = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    socket.emit('new_message', message, room, () => {
      setChat([...chat, `You: ${message}`]);
    });
    setMessage('');
  };

  const goBackOnClick = () => {
    navigate('/post');
  };

  useEffect(() => {
    socket.on('enter_room', (username, done) => {
      setRoom(username);
      done();
    });

    socket.on('welcome', (user) => {
      setChat([...chat, `${user} joined!`]);
    });

    socket.on('bye', (user) => {
      setChat([...chat, `${user} left :(`]);
    });

    socket.on('new_message', (msg: string) => {
      setChat([...chat, msg]);
    });

    socket.on('room_change', (rooms: string[]) => {
      setRoomList([...rooms]);
    });
  }, [chat]);

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
                  {roomList.map((el: string) => (
                    <RoomList key={nanoid()}>
                      <RoomBox>
                        <Picture src={logo} />
                        {el}
                      </RoomBox>
                    </RoomList>
                  ))}
                </ChatRoomList>
              </RoomWrapper>
              <Chatting>
                <ChatInfo>
                  <Nickname>{`${room}Viktor`}</Nickname>
                </ChatInfo>
                <List>
                  {chat.map((el: string) => (
                    <ChatList key={nanoid()}>
                      <MsgBox>
                        <Picture src={logo} />
                        {el}
                      </MsgBox>
                    </ChatList>
                  ))}
                </List>
                <ChatForm>
                  <MsgInput
                    placeholder="메세지를 입력해주세요."
                    value={message}
                    onChange={onMessageChange}
                  />
                  <MsgBtn type="submit" onClick={onMessageClick}>
                    <FiSend className="send" />
                  </MsgBtn>
                </ChatForm>
              </Chatting>
            </ChatMain>
          </ChatWrapper>
          <PostWrapper />
        </Wrapper>
      </ChattingWrapper>
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </>
  );
}

export default Join;

// 실시간 채팅 해결해야할 부분

// 1. 지금은 브라우저간 구별이였는데, 유저별 구별 어떻게? => socketId?
// 2. 유저별 구별되면 유저 닉네임과 방제목은 상대방 이름으로 고정 => 리덕스로 해결
// 3. 채팅창끼리 옮겨가는거 리스트 온클릭하면 enter_room하게 해서 이동??
// 4. 옮기는건 어려우니까 그냥 누르면 1대1 채팅방처럼 만들어야 할듯 => 버튼 누르면 채팅창
// 5. 새로고침하면 다 풀리는거 어떻게 고정하지??? => localstorage 등 생각해보기
