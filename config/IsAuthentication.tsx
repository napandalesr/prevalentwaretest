"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

type Props = {
  children?: React.ReactNode;
};

const IsAuthentication = ({ children }: Props) => {
  const { status } = useSession();
  useEffect(() => {
    //status !== "authenticated" && signIn('auth0')
  }, []);
  return <>{children}</>;
};

export default IsAuthentication;