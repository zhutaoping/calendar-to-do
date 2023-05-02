import { useQuery } from "@tanstack/react-query";
import { Event } from "@prisma/client";
// import { useSession } from "next-auth/react";

export const useEvents = () => {
  // const { data: session } = useSession();
  return useQuery<Event[], Error>({
    queryKey: ["events"],
    queryFn: async ({ signal }) => {
      const data = await fetch("/events/api", {
        signal,
      })
        .then((res) => res.json())
        .catch((error) => {
          console.log("🚀 ~ useEventQuery ~ error:", error);
        }); // from NextResponse

      return data;
    },
    onSuccess: (data) => {
      // console.log("🚀 ~ useEventsQuery ~ session:", session?.user);
      // console.log("🚀 ~ useEventsQuery ~ data:", data);
    },
  });
};
