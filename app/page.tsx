"use client";
import LoginModal from "./auth/LoginModal";
import SignUpModal from "./users/SignUpModal";
import Calendar from "./components/calendar/Calendar";
import EventsBoard from "./events/EventsBoard";
import useSignUpModalStore from "./store/SignUpModalStore";
import useLoginModalStore from "./store/LoginModalStore";
import { useMediaQuery } from "./hooks/useMediaQuery";

export default function Home() {
  const signUpModal = useSignUpModalStore();
  const loginModal = useLoginModalStore();
  const isSmall = useMediaQuery("(max-width: 768px)");

  return (
    <>
      <main className="blackboard grid  gap-5 bg-bgContainer transition-all md:min-h-min md:grid-cols-2 md:rounded-md">
        {signUpModal.isOpen && (
          <SignUpModal header="Sign Up" isMobile={isSmall} />
        )}
        {loginModal.isOpen && <LoginModal header="Log In" isMobile={isSmall} />}
        <Calendar />
        <EventsBoard />
      </main>
    </>
  );
}
