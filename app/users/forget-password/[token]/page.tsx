"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import Input from "../../../components/Input";
import SubmitButton from "../../../components/SubmitButton";
import { useResetPassword } from "./hooks/useResetPassword";
import { useToken } from "./hooks/useToken";

const schema = z
  .object({
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

export default function ResetPasswordTokenPage() {
  const [show, setShow] = useState({
    password: false,
    cPassword: false,
  });
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();

  const { mutate: resetPasswordMutate } = useResetPassword({
    onSuccess: (data) => {
      console.log("data: ", data);
      router.push("/");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const params = useParams();
  const token = params?.token as string;
  const { data: currentToken, isLoading, isError, error } = useToken(token);

  if (isLoading) {
    return (
      <div className="grid h-[80vh] place-content-center text-white">
        <h1 className="text-2xl">Loading...</h1>
      </div>
    );
  }

  if (isError) {
    console.log("error: ", error);
  }

  if (!currentToken) {
    return (
      <div className="m-8 grid h-[80vh] max-w-md place-content-center text-white">
        <h1 className="text-2xl text-red-500">Invalid Link</h1>
        <p>
          It looks like you may have clicked on an invalid link. Please close
          this window and try again.
        </p>
      </div>
    );
  }

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setDisabled(true);
    resetPasswordMutate({ ...data, ...currentToken });
  };

  return (
    <div className="grid h-screen place-content-center">
      {/* {isError && (
        <div className="text-sm text-red-500">
          {anyError.response.data.message}
        </div>
      )} */}
      <form
        className="loginForm mx-4 rounded-lg bg-slate-800 px-12 py-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-2xl text-white">Enter new password</h2>
        <Input
          id="password"
          placeholder="new password"
          register={register}
          errors={errors}
          type={show.password ? "text" : "password"}
          setShow={setShow}
          icon="HiFingerPrint"
        />
        <Input
          id="cPassword"
          placeholder="confirm password"
          register={register}
          errors={errors}
          type={show.cPassword ? "text" : "password"}
          setShow={setShow}
          icon="HiFingerPrint"
        />
        <SubmitButton title="Rest Password" disabled={disabled} />
      </form>
    </div>
  );
}
