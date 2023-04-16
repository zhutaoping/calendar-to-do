import Calendar from "./calendar/Calendar";
import EventsBoard from "./events/EventsBoard";

export default function Home() {
  return (
    <main className="blackboard my-10 grid gap-5 bg-bgContainer  md:grid-cols-2 md:rounded-md">
      <Calendar />
      <EventsBoard />
    </main>
  );
}
