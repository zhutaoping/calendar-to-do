import { MdOutlineDelete } from 'react-icons/md'
import { Event } from '@prisma/client'

interface Props {
  evt: Event
  handleDelete: (e: React.MouseEvent, id: string) => void
  handleChip: (e: any) => void
}

export default function DeleteCard({ evt, handleDelete, handleChip }: Props) {
  return (
    <>
      <div
        role="button"
        tabIndex={0}
        aria-labelledby="delete-label"
        onClick={e => handleDelete(e, evt.id)}
        className="delete-card flex h-10 w-10 items-center justify-center overflow-hidden border border-gray-500/20"
      >
        <MdOutlineDelete size={20} color="#ed5e68" />
        <div
          className="chip red bg-[#ed5e68]"
          onClick={e => handleChip(e)}
        ></div>
      </div>
      <label className="sr-only" htmlFor="delete-label">
        Delete event
      </label>
    </>
  )
}
