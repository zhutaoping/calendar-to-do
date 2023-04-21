import { MouseEvent, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Event } from "@prisma/client";
// Hooks
import { useEventsQuery } from "../hooks/useEventsQuery";
import { useEventQuery } from "../hooks/useEventQuery";
import { useDeleteEventMutation } from "../hooks/useDeleteEventMutation";
import { useCompleteEventMutation } from "../hooks/useCompleteEventMutation";
import { useEditEventMutation } from "../hooks/useEditEventMutation";
import Modal from "./Modal";
import EventItem from "./EventItem";

const AnimatedEventItem = motion(EventItem);

interface Props {
  activeDate: Date | null;
}

export default function Events({ activeDate }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
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
      setModalOpen(false);
    },
  });

  function handleCompleted(e: MouseEvent, evt: Event) {
    e.stopPropagation();

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
    setEventId(evt.id);
    if (evt.completed) return;
    setModalOpen(true);
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
      {modalOpen && (
        <Modal
          id={eventId}
          event={event}
          heading="Edit Event"
          handleMutateEvent={handleEdit}
          handleClose={() => setModalOpen(false)}
        />
      )}
      <motion.ul
        layout
        initial={{ minHeight: 0 }}
        animate={{
          minHeight: "480px",
        }}
        className={`event-list overflow-auto text-textOnCalendar md:max-h-[380px] lg:max-h-[480px]`}
      >
        {sortedEvents.map((evt) => (
          <AnimatedEventItem
            layout
            evt={evt}
            key={evt.id}
            handleClick={handleClick}
            handleCompleted={handleCompleted}
            handleDelete={handleDelete}
          />
        ))}
      </motion.ul>
    </>
  );
}
