import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Event } from "@prisma/client";
import { BsPlusCircle } from "react-icons/bs";
import Modal from "./formModal/Modal";
import { useCreateEventMutation } from "../hooks/useCreateEventMutation";

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
      <motion.button
        className="focus-ring m-4 mx-auto flex focus-visible:ring-0 "
        type="button"
        onClick={() => setModalOpen(true)}
        title="Add event"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <BsPlusCircle color="white" size={30} />
      </motion.button>
      <AnimatePresence
        initial={false}
        // onExitComplete={() => setModalOpen(false)}
      >
        {modalOpen && (
          <Modal
            handleMutateEvent={handleAddEvent}
            handleClose={() => setModalOpen(false)}
            heading="Add New Event"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
