interface Props {
  loginModal: any;
  signUpModal: any;
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
          loginModal.onOpen();
          signUpModal.onClose();
        }}
      >
        <span className="text-violet-300">{action}</span>
      </button>
    </p>
  );
}
