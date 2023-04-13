import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BsPlusCircle } from "react-icons/bs";
import { Dialog } from "@headlessui/react";
import { useDay } from "@/app/store/DayContext";
import addEvent from "@/app/lib/eventApi";

const schema = z
  .object({
    title: z.string().min(1).max(100),
    startTime: z.string().min(1).max(5),
    endTime: z.string().min(1).max(5),
  })
  .refine((data) => data.endTime > data.startTime, {
    message: "End time cannot be earlier than start time.",
    path: ["endTime"],
  });

type Inputs = z.infer<typeof schema>;

export default function AddEvent() {
  const [isOpen, setIsOpen] = useState(false);
  const { activeDate } = useDay();

  const queryClient = useQueryClient();

  const newEventMutation = useMutation({
    mutationFn: addEvent,
    onSuccess: () => {
      queryClient.invalidateQueries(["events"]);
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!activeDate) return;

    const year = activeDate.getFullYear();
    const month = activeDate.getMonth()! + 1;
    const day = activeDate.getDate();

    newEventMutation.mutate({
      ...data,
      year,
      month,
      day,
    });

    setIsOpen(false);
    reset();
  };

  return (
    <div className="">
      <Dialog
        className="absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-slate-800 p-4 text-white"
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <Dialog.Panel className="space-y-7 text-lg">
          <Dialog.Title className="">Add New Event</Dialog.Title>
          <form onSubmit={handleSubmit(onSubmit)} className="text-slate-800">
            <textarea
              placeholder="New Event"
              {...register("title")}
              className="focus-ring bg-bgInput mb-4 w-full rounded-md p-2 text-base  text-black focus-visible:ring-0"
            />
            <div className="mb-2 flex items-center gap-1">
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
              className="focus-ring mx-auto mt-8 block w-full rounded-md bg-primary p-2 text-base text-white hover:animate-pulse focus-visible:ring-0"
              type="submit"
            >
              Submit
            </button>
          </form>
        </Dialog.Panel>
      </Dialog>

      <button
        className="focus-ring mx-auto flex focus-visible:ring-0"
        type="button"
        onClick={() => setIsOpen(true)}
        title="Add event"
      >
        <BsPlusCircle color="white" size={30} />
      </button>
    </div>
  );
}
