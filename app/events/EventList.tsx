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
import EventItem from "./EventItem";
import useUpdateEventModalStore from "../hooks/modals/useUpdateEventModalStore";
import UpdateEventModal from "./modals/UpdateEventModal";

import { useSession } from "next-auth/react";

const AnimatedEventItem = motion(EventItem);

interface Props {
  activeDate: Date | null;
  localEvents: Event[];
  setLocalEvents: React.Dispatch<React.SetStateAction<Event[]>>;
}

export default function Events({
  activeDate,
  localEvents,
  setLocalEvents,
}: Props) {
  const { isOpen, onClose, onOpen } = useUpdateEventModalStore();
  const [eventId, setEventId] = useState("");
  const [eventList, setEventList] = useState<Event[]>([]);

  const { data: session, status } = useSession();

  const queryClient = useQueryClient();

  const { data: events, isLoading, isError, error } = useEventsQuery();
  const { data: event } = useEventQuery(eventId);
  const deleteEventMutation = useDeleteEventMutation();
  const completeEventMutation = useCompleteEventMutation();
  const editEventMutation = useEditEventMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(["events"]);
      onClose();
    },
  });

  function handleCompleted(e: MouseEvent, evt: Event) {
    e.stopPropagation();

    if (status === "unauthenticated") {
      const updatedEvents = localEvents.map((event) => {
        if (event.id === evt.id) {
          return {
            ...event,
            completed: !event.completed,
          };
        }
        return event;
      });
      onClose();
      setLocalEvents(updatedEvents);
      localStorage.setItem("events", JSON.stringify(updatedEvents));

      return;
    }

    setEventId(evt.id);

    completeEventMutation.mutate({
      ...evt,
      completed: !evt.completed,
    });
  }

  function handleEdit(data: Partial<Event>) {
    const { title, startTime, endTime, id } = data;

    if (status === "unauthenticated") {
      const updatedEvents = localEvents.map((event) => {
        if (event.id === id) {
          return {
            ...event,
            ...data,
          };
        }
        return event;
      });
      setEventId("");
      setLocalEvents(updatedEvents as Event[]);
      localStorage.setItem("events", JSON.stringify(updatedEvents));

      onClose();
      return;
    }

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

    if (status === "unauthenticated") {
      const filteredEvents = localEvents.filter((evt) => evt.id !== id);
      setLocalEvents(filteredEvents);
      localStorage.setItem("events", JSON.stringify(filteredEvents));

      return;
    }

    deleteEventMutation.mutate(id);
  }

  function handleClick(evt: Event) {
    setEventId(evt.id);
    if (evt.completed) return;
    onOpen();
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

  let showEvents = sortedEvents;
  if (status === "unauthenticated") {
    showEvents = localEvents;
  }

  let whichEvent = event;
  if (status === "unauthenticated") {
    whichEvent = localEvents.find((evt) => evt.id === eventId);
  }

  return (
    <>
      <UpdateEventModal
        id={eventId}
        event={whichEvent}
        header="Edit Event"
        handleMutateEvent={handleEdit}
      />
      <motion.ul
        layout="position"
        initial={{ minHeight: 0 }}
        animate={{ minHeight: "480px" }}
        className={`event-list overflow-auto text-textOnCalendar md:max-h-[380px] lg:max-h-[480px]`}
      >
        <AnimatePresence mode="popLayout">
          {showEvents.map((evt) => (
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
