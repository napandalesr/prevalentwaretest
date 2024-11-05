import { PropsWithChildren } from 'react';
export { useSession } from "next-auth/react";

export function useMsal() {
  const data = {
    user: {
      name: '',
      email: '',
      role: 'USER',
      phone: ''
    }
  }

  return {
    data,
  };
}


export const SessionProvider = (props: PropsWithChildren) => <div>{props.children}</div>;