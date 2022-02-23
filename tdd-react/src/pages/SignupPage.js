import React, { useState } from 'react';
import axios from 'axios';

const SignupPage = () => {
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    password: '',
    passwordRepeat: '',
  });
  const [apiProgress, setApiProgress] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(null);

  const { username, email, password, passwordRepeat } = userInfo;

  let disabled = true;

  const onChange = ({ target }) => {
    const { id, value } = target;
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
    setApiProgress((prev) => !prev);
    try {
      await axios.post('/api/1.0/users', body);
      setSignupSuccess((prev) => !prev);
    } catch (err) {
      setApiProgress((prev) => !prev);
      console.error(err);
    }
  };
  if (password && passwordRepeat) {
    disabled = password !== passwordRepeat;
  }

  return (
    <div>
      {!signupSuccess && (
        <div className="card mt-5 col-xl-6 offset-xl-3 col-md-8 offset-md-4">
          <form data-testid="form-sign-up">
            <div className="card-header text-center">
              <h1>Sign up</h1>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  className="form-control"
                  id="username"
                  onChange={onChange}
                ></input>
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  E-mail
                </label>
                <input
                  className="form-control"
                  id="email"
                  onChange={onChange}
                ></input>
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  className="form-control"
                  id="password"
                  type="password"
                  onChange={onChange}
                ></input>
              </div>
              <div className="mb-3">
                <label htmlFor="passwordRepeat" className="form-label">
                  Password Repeat
                </label>
                <input
                  className="form-control"
                  id="passwordRepeat"
                  type="password"
                  onChange={onChange}
                ></input>
              </div>
            </div>
            <div className="text-center">
              <button
                className="btn btn-primary"
                disabled={disabled || apiProgress}
                onClick={submit}
              >
                {apiProgress && (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                )}
                Sign up
              </button>
            </div>
          </form>
        </div>
      )}
      {signupSuccess && (
        <div className="alert alert-success mt-5">
          Please chekc your E-mail to activate your account
        </div>
      )}
    </div>
  );
};

export default SignupPage;
