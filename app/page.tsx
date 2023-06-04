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

export default function Home() {
  const signUpModal = useSignUpModalStore()
  const loginModal = useLoginModalStore()
  const requestModal = useRequestModalStore()

  const isSmall = useMediaQuery('(max-width: 768px)')

  const [dateNow, setDateNow] = useState('')

  //! This is for full enter animation.
  useEffect(() => {
    setDateNow(Date.now().toString())
  }, [loginModal.isOpen, signUpModal.isOpen, requestModal.isOpen])

  return (
    <>
      <main className="blackboard grid gap-5 bg-bgContainer transition-all md:min-h-min md:grid-cols-2 md:rounded-md">
        <AnimatePresence>
          {signUpModal.isOpen && (
            <SignUpModal key={dateNow} header="Sign Up" isMobile={isSmall} />
          )}
          {loginModal.isOpen && (
            <LoginModal key={dateNow} header="Log In" isMobile={isSmall} />
          )}
          {requestModal.isOpen && (
            <RequestModal
              key={dateNow}
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
