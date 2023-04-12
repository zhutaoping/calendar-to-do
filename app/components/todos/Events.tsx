import { useDay } from "@/app/store/DayContext";
import { useEffect, useState } from "react";

interface Props {
  activeDate: Date | null;
}

const eventsArr = [
  {
    day: 13,
    month: 4,
    year: 2023,
    events: [
      {
        id: 1,
        title: "想辦法多睡點",
        time: "10:00 AM",
      },
      {
        id: 2,
        title:
          "Event 2 Event 2 lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, quas?",
        time: "11:00 AM",
      },
    ],
  },
];

export default function Events({ activeDate }: Props) {
  const { eventDay, setEventDay } = useDay();

  useEffect(() => {
    setEventDay(null);

    const targetDate = eventsArr.find(
      (evt) =>
        evt.day === activeDate?.getDate() &&
        evt.month === activeDate?.getMonth() + 1 &&
        evt.year === activeDate?.getFullYear()
    );
    setEventDay(targetDate ? targetDate : null);
  }, [activeDate, setEventDay]);

  return (
    <ul className="list-disc space-y-6 marker:text-primary">
      {eventDay?.events.map((evt) => (
        <li className="" key={evt.id}>
          <p className="mb-2 text-base leading-5 text-white">{evt.title}</p>
          <h3 className="text-xs text-gray-400">{evt.time}</h3>
        </li>
      ))}
    </ul>
  );
}
