import { useMutation, useQueryClient } from "@tanstack/react-query";
import eventService from "@/app/services/eventService";
import { Event } from "@prisma/client";

interface AddEventContext {
  previousEvents: Event[];
}

export const useCreateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation<Event, Error, Partial<Event>, AddEventContext>({
    mutationFn: eventService.createEvent,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(["events"]);
    },
    //* Optimistic update
    //   onMutate: async (newEvent) => {
    //     await queryClient.cancelQueries({ queryKey: ["events"] });

    //     const previousEvents =
    //       queryClient.getQueryData<Event[]>(["events"]) || [];

    //     queryClient.setQueryData<Event[]>(["events"], (old = []) => [
    //       ...old,
    //       newEvent as Event,
    //     ]);

    //     return { previousEvents };
    //   },

    //   onError: (error, newEvent, context) => {
    //     if (!context?.previousEvents) return;

    //     queryClient.setQueryData(["events"], context?.previousEvents);
    //   },

    //   onSettled: () => {
    //     queryClient.invalidateQueries({
    //       queryKey: ["events"],
    //     });
    //   },
    // });
  });
};
