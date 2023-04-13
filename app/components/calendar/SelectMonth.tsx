import { useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { HiCheck, HiChevronUpDown } from "react-icons/hi2";
import { useDay } from "@/app/store/DayContext";

type Month = {
  id: number;
  name: string;
};

const months = [
  { id: 0, name: "January" },
  { id: 1, name: "February" },
  { id: 2, name: "March" },
  { id: 3, name: "April" },
  { id: 4, name: "May" },
  { id: 5, name: "June" },
  { id: 6, name: "July" },
  { id: 7, name: "August" },
  { id: 8, name: "September" },
  { id: 9, name: "October" },
  { id: 10, name: "November" },
  { id: 11, name: "December" },
];

export default function SelectMonth() {
  const [selectedMonth, setSelectedMonth] = useState(months[0]);

  const { dayInView, setDayInView } = useDay();
  const thisMonth = months[dayInView.getMonth()];

  const handleChange = (m: Month) => {
    setSelectedMonth(m);
    setDayInView(new Date(dayInView.getFullYear(), m.id));
  };

  return (
    <Listbox value={selectedMonth} onChange={(m) => handleChange(m)}>
      <Listbox.Button
        className="focus-ring relative w-full cursor-default !rounded-lg bg-white py-2 pl-3 pr-10 text-left 
      shadow-md"
      >
        <span className="block w-full truncate">{thisMonth.name}</span>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <HiChevronUpDown
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </span>
      </Listbox.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Listbox.Options className="scroll-bar absolute bottom-10 max-h-80 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ">
          {months.map((month) => (
            <Listbox.Option
              key={month.id}
              className="
                relative cursor-default select-none py-2 pl-10 pr-4  text-gray-900 ui-active:bg-amber-100 ui-active:text-amber-900"
              value={month}
            >
              <>
                <span className="block truncate font-normal ui-selected:font-bold">
                  {month.name}
                </span>
                <span className="absolute inset-y-0 left-0 hidden items-center pl-3 text-primary ui-selected:flex">
                  <HiCheck className="h-5 w-5" aria-hidden="true" />
                </span>
              </>
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Transition>
    </Listbox>
  );
}