import { useMutation } from "@tanstack/react-query";
import { Event } from "@prisma/client";
import APIEvent from "@/app/services/apiEvent";

const apiEvent = new APIEvent<Event>(`/events/api/`);

interface Props {
  onSuccess: () => void;
}

export const useEditEvent = ({ onSuccess }: Props) => {
  return useMutation({
    mutationFn: apiEvent.editEvent,
    onSuccess,
  });
};
