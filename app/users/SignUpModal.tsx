"use client";
import Modal from "@/app/components/Modal";
import useSignUpModalStore from "../store/SignUpModalStore";
import SignUpForm from "./SignUpForm";

interface Props {
  header: string;
}

export default function SignUpModal({ header }: Props) {
  const { isOpen, onClose } = useSignUpModalStore();

  const bodyContent = <SignUpForm />;

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
