import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";

import { User } from "@prisma/client";
import { useLoginModalStore } from "../store/LoginModalStore";
import { useSignUpModalStore } from "../store/SignUpModalStore";
import Input from "../components/Input";
import SubmitButton from "../components/SubmitButton";
import AuthModalFooter from "../components/AuthModalFooter";
import { useCreateUser } from "./hooks/useCreateUser";

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
  const loginModal = useLoginModalStore();
  const signUpModal = useSignUpModalStore();

  const [error, setError] = useState("");

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

  const createUserMutation = useCreateUser({
    // data: response from the server
    // variables: variables passed into the mutate(name, email, password)

    onSuccess: async (data, variables, context) => {
      setError("");
      await signIn("credentials", {
        redirect: false,
        email: variables.email,
        password: variables.password,
        callbackUrl: "/",
      });
      signUpModal.onClose();
    },
    onError: async (error, variables, context) => {
      setError(error.response.data.message);
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    createUserMutation.mutate({
      ...data,
    });
  };

  return (
    <div>
      {error && <div className="text-red-500">{error}</div>}

      <form className="my-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="name"
          placeholder="name"
          register={register}
          errors={errors}
          type="text"
          icon="HiOutlineUser"
          autofocus
        />
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
        <Input
          id="cPassword"
          placeholder="confirm password"
          register={register}
          errors={errors}
          setShow={setShow}
          type={show.cPassword ? "text" : "password"}
          icon="HiFingerPrint"
        />
        <SubmitButton />
      </form>
      <AuthModalFooter
        loginModal={loginModal}
        signUpModal={signUpModal}
        ask="Already have an account?"
        action="Log In"
      />
    </div>
  );
}
