import { dataSourceUser } from "@/types/user";
import { ApolloError, gql, OperationVariables, useQuery } from "@apollo/client";

const FindUsers = gql`
query FindUsers {
  findUsers {
    id
    email
    name
    phone
    role
  }
}`;

type findUsersType = {
  findUsers: dataSourceUser[]
}

export const useGetUsers = (): {
  dataSourceUsers: findUsersType | undefined;
  loadingUsers: boolean;
  errorUsers: ApolloError | undefined;
  refetchUsers: (variables?: Partial<OperationVariables> | undefined) => Promise<any>;
} => {
  const { data: dataSourceUsers, loading : loadingUsers, error: errorUsers, refetch: refetchUsers } = useQuery<findUsersType>(FindUsers);
  return { dataSourceUsers, loadingUsers, errorUsers, refetchUsers };
}