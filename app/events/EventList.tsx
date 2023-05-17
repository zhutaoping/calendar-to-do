"use client";
import { MouseEvent, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { Event } from "@prisma/client";
import UpdateEventModal from "./modals/UpdateEventModal";
// Hooks
import { useEvents } from "./hooks/useEvents";
import { useEvent } from "./hooks/useEvent";
import { useDeleteEvent } from "./hooks/useDeleteEvent";
import { useCompleteEvent } from "./hooks/useCompleteEvent";
import { useEditEvent } from "./hooks/useEditEvent";
import EventItem from "./EventItem";
import { useUpdateEventModalStore } from "../stores/UpdateEventModalStore";
import { useMediaQuery } from "../hooks/useMediaQuery";

const AnimatedEventItem = motion(EventItem);

interface Props {
  activeDate: Date | null;
}

export default function Events({ activeDate }: Props) {
  const { isOpen, onClose, onOpen } = useUpdateEventModalStore();
  const [eventId, setEventId] = useState("");
  const [eventList, setEventList] = useState<Event[]>([]);
  const [dateNow, setDateNow] = useState("");

  useEffect(() => {
    setDateNow(Date.now().toString());
  }, [isOpen]);

  const isSmall = useMediaQuery("(max-width: 768px)");

  const { status } = useSession();
  const queryClient = useQueryClient();

  const { data: events, isLoading, isError, error, refetch } = useEvents();
  const { data: event } = useEvent(eventId);
  const deleteEventMutation = useDeleteEvent();
  const completeEventMutation = useCompleteEvent();
  const editEventMutation = useEditEvent({
    onSuccess: () => {
      queryClient.invalidateQueries(["events"]);
      onClose();
    },
  });

  const isLarge = useMediaQuery("(min-width: 1024px)");
  const isXL = useMediaQuery("(min-width: 1280px)");

  useEffect(() => {
    refetch();
  }, [status, refetch]);

  function handleCompleted(e: MouseEvent, evt: Event) {
    // e.stopPropagation();
    setEventId(evt.id);

    completeEventMutation.mutate({
      ...evt,
      completed: !evt.completed,
    });
  }

  function handleUpdate(data: Partial<Event>) {
    const { title, startTime, endTime, id } = data;

    if (id) setEventId(id);

    editEventMutation.mutate({
      id: eventId,
      title,
      startTime,
      endTime,
    });
  }

  function handleDelete(e: MouseEvent, eventId: string) {
    // e.stopPropagation();
    deleteEventMutation.mutate(eventId);
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

  let variants;
  if (isLarge) {
    variants = {
      initial: { minHeight: 0 },
      animate: { minHeight: "420px" },
    };
  } else if (isXL) {
    variants = {
      initial: { minHeight: 0 },
      animate: { minHeight: "475px" },
    };
  } else {
    variants = {
      initial: { minHeight: 0 },
      animate: { minHeight: "380px" },
    };
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          //! Need a key for AnimatePresence to work
          <UpdateEventModal
            key={dateNow}
            id={eventId}
            event={event}
            header="Edit Event"
            onMutateEvent={handleUpdate}
            isMobile={isSmall}
          />
        )}
      </AnimatePresence>
      <motion.ul
        layout="position"
        variants={variants}
        initial="initial"
        animate="animate"
        className={`event-list mb-8 overflow-y-auto text-textOnCalendar md:mb-0 md:max-h-[380px] lg:max-h-[420px] xl:max-h-[475px]`}
      >
        <AnimatePresence mode="popLayout">
          {sortedEvents.map((evt, index) => (
            <AnimatedEventItem
              layout="position"
              evt={evt}
              key={evt.id}
              index={index}
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
