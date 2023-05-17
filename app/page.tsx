"use client";
import LoginModal from "./auth/LoginModal";
import Calendar from "./components/calendar/Calendar";
import EventsBoard from "./events/EventsBoard";
import { useMediaQuery } from "./hooks/useMediaQuery";
import { useLoginModalStore } from "./stores/LoginModalStore";
import { useSignUpModalStore } from "./stores/SignUpModalStore";
import RequestModal from "./users/forget-password/RequestModal";
import SignUpModal from "./users/SignUpModal";
import { useRequestModalStore } from "./stores/RequestModalStore";
import useHasMounted from "./hooks/useHasMounted";
import ClientOnly from "./components/ClientOnly";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [dateNow, setDateNow] = useState("");

  const signUpModal = useSignUpModalStore();
  const loginModal = useLoginModalStore();
  const requestModal = useRequestModalStore();

  const isSmall = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    setDateNow(Date.now().toString());
  }, [loginModal.isOpen, signUpModal.isOpen, requestModal.isOpen]);

  // const hasMounted = useHasMounted();
  // if (!hasMounted) {
  //   return null;
  // }

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
        <ClientOnly>
          <Calendar />
          <EventsBoard />
        </ClientOnly>
      </main>
    </>
  );
}
