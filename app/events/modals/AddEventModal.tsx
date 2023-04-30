import { Event } from "@prisma/client";
import EventForm from "../EventForm";
import Modal from "../../components/Modal";
import useAddEventModalStore from "@/app/store/AddEventModalStore";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";

interface Props {
  header: string;
  handleMutateEvent: (data: Partial<Event>) => void;
  isMobile: boolean;
}

const AddEventModal = ({ header, handleMutateEvent, isMobile }: Props) => {
  const { onClose } = useAddEventModalStore();

  const bodyContent = <EventForm handleMutateEvent={handleMutateEvent} />;

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
