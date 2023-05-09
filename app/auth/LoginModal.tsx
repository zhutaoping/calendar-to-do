"use client";
import Modal from "../components/Modal";
import LoginForm from "./LoginForm";
import useLoginModalStore from "../store/LoginModalStore";

interface Props {
  header: string;
}

export default function LoginModal({ header }: Props) {
  const { onClose } = useLoginModalStore();

  const bodyContent = <LoginForm />;

  return (
    <Modal
      header={header}
      onClose={onClose}
      body={bodyContent}
      fullPage={true}
    />
  );
}
