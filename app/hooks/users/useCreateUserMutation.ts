import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { User } from "@prisma/client";

async function addUser(user: Partial<User>) {
  const res = await axios.post("/users/api", user);
  return res.data;
}

interface Props {
  onSuccess: (data: any, variables: Partial<User>, context: unknown) => unknown;
}

export const useCreateUserMutation = ({ onSuccess }: Props) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addUser,
    onSuccess,
    onSettled: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });
};
