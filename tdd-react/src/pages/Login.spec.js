import { render, screen, waitForElementToBeRemoved } from '../test/setup';
import userEvent from '@testing-library/user-event';
import Login from './Login';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

describe('Login page', () => {
  describe('Layout', () => {
    it('has header', () => {
      render(<Login />);
      const header = screen.queryByRole('heading', { name: 'Login' });
      expect(header).toBeInTheDocument();
    });
    it('has email input', () => {
      render(<Login />);
      const input = screen.getByLabelText('E-mail');
      expect(input).toBeInTheDocument();
    });
    it('has password input', () => {
      render(<Login />);
      const input = screen.getByLabelText('Password');
      expect(input).toBeInTheDocument();
    });
    it('has password type for password input', () => {
      render(<Login />);
      const input = screen.getByLabelText('Password');
      expect(input.type).toBe('password');
    });
    it('has button', () => {
      render(<Login />);
      const button = screen.getByRole('button', { name: 'Login' });
      expect(button).toBeInTheDocument();
    });
    it('disabled button intially', () => {
      render(<Login />);
      const button = screen.getByRole('button', { name: 'Login' });
      expect(button).toBeDisabled();
    });
  });
  describe('interaction', () => {
    let requestBody;
    let count = 0;
    const server = setupServer(
      rest.post('/api/1.0/auth', (req, res, ctx) => {
        requestBody = req.body;
        count++;
        return res(
          ctx.status(401),
          ctx.json({ message: 'Incorrect credentials' })
        );
      })
    );

    beforeEach(() => (count = 0));

    beforeAll(() => server.listen());

    afterAll(() => server.close());

    let button, emailInput, passwordInput;
    const setup = () => {
      render(<Login />);
      emailInput = screen.getByLabelText('E-mail');
      passwordInput = screen.getByLabelText('Password');
      userEvent.type(emailInput, 'user100@mail.com');
      userEvent.type(passwordInput, 'P4ssword');
      button = screen.getByRole('button', { name: 'Login' });
    };
    it('enables button when email and password input are filled', () => {
      setup();
      expect(button).toBeEnabled();
    });
    it('displays spinner during api call', async () => {
      setup();
      expect(
        screen.queryByRole('status', { hidden: true })
      ).not.toBeInTheDocument();
      userEvent.click(button);
      const spinner = screen.queryByRole('status', { hidden: true });
      await waitForElementToBeRemoved(spinner);
    });
    it('sends email and password to backend after clicking the button', async () => {
      setup();
      userEvent.click(button);
      const spinner = screen.queryByRole('status', { hidden: true });
      await waitForElementToBeRemoved(spinner);
      expect(requestBody).toEqual({
        email: 'user100@mail.com',
        password: 'P4ssword',
      });
    });
    it('disables button during api call progress', async () => {
      setup();
      userEvent.click(button);
      const spinner = screen.queryByRole('status', { hidden: true });
      userEvent.click(button);
      userEvent.click(button);
      await waitForElementToBeRemoved(spinner);
      expect(count).toBe(1);
    });
    it('displays Authentication fail message', async () => {
      setup();
      userEvent.click(button);
      const failMsg = await screen.findByText('Incorrect credentials');
      expect(failMsg).toBeInTheDocument();
    });

    it.each`
      input         | value
      ${'email'}    | ${'newEmail@mail.com'}
      ${'password'} | ${'newP4ssword'}
    `(
      'clears Authentication fail message when $input filed is changed',
      async ({ input, value }) => {
        setup();
        userEvent.click(button);
        const failMsg = await screen.findByText('Incorrect credentials');
        input = input.startsWith('email') ? emailInput : passwordInput;
        userEvent.type(input, value);
        expect(failMsg).not.toBeInTheDocument();
      }
    );
  });
});
