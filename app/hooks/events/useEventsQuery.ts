import { Event } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

async function fetchEvents() {
  const res = await fetch("/events/api");
  return res.json(); // from NextResponse
}

export const useEventsQuery = () => {
  const { data: session } = useSession();

  return useQuery<Event[]>({
    queryKey: ["events"],
    queryFn: fetchEvents,
    onSuccess: (data) => {
      console.log("🚀 ~ useEventsQuery ~ session:", session?.user);
      console.log("🚀 ~ useEventsQuery ~ data:", data);
    },
  });
};
