import BlackBoard from "./components/BlackBoard";
import Calendar from "./components/calendar/Calendar";
import ToDoList from "./components/events/EventsBoard";

export default function Home() {
  return (
    <main className="blackboard grid gap-8 bg-bgContainer p-4 md:max-w-6xl md:grid-cols-2 md:rounded-md">
      <Calendar />
      <ToDoList />
    </main>
  );
}
