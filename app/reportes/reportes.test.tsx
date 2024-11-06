import { render, screen } from '@testing-library/react';
import { MockedProvider } from "@apollo/client/testing";
import { SessionProvider } from 'next-auth/react';
import Reports from './page';
import { useGetMovementsMock } from '@/__mocks__/hooks/queries/useGetMovementsMock';

const session = {
  user: {
    name: 'John Doe',
    email: 'john@example.com',
  },
  expires: '2024-11-05T00:00:00.000Z',
};


describe('Reports component', () => {
  it('renders usuarios', () => {
    render(
      <MockedProvider mocks={useGetMovementsMock} addTypename={false}>
        <SessionProvider session={session}>
          <Reports/>
        </SessionProvider>
      </MockedProvider>
      
    );
    expect(screen.getByText('Cargando...')).toBeInTheDocument();
  });
});