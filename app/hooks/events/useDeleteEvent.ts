import { Event } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();

  async function deleteEvent(id: string) {
    const res = await fetch(`/events/api`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    return res.json();
  }

  return useMutation({
    mutationFn: deleteEvent,
    // onSuccess: (data) => {
    //   console.log(
    //     "🚀 ~ file: useDeleteEventMutation.ts:21 ~ useDeleteEventMutation ~ data:",
    //     data
    //   );
    //   queryClient.invalidateQueries({ queryKey: ["events"] });
    // },
    onMutate: async (deletedId) => {
      await queryClient.cancelQueries(["events", deletedId]);

      const previousEvents = queryClient.getQueryData(["events"]);

      queryClient.setQueryData<Event[]>(["events"], (old) =>
        old?.filter((evt) => evt.id !== deletedId)
      );

      return { previousEvents };
    },

    onError: (_err, deletedId, context) => {
      queryClient.setQueryData(["events"], context?.previousEvents);
    },

    onSettled: (deletedId) => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};
