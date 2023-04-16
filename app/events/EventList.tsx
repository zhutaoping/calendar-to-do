import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GrCheckbox, GrCheckboxSelected } from "react-icons/gr";
import { CgRemove } from "react-icons/cg";
import { VscCircleFilled } from "react-icons/vsc";
import { Event } from "@prisma/client";
import { deleteEvent, getEvents, updateEvent } from "@/app/utils/eventFetcher";

interface Props {
  activeDate: Date | null;
}

export default function Events({ activeDate }: Props) {
  const [eventList, setEventList] = useState<Event[]>([]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
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
    mutationFn: updateEvent,
    onSuccess: (data, variables, context) => {
      // from NextResponse
      console.log(data.message);
      queryClient.invalidateQueries(["events"]);
    },
  });

  function handleDelete(id: string) {
    deleteEventMutation.mutate(id);
  }

  function handleCheckBox(evt: Event) {
    updateEventMutation.mutate({
      ...evt,
      completed: !evt.completed,
    });
  }

  const events = data as Event[];

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

  // function handleEditable(e: MouseEvent) {
  //   const element = e.target as HTMLDivElement;
  //   element.contentEditable = "true";
  // }

  return (
    <ul className="event-list block text-textOnCalendar md:max-h-[390px] md:overflow-y-auto lg:max-h-[480px]">
      {deleteEventMutation.isError ? (
        <div className="p-2 text-sm text-red-500">
          An error occurred: {(deleteEventMutation.error as any).message}
        </div>
      ) : null}
      {eventList.map((evt) => (
        <li
          className="mb-1 bg-gradient-to-r from-slate-600 to-bgContainer px-8 py-2"
          key={evt.id}
        >
          <div
            // onClick={(e) => handleEditable(e)}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <VscCircleFilled className="h-4 w-4 text-primary" />
              <p className="max-w-[250px] text-base text-white">{evt.title}</p>
            </div>
            <button onClick={() => handleCheckBox(evt)} title="completed">
              {evt.completed ? (
                <GrCheckboxSelected className="h-4 w-4 bg-gray-400" />
              ) : (
                <GrCheckbox className="h-4 w-4 bg-gray-400" />
              )}
            </button>
          </div>
          <div className="flex justify-between pl-6">
            <div className="">
              <span className="text-xs text-gray-400">{evt.startTime} - </span>
              <span className="text-xs text-gray-400">{evt.endTime}</span>
            </div>
            <button
              className="active:scale-95"
              type="button"
              title="delete"
              onClick={() => handleDelete(evt.id)}
            >
              <CgRemove className="h-4 w-4 text-gray-400" />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
