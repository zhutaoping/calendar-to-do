import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

async function fetchUser(id: string) {
  const res = await fetch(`/users/api/${id}`);
  return res.json();
}

export const useUserQuery = (userId: string) => {
  return useQuery<User>({
    queryKey: ["users", userId],
    queryFn: () => fetchUser(userId),
    // enabled: !!userId,
    onSuccess: (data) => {
      console.log("🚀 ~ useUserQuery ~ data:", data);
    },
  });
};
