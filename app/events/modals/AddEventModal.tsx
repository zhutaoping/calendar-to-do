import { Event } from "@prisma/client";
import EventForm from "../EventForm";
import Modal from "../../components/Modal";
import useAddEventModalStore from "@/app/store/AddEventModalStore";

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
