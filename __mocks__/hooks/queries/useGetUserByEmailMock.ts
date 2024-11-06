import { gql } from "@apollo/client";

const FindUserByEmail = gql`
  query FindOneEmail($email: String!) {
  findOneEmail(email: $email) {
    id,
    role
  }
}
`;

export const useGetUserByEmailMock = [
  {
    request: {
      query: FindUserByEmail,
      variables: { email: "napandalesr@gmail.com "},
    },
    result: {
      data: {
        findUserByEmail: [
          {
            id: "1",
            role: "USER"
          }
        ]
      },
    },
  },
];