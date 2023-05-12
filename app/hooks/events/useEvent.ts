import { Event } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import APIEvent from "@/app/services/apiEvent";

const apiEvent = new APIEvent<Event>(`/events/api/`);

export const useEvent = (eventId: string) => {
  return useQuery<Event, Error>({
    queryKey: ["events", eventId],
    queryFn: ({ signal }) => apiEvent.getEvent(eventId, { signal }),
    enabled: !!eventId,
    onSuccess: (data) => {
      // console.log("🚀 ~ useEventQuery ~ data:", data);
    },
  });
};
