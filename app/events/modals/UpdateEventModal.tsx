import { Event } from "@prisma/client";
import EventForm from "../forms/EventForm";
import Modal from "./Modal";
import useUpdateEventModalStore from "@/app/hooks/modals/useUpdateEventModalStore";

interface Props {
  id: string;
  event?: Event;
  header: string;
  handleMutateEvent: (data: Partial<Event>) => void;
}

export default function UpdateEventModal({
  id,
  event,
  header,
  handleMutateEvent,
}: Props) {
  const { isOpen, onClose } = useUpdateEventModalStore();

  const bodyContent = (
    <EventForm id={id} event={event} handleMutateEvent={handleMutateEvent} />
  );

  return (
    <Modal
      header={header}
      isOpen={isOpen}
      onClose={onClose}
      body={bodyContent}
    />
  );
}
