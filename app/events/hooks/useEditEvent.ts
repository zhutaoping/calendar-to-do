import { useMutation, useQueryClient } from '@tanstack/react-query'
import eventService from '@/app/services/eventService'
import { Event } from '@prisma/client'

interface Props {
  onSuccess: () => void
  onError?: () => void
}

export const useEditEvent = ({ onSuccess, onError }: Props) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: eventService.editEvent,
    onSuccess,

    onMutate: async editedEvent => {
      await queryClient.cancelQueries({ queryKey: ['events', editedEvent.id] })

      const previousEvents = queryClient.getQueryData<Event[]>(['events']) || []

      queryClient.setQueryData<Event[]>(['events'], old => {
        const newEvents = old?.map(event => {
          if (event.id === editedEvent.id) {
            return { ...event, ...editedEvent }
          }
          return event
        })
        return newEvents
      })

      return { previousEvents, editedEvent }
    },

    onError: (_error, newEvent, context) => {
      if (!context?.previousEvents) return

      queryClient.setQueryData(
        ['events', context?.editedEvent.id],
        context?.previousEvents,
      )
    },

    onSettled: resData => {
      queryClient.invalidateQueries({
        queryKey: ['events', resData?.id],
      })
    },
  })
}
