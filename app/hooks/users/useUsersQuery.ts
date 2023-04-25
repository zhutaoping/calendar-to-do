import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

async function fetchUsers() {
  const res = await fetch("/users/api", {});
  return res.json(); // from NextResponse
}

export const useUsersQuery = () => {
  return useQuery<Event[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
    onSuccess: (data) => {
      console.log("🚀 ~ useUsersQuery ~ data:", data);
    },
  });
};
