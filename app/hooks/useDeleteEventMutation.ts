import { Event } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export async function deleteEvent(id: string) {
  const res = await fetch(`/events/api`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  return res.json();
}

export const useDeleteEventMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEvent,
    onMutate: async (deletedId) => {
      await queryClient.cancelQueries(["events", deletedId]);

      const previousEvents = queryClient.getQueryData<Event>([
        "events",
        deletedId,
      ]);

      queryClient.setQueryData<Event[]>(["events"], (old) =>
        old?.filter((evt) => evt.id !== deletedId)
      );

      return { previousEvents };
    },

    onError: (_err, deletedId, context) => {
      queryClient.setQueryData<Event>(["events"], context?.previousEvents);
    },

    onSettled: (deletedId) => {
      queryClient.invalidateQueries({ queryKey: ["events", deletedId] });
    },
  });
};
