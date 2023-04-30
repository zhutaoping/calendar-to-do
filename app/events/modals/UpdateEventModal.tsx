import { Event } from "@prisma/client";
import EventForm from "../EventForm";
import Modal from "../../components/Modal";
import useUpdateEventModalStore from "@/app/store/UpdateEventModalStore";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";

interface Props {
  id: string;
  event?: Event;
  header: string;
  handleMutateEvent: (data: Partial<Event>) => void;
  isMobile: boolean;
}

export default function UpdateEventModal({
  id,
  event,
  header,
  handleMutateEvent,
  isMobile,
}: Props) {
  const { onClose } = useUpdateEventModalStore();

  const bodyContent = (
    <EventForm id={id} event={event} handleMutateEvent={handleMutateEvent} />
  );

  return (
    <Modal
      header={header}
      onClose={onClose}
      body={bodyContent}
      fullPage={false}
      isMobile={isMobile}
    />
  );
}
