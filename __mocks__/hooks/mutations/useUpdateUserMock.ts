import { gql } from "@apollo/client";

const UpdateUser = gql`
mutation UpdateUser($updateUserId: String!, $name: String!, $role: Role!, $phone: String!) {
  updateUser(id: $updateUserId, name: $name, role: $role, , phone: $phone ) {
    id
    name
    role
    phone
  }
}
`;

export const useCreateUserMock = [
  {
    request: {
      query: UpdateUser,
      variables: {
        updateUserId: "1",
        phone: "123",
        name: "Neider",
        role: "USER"
      },
    },
    result: {
      data: {
        findUserByEmail: [
          {
            id: "1",
            name: "Neider",
            role: "ADMIN",
            phone: "123"
          }
        ]
      },
    },
  },
];