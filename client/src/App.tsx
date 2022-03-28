import { Routes, Route } from 'react-router-dom';
import Nav from 'Components/Nav';
import Home from 'Routes/Home';
import Footer from 'Components/Footer';
import Login from 'Routes/Login';
import Signup from 'Routes/Signup';
import Profile from 'Routes/Profile';
import Search from 'Routes/Search';
import Post from 'Routes/Post';
import Chat from 'Routes/Chat';

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/post/*" element={<Post />} />
        <Route path="/search/*" element={<Search />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
