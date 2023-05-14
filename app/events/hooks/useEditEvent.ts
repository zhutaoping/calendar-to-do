import { useMutation } from "@tanstack/react-query";
import eventService from "@/app/services/eventService";

interface Props {
  onSuccess: () => void;
}

export const useEditEvent = ({ onSuccess }: Props) => {
  return useMutation({
    mutationFn: eventService.editEvent,
    onSuccess,
  });
};
