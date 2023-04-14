import Calendar from "./calendar/Calendar";
import ToDoList from "./events/EventsBoard";

export default function BlackBoard() {
  return (
    <div className="blackboard grid h-full gap-8 bg-bgContainer p-4 md:mx-auto md:h-fit md:max-w-4xl md:grid-cols-2 md:rounded-md lg:max-h-[580px] ">
      <Calendar />
      <ToDoList />
    </div>
  );
}
