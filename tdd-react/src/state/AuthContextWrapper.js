import { useState, createContext } from 'react';

export const AuthContext = createContext();

const AuthContextWrapper = ({ children }) => {
  const [auth, setAuth] = useState({});

  const loginHandler = (id) => {
    setAuth({ isLoggedIn: true, id });
  };

  return (
    <AuthContext.Provider value={{ ...auth, loginHandler }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextWrapper;
