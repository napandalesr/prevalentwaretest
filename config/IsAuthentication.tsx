"use client";

import Loading from "@/components/Loading";
import { signIn, useSession } from "next-auth/react";

type Props = {
  children?: React.ReactNode;
};

const IsAuthentication = ({ children }: Props) => {
  const { status } = useSession();

  if (status == "loading") {
    return <Loading text="Cargando..." type="bars"/>
  }

  if (status === "unauthenticated") {
    signIn('auth0');
    return <Loading text="Redirigiendo" type="bars"/>
  }

  return children
};

export default IsAuthentication;