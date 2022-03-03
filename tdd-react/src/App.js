import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Homepage from './pages/Homepage';
import SignupPage from './pages/SignupPage';
import Login from './pages/Login';
import User from './pages/User';
import AccountActivationPage from './pages/AccountActivationPage';

function App() {
  return (
    <Router>
      <nav
        className="navbar navbar-expand navbar-light bg-light shadow-sm"
        style={{ height: '80px' }}
      >
        <div className="container">
          <Link className="navbar-brand" to="/" title="Home">
            Hoxify
          </Link>
          <ul className="navbar-nav">
            <Link className="nav-link" to="/signup">
              Sign up
            </Link>
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </ul>
        </div>
      </nav>
      <div className="container">
        <Route exact path="/" component={Homepage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/login" component={Login} />
        <Route path="/user/:id" component={User} />
        <Route path="/activate/:token" component={AccountActivationPage} />
      </div>
    </Router>
  );
}

export default App;
