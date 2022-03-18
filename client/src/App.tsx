import { Routes, Route } from 'react-router-dom';
import Nav from 'Components/Nav';
import Home from 'Routes/Home';
import Footer from 'Components/Footer';
import Login from 'Routes/Login';

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
