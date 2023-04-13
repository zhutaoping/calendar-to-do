import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Event } from "@prisma/client";

interface Props {
  activeDate: Date | null;
}

export default function Events({ activeDate }: Props) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["events"],
    queryFn: () => axios.get("/api/events").then((res) => res.data),
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
        <li className="" key={evt.id}>
          <p className="text-base text-white">{evt.title}</p>
          <span className="text-xs text-gray-400">{evt.startTime} - </span>
          <span className="text-xs text-gray-400">{evt.endTime}</span>
        </li>
      ))}
    </ul>
  );
}
