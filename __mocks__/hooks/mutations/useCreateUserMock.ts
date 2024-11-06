import { gql } from "@apollo/client";

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

export const useCreateUserMock = [
  {
    request: {
      query: CreateUser,
      variables: {
        email: "napandalesr@gmail.com",
        name: "Neider",
        role: "USER"
      },
    },
    result: {
      data: {
        findUserByEmail: [
          {
            email: "napandalesr@gmail.com",
            name: "Neider",
            phone: "",
            role: "USER"
          }
        ]
      },
    },
  },
];
