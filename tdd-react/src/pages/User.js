import { useParams } from 'react-router-dom';

const User = () => {
  const params = useParams();
  return (
    <div data-testid="user-page">
      <h1>User Page</h1>
      <h2>{params.id}</h2>
    </div>
  );
};

export default User;
