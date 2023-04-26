import { Event } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

import { useSession } from "next-auth/react";

async function fetchEvent(id: string) {
  const res = await fetch(`/events/api/${id}`);
  return res.json();
}

export const useEventQuery = (eventId: string) => {
  const { status } = useSession();

  return useQuery<Event>({
    queryKey: ["events", eventId],
    queryFn: () => fetchEvent(eventId),
    enabled: !!eventId && status === "authenticated",
    onSuccess: (data) => {
      // console.log("🚀 ~ useEventQuery ~ data:", data);
    },
  });
};
