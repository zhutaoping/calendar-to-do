"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { BsPlusCircle } from "react-icons/bs";

const schema = z.object({
  title: z.string().min(1).max(50),
});

type Inputs = z.infer<typeof schema>;

export default function AddEvent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <div className="">
      <form
        className="flex justify-center gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input {...register("title")} />
        <button type="submit">
          <BsPlusCircle color="white" size={30} />
        </button>
      </form>
    </div>
  );
}
