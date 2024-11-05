import { userType } from "@/types/user";
import { FetchResult, gql, useMutation } from "@apollo/client";

const CreateUser = gql`
mutation CreateUser($email: String!, $name: String!, $role: Role!) {
  createUser(email: $email, name: $name, role: $role) {
    email
    name
    phone
    role
  }
}
`;

export const useCreateUser = (): {
  useHandleCreateUser: (data: userType) => Promise<FetchResult<any>>;
  mutationUserLoading: boolean;
} => {
  const [createUser, { loading: mutationUserLoading }] = useMutation(CreateUser);

  const useHandleCreateUser = async (data: userType) => {
    const { name, email, phone, role } = data;
    return await createUser({
      variables: {
        name,
        email,
        phone,
        role
      }
    })
  };

  return { useHandleCreateUser, mutationUserLoading };
};
