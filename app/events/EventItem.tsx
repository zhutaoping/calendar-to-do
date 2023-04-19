/* eslint-disable react/display-name */
import { GrCheckbox, GrCheckboxSelected } from "react-icons/gr";
import { CgRemove } from "react-icons/cg";
import { VscCircleFilled } from "react-icons/vsc";
import { Event } from "@prisma/client";
import { forwardRef } from "react";

interface Props {
  evt: Event;
  handleClick: (evt: Event) => void;
  handleCheckBox: (e: React.MouseEvent, evt: Event) => void;
  handleDelete: (e: React.MouseEvent, id: string) => void;
}

export type Ref = HTMLLIElement;

const EventItem = forwardRef<Ref, Props>(
  ({ evt, handleClick, handleCheckBox, handleDelete }, ref) => {
    return (
      <li
        ref={ref}
        className={`mb-1 ${
          evt.completed ? "" : "cursor-pointer"
        } w-full bg-gradient-to-r from-slate-600 to-bgContainer px-8 py-2`}
        key={evt.id}
        onClick={() => handleClick(evt)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <VscCircleFilled className="h-4 w-4 text-primary" />
            <p
              className={`transition-color max-w-[250px] text-base ${
                evt.completed
                  ? "text-textOnCalendar line-through"
                  : "text-white"
              }`}
            >
              {evt.title}
            </p>
          </div>
          <button onClick={(e) => handleCheckBox(e, evt)} title="completed">
            {evt.completed ? (
              <GrCheckboxSelected className="h-4 w-4 bg-gray-400" />
            ) : (
              <GrCheckbox className="h-4 w-4 bg-gray-400" />
            )}
          </button>
        </div>
        <div className="flex justify-between pl-6">
          <div className="">
            <span className="text-xs text-gray-400">{evt.startTime} - </span>
            <span className="text-xs text-gray-400">{evt.endTime}</span>
          </div>
          <button
            className="active:scale-95"
            type="button"
            title="delete"
            onClick={(e) => handleDelete(e, evt.id)}
          >
            <CgRemove className="h-4 w-4 text-gray-400" />
          </button>
        </div>
      </li>
    );
  }
);
export default EventItem;
