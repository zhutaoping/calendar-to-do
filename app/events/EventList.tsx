import { MouseEvent, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { Event } from "@prisma/client";
// Hooks
import { useEventsQuery } from "../hooks/events/useEventsQuery";
import { useEventQuery } from "../hooks/events/useEventQuery";
import { useDeleteEventMutation } from "../hooks/events/useDeleteEventMutation";
import { useCompleteEventMutation } from "../hooks/events/useCompleteEventMutation";
import { useEditEventMutation } from "../hooks/events/useEditEventMutation";
import useEventModalStore from "../hooks/modals/useUpdateEventModalStore";
import EventModal from "./modals/UpdateEventModal";
import EventItem from "./EventItem";
import EventForm from "./forms/EventForm";
import Modal from "./modals/Modal";
import useUpdateEventModalStore from "../hooks/modals/useUpdateEventModalStore";
import UpdateEventModal from "./modals/UpdateEventModal";

const AnimatedEventItem = motion(EventItem);

interface Props {
  activeDate: Date | null;
}

export default function Events({ activeDate }: Props) {
  const updateEventModal = useUpdateEventModalStore();
  const [eventId, setEventId] = useState("");
  const [eventList, setEventList] = useState<Event[]>([]);

  const queryClient = useQueryClient();

  const { data: events, isLoading, isError, error } = useEventsQuery();
  const { data: event } = useEventQuery(eventId);
  const deleteEventMutation = useDeleteEventMutation();
  const completeEventMutation = useCompleteEventMutation();
  const editEventMutation = useEditEventMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(["events"]);
      updateEventModal.onClose();
    },
  });

  function handleCompleted(e: MouseEvent, evt: Event) {
    e.stopPropagation();

    setEventId(evt.id);

    completeEventMutation.mutate({
      ...evt,
      completed: !evt.completed,
    });
  }

  function handleEdit(data: Partial<Event>) {
    const { title, startTime, endTime, id } = data;

    if (id) setEventId(id);

    editEventMutation.mutate({
      id: eventId,
      title,
      startTime,
      endTime,
    });
  }

  function handleDelete(e: MouseEvent, id: string) {
    e.stopPropagation();

    deleteEventMutation.mutate(id);
  }

  function handleClick(evt: Event) {
    console.log("HHHEEERRREEE");
    setEventId(evt.id);
    if (evt.completed) return;
    updateEventModal.onOpen();
  }

  useEffect(() => {
    if (events && activeDate) {
      const listOfDay = events.filter(
        (evt: Event) =>
          evt.day === activeDate.getDate() &&
          evt.month === activeDate.getMonth() + 1 &&
          evt.year === activeDate.getFullYear()
      );
      setEventList(listOfDay);
    }
  }, [events, activeDate]);

  const sortedEvents = eventList.sort((a, b) => {
    if (a.startTime < b.startTime) {
      return -1;
    }
    if (a.startTime > b.startTime) {
      return 1;
    }
    return 0;
  });

  if (isLoading)
    return <p className="mx-auto text-lg text-white">Loading...</p>;
  if (isError) {
    return <pre>{JSON.stringify(error)}</pre>;
  }

  return (
    <>
      <UpdateEventModal
        id={eventId}
        event={event}
        header="Edit Event"
        handleMutateEvent={handleEdit}
      />
      <motion.ul
        layout="position"
        initial={{ minHeight: 0 }}
        animate={{
          minHeight: "480px",
        }}
        className={`event-list overflow-auto text-textOnCalendar md:max-h-[380px] lg:max-h-[480px]`}
      >
        <AnimatePresence>
          {sortedEvents.map((evt) => (
            <AnimatedEventItem
              layout="position"
              evt={evt}
              key={evt.id}
              handleClick={handleClick}
              handleCompleted={handleCompleted}
              handleDelete={handleDelete}
            />
          ))}
        </AnimatePresence>
      </motion.ul>
    </>
  );
}
