import { render, screen } from '@testing-library/react';
import User from './User';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

const server = setupServer();

beforeAll(() => server.listen());

afterAll(() => server.close());

describe('User Page', () => {
  beforeEach(() => {
    server.use(
      rest.get('/api/1.0/users/:id', (req, res, ctx) => {
        return res(
          ctx.json({
            id: 1,
            username: 'user1',
            email: 'user1@mail.com',
            image: null,
          })
        );
      })
    );
  });

  it('displays user name when user found', async () => {
    const match = { params: { id: 1 } };
    render(<User match={match} />);
    const username = await screen.findByText('user1');
    expect(username).toBeInTheDocument();
  });
});
