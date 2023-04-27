import { getServerSession } from "next-auth";
import LoginModal from "./auth/LoginModal";
import Calendar from "./components/calendar/Calendar";
import EventsBoard from "./events/EventsBoard";
import SignUpModal from "./users/SignUpModal";

import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <>
      {/* fix me */}
      <pre className="text-white">{JSON.stringify(session?.user)}</pre>
      <main className="blackboard grid min-h-screen gap-5 bg-bgContainer md:min-h-min md:grid-cols-2 md:rounded-md">
        <SignUpModal header="Sign Up" />
        <LoginModal header="Log In" />
        <Calendar />
        <EventsBoard />
      </main>
    </>
  );
}
