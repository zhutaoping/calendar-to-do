import { StoreApi, UseBoundStore } from "zustand";
import { LoginModalState, LoginModalType } from "../store/LoginModalStore";
import { SignUpModalState, SignUpModalType } from "../store/SignUpModalStore";

interface Props {
  loginModal: LoginModalState;
  signUpModal: SignUpModalState;
  ask: string;
  action: string;
}

export default function AuthModalFooter({
  loginModal,
  signUpModal,
  ask,
  action,
}: Props) {
  return (
    <p className="mt-1 text-center text-xs text-gray-400">
      {ask}{" "}
      <button
        type="button"
        onClick={() => {
          if (action === "Log In") {
            loginModal.onOpen();
            signUpModal.onClose();
          } else {
            signUpModal.onOpen();
            loginModal.onClose();
          }
        }}
      >
        <span className="text-violet-300">{action}</span>
      </button>
    </p>
  );
}
