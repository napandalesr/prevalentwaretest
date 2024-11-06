import { gql } from "@apollo/client";

const CreateMovement = gql`
mutation CreateMovement($input: CreateMovementInput!) {
  createMovement(input: $input) {
    amount
    concept
    date
    type
  }
}
`;

export const useCreateMovementsMock = [
  {
    request: {
      query: CreateMovement,
      variables: {
        input: {
          amount:  100,
          concept:  "concept",
          date:  "date",
          type:  "EXPENSE",
          userId:  "1"
        }
      },
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