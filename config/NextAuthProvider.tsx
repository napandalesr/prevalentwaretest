"use client";

import { SessionProvider } from "next-auth/react";
import IsAuthentication from "./IsAuthentication";

type Props = {
  children?: React.ReactNode;
};

export const NextAuthProvider = ({ children }: Props) => {
  return <SessionProvider>
    <IsAuthentication>
      {children}
    </IsAuthentication>
  </SessionProvider>;
};