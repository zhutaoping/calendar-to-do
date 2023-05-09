import { SetStateAction } from "react";
import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from "react-icons/hi2";

interface Props {
  id: string;
  placeholder: string;
  type: string;
  register: any;
  errors: any;
  icon: string;
  setShow?: React.Dispatch<
    SetStateAction<{ password: boolean; cPassword: boolean }>
  >;
  autofocus?: boolean;
  ariaLabel?: string;
}

export default function Input({
  id,
  placeholder,
  type,
  register,
  errors,
  icon,
  setShow,
  autofocus,
  ariaLabel,
}: Props) {
  return (
    <>
      <div className="mt-4 flex rounded-md bg-slate-50">
        <input
          aria-label={ariaLabel}
          type={type}
          placeholder={placeholder}
          className="auth-input w-full rounded-md px-5 py-2 text-sm text-black outline-none"
          {...register(id)}
          autoFocus={autofocus}
        />
        {icon === "HiOutlineUser" && (
          <span className="flex select-none items-center px-3 text-gray-300">
            <HiOutlineUser size={16} />
          </span>
        )}
        {icon === "HiAtSymbol" && (
          <span className="flex select-none items-center px-3 text-gray-300">
            <HiAtSymbol size={16} />
          </span>
        )}
        {icon === "HiFingerPrint" && (
          <span className="flex cursor-pointer select-none items-center px-3 text-gray-300">
            <HiFingerPrint
              size={16}
              onClick={() => {
                if (id === "password") {
                  setShow!((prev) => ({ ...prev, password: !prev.password }));
                } else {
                  setShow!((prev) => ({ ...prev, cPassword: !prev.cPassword }));
                }
              }}
            />
          </span>
        )}
      </div>
      {errors[id] && (
        <p className="mt-1 text-xs text-red-500">{errors[id].message}</p>
      )}
    </>
  );
}
