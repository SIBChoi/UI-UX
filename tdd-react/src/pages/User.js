import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../state/AuthContextWrapper';
import { getUserById } from '../api/apicalls';
import ProfileCard from '../components/ProfileCard';

const User = ({ match }) => {
  const auth = useContext(AuthContext);
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
      <ProfileCard user={user} auth={auth} />
    </div>
  );
};

export default User;
