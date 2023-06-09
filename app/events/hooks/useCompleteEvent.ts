import eventService from '@/app/events/services/eventService'
import { Event } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCompleteEvent = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: eventService.completeEvent,
    //* Optimistic update
    onMutate: async updatedEvent => {
      await queryClient.cancelQueries(['events', updatedEvent.id])

      const previousEvent = queryClient.getQueryData([
        'events',
        updatedEvent.id,
      ])

      queryClient.setQueryData<Event[]>(['events'], old => {
        const newEvents = old?.map(event => {
          if (event.id === updatedEvent.id) {
            return updatedEvent
          }
          return event
        })
        return newEvents
      })

      return { previousEvent, updatedEvent }
    },

    onError: (_err, updatedEvent, context) => {
      queryClient.setQueryData(
        ['events', context?.updatedEvent.id],
        context?.previousEvent,
      )
    },

    onSettled: resData => {
      queryClient.invalidateQueries({
        queryKey: ['events', resData?.id],
      })
    },
  })
}
