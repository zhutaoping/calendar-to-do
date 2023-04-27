import { Event } from "@prisma/client";

export const checkHasEvent = (
  i: number,
  dayInView: Date,
  events: Event[] | null,
  plus: number // which month to check
) => {
  const filteredEvents = events?.filter(
    (event) =>
      event.month === dayInView.getMonth() + plus &&
      event.year === dayInView.getFullYear()
  );
  const filterArray = filteredEvents?.map((event) => event.day);

  return filterArray?.includes(i + 1);
};
