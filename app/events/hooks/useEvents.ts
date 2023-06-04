import { useQuery } from '@tanstack/react-query'
import eventService from '@/app/events/services/eventService'

export const useEvents = () => {
  return useQuery({
    queryKey: ['events'],
    queryFn: ({ signal }) => eventService.getEvents({ signal }),
    onSuccess: data => {
      // console.log("🚀 ~ useEventsQuery ~ data:", data);
    },
  })
}
