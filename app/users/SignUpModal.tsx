"use client";
import Modal from "@/app/components/Modal";
import { useSignUpModalStore } from "../store/SignUpModalStore";
import SignUpForm from "./SignUpForm";

interface Props {
  header: string;
  isMobile: boolean;
}

export default function SignUpModal({ header, isMobile }: Props) {
  const { onClose } = useSignUpModalStore();

  const bodyContent = <SignUpForm />;

  return (
    <Modal
      header={header}
      onClose={onClose}
      body={bodyContent}
      fullPage={true}
      isMobile={isMobile}
    />
  );
}
