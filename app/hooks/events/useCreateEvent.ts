import { useMutation, useQueryClient } from "@tanstack/react-query";
import eventService from "@/app/services/eventService";

export const useCreateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: eventService.createEvent,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(["events"]);
    },
  });
};
