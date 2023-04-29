import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export const useUser = (userId: string) => {
  async function fetchUser(id: string) {
    const res = await fetch(`/users/api/${id}`);
    return res.json();
  }

  return useQuery<User, Error>({
    queryKey: ["users", userId],
    queryFn: () => fetchUser(userId),
    // enabled: !!userId,
    onSuccess: (data) => {
      console.log("🚀 ~ useUserQuery ~ data:", data);
    },
  });
};
