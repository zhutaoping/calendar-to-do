import { Event } from "@prisma/client";
import EventForm from "../EventForm";
import Modal from "../../components/Modal";
import { useAddEventModalStore } from "../../stores/AddEventModalStore";

interface Props {
  header: string;
  onMutateEvent: (data: Partial<Event>) => void;
  isMobile: boolean;
}

const AddEventModal = ({ header, onMutateEvent, isMobile }: Props) => {
  const { onClose } = useAddEventModalStore();

  const bodyContent = <EventForm onMutateEvent={onMutateEvent} />;

  return (
    <Modal
      header={header}
      onClose={onClose}
      body={bodyContent}
      fullPage={false}
      isMobile={isMobile}
    />
  );
};
export default AddEventModal;
