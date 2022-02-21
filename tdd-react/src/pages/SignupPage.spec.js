// import axios from 'axios';
import SignupPage from './SignupPage';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

describe('Signup Page', () => {
  describe('Layout', () => {
    it('has header', () => {
      render(<SignupPage />);
      const header = screen.queryByRole('heading', { name: 'Sign up' });
      expect(header).toBeInTheDocument();
    });
    it('has username input', () => {
      render(<SignupPage />);
      const input = screen.getByLabelText('Username');
      expect(input).toBeInTheDocument();
    });
    it('has email input', () => {
      render(<SignupPage />);
      const input = screen.getByLabelText('E-mail');
      expect(input).toBeInTheDocument();
    });
    it('has password input', () => {
      render(<SignupPage />);
      const input = screen.getByLabelText('Password');
      expect(input).toBeInTheDocument();
    });
    it('has password type for password input', () => {
      render(<SignupPage />);
      const input = screen.getByLabelText('Password');
      expect(input.type).toBe('password');
    });
    it('has password repeat input', () => {
      render(<SignupPage />);
      const input = screen.getByLabelText('Password Repeat');
      expect(input).toBeInTheDocument();
    });
    it('has password type for password  repeat input', () => {
      render(<SignupPage />);
      const input = screen.getByLabelText('Password Repeat');
      expect(input.type).toBe('password');
    });
    it('has button', () => {
      render(<SignupPage />);
      const button = screen.getByRole('button', { name: 'Sign up' });
      expect(button).toBeInTheDocument();
    });
    it('disabled button intially', () => {
      render(<SignupPage />);
      const button = screen.getByRole('button', { name: 'Sign up' });
      expect(button).toBeDisabled();
    });
  });
  describe('Interactions', () => {
    it('enables button when password and passwordRepeap fields are same values', () => {
      render(<SignupPage />);
      const passwordInput = screen.getByLabelText('Password');
      const passwordRepeatInput = screen.getByLabelText('Password Repeat');
      userEvent.type(passwordInput, 'p4ssword');
      userEvent.type(passwordRepeatInput, 'p4ssword');
      const button = screen.getByRole('button', { name: 'Sign up' });

      expect(button).not.toBeDisabled();
    });
    it('Sends username, email, password when click the signup button', async () => {
      let requestBody;
      const server = setupServer(
        rest.post('/api/1.0/users', (req, res, ctx) => {
          requestBody = req.body;

          return res(ctx.status(200));
        })
      );
      server.listen();
      render(<SignupPage />);
      const usernameInput = screen.getByLabelText('Username');
      const emailInput = screen.getByLabelText('E-mail');
      const passwordInput = screen.getByLabelText('Password');
      const passwordRepeatInput = screen.getByLabelText('Password Repeat');
      userEvent.type(usernameInput, 'user1');
      userEvent.type(emailInput, 'user1@mail.com');
      userEvent.type(passwordInput, 'p4ssword');
      userEvent.type(passwordRepeatInput, 'p4ssword');
      // const mockFn = jest.fn();
      // window.fetch = mockFn;
      // axios.post = mockFn;
      const button = screen.getByRole('button', { name: 'Sign up' });
      userEvent.click(button);

      await new Promise((resolve) => setTimeout(resolve, 1000));
      // const firstMockFnCall = mockFn.mock.calls[0];
      // const body = JSON.parse(firstMockFnCall[1].body);
      // console.log(firstMockFnCall);
      // console.log(body);

      expect(requestBody).toEqual({
        username: 'user1',
        email: 'user1@mail.com',
        password: 'p4ssword',
      });
    });
  });
});
