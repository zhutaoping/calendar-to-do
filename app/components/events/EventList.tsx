import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CgRemove } from "react-icons/cg";
import { Event } from "@prisma/client";
import { deleteEvent, getEvents } from "@/app/lib/eventApi";

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

  function handleDelete(id: string) {
    deleteEventMutation.mutate(id);
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

  return (
    <ul className="list-disc space-y-6 px-2 marker:text-primary">
      {deleteEventMutation.isError ? (
        <div className="text-sm text-red-500">
          An error occurred: {(deleteEventMutation.error as any).message}
        </div>
      ) : null}
      {eventList.map((evt) => (
        <li className="mx-4" key={evt.id}>
          <div className="flex w-full items-center justify-between">
            <p className="text-base text-white">{evt.title}</p>
            <button
              className="mx-2 active:scale-95"
              type="button"
              onClick={() => handleDelete(evt.id)}
            >
              <CgRemove className="inline h-4 w-4 text-gray-400 " />
            </button>
          </div>
          <span className="text-xs text-gray-400">{evt.startTime} - </span>
          <span className="text-xs text-gray-400">{evt.endTime}</span>
        </li>
      ))}
    </ul>
  );
}
