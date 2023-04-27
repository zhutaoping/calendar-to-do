import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export const User = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="text-white">
      <span className="text-yellow-500">Server Session: </span>
      <span className="text-green-500">{session?.user.name}/</span>
      <span className="text-primary">{session?.user.id}</span>
    </div>
  );
};
