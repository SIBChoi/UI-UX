import { useState, useContext } from 'react';
import Input from '../components/Input';
import Spinner from '../components/Spinner';
import Alert from '../components/Alert';
import { login } from '../api/apicalls';
import { AuthContext } from '../state/AuthContextWrapper';

const Login = ({ history }) => {
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [apiProgress, setApiProgress] = useState(null);
  const [failMsg, setFailMsg] = useState();

  const { email, password } = loginForm;

  const auth = useContext(AuthContext);

  const submit = async (e) => {
    e.preventDefault();
    setApiProgress(true);
    try {
      const response = await login({ email, password });
      auth.loginHandler(response.data.id);
      history.push('/');
    } catch (error) {
      const { message } = error.response.data;
      setFailMsg(message);
    }
    setApiProgress(false);
  };

  const onChangeForm = (e) => {
    setFailMsg();
    const { value, id } = e.target;
    setLoginForm((prev) => {
      prev[id] = value;
      return { ...prev };
    });
  };

  let disabled = !(email && password && !apiProgress);

  return (
    <div data-testid="login-page">
      <div className="card mt-5 col-xl-6 offset-xl-3 col-md-8 offset-md-4">
        <form>
          <div className="card-header text-center">
            <h1>Login</h1>
          </div>
          <div className="card-body">
            <Input
              id="email"
              label="E-mail"
              type="email"
              onChange={onChangeForm}
            />
            <Input
              id="password"
              label="Password"
              type="password"
              onChange={onChangeForm}
            />
          </div>
          {failMsg && <Alert type="danger">{failMsg}</Alert>}
          <div className="text-center">
            <button
              className="btn btn-primary"
              disabled={disabled}
              onClick={submit}
            >
              {apiProgress && <Spinner />}
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
