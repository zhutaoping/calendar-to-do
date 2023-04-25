"use client";
import { useSession, signOut } from "next-auth/react";

export const User = () => {
  const { data: session } = useSession();

  return (
    <>
      <button onClick={() => signOut()}>Sign Out</button>
      <p>Client Session</p>
      <p>{session?.user?.name}</p>
    </>
  );
};
