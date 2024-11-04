import { userType } from "@/types/user";
import { ApolloError, FetchResult, gql, useMutation } from "@apollo/client";

const UpdateUser = gql`
mutation UpdateUser($updateUserId: String!, $name: String!, $role: Role!, $phone: String!) {
  updateUser(id: $updateUserId, name: $name, role: $role, , phone: $phone ) {
    id
    name
    role
    phone
  }
}
`

export const useUpdateUser = (): {
  useHandleUpdateUser: (data: userType) => Promise<FetchResult<any>>;
  mutationUserUpdateLoading: boolean;
  mutationUserUpdateError: ApolloError | undefined;
} => {
  const [updateUser, { loading: mutationUserUpdateLoading, error: mutationUserUpdateError }] = useMutation(UpdateUser);
  const useHandleUpdateUser = async (data: userType) => {
   return await updateUser({
      variables: {
        ...data
      }
    });
  }
  
  return { useHandleUpdateUser, mutationUserUpdateLoading, mutationUserUpdateError }
}