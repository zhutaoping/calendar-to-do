import { MdOutlineDelete } from "react-icons/md";
import { Event } from "@prisma/client";

interface Props {
  evt: Event;
  handleDelete: (e: React.MouseEvent, id: string) => void;
  handleChip: (e: React.MouseEvent) => void;
}

export default function DeleteCard({ evt, handleDelete, handleChip }: Props) {
  return (
    <div
      onClick={(e) => handleDelete(e, evt.id)}
      title="delete"
      className="delete-card flex h-10 w-10 items-center justify-center overflow-hidden border border-gray-500/20"
    >
      <MdOutlineDelete size={20} color="#ed5e68" />
      <div title="flip" className="chip" onClick={(e) => handleChip(e)}></div>
    </div>
  );
}
