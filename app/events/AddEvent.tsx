import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Event } from "@prisma/client";
import { BsPlusCircle } from "react-icons/bs";
import addEvent from "../utils/eventFetcher";
import Modal from "./Modal";

type Props = {};

export default function AddEvent({}: Props) {
  const [modalOpen, setModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const createEventMutation = useMutation({
    mutationFn: addEvent,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(["events"]);
    },
  });

  const handleAddEvent = (data: Partial<Event>) => {
    createEventMutation.mutate({
      ...data,
    });
    setModalOpen(false);
  };

  return (
    <div>
      <motion.button
        className="focus-ring m-3 mx-auto flex focus-visible:ring-0 "
        type="button"
        onClick={() => setModalOpen(true)}
        title="Add event"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
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
