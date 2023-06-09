import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignUpModalStore } from "../stores/SignUpModalStore";
import { useLoginModalStore } from "../stores/LoginModalStore";
import Input from "../components/Input";
import SubmitButton from "../components/SubmitButton";
import AuthModalFooter from "../components/AuthModalFooter";

import { useSession, signIn } from "next-auth/react";
import { useRequestModalStore } from "../stores/RequestModalStore";

const schema = z.object({
  email: z.string().email({ message: "Invalid email." }),
  password: z
    .string()
    .min(7, { message: "Password must be at least 7 chars." }),
});

type Inputs = z.infer<typeof schema>;

export default function LoginForm() {
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [disabledGithub, setDisabledGithub] = useState(false);

  const loginModal = useLoginModalStore();
  const signUpModal = useSignUpModalStore();
  const requestModal = useRequestModalStore();

  const { status } = useSession();

  const [show, setShow] = useState({
    password: false,
    cPassword: false,
  });

  useEffect(() => {
    if (status === "authenticated") {
      setDisabled(false);
    }
  }, [status]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setDisabled(true);
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
      callbackUrl: `${window.location.origin}`,
    });

    // From [...nextauth].ts: throw new Error("No user found");
    if (result?.error) {
      console.log("🚀 ~ loginStatus.error:", result?.error);
      setDisabled(false);
      setError(result.error);
    }

    if (result?.ok) {
      loginModal.onClose();
    }
  };

  async function handleGitHubSignIn() {
    setDisabledGithub(true);

    await signIn("github", {
      callbackUrl: "http://localhost:3000",
    });
  }

  return (
    <div>
      {error && (
        <div className="mb-4 text-sm text-red-500">{error.toString()}</div>
      )}
      <form className="loginForm my-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="email"
          placeholder="email"
          register={register}
          errors={errors}
          type="email"
          icon="HiAtSymbol"
          ariaLabel="email"
          myClass="initFocus"
        />
        <Input
          id="password"
          placeholder="password"
          register={register}
          errors={errors}
          setShow={setShow}
          type={show.password ? "text" : "password"}
          icon="HiFingerPrint"
          ariaLabel="password"
        />
        <SubmitButton title="Submit" disabled={disabled} />
      </form>
      <div className="text-sm">
        <button
          type="button"
          className="mb-4 flex w-full items-center justify-center gap-2 rounded-md bg-slate-50 py-2 transition-all hover:bg-gray-200 disabled:animate-pulse disabled:cursor-wait"
          onClick={handleGitHubSignIn}
          disabled={disabledGithub}
        >
          Sign In with GitHub{" "}
          <Image src={"/github.svg"} width={18} height={18} alt="GitHub Logo" />{" "}
        </button>
      </div>
      <footer>
        <AuthModalFooter
          loginModal={loginModal}
          signUpModal={signUpModal}
          ask="First time being here?"
          action="Sign Up"
        />
        <button
          className="mx-auto mt-2 block text-xs text-violet-300"
          onClick={() => {
            loginModal.onClose();
            requestModal.onOpen();
          }}
        >
          Forgot password?
        </button>
      </footer>
    </div>
  );
}
