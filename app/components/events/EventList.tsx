import { useQuery } from "@tanstack/react-query";
import { CgRemove } from "react-icons/cg";
import { Event } from "@prisma/client";
import { getEvents } from "@/app/lib/eventApi";

interface Props {
  activeDate: Date | null;
}

export default function Events({ activeDate }: Props) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["events", "eventsOfDay"],
    queryFn: getEvents,
  });

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
    <ul className="list-disc space-y-6 marker:text-primary">
      {eventList.map((evt) => (
        <li key={evt.id}>
          <div className="flex w-full items-center justify-between">
            <p className="text-base text-white">{evt.title}</p>
            <div>
              <CgRemove className="ml-2 inline-block h-4 w-4 text-gray-400" />
            </div>
          </div>
          <span className="text-xs text-gray-400">{evt.startTime} - </span>
          <span className="text-xs text-gray-400">{evt.endTime}</span>
        </li>
      ))}
    </ul>
  );
}
