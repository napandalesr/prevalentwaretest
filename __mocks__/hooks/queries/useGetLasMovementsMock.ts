import { gql } from "@apollo/client";

const GetLastMovements = gql`
query GetLastMovements($limit: Int!) {
  getLastMovements(limit: $limit) {
    amount
    date
    type
  }
}`;

export const useGetLastMovementsMock = [
  {
    request: {
      query: GetLastMovements,
    },
    result: {
      data: {
        getLastMovements: [
          {
            amount: 100,
            date: '2024-11-06',
            type: 'INCOME'
          }
        ]
      }
    }
  }
]