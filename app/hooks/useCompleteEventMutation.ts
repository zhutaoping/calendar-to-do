import { Event } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function completeEvent(event: Partial<Event>) {
  const res = await fetch(`/events/api/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  });
  return res.json();
}

export const useCompleteEventMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: completeEvent,
    onMutate: async (newEvent) => {
      await queryClient.cancelQueries(["events", newEvent.id]);

      const previousEvent = queryClient.getQueryData(["events", newEvent.id]);

      queryClient.setQueryData(["events", newEvent.id], newEvent);

      return { previousEvent, newEvent };
    },

    onError: (_err, newEvent, context) => {
      queryClient.setQueryData(
        ["events", context?.newEvent.id],
        context?.previousEvent
      );
    },

    onSettled: (newEvent) => {
      queryClient.invalidateQueries({
        queryKey: ["events", newEvent.id],
      });
    },
  });
};
