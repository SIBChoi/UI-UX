import { useEffect, useState } from 'react';
import axios from 'axios';
import Alert from '../components/Alert';
import Spinner from '../components/Spinner';

const AccountActivationPage = ({ match }) => {
  const { token } = match.params;
  const [result, setResult] = useState();

  useEffect(() => {
    async function activateFn() {
      setResult();
      try {
        await axios.post(`/api/1.0/users/token/${token}`);
        setResult('success');
      } catch (error) {
        setResult('failure');
      }
    }
    activateFn();
  }, [token]);

  let content = <Spinner />;

  if (result === 'success') {
    content = <Alert>Account is activated</Alert>;
  } else if (result === 'failure') {
    content = <Alert type="danger">Activation Error</Alert>;
  }

  return <div data-testid="activation-page">{content}</div>;
};

export default AccountActivationPage;
