import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { User } from "@prisma/client";

async function addUser(user: Partial<User>) {
  const res = await axios.post("/users/api", user);
  return res.data;
  // const res = await fetch("/api/users", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(user),
  // });
  // return res.json();
}

interface Props {
  onSuccess?: (
    data: any,
    variables: Partial<User>,
    context: unknown
  ) => unknown;
  onError?: (error: any, variables: Partial<User>, context: unknown) => unknown;
}

export const useCreateUserMutation = ({ onSuccess, onError }: Props) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addUser,
    onSuccess,
    onError,
    onSettled: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });
};
