import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDay } from "../store/DayContext";
import { Event } from "@prisma/client";
import SubmitButton from "../components/SubmitButton";

const schema = z
  .object({
    title: z.string().min(1).max(300),
    startTime: z.string().min(1).max(5),
    endTime: z.string().min(1).max(5),
  })
  .refine((data) => data.endTime > data.startTime, {
    message: "End time cannot be earlier than start time.",
    path: ["endTime"],
  });

type Inputs = z.infer<typeof schema>;

type Props = {
  id?: string;
  event?: Event;
  handleMutateEvent: (data: Partial<Event>) => void;
};

export default function EventForm({ id, event, handleMutateEvent }: Props) {
  const { activeDate } = useDay();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    reset({
      title: event?.title,
      startTime: event?.startTime,
      endTime: event?.endTime,
    });
  }, [reset, event]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!activeDate) return;

    const year = activeDate.getFullYear();
    const month = activeDate.getMonth()! + 1;
    const day = activeDate.getDate();

    handleMutateEvent({
      ...data,
      id,
      year,
      month,
      day,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <textarea
        placeholder="New Event"
        {...register("title")}
        className="focus-ring bg-bgInput mt-4 w-full rounded-md p-2 text-base  text-black focus-visible:ring-0"
        autoFocus
      />
      {errors.title && (
        <p className="text-sm text-red-500">{errors.title.message}</p>
      )}
      <div className="mt-4 flex items-center gap-1">
        <label className="text-sm text-white" htmlFor="start-time">
          Start:{" "}
        </label>
        <input
          id="start-time"
          className="focus-ring mr-4 rounded-md p-1 text-xs focus-visible:ring-0"
          type="time"
          defaultValue="08:00"
          {...register("startTime")}
        />
        <label className="text-sm text-white" htmlFor="end-time">
          End:{" "}
        </label>
        <input
          id="end-time"
          className="focus-ring mr-4 rounded-md p-1 text-xs focus-visible:ring-0"
          type="time"
          defaultValue="09:00"
          {...register("endTime")}
        />
      </div>
      {errors.endTime && (
        <p className="text-sm text-red-500">{errors.endTime.message}</p>
      )}
      <SubmitButton />
    </form>
  );
}
