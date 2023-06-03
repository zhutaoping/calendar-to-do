'use client'
import { Event } from '@prisma/client'
import { useQueryClient } from '@tanstack/react-query'
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

const AnimatedEventItem = motion(EventItem)

interface Props {
  activeDate: Date | null
}

export default function Events({ activeDate }: Props) {
  const { isOpen, onClose, onOpen } = useUpdateEventModalStore()
  const [eventId, setEventId] = useState('')
  const [eventList, setEventList] = useState<Event[]>([])

  const isSmall = useMediaQuery('(max-width: 768px)')
  const { status } = useSession()
  const queryClient = useQueryClient()

  const { data: events, isLoading, isError, error, refetch } = useEvents()
  const { data: event } = useEvent(eventId)
  const deleteEventMutation = useDeleteEvent()
  const completeEventMutation = useCompleteEvent()
  const editEventMutation = useEditEvent({
    onSuccess: () => {
      // queryClient.invalidateQueries(['events'])
      // onClose()
    },
  })

  const isLarge = useMediaQuery('(min-width: 1024px)')
  const isXL = useMediaQuery('(min-width: 1280px)')

  let [scope, animate] = useAnimate()

  useEffect(() => {
    refetch()
  }, [status, refetch])

  async function handleCompleted(e: MouseEvent, evt: Event, index: number) {
    e.stopPropagation()
    setEventId(evt.id)
    const bool = !evt.completed

    completeEventMutation.mutate({
      ...evt,
      completed: bool,
    })

    if (
      bool &&
      eventList?.filter((e: Event) => e.id !== evt.id).every(e => e.completed)
    ) {
      let random = Math.random()
      let animation
      //* use css selector
      if (random < 0.5) {
        animation = animate(
          '.flip-board',
          { rotate: [0, 10, -10, 0] },
          { duration: 0.5, delay: stagger(0.1, { from: index }) },
        )
      } else {
        animation = animate(
          '.flip-board',
          { x: [0, 4, -4, 0] },
          { duration: 0.4, delay: stagger(0.1, { from: index }) },
        )
      }
      //* hacky way to show full animation
      await animation
      animation.play()
    }
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
            key="updateEventModal"
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
            <AnimatedEventItem
              layout="position"
              evt={evt}
              key={evt.id}
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
