import { useMutation } from "@tanstack/react-query";
import { Event } from "@prisma/client";

interface Props {
  onSuccess: () => void;
}

export const useEditEvent = ({ onSuccess }: Props) => {
  async function editEvent(event: Partial<Event>) {
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
    mutationFn: editEvent,
    onSuccess,
  });
};
