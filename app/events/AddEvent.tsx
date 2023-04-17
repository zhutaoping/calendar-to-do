import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
      <button
        className="focus-ring m-3 mx-auto flex focus-visible:ring-0 active:scale-95"
        type="button"
        onClick={() => setIsOpen(true)}
        title="Add event"
      >
        <BsPlusCircle color="white" size={30} />
      </button>
    </div>
  );
}
