import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { BsPlusCircle } from "react-icons/bs";
import { Event } from "@prisma/client";
import { useCreateEventMutation } from "../hooks/events/useCreateEventMutation";
import MyTooltip from "../components/MyTooltip";
import useAddEventModalStore from "../hooks/modals/useAddEventModalStore";
import AddEventModal from "./modals/AddEventModal";

type Props = {
  localEvents: Event[];
  setLocalEvents: React.Dispatch<React.SetStateAction<Event[]>>;
};

export default function AddEvent({ localEvents, setLocalEvents }: Props) {
  const createEventMutation = useCreateEventMutation();
  const { isOpen, onOpen, onClose } = useAddEventModalStore();

  const { data: session, status } = useSession();
  const userId = session?.user?.id;

  const handleAddEvent = (data: Partial<Event>) => {
    const newData = { ...data, id: Date.now().toString() };

    if (status === "unauthenticated") {
      setLocalEvents([...localEvents, newData as Event]);
      localStorage.setItem("events", JSON.stringify(localEvents));
      onClose();
      return;
    }
    console.log("Authenticated");
    createEventMutation.mutate({
      ...data,
      userId,
    });
    onClose();
  };

  return (
    <div>
      <MyTooltip title="Add New Event">
        <motion.button
          className="focus-ring m-4 mx-auto flex focus-visible:ring-0 "
          onClick={() => onOpen()}
          type="button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <BsPlusCircle color="white" size={30} />
        </motion.button>
      </MyTooltip>
      <AnimatePresence initial={false}>
        <AddEventModal
          header="Add New Event"
          handleMutateEvent={handleAddEvent}
        />
      </AnimatePresence>
    </div>
  );
}
