import { Event } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
// import { useSession } from "next-auth/react";

export const useEvents = () => {
  // const { data: session } = useSession();

  async function fetchEvents() {
    const res = await fetch("/events/api");
    return res.json(); // from NextResponse
  }

  return useQuery<Event[], Error>({
    queryKey: ["events"],
    queryFn: fetchEvents,
    onSuccess: (data) => {
      // console.log("🚀 ~ useEventsQuery ~ session:", session?.user);
      // console.log("🚀 ~ useEventsQuery ~ data:", data);
    },
  });
};
