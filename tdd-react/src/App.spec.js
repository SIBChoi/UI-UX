import { screen, render } from '@testing-library/react';
import App from './App';
import userEvnet from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

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
            id: 17,
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
  })
);

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

describe('Routing', () => {
  const setup = (path) => {
    window.history.pushState({}, '', path);
    render(<App />);
  };

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
    const target = await screen.findByText('17');
    expect(screen.getByTestId('user-page')).toBeInTheDocument();
    expect(target).toBeInTheDocument();
  });
});

console.error = () => {};
