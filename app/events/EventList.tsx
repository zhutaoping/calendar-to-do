'use client'
import { Event } from '@prisma/client'
import { AnimatePresence, motion, stagger, useAnimate } from 'framer-motion'
import { useSession } from 'next-auth/react'
import { MouseEvent, useEffect, useState } from 'react'
import UpdateEventModal from './modals/UpdateEventModal'
// Hooks
import { useMediaQuery } from '../hooks/useMediaQuery'
import { useUpdateEventModalStore } from '../stores/UpdateEventModalStore'
import EventItem from './EventItem'
import { useCompleteEvent } from './hooks/useCompleteEvent'
import { useDeleteEvent } from './hooks/useDeleteEvent'
import { useEditEvent } from './hooks/useEditEvent'
import { useEvent } from './hooks/useEvent'
import { useEvents } from './hooks/useEvents'

const MotionEventItem = motion(EventItem)

interface Props {
  activeDate: Date | null
  isSmall: boolean
}

export default function Events({ activeDate, isSmall }: Props) {
  const { isOpen, onClose, onOpen } = useUpdateEventModalStore()
  const [eventId, setEventId] = useState('')
  const [eventList, setEventList] = useState<Event[]>([])

  const [forKey, setForKey] = useState(Date.now().toString())

  useEffect(() => {
    setForKey(Date.now().toString())
  }, [isOpen])

  const { status } = useSession()

  const { data: events, isLoading, isError, error, refetch } = useEvents()
  const { data: event } = useEvent(eventId)
  const deleteEventMutation = useDeleteEvent()
  const completeEventMutation = useCompleteEvent()
  const editEventMutation = useEditEvent({
    onSuccess: () => {},
  })

  const isLarge = useMediaQuery('(min-width: 1024px)')
  const isXL = useMediaQuery('(min-width: 1280px)')

  let [scope, animate] = useAnimate()

  useEffect(() => {
    refetch()
  }, [status, refetch])

  async function handleCompleted(e: MouseEvent, evt: Event) {
    e.stopPropagation()
    setEventId(evt.id)
    const bool = !evt.completed

    completeEventMutation.mutate({
      ...evt,
      completed: bool,
    })
  }

  function handleUpdate(data: Partial<Event>) {
    const { title, startTime, endTime, id } = data

    if (id) setEventId(id)

    editEventMutation.mutate({
      id: eventId,
      title,
      startTime,
      endTime,
    })

    onClose()
  }

  function handleDelete(e: MouseEvent, eventId: string) {
    // e.stopPropagation()
    deleteEventMutation.mutate(eventId)
  }

  function handleClick(evt: Event) {
    setEventId(evt.id)
    if (evt.completed) return
    onOpen()
  }

  useEffect(() => {
    if (events && activeDate) {
      const listOfDay = events.filter(
        (evt: Event) =>
          evt.day === activeDate.getDate() &&
          evt.month === activeDate.getMonth() + 1 &&
          evt.year === activeDate.getFullYear(),
      )
      setEventList(listOfDay)
    }
  }, [events, activeDate])

  const sortedEvents = eventList.sort((a, b) => {
    if (a.startTime < b.startTime) {
      return -1
    }
    if (a.startTime > b.startTime) {
      return 1
    }
    return 0
  })

  if (isLoading) return <p className="mx-auto text-lg text-white">Loading...</p>
  if (isError) {
    return <pre>{JSON.stringify(error)}</pre>
  }

  let variants
  if (isLarge) {
    variants = {
      initial: { minHeight: 0 },
      animate: { minHeight: '420px' },
    }
  } else if (isXL) {
    variants = {
      initial: { minHeight: 0 },
      animate: { minHeight: '475px' },
    }
  } else {
    variants = {
      initial: { minHeight: 0 },
      animate: { minHeight: '380px' },
    }
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          //! Need a key for AnimatePresence to work
          <UpdateEventModal
            key={forKey}
            id={eventId}
            event={event}
            header="Edit Event"
            onMutateEvent={handleUpdate}
            isMobile={isSmall}
          />
        )}
      </AnimatePresence>
      <motion.ul
        ref={scope}
        layout="position"
        variants={variants}
        initial="initial"
        animate="animate"
        className={`event-list mb-8 text-textOnCalendar md:mb-0 md:max-h-[380px] md:overflow-y-auto lg:max-h-[420px] xl:max-h-[475px]`}
      >
        <AnimatePresence mode="popLayout">
          {sortedEvents.map((evt, index) => (
            <MotionEventItem
              layout="position"
              evt={evt}
              key={evt.id || evt.id + index}
              index={index}
              handleClick={handleClick}
              handleCompleted={handleCompleted}
              handleDelete={handleDelete}
            />
          ))}
        </AnimatePresence>
      </motion.ul>
    </>
  )
}
