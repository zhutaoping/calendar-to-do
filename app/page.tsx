import LoginModal from "./auth/LoginModal";
import Calendar from "./components/calendar/Calendar";
import EventsBoard from "./events/EventsBoard";
import SignUpModal from "./users/SignUpModal";
import { User } from "./users/User";

export default async function Home() {
  return (
    <>
      <User />
      <main className="blackboard grid min-h-screen gap-5 bg-bgContainer transition-all md:min-h-min md:grid-cols-2 md:rounded-md">
        <SignUpModal header="Sign Up" />
        <LoginModal header="Log In" />
        <Calendar />
        <EventsBoard />
      </main>
    </>
  );
}
