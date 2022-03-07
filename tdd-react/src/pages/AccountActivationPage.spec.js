import { screen, render } from '../test/setup';
import AccountActivationPage from './AccountActivationPage';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

let counter = 0;
const server = setupServer(
  rest.post(`/api/1.0/users/token/:token`, (req, res, ctx) => {
    counter++;
    const { token } = req.params;
    if (token === '5678') {
      return res(ctx.status(400));
    }
    return res(ctx.status(200));
  })
);

beforeAll(() => {
  server.listen();
});

beforeEach(() => {
  counter = 0;
});

afterAll(() => {
  server.close();
});

const setup = (token) => {
  const match = { params: { token } };
  render(<AccountActivationPage match={match} />);
};

describe('Account Activation Page', () => {
  it('displays activation success message when token is valid', async () => {
    setup('123');
    const message = await screen.findByText('Account is activated');
    expect(message).toBeInTheDocument();
  });
  it('sends activation request to backend', async () => {
    setup('123');
    await screen.findByText('Account is activated');
    expect(counter).toBe(1);
  });
  it('displays activation failure message when token is invalid', async () => {
    setup('5678');
    const message = await screen.findByText('Activation Error');
    expect(message).toBeInTheDocument();
  });
  it('displays spinner during api call', async () => {
    setup('5678');
    const spinner = screen.queryByRole('status', { hidden: true });
    expect(spinner).toBeInTheDocument();
    await screen.findByText('Activation Error');
    expect(spinner).not.toBeInTheDocument();
  });
  it('displays spinner after second api call changed the token', async () => {
    const match = { params: { token: '123' } };
    const { rerender } = render(<AccountActivationPage match={match} />);
    await screen.findByText('Account is activated');
    match.params.token = '5678';
    rerender(<AccountActivationPage match={match} />);
    const spinner = screen.queryByRole('status', { hidden: true });
    expect(spinner).toBeInTheDocument();
    await screen.findByText('Activation Error');

    expect(spinner).not.toBeInTheDocument();
    expect(counter).toBe(2);
  });
});
