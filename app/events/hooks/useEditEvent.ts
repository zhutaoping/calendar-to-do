import { useMutation } from "@tanstack/react-query";
import eventService from "@/app/services/eventService";

interface Props {
  onSuccess: () => void;
  onError?: () => void;
}

export const useEditEvent = ({ onSuccess, onError }: Props) => {
  return useMutation({
    mutationFn: eventService.editEvent,
    onSuccess,
    onError,
  });
};
