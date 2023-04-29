import { Event } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCompleteEvent = () => {
  const queryClient = useQueryClient();

  async function completeEvent(event: Event) {
    const res = await fetch(`/events/api/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });
    return res.json();
  }

  return useMutation({
    mutationFn: completeEvent,
    onMutate: async (updatedEvent) => {
      await queryClient.cancelQueries(["events", updatedEvent.id]);

      const previousEvent = queryClient.getQueryData([
        "events",
        updatedEvent.id,
      ]);

      queryClient.setQueryData<Event[]>(["events"], (old) => {
        const newEvents = old?.map((event) => {
          if (event.id === updatedEvent.id) {
            return updatedEvent;
          }
          return event;
        });
        return newEvents;
      });

      return { previousEvent, updatedEvent };
    },

    onError: (_err, updatedEvent, context) => {
      queryClient.setQueryData(
        ["events", context?.updatedEvent.id],
        context?.previousEvent
      );
    },

    onSettled: (resData) => {
      queryClient.invalidateQueries({
        queryKey: ["events", resData.id],
      });
    },
  });
};
