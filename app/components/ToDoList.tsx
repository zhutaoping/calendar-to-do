export default function ToDoList() {
	return (
		<div className="todo-list flex flex-col col-span-1 p-4">
			<div className="flex justify-between">
				<span className="text-white">Thu</span>
				<span className="text-textOnCalendar">15 November 2022</span>
			</div>
			<div>
				<h2 className="text-textOnCalendar text-2xl">No Events</h2>
			</div>
		</div>
	);
}
