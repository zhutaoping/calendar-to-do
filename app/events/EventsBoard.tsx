"use client";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useSession, signOut } from "next-auth/react";
import { useDay } from "../stores/DayContext";
import EventList from "./EventList";
import AddEvent from "./AddEvent";
import { useSignUpModalStore } from "../stores/SignUpModalStore";
import { useLoginModalStore } from "../stores/LoginModalStore";
import { useMediaQuery } from "../hooks/useMediaQuery";
import ClientOnly from "../components/ClientOnly";

export default function EventsBoard() {
  // const [smallScreen, setSmallScreen] = useState(false);

  const { activeDate } = useDay();
  const signUpModal = useSignUpModalStore();
  const loginModal = useLoginModalStore();

  const { data: session, status } = useSession();

  const dayOfWeek = activeDate
    ? format(activeDate, "EEEE")
    : format(new Date(), "EEEE");

  // const dayOfMonth = activeDate
  //   ? format(activeDate, "d MMMM yyyy")
  //   : format(new Date(), "d MMMM yyyy");

  const isSmall = useMediaQuery("(max-width: 768px)");

  // useEffect(() => {
  //   handleResize();
  //   window.addEventListener("resize", handleResize);
  // });

  // function handleResize() {
  //   if (window.innerWidth < 768) {
  //     setSmallScreen(true);
  //   } else {
  //     setSmallScreen(false);
  //   }
  // }

  let sessionContent;
  if (status === "loading") {
    sessionContent = <div>Hang in there...</div>;
  }
  if (status === "authenticated") {
    sessionContent = (
      <div className="flex gap-4">
        <span className="text-sm text-violet-300">
          Hi, {session?.user?.name || ""}
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            signOut();
          }}
          className="text-sm text-white"
        >
          Log Out
        </button>
      </div>
    );
  } else {
    sessionContent = (
      <>
        <button type="button" onClick={() => signUpModal.onOpen()}>
          <span>Sign Up</span>
        </button>
        <button type="button" onClick={() => loginModal.onOpen()}>
          <span className="text-violet-300 underline underline-offset-2">
            Log In
          </span>
        </button>
      </>
    );
  }

  return (
    <ClientOnly>
      <div className="right-board relative col-span-1 flex min-h-full flex-col justify-between">
        <div className="flex flex-col">
          <div className="flex items-baseline justify-between px-8 pt-4 md:px-10 md:py-6">
            <span className="text-xl text-white">{dayOfWeek}</span>
            <div className="space-x-4 text-sm text-white">{sessionContent}</div>
          </div>
          {isSmall && <AddEvent />}
          <EventList activeDate={activeDate} />
        </div>
        {!isSmall && <AddEvent />}
      </div>
    </ClientOnly>
  );
}
