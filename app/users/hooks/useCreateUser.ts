import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { User } from "@prisma/client";

interface Props {
  onSuccess?: (
    data: any,
    variables: Partial<User>,
    context: unknown
  ) => unknown;
  onError?: (error: any, variables: Partial<User>, context: unknown) => unknown;
}

export const useCreateUser = ({ onSuccess, onError }: Props) => {
  const queryClient = useQueryClient();

  async function addUser(user: Partial<User>) {
    const res = await axios.post("/users/api", user);
    return res.data;
  }

  return useMutation({
    mutationFn: addUser,
    onSuccess,
    onError,
    onSettled: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });
};
