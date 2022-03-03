import { useState, useEffect } from 'react';
import { getPages } from '../api/apicalls';
import UserListItem from './UserListItem';

const UserList = ({ history }) => {
  const [pages, setPages] = useState({
    content: [],
    page: 0,
    size: 0,
    totalPages: 0,
  });

  const { page, totalPages } = pages;

  useEffect(() => {
    async function getUsers() {
      try {
        const res = await getPages();
        const { data } = res;
        setPages(data);
      } catch (error) {
        console.error(error);
      }
    }

    getUsers();
  }, []);

  const onPageHandler = async (pageIdx) => {
    try {
      const res = await getPages(pageIdx);
      const { data } = res;
      setPages(data);
    } catch (error) {}
  };

  const content = pages.content.map((user) => (
    <UserListItem user={user} key={user.id} />
  ));

  return (
    <div className="card">
      <div className="card-header text-center">
        <h3>User</h3>
      </div>
      <ul className="list-group list-flush">{content}</ul>
      <div className="card-footer">
        {page !== 0 && (
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => onPageHandler(page - 1)}
          >
            &lt; previous
          </button>
        )}
        {totalPages > page + 1 && (
          <button
            className="btn btn-sm btn-outline-secondary"
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
