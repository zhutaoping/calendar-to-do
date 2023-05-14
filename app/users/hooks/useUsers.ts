import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export const useUsers = () => {
  async function fetchUsers() {
    const res = await fetch("/users/api", {});
    return res.json(); // from NextResponse
  }

  return useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: fetchUsers,
    onSuccess: (data) => {
      console.log("🚀 ~ useUsersQuery ~ data:", data);
    },
  });
};
