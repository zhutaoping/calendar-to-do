'use client'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import LoginModal from './auth/LoginModal'
import Calendar from './components/calendar/Calendar'
import EventsBoard from './events/EventsBoard'
import { useMediaQuery } from './hooks/useMediaQuery'
import { useLoginModalStore } from './stores/LoginModalStore'
import { useRequestModalStore } from './stores/RequestModalStore'
import { useSignUpModalStore } from './stores/SignUpModalStore'
import SignUpModal from './users/SignUpModal'
import RequestModal from './users/forget-password/RequestModal'
import { nanoid } from 'nanoid'

export default function Home() {
  const signUpModal = useSignUpModalStore()
  const loginModal = useLoginModalStore()
  const requestModal = useRequestModalStore()

  const [forKey, setForKey] = useState(Date.now().toString())
  //! This is for full enter animation.
  useEffect(() => {
    setForKey(Date.now().toString())
  }, [signUpModal.isOpen, loginModal.isOpen, requestModal.isOpen])

  const isSmall = useMediaQuery('(max-width: 768px)')

  return (
    <>
      <main className="blackboard grid gap-5 bg-bgContainer transition-all md:min-h-min md:grid-cols-2 md:rounded-md">
        <AnimatePresence>
          {signUpModal.isOpen && (
            <SignUpModal key={forKey} header="Sign Up" isMobile={isSmall} />
          )}
          {loginModal.isOpen && (
            <LoginModal key={forKey} header="Log In" isMobile={isSmall} />
          )}
          {requestModal.isOpen && (
            <RequestModal
              key={forKey}
              header="Forgot Password"
              isMobile={true}
            />
          )}
        </AnimatePresence>
        <Calendar />
        <EventsBoard />
      </main>
    </>
  )
}
