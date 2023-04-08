import Calendar from "./Calendar";
import ToDoList from "./ToDoList";

export default function BlackBoard() {
	return (
		<div className="grid gap-2 blackboard md:my-24 lg:max-w-5xl md:mx-auto bg-bgContainer p-4 lg:rounded-md lg:grid-cols-2 ">
			<Calendar />
			<ToDoList />
		</div>
	);
}
