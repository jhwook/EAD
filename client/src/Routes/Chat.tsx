// import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
// import io from 'socket.io-client';
// import { nanoid } from 'nanoid';

// const ENDPOINT = 'http://localhost:4000';
// const socket = io(ENDPOINT);

// const Box = styled.div``;

// const ChatWrapper = styled.div``;
// const ChatInfo = styled.div`
//   display: flex;
//   justify-content: space-evenly;
// `;
// const ChatMain = styled.div`
//   width: 100%;
//   height: 70vh;
//   margin-top: 100px;
//   display: flex;
// `;
// const Chatting = styled.div`
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-end;
//   align-items: center;
// `;

// const List = styled.ul`
//   width: 100%;
//   display: flex;
//   flex-direction: column;
// `;

// const ChatRoomList = styled.ul`
//   width: 30%;
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   padding-left: 0;
// `;

// const ChatForm = styled.form`
//   width: 50%;
//   display: flex;
//   flex-direction: column;
// `;

function Join() {
  //   const [room, setRoom] = useState('');
  //   const [message, setMessage] = useState('');
  //   const [chat, setChat] = useState<string[]>([]);
  //   const [roomList, setRoomList] = useState<string[]>([]);

  //   const onMessageChange = (e: React.FormEvent<HTMLInputElement>) => {
  //     setMessage(e.currentTarget.value);
  //   };

  //   const onMessageClick = (e: React.FormEvent<HTMLButtonElement>) => {
  //     e.preventDefault();
  //     socket.emit('new_message', message, room, () => {
  //       setChat([...chat, `You: ${message}`]);
  //     });
  //     setMessage('');
  //   };

  //   useEffect(() => {
  //     socket.on('enter_room', (username, done) => {
  //       setRoom(username);
  //       done();
  //     });

  //     socket.on('welcome', (user) => {
  //       setChat([...chat, `${user} joined!`]);
  //     });

  //     socket.on('bye', (user) => {
  //       setChat([...chat, `${user} left :(`]);
  //     });

  //     socket.on('new_message', (msg: string) => {
  //       setChat([...chat, msg]);
  //     });

  //     socket.on('room_change', (rooms: string[]) => {
  //       setRoomList([...rooms]);
  //     });
  //   }, [chat]);

  return null;
  //     <Box>
  //       <ChatWrapper>
  //         <ChatInfo>
  //           <div>{`${room}`}</div>
  //         </ChatInfo>
  //         <div>목록으로 돌아가기</div>
  //         <ChatMain>
  //           <ChatRoomList>
  //             {roomList.map((el: string) => (
  //               <li key={nanoid()}>{el}</li>
  //             ))}
  //           </ChatRoomList>
  //           <Chatting>
  //             <List>
  //               {chat.map((el: string) => (
  //                 <li key={nanoid()}>{el}</li>
  //               ))}
  //             </List>
  //             <ChatForm>
  //               <input
  //                 placeholder="Write a msg"
  //                 value={message}
  //                 onChange={onMessageChange}
  //               />
  //               <button type="submit" onClick={onMessageClick}>
  //                 Send
  //               </button>
  //             </ChatForm>
  //           </Chatting>
  //         </ChatMain>
  //       </ChatWrapper>
  //     </Box>
  //   );
}

export default Join;

// 실시간 채팅 해결해야할 부분

// 1. 지금은 브라우저간 구별이였는데, 유저별 구별 어떻게? => socketId?
// 2. 유저별 구별되면 유저 닉네임과 방제목은 상대방 이름으로 고정 => 리덕스로 해결
// 3. 채팅창끼리 옮겨가는거 리스트 온클릭하면 enter_room하게 해서 이동??
// 4. 옮기는건 어려우니까 그냥 누르면 1대1 채팅방처럼 만들어야 할듯 => 버튼 누르면 채팅창
// 5. 새로고침하면 다 풀리는거 어떻게 고정하지??? => localstorage 등 생각해보기
