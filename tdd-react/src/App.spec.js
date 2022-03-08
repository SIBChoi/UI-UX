import { screen, render } from './test/setup';
import App from './App';
import userEvnet from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import storage from './state/storage';

const server = setupServer(
  rest.post('/api/1.0/users/token/:token', (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.get('/api/1.0/users', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        content: [
          {
            id: 5,
            username: 'app-test-user',
            email: 'app-test-user@mail.com',
            image: null,
          },
        ],
        page: 0,
        size: 0,
        totalPages: 0,
      })
    );
  }),
  rest.get('/api/1.0/users/:id', (req, res, ctx) => {
    const { id } = req.params;
    return res(
      ctx.json({
        id,
        username: 'user' + id,
        email: 'user' + id + '@mail.com',
        image: null,
      })
    );
  }),
  rest.post('/api/1.0/auth', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ username: 'user5', id: 5 }));
  })
);

beforeEach(() => {
  storage.clear();
  server.resetHandlers();
});

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

const setup = (path) => {
  window.history.pushState({}, '', path);
  render(<App />);
};

describe('Routing', () => {
  it.each`
    path               | testId
    ${'/'}             | ${'home-page'}
    ${'/signup'}       | ${'signup-page'}
    ${'/login'}        | ${'login-page'}
    ${'/user/1'}       | ${'user-page'}
    ${'/user/2'}       | ${'user-page'}
    ${'/activate/123'} | ${'activation-page'}
    ${'/activate/456'} | ${'activation-page'}
  `('displays $testId when path is $path', ({ path, testId }) => {
    setup(path);
    const page = screen.getByTestId(testId);

    expect(page).toBeInTheDocument();
  });

  it.each`
    path               | testId
    ${'/'}             | ${'signup-page'}
    ${'/'}             | ${'login-page'}
    ${'/'}             | ${'user-page'}
    ${'/'}             | ${'activation-page'}
    ${'/signup'}       | ${'home-page'}
    ${'/signup'}       | ${'login-page'}
    ${'/signup'}       | ${'user-page'}
    ${'/signup'}       | ${'activation-page'}
    ${'/user/1'}       | ${'home-page'}
    ${'/user/1'}       | ${'sign-page'}
    ${'/user/1'}       | ${'login-page'}
    ${'/user/1'}       | ${'activation-page'}
    ${'/login'}        | ${'home-page'}
    ${'/login'}        | ${'signup-page'}
    ${'/login'}        | ${'user-page'}
    ${'/login'}        | ${'activation-page'}
    ${'/activate/123'} | ${'home-page'}
    ${'/activate/123'} | ${'signup-page'}
    ${'/activate/123'} | ${'login-page'}
    ${'/activate/123'} | ${'user-page'}
  `('dose not display $testId when path is $path', ({ path, testId }) => {
    setup(path);
    const page = screen.queryByTestId(testId);

    expect(page).not.toBeInTheDocument();
  });

  it.each`
    targetPage
    ${'Home'}
    ${'Sign up'}
    ${'Login'}
  `('has link to $targetPage on NavBar', ({ targetPage }) => {
    setup('/');
    const link = screen.getByRole('link', { name: targetPage });

    expect(link).toBeInTheDocument();
  });

  it.each`
    clickingsTo  | visiblePage
    ${'Home'}    | ${'home-page'}
    ${'Sign up'} | ${'signup-page'}
    ${'Login'}   | ${'login-page'}
  `(
    'displays $visiblePage after cliking $clickingsTo link',
    ({ clickingsTo, visiblePage }) => {
      setup('/');
      const link = screen.getByRole('link', { name: clickingsTo });
      userEvnet.click(link);

      expect(screen.getByTestId(visiblePage)).toBeInTheDocument();
    }
  );

  it('navigates to user page when clicking username on user list', async () => {
    setup('/');
    const userLink = await screen.findByText('app-test-user');
    userEvnet.click(userLink);
    const target = await screen.findByText('user5');
    expect(screen.getByTestId('user-page')).toBeInTheDocument();
    expect(target).toBeInTheDocument();
  });
});

describe('Login', () => {
  const setupLoggedIn = () => {
    setup('/login');
    userEvnet.type(screen.getByLabelText('E-mail'), 'user5@mail.com');
    userEvnet.type(screen.getByLabelText('Password'), 'P4ssword');
    userEvnet.click(screen.getByRole('button', { name: 'Login' }));
  };

  it('navigates to homepage when login is success', async () => {
    setupLoggedIn();
    const page = await screen.findByTestId('home-page');
    expect(page).toBeInTheDocument();
  });
  it('hides login and signup from navbar after successful login', async () => {
    setupLoggedIn();
    await screen.findByTestId('home-page');
    const signupLink = screen.queryByRole('link', { name: 'Sign up' });
    const loginLink = screen.queryByRole('link', { name: 'Login' });

    expect(signupLink).not.toBeInTheDocument();
    expect(loginLink).not.toBeInTheDocument();
  });
  it('displays My Profile link on navbar afer successful login', async () => {
    setup('/login');
    const myProfileLinkBeforeLogin = screen.queryByRole('link', {
      name: 'My Profile',
    });
    expect(myProfileLinkBeforeLogin).not.toBeInTheDocument();
    userEvnet.type(screen.getByLabelText('E-mail'), 'user5@mail.com');
    userEvnet.type(screen.getByLabelText('Password'), 'P4ssword');
    userEvnet.click(screen.getByRole('button', { name: 'Login' }));
    await screen.findByTestId('home-page');
    const myProfileLinkAfter = screen.getByRole('link', { name: 'My Profile' });
    expect(myProfileLinkAfter).toBeInTheDocument();
  });
  it('displays user page with logged in user id in url after clicking My Profile link', async () => {
    setupLoggedIn();
    await screen.findByTestId('home-page');
    const myProfileLink = screen.getByRole('link', { name: 'My Profile' });
    userEvnet.click(myProfileLink);
    await screen.findByTestId('user-page');
    const username = await screen.findByText('user5');
    expect(username).toBeInTheDocument();
  });
  it('stores logged in state in local storage', async () => {
    setupLoggedIn();
    await screen.findByTestId('home-page');
    const state = storage.getItem('auth');
    expect(state.isLoggedIn).toBeTruthy();
  });
  it('displays layout of logged in state', () => {
    storage.setItem('auth', { isLoggedIn: true });
    setup('/');
    const myProfileLink = screen.getByRole('link', { name: 'My Profile' });
    expect(myProfileLink).toBeInTheDocument();
  });
});

console.error = () => {};
