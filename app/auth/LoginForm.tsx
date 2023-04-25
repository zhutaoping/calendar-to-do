import { MouseEvent, useState } from "react";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import useSignUpModalStore from "../hooks/modals/useSignUpModalStore";
import useLoginModalStore from "../hooks/modals/useLoginModalStore";
import Input from "../components/Input";
import SubmitButton from "../components/SubmitButton";
import AuthModalFooter from "../components/calendar/AuthModalFooter";

import { signIn, signOut } from "next-auth/react";

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

export default function LoginForm({ id, user }: Props) {
  const loginModal = useLoginModalStore();
  const signUpModal = useSignUpModalStore();

  const [show, setShow] = useState({
    password: false,
    cPassword: false,
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
    console.log(data);
  };

  function handleGitHubSignIn() {
    signIn("github", {
      callbackUrl: "http://localhost:3000",
    });
  }

  return (
    <div>
      <form className="my-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="email"
          placeholder="email"
          register={register}
          errors={errors}
          type="text"
          icon="HiAtSymbol"
        />
        <Input
          id="password"
          placeholder="password"
          register={register}
          errors={errors}
          setShow={setShow}
          type={show.password ? "text" : "password"}
          icon="HiFingerPrint"
        />
        <SubmitButton />
      </form>
      <div className="text-sm">
        <button
          type="button"
          className="mb-4 flex w-full items-center justify-center gap-2 rounded-md bg-slate-50 py-2 transition-all hover:bg-gray-200"
          onClick={handleGitHubSignIn}
        >
          Sign In with GitHub{" "}
          <Image src={"/github.svg"} width={18} height={18} alt="GitHub Logo" />{" "}
        </button>
      </div>
      <AuthModalFooter
        loginModal={loginModal}
        signUpModal={signUpModal}
        ask="First time being here?"
        action="Sign Up"
      />
    </div>
  );
}
