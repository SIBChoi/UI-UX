import { useState, useEffect } from 'react';
import { getUserById } from '../api/apicalls';
import ProfileCard from '../components/ProfileCard';

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
      <ProfileCard user={user} />
    </div>
  );
};

export default User;
