import { useQuery } from "@tanstack/react-query";
import eventService from "@/app/services/eventService";

export const useEvent = (eventId: string) => {
  return useQuery({
    queryKey: ["events", eventId],
    queryFn: ({ signal }) => eventService.getEvent(eventId, { signal }),
    enabled: !!eventId,
    onSuccess: (data) => {
      // console.log("🚀 ~ useEventQuery ~ data:", data);
    },
  });
};
