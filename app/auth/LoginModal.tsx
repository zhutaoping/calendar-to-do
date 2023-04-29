"use client";
import Modal from "@/app/components/Modal";
import LoginForm from "./LoginForm";
import useLoginModalStore from "../store/LoginModalStore";

interface Props {
  header: string;
}

export default function SignUpModal({ header }: Props) {
  const { isOpen, onClose } = useLoginModalStore();

  const bodyContent = <LoginForm />;

  return (
    <Modal
      header={header}
      isOpen={isOpen}
      onClose={onClose}
      body={bodyContent}
      fullPage={true}
    />
  );
}
