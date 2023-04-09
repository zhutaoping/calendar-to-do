import Calendar from "./Calendar";
import ToDoList from "./ToDoList";

export default function BlackBoard() {
  return (
    <div className="blackboard grid w-full gap-8 bg-bgContainer p-4 md:mx-auto md:my-24 md:max-w-4xl md:grid-cols-2 md:rounded-md ">
      <Calendar />
      <ToDoList />
    </div>
  );
}
