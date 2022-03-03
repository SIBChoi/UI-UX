// import axios from 'axios';
import SignupPage from './SignupPage';
import { render, screen, waitFor } from '@testing-library/react';
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
    let requestBody, counter;
    const server = setupServer(
      rest.post('/api/1.0/users', (req, res, ctx) => {
        requestBody = req.body;
        counter++;

        return res(ctx.status(200));
      })
    );

    beforeAll(() => server.listen());
    afterAll(() => server.close());
    beforeEach(() => {
      counter = 0;
    });

    let button, usernameInput, emailInput, passwordInput, passwordRepeatInput;
    // before test init funtion
    const setup = () => {
      render(<SignupPage />);
      usernameInput = screen.getByLabelText('Username');
      emailInput = screen.getByLabelText('E-mail');
      passwordInput = screen.getByLabelText('Password');
      passwordRepeatInput = screen.getByLabelText('Password Repeat');
      userEvent.type(usernameInput, 'user1');
      userEvent.type(emailInput, 'user1@mail.com');
      userEvent.type(passwordInput, 'p4ssword');
      userEvent.type(passwordRepeatInput, 'p4ssword');
      button = screen.getByRole('button', { name: 'Sign up' });
    };

    it('enables button when password and passwordRepeap fields are same values', () => {
      setup();
      expect(button).not.toBeDisabled();
    });
    it('Sends username, email, password when click the signup button', async () => {
      setup();
      userEvent.click(button);
      // const mockFn = jest.fn();
      // window.fetch = mockFn;
      // axios.post = mockFn;

      await screen.findByText(
        'Please check your E-mail to activate your account'
      );
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

    it('disables button when there is ongoing api call', async () => {
      setup();
      userEvent.click(button);
      userEvent.click(button);

      await screen.findByText(
        'Please check your E-mail to activate your account'
      );
      expect(counter).toBe(1);
    });

    it('displays spinner while the api request in progress', async () => {
      setup();

      userEvent.click(button);
      const spinner = screen.queryByRole('status', { hidden: true });
      expect(spinner).toBeInTheDocument();

      await screen.findByText(
        'Please check your E-mail to activate your account'
      );
    });

    it('does not display spinner when there is not api request', async () => {
      setup();
      const spinner = screen.queryByRole('status', { hidden: true });
      expect(spinner).not.toBeInTheDocument();
    });

    it('displays account activation notification after successful sign up request', async () => {
      setup();
      const message = 'Please check your E-mail to activate your account';

      expect(screen.queryByText(message)).not.toBeInTheDocument();

      userEvent.click(button);
      const text = await screen.findByText(message);

      expect(text).toBeInTheDocument();
    });

    it('hides Sign up form after successful sign up request', async () => {
      setup();
      const form = screen.getByTestId('form-sign-up');
      userEvent.click(button);

      await waitFor(() => {
        expect(form).not.toBeInTheDocument();
      });
    });

    // const generatValidationError = (field, message) => {
    //   rest.post('/api/1.0/users', (req, res, ctx) => {
    //     return res(
    //       ctx.status(400),
    //       ctx.json({
    //         validationErrors: { [field]: message },
    //       })
    //     );
    //   });
    // };

    it.each`
      field         | message
      ${'username'} | ${'Username cannot be null'}
      ${'email'}    | ${'E-mail cannot be null'}
      ${'password'} | ${'Password must be at least 6 characters'}
    `('displays $message for $field', async ({ field, message }) => {
      server.use(
        rest.post('/api/1.0/users', (req, res, ctx) => {
          return res.once(
            ctx.status(400),
            ctx.json({
              validationErrors: { [field]: message },
            })
          );
        })
      );
      setup();
      userEvent.click(button);
      const validation = await screen.findByText(message);

      expect(validation).toBeInTheDocument();
    });
    it('hides spinner and enables button after reponse resive', async () => {
      server.use(
        rest.post('/api/1.0/users', (req, res, ctx) => {
          return res.once(
            ctx.status(400),
            ctx.json({
              validationErrors: { username: 'Username cannot be null' },
            })
          );
        })
      );
      setup();
      userEvent.click(button);
      await screen.findByText('Username cannot be null');
      const spinner = screen.queryByRole('status', { hidden: true });
      expect(spinner).not.toBeInTheDocument();
      expect(button).toBeEnabled();
    });
    it('displays mismatch message for password repeat input', () => {
      setup();
      userEvent.type(passwordInput, 'p4ssword');
      userEvent.type(passwordRepeatInput, 'Anotherp4ssword');
      const validationError = screen.queryByText('Password mismatch');

      expect(validationError).toBeInTheDocument();
    });
    // Needs Label text?
    it.each`
      field         | message                      | label
      ${'username'} | ${'Username cannot be null'} | ${'Username'}
      ${'email'}    | ${'E-mail cannot be null'}   | ${'E-mail'}
    `(
      'clears $message after $field field is update',
      async ({ field, message, label }) => {
        server.use(
          rest.post('/api/1.0/users', (req, res, ctx) => {
            return res.once(
              ctx.status(400),
              ctx.json({
                validationErrors: { [field]: message },
              })
            );
          })
        );
        setup();
        userEvent.click(button);
        const validationError = await screen.findByText(message);
        userEvent.type(screen.getByLabelText(label), 'update');

        expect(validationError).not.toBeInTheDocument();
      }
    );
  });
});
