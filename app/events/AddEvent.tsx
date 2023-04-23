import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Event } from "@prisma/client";
import { BsPlusCircle } from "react-icons/bs";
import Modal from "./formModal/Modal";
import { useCreateEventMutation } from "../hooks/useCreateEventMutation";
import MyTooltip from "../components/MyTooltip";

type Props = {};

export default function AddEvent({}: Props) {
  const [modalOpen, setModalOpen] = useState(false);

  const createEventMutation = useCreateEventMutation();

  const handleAddEvent = (data: Partial<Event>) => {
    createEventMutation.mutate({
      ...data,
    });
    setModalOpen(false);
  };

  return (
    <div>
      <MyTooltip title="Add New Event">
        <motion.button
          className="focus-ring m-4 mx-auto flex focus-visible:ring-0 "
          onClick={() => setModalOpen(true)}
          type="button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <BsPlusCircle color="white" size={30} />
        </motion.button>
      </MyTooltip>
      <AnimatePresence
        initial={false}
        // onExitComplete={() => setModalOpen(false)}
      >
        {modalOpen && (
          <Modal
            heading="Add New Event"
            handleMutateEvent={handleAddEvent}
            handleClose={() => setModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
