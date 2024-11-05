"use client"

import { userType } from "@/types/user";
import { gql, useLazyQuery } from "@apollo/client";

const FindUserByEmail = gql`
  query FindOneEmail($email: String!) {
  findOneEmail(email: $email) {
    id,
    role
  }
}
`;

type findUserByEmailType = {
  findOneEmail: userType
}

export const useFindByEmail = () => {
  const [ getEmail, { data: dataSourceUSerByEmail, loading : loadingUserByEmail, refetch: refetchUserByEmail }] = useLazyQuery<findUserByEmailType>(FindUserByEmail);
  return { getEmail, dataSourceUSerByEmail: dataSourceUSerByEmail?.findOneEmail , loadingUserByEmail, refetchUserByEmail };
};
