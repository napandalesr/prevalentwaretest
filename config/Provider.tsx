import { NextApolloProvider } from "@/config/NextApolloProvider";
import { NextAuthProvider } from "./NextAuthProvider";

type Props = {
  children?: React.ReactNode;
};

export const Provider = ({ children }: Props) => {
  return <NextAuthProvider>
  <NextApolloProvider>
    {children}
  </NextApolloProvider></NextAuthProvider>;
};