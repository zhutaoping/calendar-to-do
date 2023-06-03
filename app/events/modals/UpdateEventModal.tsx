import { Event } from '@prisma/client'
import EventForm from '../EventForm'
import Modal from '../../components/Modal'
import { useUpdateEventModalStore } from '../../stores/UpdateEventModalStore'

interface Props {
  id: string
  event?: Event
  header: string
  onMutateEvent: (data: Partial<Event>) => void
  isMobile: boolean
}

export default function UpdateEventModal({
  id,
  event,
  header,
  onMutateEvent,
  isMobile,
}: Props) {
  const { onClose } = useUpdateEventModalStore()

  const bodyContent = (
    <EventForm id={id} event={event} onMutateEvent={onMutateEvent} />
  )

  return (
    <Modal
      header={header}
      onClose={onClose}
      body={bodyContent}
      fullPage={false}
      isMobile={isMobile}
    />
  )
}
