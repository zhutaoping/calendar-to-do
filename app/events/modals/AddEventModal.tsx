import { Event } from "@prisma/client";
import EventForm from "../forms/EventForm";
import Modal from "./Modal";
import useAddEventModalStore from "@/app/hooks/modals/useAddEventModalStore";

interface Props {
  header: string;
  handleMutateEvent: (data: Partial<Event>) => void;
}

export default function AddEventModal({ header, handleMutateEvent }: Props) {
  const { isOpen, onClose } = useAddEventModalStore();

  const bodyContent = <EventForm handleMutateEvent={handleMutateEvent} />;

  return (
    <Modal
      header={header}
      isOpen={isOpen}
      onClose={onClose}
      body={bodyContent}
    />
  );
}
