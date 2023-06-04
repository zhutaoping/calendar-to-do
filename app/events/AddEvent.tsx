'use client'
import { useSession } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'
import { BsPlusCircle } from 'react-icons/bs'
import { Event } from '@prisma/client'
import { useCreateEvent } from './hooks/useCreateEvent'
import MyTooltip from '../components/MyTooltip/MyTooltip'
import { useAddEventModalStore } from '../stores/AddEventModalStore'
import AddEventModal from './modals/AddEventModal'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { useEffect, useState } from 'react'
import ClientOnly from '../components/ClientOnly'
import useHasMounted from '../hooks/useHasMounted'

export default function AddEvent() {
  const createEventMutation = useCreateEvent()
  const { isOpen, onOpen, onClose } = useAddEventModalStore()
  const [dateNow, setDateNow] = useState('')

  const isSmall = useMediaQuery('(max-width: 768px)')

  const { data: session } = useSession()
  const userId = session?.user?.id || null

  // const hasMounted = useHasMounted();
  // if (!hasMounted) {
  //   return null;
  // }

  useEffect(() => {
    setDateNow(Date.now().toString())
  }, [isOpen])

  const handleAddEvent = (data: Partial<Event>) => {
    // const newData = { ...data, id: Date.now().toString() };
    createEventMutation.mutate({
      ...data,
      userId,
    })
    onClose()
  }

  return (
    <div>
      <MyTooltip title="Add New Event">
        <motion.button
          className="add-btn focus-ring mx-auto my-4 flex focus-visible:ring-0 md:absolute md:bottom-4 md:left-1/2"
          onClick={() => onOpen()}
          type="button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Add New Event"
        >
          <BsPlusCircle color="white" size={30} />
        </motion.button>
      </MyTooltip>
      <AnimatePresence>
        {isOpen && (
          <AddEventModal
            key={forKey}
            header="Add New Event"
            onMutateEvent={handleAddEvent}
            isMobile={isSmall}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
