import { Routes, Route } from 'react-router-dom';
import Nav from 'Components/Nav';
import Home from 'Routes/Home';

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
