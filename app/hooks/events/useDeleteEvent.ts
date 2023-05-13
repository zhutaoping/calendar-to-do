import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Event } from "@prisma/client";
import APIEvent from "@/app/services/apiEvent";

const apiEvent = new APIEvent<string>("/events/api/");

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiEvent.deleteEvent,
    //* Optimistic Update
    onMutate: async (deletedId) => {
      await queryClient.cancelQueries(["events", deletedId]);

      const previousEvents = queryClient.getQueryData(["events"]);

      queryClient.setQueryData<Event[]>(["events"], (old) =>
        old?.filter((evt) => evt.id !== deletedId)
      );

      return { previousEvents };
    },

    onError: (error, deletedId, context) => {
      queryClient.setQueryData(["events"], context?.previousEvents);
    },

    onSettled: (deletedId) => {
      queryClient.invalidateQueries({ queryKey: ["events", deletedId] });
    },
  });
};
