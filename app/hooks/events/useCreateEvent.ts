import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Event } from "@prisma/client";
import APIEvent from "@/app/services/apiEvent";

const apiEvent = new APIEvent<Event>("/events/api");

export const useCreateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiEvent.createEvent,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(["events"]);
    },
  });
};
