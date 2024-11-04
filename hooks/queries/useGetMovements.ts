import { dataSourceMovement } from "@/types/table";
import { ApolloError, gql, OperationVariables, useQuery } from "@apollo/client";

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

type findMovementType = {
  findMovement: dataSourceMovement[]
}

export const useGetMovements = (): {
  findMovement: dataSourceMovement[];
  loadingMovement: boolean;
  errorMovement: ApolloError | undefined;
  refetchMovement: (variables?: Partial<OperationVariables> | undefined) => Promise<any>;
} => {
  const { data: dataSourceMovement, loading : loadingMovement, error: errorMovement, refetch: refetchMovement } = useQuery<findMovementType>(FindMovement);
  return { findMovement: dataSourceMovement?.findMovement ?? [], loadingMovement, errorMovement, refetchMovement };
};