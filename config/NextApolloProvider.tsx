"use client";

import { ApolloProvider } from "@apollo/client";
import client from "@/app/apollo-client";

type Props = {
  children?: React.ReactNode;
};

export const NextApolloProvider = ({ children }: Props) => {
  return <ApolloProvider client={client}>
      {children}
  </ApolloProvider>;
};