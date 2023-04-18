import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Event } from "@prisma/client";
import { BsPlusCircle } from "react-icons/bs";
import addEvent from "../utils/eventFetcher";
import EventModal from "./EventModal";

type Props = {};

export default function AddEvent({}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const queryClient = useQueryClient();

  const createEventMutation = useMutation({
    mutationFn: addEvent,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(["events"]);
      setIsOpen(false);
    },
  });

  const handleAddEvent = (data: Partial<Event>) => {
    createEventMutation.mutate({
      ...data,
    });
  };

  return (
    <div className="">
      <EventModal
        heading="Add New Event"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleMutateEvent={handleAddEvent}
      />
      <motion.button
        className="focus-ring m-3 mx-auto flex focus-visible:ring-0 "
        type="button"
        onClick={() => setIsOpen(true)}
        title="Add event"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <BsPlusCircle color="white" size={30} />
      </motion.button>
    </div>
  );
}
