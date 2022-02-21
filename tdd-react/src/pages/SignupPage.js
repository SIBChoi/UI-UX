import React, { useState } from 'react';
import axios from 'axios';

const SignupPage = () => {
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    password: '',
    passwordRepeat: '',
  });

  const { username, email, password, passwordRepeat } = userInfo;

  let disabled = true;

  const onChange = ({ target }) => {
    const { id, value } = target;
    setUserInfo((before) => {
      before[id] = value;
      return { ...before };
    });
  };

  const submit = (e) => {
    e.preventDefault();
    axios.post('api/1.0/users', { username, email, password });
    // fetch('/api/1.0/users', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ username, email, password }),
    // });
  };

  if (password && passwordRepeat) {
    disabled = password !== passwordRepeat;
  }

  return (
    <div>
      <h1>Sign up</h1>
      <form>
        <label htmlFor="username">Username</label>
        <input id="username" onChange={onChange}></input>
        <label htmlFor="email">E-mail</label>
        <input id="email" onChange={onChange}></input>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" onChange={onChange}></input>
        <label htmlFor="passwordRepeat">Password Repeat</label>
        <input id="passwordRepeat" type="password" onChange={onChange}></input>
        <button disabled={disabled} onClick={submit}>
          Sign up
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
