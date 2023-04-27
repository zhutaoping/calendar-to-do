import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { BsPlusCircle } from "react-icons/bs";
import { Event } from "@prisma/client";
import { useCreateEventMutation } from "../hooks/events/useCreateEventMutation";
import MyTooltip from "../components/MyTooltip";
import useAddEventModalStore from "../hooks/modals/useAddEventModalStore";
import AddEventModal from "./modals/AddEventModal";

export default function AddEvent() {
  const createEventMutation = useCreateEventMutation();
  const { onOpen, onClose } = useAddEventModalStore();

  const { data: session, status } = useSession();
  const userId = session?.user?.id || null;

  const handleAddEvent = (data: Partial<Event>) => {
    const newData = { ...data, id: Date.now().toString() };
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
          className="add-btn focus-ring mx-auto my-4 flex focus-visible:ring-0 md:absolute md:bottom-4 md:left-1/2"
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
