import { Routes, Route } from 'react-router-dom';
import Home from 'Routes/Home';
import Login from 'Routes/Login';
import Signup from 'Routes/Signup';
import Profile from 'Routes/Profile';
import Mypost from 'Routes/Mypost';
import Mycomment from 'Routes/Mycomment';
import Search from 'Routes/Search';
import Post from 'Routes/Post';
import PostView from 'Routes/PostView';
import PostModify from 'Routes/PostModify';
import Comment from 'Routes/Comment';
import Chat from 'Routes/Chat';
import Naver from 'Auth/Naver';
import Kakao from 'Auth/Kakao';
import Google from 'Auth/Google';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/mypost" element={<Mypost />} />
      <Route path="/mycomment" element={<Mycomment />} />
      <Route path="/post" element={<Post />} />
      <Route path="/post/:id" element={<PostView />} />
      <Route path="/post/modify/:id" element={<PostModify />} />
      <Route path="/comment/:id" element={<Comment />} />
      <Route path="/search/*" element={<Search />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/auth/naver" element={<Naver />} />
      <Route path="/auth/kakao" element={<Kakao />} />
      <Route path="/auth/google" element={<Google />} />
    </Routes>
  );
}

export default App;
