import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Calendar() {
	const content = [];

	for (let i = 0; i < 31; i++) {
		content.push(<div className="day p-4 border text-center">{i + 1}</div>);
	}

	return (
		<div className="bg-white mx-auto my-2 rounded-md w-full">
			<div className="py-8 px-8 text-textOnPrimary flex justify-between items-center">
				<FaChevronLeft className="text-base" />
				<h2>November 2022</h2>
				<FaChevronRight className="text-base" />
			</div>
			<div className="days grid grid-cols-7 p-8">{content}</div>
		</div>
	);
}
