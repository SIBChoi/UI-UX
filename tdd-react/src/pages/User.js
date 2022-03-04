import { useState, useEffect } from 'react';
import { getUserById } from '../api/apicalls';

const User = ({ match }) => {
  const [user, setUser] = useState({});
  const { id } = match.params;

  useEffect(() => {
    (async () => {
      try {
        const response = await getUserById(id);
        setUser(response.data);
      } catch (error) {}
    })();
  }, [id]);

  return (
    <div data-testid="user-page">
      <h1>User Page</h1>
      <h2>{user.username}</h2>
    </div>
  );
};

export default User;
