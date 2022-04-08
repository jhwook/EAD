import { Routes, Route } from 'react-router-dom';
import loadable from '@loadable/component';
import Login from './Routes/Login/index';
import Signup from './Routes/Signup/index';

const Home = loadable(() => import('Routes/Home/index'));
const Profile = loadable(() => import('Routes/Profile/index'));
const MyPost = loadable(() => import('Routes/Post/MyPost/index'));
const MyComment = loadable(() => import('Routes/Post/MyComment/index'));
const Search = loadable(() => import('Routes/Search/index'));
const Post = loadable(() => import('Routes/Post/PostWrite/index'));
const PostView = loadable(() => import('Routes/Post/PostView/index'));
const PostModify = loadable(() => import('Routes/Post/PostModify/index'));
const ComModify = loadable(() => import('Routes/Post/CommentModify/index'));
const Chat = loadable(() => import('Routes/Chat/index'));
const Naver = loadable(() => import('Routes/Auth/Naver'));
const Kakao = loadable(() => import('Routes/Auth/Kakao'));
const Google = loadable(() => import('Routes/Auth/Google'));
const NotFound = loadable(() => import('Components/NotFound'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/mypost" element={<MyPost />} />
      <Route path="/mycomment" element={<MyComment />} />
      <Route path="/post" element={<Post />} />
      <Route path="/post/:id" element={<PostView />} />
      <Route path="/post/modify/:id" element={<PostModify />} />
      <Route path="/comment/:id" element={<ComModify />} />
      <Route path="/search/*" element={<Search />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/chat/:roomId/:username" element={<Chat />} />
      <Route path="/auth/naver" element={<Naver />} />
      <Route path="/auth/kakao" element={<Kakao />} />
      <Route path="/auth/google" element={<Google />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
