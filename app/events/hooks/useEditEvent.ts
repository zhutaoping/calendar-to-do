import { useMutation, useQueryClient } from '@tanstack/react-query'
import eventService from '@/app/services/eventService'

interface Props {
  onSuccess: () => void
  onError?: () => void
}

export const useEditEvent = ({ onSuccess, onError }: Props) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: eventService.editEvent,
    onSuccess,
    // onError,

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
      if (!context?.previousEvents) return

      queryClient.setQueryData(['events'], context?.previousEvents)
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['events'],
      })
    },
  })
}
