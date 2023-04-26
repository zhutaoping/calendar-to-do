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

import { useSession, signIn, signOut } from "next-auth/react";

const schema = z.object({
  email: z.string().email({ message: "Invalid email." }),
  password: z
    .string()
    .min(7, { message: "Password must be at least 7 chars." }),
});

type Inputs = z.infer<typeof schema>;

// type Props = {
//   id?: string;
//   user?: User;
// };

export default function LoginForm() {
  const loginModal = useLoginModalStore();
  const signUpModal = useSignUpModalStore();

  const { data: session, status } = useSession();

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
    const loginStatus = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
      callbackUrl: `${window.location.origin}`,
    });

    // From [...nextauth].ts: throw new Error("No user found");
    if (loginStatus?.error) {
      console.log("🚀 ~ loginStatus.error:", loginStatus.error);
    }

    loginModal.onClose();
  };

  async function handleGitHubSignIn() {
    signIn("github", {
      callbackUrl: "http://localhost:3000",
    });
  }

  return (
    <div>
      <form className="loginForm my-4" onSubmit={handleSubmit(onSubmit)}>
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
        {/* <SubmitButton /> */}
        <button className="focus-ring mt-6 box-border w-full rounded-md bg-primary px-4 py-2 text-center text-sm text-white hover:animate-pulse focus-visible:ring-0">
          Submit
        </button>
      </form>
      <div className="text-sm">
        {/* <button
          type="button"
          className="mb-4 flex w-full items-center justify-center gap-2 rounded-md bg-slate-50 py-2 transition-all hover:bg-gray-200 disabled:cursor-not-allowed disabled:bg-opacity-50"
          onClick={handleGitHubSignIn}
          disabled={status === "loading"}
        >
          Sign In with GitHub{" "}
          <Image src={"/github.svg"} width={18} height={18} alt="GitHub Logo" />{" "}
        </button> */}
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
