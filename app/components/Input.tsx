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
}

export default function Input({
  id,
  placeholder,
  type,
  register,
  errors,
  icon,
  setShow,
}: Props) {
  return (
    <>
      <div className="mb-4 flex rounded-md bg-slate-50">
        <input
          type={type}
          placeholder={placeholder}
          className="auth-input w-full rounded-md px-5 py-2 text-sm text-black outline-none"
          {...register(id)}
        />
        {icon === "HiOutlineUser" && (
          <Span>
            <HiOutlineUser size={16} />
          </Span>
        )}
        {icon === "HiAtSymbol" && (
          <Span>
            <HiAtSymbol size={16} />
          </Span>
        )}
        {icon === "HiFingerPrint" && (
          <Span>
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
          </Span>
        )}
      </div>
      {errors[id] && (
        <p className="-mt-2 text-xs text-red-500">{errors[id].message}</p>
      )}
    </>
  );
}

const Span = ({ children }: { children: React.ReactNode }) => {
  return (
    <span className="flex cursor-pointer select-none items-center px-3 text-gray-300">
      {children}
    </span>
  );
};
