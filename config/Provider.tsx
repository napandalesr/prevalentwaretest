import { NextApolloProvider } from "@/config/NextApolloProvider";

type Props = {
  children?: React.ReactNode;
};

export const Provider = ({ children }: Props) => {
  return <NextApolloProvider>
    {children}
  </NextApolloProvider>;
};