import { dataSourceMovement } from "@/types/table";
import { ApolloError, gql, OperationVariables, useQuery } from "@apollo/client";

const GetLastMovements = gql`
query GetLastMovements($limit: Int!) {
  getLastMovements(limit: $limit) {
    amount
    date
    type
  }
}`;

type getLastMovementsType = {
  getLastMovements: dataSourceMovement[]
}

export const useGetLasMovements = (): {
  getLastMovements: getLastMovementsType;
  loadingGetLastMovements: boolean;
  errorGetLastMovements: ApolloError | undefined;
  refetch: (variables?: Partial<OperationVariables> | undefined) => Promise<any>;
} => {
  const { data: getLastMovements, loading: loadingGetLastMovements, error: errorGetLastMovements, refetch } = useQuery(GetLastMovements, {
    variables: { limit: 4 }, 
  });
  return { getLastMovements: getLastMovements, loadingGetLastMovements, errorGetLastMovements, refetch };
};