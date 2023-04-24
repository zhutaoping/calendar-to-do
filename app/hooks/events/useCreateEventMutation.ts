import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Event } from "@prisma/client";

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

export const useCreateEventMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addEvent,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(["events"]);
    },
  });
};
