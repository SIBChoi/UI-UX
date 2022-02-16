import TopBar from './components/topbar/TopBar';
import Home from './components/pages/homepage/Home';
import './index.css';
import Detail from './components/pages/detail/Detail';

function App() {
  return (
    <div>
      <TopBar />
      {/* <Home  /> */}
      <Detail />
    </div>
  );
}

export default App;
