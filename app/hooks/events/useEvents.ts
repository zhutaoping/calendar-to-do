import { useQuery } from "@tanstack/react-query";
import { Event } from "@prisma/client";
import APIEvent from "@/app/services/apiEvent";

const apiEvent = new APIEvent<Event>("/events/api");

export const useEvents = () => {
  return useQuery<Event[], Error>({
    queryKey: ["events"],
    queryFn: (signal) => apiEvent.getEvents(signal),
    onSuccess: (data) => {
      // console.log("🚀 ~ useEventsQuery ~ data:", data);
    },
  });
};
