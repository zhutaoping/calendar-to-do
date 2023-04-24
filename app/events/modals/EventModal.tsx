import { Event } from "@prisma/client";
import useEventModalStore from "@/app/hooks/useEventModalStore";
import EventForm from "./EventForm";
import Modal from "./Modal";

interface Props {
  id?: string;
  event?: Event;
  header: string;
  handleMutateEvent: (data: Partial<Event>) => void;
}

export default function EventModal({
  id,
  event,
  header,
  handleMutateEvent,
}: Props) {
  const eventModal = useEventModalStore();

  const bodyContent = (
    <EventForm event={event} handleMutateEvent={handleMutateEvent} />
  );

  return (
    <Modal
      id={id}
      event={event}
      header={header}
      handleMutateEvent={handleMutateEvent}
      isOpen={eventModal.isOpen}
      onClose={eventModal.onClose}
      body={bodyContent}
    />
  );
}
