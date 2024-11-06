import { render, screen } from '@testing-library/react';
import { MockedProvider } from "@apollo/client/testing";
import { SessionProvider } from 'next-auth/react';
import Users from './page';
import { useGetUsersMock } from '@/__mocks__/hooks/queries/useGetUsersMock';

const session = {
  user: {
    name: 'John Doe',
    email: 'john@example.com',
  },
  expires: '2024-11-05T00:00:00.000Z',
};


describe('usuarios component', () => {
  it('renders usuarios', () => {
    render(
      <MockedProvider mocks={useGetUsersMock} addTypename={false}>
        <SessionProvider session={session}>
          <Users/>
        </SessionProvider>
      </MockedProvider>
      
    );
    expect(screen.getByText('Cargando...')).toBeInTheDocument();
  });
});