import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const auth = useSelector((state) => state);
  return (
    <nav
      className="navbar navbar-expand navbar-light bg-light shadow-sm"
      style={{ height: '80px' }}
    >
      <div className="container">
        <Link className="navbar-brand" to="/" title="Home">
          Hoxify
        </Link>
        <ul className="navbar-nav">
          {!auth.isLoggedIn && (
            <>
              <Link className="nav-link" to="/signup">
                Sign up
              </Link>
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </>
          )}
          {auth.isLoggedIn && (
            <Link className="nav-link" to={`/user/${auth.id}`}>
              My Profile
            </Link>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
