import { gql } from "@apollo/client";

const FindMovement = gql`
  query FindMovement {
    findMovement{
      id
      concept
      amount
      date
      user {
        name
        id
      }
      type
    }
  }
`;

export const useGetMovementsMock = [
  {
    request: {
      query: FindMovement,
    },
    result: {
      data: {
        findMovement: [
          {
            id: "1",
            concept: 'concept',
            amount: 100,
            date: '2024-11-06',
            user: {
              name: 'name',
              id: '0'
            },
            type: 'INCOME'
          }
        ]
      },
    },
  },
];