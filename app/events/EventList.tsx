import { MouseEvent, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GrCheckbox, GrCheckboxSelected } from "react-icons/gr";
import { CgRemove } from "react-icons/cg";
import { VscCircleFilled } from "react-icons/vsc";
import { Event } from "@prisma/client";
import {
  completedEvent,
  deleteEvent,
  editEvent,
  getEvent,
  getEvents,
} from "@/app/utils/eventFetcher";
import Modal from "./Modal";

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
      console.log("🚀 ~ file: Events.tsx:33 ~ onSuccess: ~ data", data);
    },
  });

  const queryClient = useQueryClient();

  const deleteEventMutation = useMutation({
    mutationFn: deleteEvent,
    onSuccess: (data, variables, context) => {
      // from NextResponse
      console.log(data.message);
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
      console.log(
        "🚀 ~ file: EventList.tsx:61 ~ onMutate: ~ newEvent:",
        newEvent
      );
      await queryClient.cancelQueries(["events", newEvent.id]);

      const previousEvent = queryClient.getQueryData<Event>([
        "events",
        newEvent.id,
      ]);
      console.log(
        "🚀 ~ file: EventList.tsx:67 ~ onMutate: ~ previousEvent:",
        previousEvent
      );

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
      console.log(data.message);
      queryClient.invalidateQueries(["events"]);
      setModalOpen(false);
    },
  });

  function handleDelete(e: MouseEvent, id: string) {
    e.stopPropagation();

    deleteEventMutation.mutate(id);
  }

  function handleCheckBox(e: MouseEvent, evt: Event) {
    e.stopPropagation();

    updateEventMutation.mutate({
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

  if (isLoading) return <p>Loading...</p>;
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
      <ul className="event-list block text-textOnCalendar md:max-h-[380px] md:overflow-y-auto lg:max-h-[480px]">
        {deleteEventMutation.isError ? (
          <div className="p-2 text-sm text-red-500">
            An error occurred: {(deleteEventMutation.error as any).message}
          </div>
        ) : null}
        {sortedEvents.map((evt) => (
          <li
            className={`mb-1 ${
              evt.completed ? "" : "cursor-pointer"
            } bg-gradient-to-r from-slate-600 to-bgContainer px-8 py-2`}
            key={evt.id}
            onClick={() => handleClick(evt)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <VscCircleFilled className="h-4 w-4 text-primary" />
                <p
                  className={`transition-color max-w-[250px] text-base ${
                    evt.completed
                      ? "text-textOnCalendar line-through"
                      : "text-white"
                  }`}
                >
                  {evt.title}
                </p>
              </div>
              <button onClick={(e) => handleCheckBox(e, evt)} title="completed">
                {evt.completed ? (
                  <GrCheckboxSelected className="h-4 w-4 bg-gray-400" />
                ) : (
                  <GrCheckbox className="h-4 w-4 bg-gray-400" />
                )}
              </button>
            </div>
            <div className="flex justify-between pl-6">
              <div className="">
                <span className="text-xs text-gray-400">
                  {evt.startTime} -{" "}
                </span>
                <span className="text-xs text-gray-400">{evt.endTime}</span>
              </div>
              <button
                className="active:scale-95"
                type="button"
                title="delete"
                onClick={(e) => handleDelete(e, evt.id)}
              >
                <CgRemove className="h-4 w-4 text-gray-400" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
