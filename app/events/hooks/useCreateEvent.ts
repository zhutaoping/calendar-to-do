import { useMutation, useQueryClient } from '@tanstack/react-query'
import eventService from '@/app/events/services/eventService'
import { Event } from '@prisma/client'

interface AddEventContext {
  previousEvents: Event[]
}

export const useCreateEvent = () => {
  const queryClient = useQueryClient()

  return useMutation<Event, Error, Partial<Event>, AddEventContext>({
    mutationFn: eventService.createEvent,

    //* Optimistic update
    //* newEvent is the data that we are sending to the server
    onMutate: async newEvent => {
      await queryClient.cancelQueries({ queryKey: ['events'] })

      const previousEvents = queryClient.getQueryData<Event[]>(['events']) || []

      queryClient.setQueryData<Event[]>(['events'], (old = []) => [
        ...old,
        newEvent as Event,
      ])

      return { previousEvents }
    },

    onError: (error, newEvent, context) => {
      queryClient.setQueryData(['events'], context?.previousEvents)
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['events'],
      })
    },
  })
}
