import { withRouter } from 'react-router-dom';

const UserListItem = ({ user, history }) => {
  return (
    <li
      onClick={() => history.push(`/user/${user.id}`)}
      className="list-group-item list-group-item-action"
      style={{ cursor: 'pointer' }}
    >
      {user.username}
    </li>
  );
};

export default withRouter(UserListItem);
