import { Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import SignupPage from './pages/SignupPage';
import Login from './pages/Login';
import User from './pages/User';
import AccountActivationPage from './pages/AccountActivationPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Route exact path="/" component={Homepage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/login" component={Login} />
        <Route path="/user/:id" component={User} />
        <Route path="/activate/:token" component={AccountActivationPage} />
      </div>
    </>
  );
}

export default App;
