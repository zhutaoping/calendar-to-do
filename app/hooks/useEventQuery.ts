import { Event } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

async function fetchEvent(id: string, signal?: AbortSignal) {
  const res = await fetch(`/events/api/${id}`, {
    signal,
  });
  return res.json();
}

export const useEventQuery = (eventId: string) => {
  return useQuery<Event>({
    queryKey: ["events", eventId],
    queryFn: () => fetchEvent(eventId),
    enabled: !!eventId,
    onSuccess: (data) => {
      console.log("🚀 ~ file: EventList.tsx:44 ~ Events ~ data:", data);
    },
  });
};
