import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { AiOutlineCloseCircle } from "react-icons/ai";

import { useDay } from "../../store/DayContext";
import { Event } from "@prisma/client";

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
  heading: string;
  handleMutateEvent: (data: Partial<Event>) => void;
  handleClose: () => void;
};

export default function Form({
  id,
  event,
  heading,
  handleMutateEvent,
  handleClose,
}: Props) {
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
      year,
      month,
      day,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center justify-between">
        <h2 className="text-lg text-white">{heading}</h2>
        <motion.button
          type="button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClose}
        >
          <AiOutlineCloseCircle color="white" size={20} />
        </motion.button>
      </div>
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
      <button
        className="focus-ring mt-6 box-border w-full rounded-md bg-primary px-4 py-2 text-center text-base text-white hover:animate-pulse focus-visible:ring-0"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}
