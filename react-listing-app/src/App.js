import { Routes, Route } from 'react-router-dom';
import TopBar from './components/topbar/TopBar';
import Home from './components/pages/homepage/Home';
import './index.css';
import Detail from './components/pages/detail/Detail';
import CreateListing from './components/pages/createListing/CreateListing';

function App() {
  return (
    <div>
      <TopBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/create" element={<CreateListing />} />
      </Routes>
    </div>
  );
}

export default App;
