import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Event } from "@prisma/client";

export const useCreateEvent = () => {
  const queryClient = useQueryClient();

  async function addEvent(event: Partial<Event>) {
    const res = await fetch("/events/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });

    return res.json();
  }

  return useMutation({
    mutationFn: addEvent,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(["events"]);
    },
  });
};
