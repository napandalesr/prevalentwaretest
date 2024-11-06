import { gql } from "@apollo/client";

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

export const useGetUsersMock = [
  {
    request: {
      query: FindUsers,
    },
    result: {
      data: {
        findUsers: [
          {
            id: "1",
            email: "napandalesr@gmail.com",
            name: "Neider",
            phone: "123",
            role: "USER"
          }
        ]
      },
    },
  },
];