import { motion, AnimatePresence } from "framer-motion";
import { Event } from "@prisma/client";
import { BsPlusCircle } from "react-icons/bs";
import { useCreateEventMutation } from "../hooks/events/useCreateEventMutation";
import MyTooltip from "../components/MyTooltip";

import useAddEventModalStore from "../hooks/modals/useAddEventModalStore";
import AddEventModal from "./modals/AddEventModal";

type Props = {};

export default function AddEvent({}: Props) {
  const createEventMutation = useCreateEventMutation();
  const { isOpen, onOpen, onClose } = useAddEventModalStore();

  const handleAddEvent = (data: Partial<Event>) => {
    createEventMutation.mutate({
      ...data,
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
