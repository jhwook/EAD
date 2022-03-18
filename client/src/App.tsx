import { Routes, Route } from 'react-router-dom';
import Nav from 'Components/Nav';
import Home from 'Routes/Home';
import Footer from 'Components/Footer';
import Team from 'Components/Team';

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
