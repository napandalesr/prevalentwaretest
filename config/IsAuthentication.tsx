"use client";

import { signIn, useSession } from "next-auth/react";

type Props = {
  children?: React.ReactNode;
};

const IsAuthentication = ({ children }: Props) => {
  const { status } = useSession();

  if (status == "loading") {
    return <div>Cargando...</div>
  }

  if (status === "unauthenticated") {
    signIn('auth0');
    return <div>redirigiendo...</div>
  }

  return children
};

export default IsAuthentication;