import React, { useState } from 'react';
import axios from 'axios';
import Input from '../components/Input';
import Alert from '../components/Alert';
import Spinner from '../components/Spinner';

const SignupPage = () => {
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    password: '',
    passwordRepeat: '',
  });
  const [apiProgress, setApiProgress] = useState(null);
  const [signupSuccess, setSignupSuccess] = useState(null);
  const [errors, setErrors] = useState({});

  const { username, email, password, passwordRepeat } = userInfo;

  let passwordMismatch = password !== passwordRepeat ? 'Password mismatch' : '';
  let disabled = true;

  const onChange = ({ target }) => {
    const { id, value } = target;
    setErrors((prev) => {
      prev[id] = '';
      return { ...prev };
    });
    setUserInfo((before) => {
      before[id] = value;
      return { ...before };
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    const body = {
      username,
      email,
      password,
    };
    setApiProgress(true);
    try {
      await axios.post('/api/1.0/users', body);
      setSignupSuccess(true);
    } catch (err) {
      if (err.response.status === 400) {
        setErrors({ ...err.response.data.validationErrors });
        setSignupSuccess(false);
      }
    }
    setApiProgress(false);
  };
  if (password && passwordRepeat) {
    disabled = password !== passwordRepeat;
  }

  return (
    <div data-testid="signup-page">
      {!signupSuccess && (
        <div className="card mt-5 col-xl-6 offset-xl-3 col-md-8 offset-md-4">
          <form data-testid="form-sign-up">
            <div className="card-header text-center">
              <h1>Sign up</h1>
            </div>
            <div className="card-body">
              <Input
                id="username"
                label="Username"
                onChange={onChange}
                help={errors.username}
              />
              <Input
                id="email"
                label="E-mail"
                onChange={onChange}
                help={errors.email}
                type="email"
              />
              <Input
                id="password"
                label="Password"
                onChange={onChange}
                help={errors.password}
                type="password"
              />
              <Input
                id="passwordRepeat"
                label="Password Repeat"
                onChange={onChange}
                help={passwordMismatch}
                type="password"
              />
            </div>
            <div className="text-center">
              <button
                className="btn btn-primary"
                disabled={disabled || apiProgress}
                onClick={submit}
              >
                {apiProgress && <Spinner size="sm" />}
                Sign up
              </button>
            </div>
          </form>
        </div>
      )}
      {signupSuccess && (
        <Alert>Please check your E-mail to activate your account</Alert>
      )}
    </div>
  );
};

export default SignupPage;
