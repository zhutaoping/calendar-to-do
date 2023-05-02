import { Event } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

// import { useSession } from "next-auth/react";

export const useEvent = (eventId: string) => {
  // const { status } = useSession();

  // async function fetchEvent(id: string) {
  //   const res = await fetch(`/events/api/${id}`);
  //   return res.json();
  // }

  return useQuery<Event, Error>({
    queryKey: ["events", eventId],
    queryFn: async ({ signal }) => {
      const data = await fetch(`/events/api/${eventId}`, {
        signal,
      })
        .then((res) => res.json())
        .catch((error) => {
          console.log("🚀 ~ useEventQuery ~ error:", error);
        });
      return data;
    },
    // fetchEvent(eventId),
    enabled: !!eventId,
    onSuccess: (data) => {
      // console.log("🚀 ~ useEventQuery ~ data:", data);
    },
  });
};
