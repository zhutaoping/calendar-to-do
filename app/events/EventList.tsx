import { MouseEvent, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Event } from "@prisma/client";
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

  function handleCheckBox(e: MouseEvent, evt: Event) {
    e.stopPropagation();

    completeEventMutation.mutate({
      id: evt.id,
      completed: !evt.completed,
    });
  }

  function handleEdit(data: Partial<Event>) {
    const { title, startTime, endTime } = data;

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
      const eventList = events.filter(
        (evt: Event) =>
          evt.day === activeDate.getDate() &&
          evt.month === activeDate.getMonth() + 1 &&
          evt.year === activeDate.getFullYear()
      );
      setEventList(eventList);
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
        layoutScroll
        style={{ overflow: "auto", fontSize: "1.2rem" }}
        className={`event-list block text-textOnCalendar md:max-h-[380px] lg:max-h-[480px]`}
      >
        {sortedEvents.length > 0 ? (
          sortedEvents.map((evt) => (
            <AnimatedEventItem
              layout
              evt={evt}
              key={evt.id}
              handleClick={handleClick}
              handleCheckBox={handleCheckBox}
              handleDelete={handleDelete}
            />
          ))
        ) : (
          <motion.p
            layout
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-lg text-white"
          >
            nothing to do, hooray...
          </motion.p>
        )}
      </motion.ul>
    </>
  );
}
