import { useQuery } from "@tanstack/react-query";

async function fetchEvents() {
  const res = await fetch("/events/api");
  return res.json(); // from NextResponse
}

export const useEventsQuery = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
    onSuccess: (data) => {},
  });
};
