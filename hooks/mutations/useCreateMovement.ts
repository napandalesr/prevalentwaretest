
import { MovementType } from "@/types/movement";
import { FetchResult, gql, useMutation } from "@apollo/client";

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

export const useCreateMovement = (): {
  useHandleCreateMovement: (data: MovementType) => Promise<FetchResult<any>>;
  mutationLoading: boolean;
} => {
  const [createMovement, { loading: mutationLoading }] = useMutation(CreateMovement);

  const useHandleCreateMovement = async (data: MovementType) => {
    const { amount, concept, date, type, userId } = data;
    return await createMovement({
      variables: {
        input: {
          amount: parseFloat(amount),
          concept,
          date,
          type,
          userId
        }
      }
    });
  }
  

  return { useHandleCreateMovement, mutationLoading }
}