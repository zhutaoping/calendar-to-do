import { Event } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

async function fetchEvents() {
  const res = await fetch("/events/api", {});
  return res.json(); // from NextResponse
}

export const useEventsQuery = () => {
  return useQuery<Event[]>({
    queryKey: ["events"],
    queryFn: fetchEvents,
    onSuccess: (data) => {
      console.log("🚀 ~ file: EventList.tsx:44 ~ Events ~ data:", data);
    },
  });
};
