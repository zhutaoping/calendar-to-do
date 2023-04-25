import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import Link from "next/link";

const schema = z
  .object({
    name: z.string().min(1, { message: "Name cannot be empty." }),
    email: z.string().email({ message: "Invalid email." }),
    password: z
      .string()
      .min(7, { message: "Password must be at least 7 chars." }),
    cPassword: z.string(),
  })
  .refine((data) => data.password === data.cPassword, {
    message: "Passwords do not match.",
    path: ["cPassword"],
  });

type Inputs = z.infer<typeof schema>;

type Props = {
  id?: string;
  user?: User;
};

export default function SignUpForm({ id, user }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
  };

  return (
    <div className="">
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <label
          className="mt-4 inline-block text-base text-white"
          htmlFor="name"
        >
          name
        </label>
        <input
          id="name"
          type="text"
          placeholder="john"
          {...register("name")}
          className="focus-ring bg-bgInput w-full rounded-md p-2 text-base text-black focus-visible:ring-0"
          autoFocus
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
        {/* Email */}
        <label
          className="mt-4 inline-block text-base text-white"
          htmlFor="email"
        >
          email
        </label>
        <input
          id="email"
          type="email"
          placeholder="john@adc.com"
          className="focus-ring bg-bgInput w-full rounded-md p-2 text-base  text-black focus-visible:ring-0"
          {...register("email")}
        />
        {errors.email && (
          <span className="text-xs text-red-500">{errors.email.message}</span>
        )}
        {/* Password */}
        <label
          className="mt-4 inline-block text-base text-white"
          htmlFor="password"
        >
          password
        </label>
        <input
          id="password"
          className="focus-ring bg-bgInput w-full rounded-md p-2 text-base  text-black focus-visible:ring-0"
          type="password"
          {...register("password")}
        />
        {errors.password && (
          <span className="text-xs text-red-500">
            {errors.password.message}
          </span>
        )}
        <label
          className="mt-4 inline-block text-base text-white"
          htmlFor="cPassword"
        >
          confirm password
        </label>
        <input
          id="cPassword"
          className="focus-ring bg-bgInput w-full rounded-md p-2 text-base  text-black focus-visible:ring-0"
          type="password"
          {...register("cPassword")}
        />
        {errors.cPassword && (
          <span className="text-xs text-red-500">
            {errors.cPassword.message}
          </span>
        )}
        <button
          className="focus-ring mt-6 box-border w-full rounded-md bg-primary px-4 py-2 text-center text-base text-white hover:animate-pulse focus-visible:ring-0"
          type="submit"
        >
          Submit
        </button>
      </form>
      <p className="mt-1 text-center text-xs text-gray-400">
        Have an account?{" "}
        <Link href="/">
          <span className="text-indigo-500">Log In</span>
        </Link>
      </p>
    </div>
  );
}
