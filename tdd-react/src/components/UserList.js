import { useState, useEffect } from 'react';
import { getPages } from '../api/apicalls';
import Spinner from './Spinner';
import UserListItem from './UserListItem';

const UserList = ({ history }) => {
  const [pages, setPages] = useState({
    content: [],
    page: 0,
    size: 0,
    totalPages: 0,
  });
  const [isApiCall, setIsApiCall] = useState(false);

  const { page, totalPages } = pages;

  useEffect(() => {
    onPageHandler();
  }, []);

  const onPageHandler = async (pageIdx) => {
    setIsApiCall(true);
    try {
      const res = await getPages(pageIdx);
      const { data } = res;
      setPages(data);
    } catch (error) {}
    setIsApiCall(false);
  };

  const listItem = pages.content.map((user) => (
    <UserListItem user={user} key={user.id} />
  ));
  return (
    <div className="card">
      <div className="card-header text-center">
        <h3>User</h3>
      </div>
      <ul className="list-group list-group-flush">{listItem}</ul>
      <div className="card-footer text-center">
        {isApiCall && <Spinner />}
        {page !== 0 && !isApiCall && (
          <button
            className="btn btn-sm btn-outline-secondary float-start"
            onClick={() => onPageHandler(page - 1)}
          >
            &lt; previous
          </button>
        )}
        {totalPages > page + 1 && !isApiCall && (
          <button
            className="btn btn-sm btn-outline-secondary float-end"
            onClick={() => onPageHandler(page + 1)}
          >
            next &gt;
          </button>
        )}
      </div>
    </div>
  );
};

export default UserList;
