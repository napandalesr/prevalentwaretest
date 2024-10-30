"use client"

import { signIn, useSession } from "next-auth/react"
import { useEffect } from "react";

const useAuthentication = () => {
  const { status } = useSession();
  useEffect(() => {
    status !== "authenticated" && signIn('auth0')
  }, []);
}

export default useAuthentication;