"use client";
import Modal from "@/app/components/Modal";
import LoginForm from "./LoginForm";
import useLoginModalStore from "../hooks/modals/useLoginModalStore";

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
