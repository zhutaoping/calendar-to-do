import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import Input from "../../components/Input";
import SubmitButton from "../../components/SubmitButton";
import { useSession } from "next-auth/react";
import { useRequestModalStore } from "../../stores/RequestModalStore";
import { useRequestReset } from "./useRequestReset";
import { set } from "date-fns";

const schema = z.object({
  email: z.string().email({ message: "Invalid email." }),
});

type Inputs = z.infer<typeof schema>;

export default function RequestForm() {
  const [disabled, setDisabled] = useState(false);

  const requestModal = useRequestModalStore();
  const { mutate, isError, error } = useRequestReset({
    onSuccess: () => {
      requestModal.onClose();
    },
    onError: (error) => {
      setDisabled(false);
    },
  });

  const anyError = error as any;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setDisabled(true);
    mutate({ ...data });
  };

  return (
    <div>
      {isError && (
        <div className="text-sm text-red-500">
          {anyError.response.data.message}
        </div>
      )}
      <form className="loginForm my-4" onSubmit={handleSubmit(onSubmit)}>
        <p className="text-xs text-white">
          Enter your email address, and we&apos;ll send you a link to reset your
          password.
        </p>
        <Input
          id="email"
          placeholder="email"
          register={register}
          errors={errors}
          type="email"
          autofocus={true}
          ariaLabel="email"
        />
        <SubmitButton title="Send Reset Link" disabled={disabled} />
      </form>
    </div>
  );
}
