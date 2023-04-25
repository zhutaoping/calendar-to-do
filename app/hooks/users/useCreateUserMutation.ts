import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "@prisma/client";

async function addUser(user: Partial<User>) {
  const res = await fetch("/users/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  return res.json();
}

export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addUser,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(["users"]);
    },
  });
};
