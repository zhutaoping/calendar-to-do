export default function ToDoList() {
  return (
    <div className="todo-list col-span-1 flex h-screen flex-col p-4 md:h-fit md:pl-12">
      <div className="flex justify-between">
        <span className="text-xl text-white">Thu</span>
        <span className="text-sm text-textOnCalendar">15 November 2022</span>
      </div>
      <div>
        <h2 className="text-xl text-textOnCalendar">No Events</h2>
      </div>
    </div>
  );
}
