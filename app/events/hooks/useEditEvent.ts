import { useMutation, useQueryClient } from '@tanstack/react-query'
import eventService from '@/app/events/services/eventService'
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

      const previousEvent = queryClient.getQueryData<Event>([
        'events',
        editedEvent.id,
      ])

      queryClient.setQueryData<Event[]>(['events'], (old = []) => {
        return old.map(event => {
          if (event.id === editedEvent.id) {
            return { ...event, ...editedEvent }
          }

          return event
        })
      })

      return { previousEvent, editedEvent }
    },

    onError: (error, editedEvent, context) => {
      if (!context?.previousEvent) return

      queryClient.setQueryData(
        ['events', editedEvent.id],
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
