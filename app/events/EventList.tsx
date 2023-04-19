import { MouseEvent, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { Event } from "@prisma/client";
import {
  completedEvent,
  deleteEvent,
  editEvent,
  getEvent,
  getEvents,
} from "@/app/utils/eventFetcher";
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

  const {
    data: events,
    isLoading,
    isError,
    error,
  } = useQuery<Event[]>({
    queryKey: ["events"],
    queryFn: getEvents,
  });

  const { data: event } = useQuery<Event>({
    queryKey: ["events", eventId],
    queryFn: () => getEvent(eventId),
    enabled: !!eventId,
    onSuccess: (data) => {
      // console.log("🚀 ~ file: Events.tsx:33 ~ onSuccess: ~ data", data);
    },
  });

  const queryClient = useQueryClient();

  const deleteEventMutation = useMutation({
    mutationFn: deleteEvent,
    onSuccess: (data, variables, context) => {
      // from NextResponse
      // console.log(data.message);
      queryClient.invalidateQueries(["events"]);
    },
  });

  const updateEventMutation = useMutation({
    mutationFn: completedEvent,
    // onSuccess: (data, variables, context) => {
    //   console.log(data.message);
    //   queryClient.invalidateQueries(["events", data.id]);
    // },
    onMutate: async (newEvent) => {
      await queryClient.cancelQueries(["events", newEvent.id]);

      const previousEvent = queryClient.getQueryData<Event>([
        "events",
        newEvent.id,
      ]);

      queryClient.setQueryData<Partial<Event>>(
        ["events", newEvent.id],
        newEvent
      );

      return { previousEvent, newEvent };
    },

    onError: (err, newEvent, context) => {
      queryClient.setQueryData(
        ["events", context?.newEvent.id],
        context?.previousEvent
      );
    },

    onSettled: (newEvent) => {
      queryClient.invalidateQueries({ queryKey: ["events", newEvent.id] });
    },
  });

  const editEventMutation = useMutation({
    mutationFn: editEvent,
    onSuccess: (data, variables, context) => {
      // console.log(data.message);
      queryClient.invalidateQueries(["events"]);
      setModalOpen(false);
    },
  });

  function handleCheckBox(e: MouseEvent, evt: Event) {
    e.stopPropagation();

    updateEventMutation.mutate({
      id: evt.id,
      completed: !evt.completed,
    });
  }

  function handleDelete(e: MouseEvent, id: string) {
    e.stopPropagation();

    deleteEventMutation.mutate(id);
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

  useEffect(() => {
    if (events && activeDate) {
      const eventList = events.filter(
        (evt) =>
          evt.day === activeDate.getDate() &&
          evt.month === activeDate.getMonth() + 1 &&
          evt.year === activeDate.getFullYear()
      );
      setEventList(eventList);
    }
  }, [events, activeDate]);

  if (isLoading)
    return <p className="mx-auto text-lg text-white">Loading...</p>;
  if (isError) {
    return <pre>{JSON.stringify(error)}</pre>;
  }

  const sortedEvents = eventList.sort((a, b) => {
    if (a.startTime < b.startTime) {
      return -1;
    }
    if (a.startTime > b.startTime) {
      return 1;
    }
    return 0;
  });

  function handleClick(evt: Event) {
    setEventId(evt.id);
    if (evt.completed) return;
    setModalOpen(true);
  }

  return (
    <>
      {modalOpen && (
        <Modal
          id={eventId}
          event={event}
          handleMutateEvent={handleEdit}
          handleClose={() => setModalOpen(false)}
          heading="Edit Event"
        />
      )}
      <motion.ul
        layout
        className={`event-list block text-textOnCalendar md:max-h-[380px] md:overflow-auto lg:max-h-[480px]`}
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
          <p className="text-center text-lg text-white">
            nothing to do, hooray...
          </p>
        )}
      </motion.ul>
    </>
  );
}
