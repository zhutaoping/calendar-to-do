import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GrCheckbox, GrCheckboxSelected } from "react-icons/gr";
import { CgRemove } from "react-icons/cg";
import { VscCircleFilled } from "react-icons/vsc";
import { Event } from "@prisma/client";
import { deleteEvent, getEvents, updateEvent } from "@/app/lib/eventApi";
import { MouseEvent } from "react";

interface Props {
  activeDate: Date | null;
}

export default function Events({ activeDate }: Props) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["events", "eventsOfDay"],
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
    onError: (error: any) => {
      console.log(error);
    },
  });

  const updateEventMutation = useMutation({
    mutationFn: updateEvent,
    onSuccess: (data, variables, context) => {
      // from NextResponse
      console.log(data.message);
      queryClient.invalidateQueries(["events"]);
    },
    onError: (error: any) => {
      console.log(error);
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

  if (isLoading) return <p>Loading...</p>;
  if (isError) {
    return <pre>{JSON.stringify(error)}</pre>;
  }

  const events = data as Event[];

  let eventList: Event[] = [];

  if (events && activeDate) {
    eventList = events.filter(
      (evt) =>
        evt.day === activeDate.getDate() &&
        evt.month === activeDate.getMonth() + 1 &&
        evt.year === activeDate.getFullYear()
    );
  }

  function handleEditable(e: MouseEvent) {
    const element = e.target as HTMLDivElement;
    element.contentEditable = "true";
  }

  return (
    <ul className="event-list text-textOnCalendar md:max-h-[380px] md:overflow-y-auto">
      {deleteEventMutation.isError ? (
        <div className="text-sm text-red-500">
          An error occurred: {(deleteEventMutation.error as any).message}
        </div>
      ) : null}
      {eventList.map((evt) => (
        <li
          className="mb-1 bg-gradient-to-r from-slate-600 to-bgContainer px-8 py-2"
          key={evt.id}
        >
          <div
            onClick={(e) => handleEditable(e)}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <VscCircleFilled className="h-4 w-4 text-primary" />
              <p className="text-base text-white">{evt.title}</p>
            </div>
            <button onClick={() => handleCheckBox(evt)} title="completed">
              {evt.completed ? (
                <GrCheckboxSelected className="h-4 w-4 bg-gray-400" />
              ) : (
                <GrCheckbox className="h-4 w-4 bg-gray-400" />
              )}
            </button>
          </div>
          <div className="flex justify-between">
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
